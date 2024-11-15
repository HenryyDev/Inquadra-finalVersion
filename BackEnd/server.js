const express = require("express");
const db = require("./db");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/img", express.static("img"));

const port = 3000;

// Configuração do armazenamento do multer
const armazenamento = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./img/"); // Diretório onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nome único para cada arquivo
  },
});

const upload = multer({ storage: armazenamento }); // Instância do multer

// Rota de cadastro de quadras com upload de imagens
app.post("/cadastro-anuncio", upload.array("imagens"), (req, res) => {
    const {
      nome,
      descricao,
      preco_hora,
      cep,
      bairro,
      municipio,
      uf,
      logradouro,
      numero_e,
      ddd,
      numero_t,
    } = req.body;
  
    if (!req.files || req.files.length === 0) {
      return res.status(400).send("Nenhuma imagem foi enviada");
    }
  
    const imagens = req.files.map((file) => `/img/${file.filename}`);
    const esporteData = JSON.parse(req.body.esporte);
    const esporteValues = Object.values(esporteData); 
  
    // Cadastrando o esporte
    const sql_esporte = `INSERT INTO Esportes (basquete, futebol, outros, golfe, natacao, volei, tenis, pong, skate, futsal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
    db.query(sql_esporte, esporteValues, (erro, resultado) => {
      if (erro) {
        console.error("Erro ao inserir esporte:", erro);
        return res.status(500).send("Erro ao cadastrar esporte");
      }
  
      const id_esporte = resultado.insertId;
  
      // Cadastrando o endereço
      const sql_endereco = `INSERT INTO Endereco (cep, logradouro, numero_e, bairro, municipio, uf) VALUES (?, ?, ?, ?, ?, ?)`;
      db.query(sql_endereco, [cep, logradouro, numero_e, bairro, municipio, uf], (erro, resultado) => {
        if (erro) {
          console.error("Erro ao inserir endereço:", erro);
          return res.status(500).send("Erro ao cadastrar endereço");
        }
  
        const id_endereco = resultado.insertId;
  
        // Cadastrando a quadra
        const sql_quadra = `INSERT INTO Quadra (nome, descricao, preco_hora, fk_endereco) VALUES (?, ?, ?, ?)`;
        db.query(sql_quadra, [nome, descricao, preco_hora, id_endereco], (erro, resultado) => {
          if (erro) {
            console.error("Erro ao inserir quadra:", erro);
            return res.status(500).send("Erro ao cadastrar quadra");
          }
  
          const id_quadra = resultado.insertId;
  
          // Associando a quadra ao esporte na tabela Esportes
          const sql_atualiza_esporte = `UPDATE Esportes SET fk_quadra = ? WHERE id_esporte = ?`;
          db.query(sql_atualiza_esporte, [id_quadra, id_esporte], (erro) => {
            if (erro) {
              console.error("Erro ao atualizar esporte com fk_quadra:", erro);
              return res.status(500).send("Erro ao atualizar esporte com fk_quadra");
            }
  
            // Inserindo imagens na tabela Imagem
            const sql_imagens = `INSERT INTO Imagem (caminho, fk_quadra) VALUES ?`;
            const valores_imagens = imagens.map((caminho) => [caminho, id_quadra]);
  
            db.query(sql_imagens, [valores_imagens], (erro) => {
              if (erro) {
                console.error("Erro ao salvar imagens:", erro);
                return res.status(500).send("Erro ao salvar imagens");
              }
  
              // Relacionando esporte e quadra na tabela Relacao
              const sql_relacao = `INSERT INTO Relacao (fk_esporte, fk_quadra) VALUES (?, ?)`;
              db.query(sql_relacao, [id_esporte, id_quadra], (erro) => {
                if (erro) {
                  console.error("Erro ao cadastrar relação entre esporte e quadra:", erro);
                  return res.status(500).send("Erro ao cadastrar relação");
                }
  
                res.send({
                  message: "Quadra cadastrada com sucesso",
                  quadra: {
                    nome,
                    descricao,
                    preco_hora,
                    esporte: esporteData,
                    endereco: {
                      cep,
                      bairro,
                      municipio,
                      uf,
                      logradouro,
                      numero_e,
                    },
                    imagens,
                  }
                });
              });
            });
          });
        });
      });
    });
  });
  
  

app.get("/quadras-destaque", (req, res) => {
    // Consulta para melhores avaliações
    const sqlAvaliacoes = `
      SELECT 
          q.id_quadra AS id, 
          q.nome AS titulo, 
          q.descricao, 
          q.preco_hora AS preco, 
          AVG(a.qualificacao) AS media_avaliacao,
          GROUP_CONCAT(i.caminho) AS fotos  -- Inclui os caminhos das imagens
      FROM Quadra q
      LEFT JOIN Avaliacao a ON q.id_quadra = a.fk_quadra
      LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra  
     GROUP BY q.id_quadra, q.nome, q.descricao, q.preco_hora
      ORDER BY media_avaliacao DESC
      LIMIT 4
    `;
  
    // Consulta para mais reservas
    const sqlReservas = `
      SELECT 
          q.id_quadra AS id, 
          q.nome AS titulo, 
          q.descricao, 
          q.preco_hora AS preco, 
          COUNT(r.id_reserva) AS total_reservas,
          GROUP_CONCAT(i.caminho) AS fotos  
      FROM Quadra q
      LEFT JOIN Reserva r ON q.id_quadra = r.fk_quadra
      LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra  
      GROUP BY q.id_quadra, q.nome, q.descricao, q.preco_hora
      ORDER BY total_reservas DESC
      LIMIT 4
    `;
  
    // Consulta para menor custo
    const sqlCusto = `
     SELECT 
    q.id_quadra AS id, 
    q.nome AS titulo, 
    q.descricao, 
    q.preco_hora AS preco,
    GROUP_CONCAT(i.caminho) AS fotos
FROM Quadra q
LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra
GROUP BY q.id_quadra, q.nome, q.descricao, q.preco_hora
ORDER BY q.preco_hora ASC
LIMIT 4

    `;
  
    // Realiza todas as consultas
    db.query(sqlAvaliacoes, (erro, resultadosAvaliacoes) => {
      if (erro) {
        console.error("Erro ao buscar melhores avaliações:", erro);
        return res.status(500).send("Erro ao buscar melhores avaliações");
      }
  
      db.query(sqlReservas, (erro, resultadosReservas) => {
        if (erro) {
          console.error("Erro ao buscar mais reservas:", erro);
          return res.status(500).send("Erro ao buscar mais reservas");
        }
  
        db.query(sqlCusto, (erro, resultadosCusto) => {
          if (erro) {
            console.error("Erro ao buscar menor custo:", erro);
            return res.status(500).send("Erro ao buscar menor custo");
          }
  
          const formatarFotos = (quadras) => {
            return quadras.map(quadra => ({
              ...quadra,
              fotos: quadra.fotos ? quadra.fotos.split(",") : []  // Apenas formata o campo 'fotos'
            }));
          };
  
          
          res.json({
            melhoresAvaliacoes: formatarFotos(resultadosAvaliacoes),
            maisReservas: formatarFotos(resultadosReservas),
            menorCusto: formatarFotos(resultadosCusto),
          });
        });
      });
    });
  });

  app.get("/quadra/:id", (req, res) => {
  const { id } = req.params; // Pega o id da quadra da URL

  const sql = ` 
  SELECT 
  q.id_quadra AS id,
  q.nome AS titulo,
  q.descricao AS descricao,
  q.preco_hora AS preco_por_hora,
  GROUP_CONCAT(i.caminho) AS fotos,   
  e.basquete, 
  e.futebol, 
  e.outros, 
  e.golfe, 
  e.natacao, 
  e.volei, 
  e.tenis, 
  e.pong, 
  e.skate, 
  e.futsal,
  AVG(a.qualificacao) AS media_avaliacao,
  en.cep,
  en.municipio,
  en.bairro
FROM Quadra q
LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra  
LEFT JOIN Esportes e ON q.id_quadra = e.fk_quadra
LEFT JOIN Avaliacao a ON q.id_quadra = a.fk_quadra  
LEFT JOIN Endereco en ON q.fk_endereco = en.id_endereco  -- Join com a tabela Endereco
WHERE q.id_quadra = ?
GROUP BY q.id_quadra, e.basquete, e.futebol, e.outros, e.golfe, e.natacao, e.volei, e.tenis, e.pong, e.skate, e.futsal, en.cep, en.municipio, en.bairro;


  `;

  db.query(sql, [id], (erro, resultado) => {
    if (erro) {
      console.error(erro);
      return res.status(500).send("Erro ao buscar quadra");
    }

    if (resultado.length === 0) {
      return res.status(404).send("Quadra não encontrada");
    }
    
    const quadra = resultado[0];

    // Filtra os esportes que são 'true'
    const esportesDisponiveis = [];


if (quadra.basquete) esportesDisponiveis.push('basquete');
if (quadra.futebol) esportesDisponiveis.push('futebol');
if (quadra.outros) esportesDisponiveis.push('outros');
if (quadra.golfe) esportesDisponiveis.push('golfe');
if (quadra.natacao) esportesDisponiveis.push('natacao');
if (quadra.volei) esportesDisponiveis.push('volei');
if (quadra.tenis) esportesDisponiveis.push('tenis');
if (quadra.pong) esportesDisponiveis.push('pong');
if (quadra.skate) esportesDisponiveis.push('skate');
if (quadra.futsal) esportesDisponiveis.push('futsal');



    
    
    // Retorna a quadra com as informações formatadas
    res.json({
        id: quadra.id,
        titulo: quadra.titulo,
        descricao: quadra.descricao,
        preco_por_hora: quadra.preco_por_hora,
        fotos: quadra.fotos ? quadra.fotos.split(',') : [],  // Divide a string de fotos em um array
        esportes: esportesDisponiveis,
        media_avaliacao: quadra.media_avaliacao ? parseFloat(quadra.media_avaliacao).toFixed(2) : null,  // Formata a média para 2 casas decimais
        cep: quadra.cep,
        municipio: quadra.municipio,
        bairro: quadra.bairro
      });
      
  });
});

  
  console

  

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

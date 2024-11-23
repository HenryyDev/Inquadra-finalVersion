const express = require("express");
const db = require("./db");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken"); // Importa o jsonwebtoken

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use("/img", express.static("img"));

const port = 3000;

// Chave secreta para o JWT 
const JWT_SECRET = "";

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

// Middleware para verificar o token JWT
const autenticarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).send("Token não fornecido");

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Token inválido");
    req.user = user;
    next();
  });
};

// Rota de login para gerar um token JWT
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  // Verifica se os campos foram enviados
  if (!email || !senha) {
    return res.status(400).json({ message: "Email e senha são obrigatórios." });
  }

  // Consulta o banco de dados
  const sql = "SELECT * FROM Usuario WHERE email = ? AND senha = ?";
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      console.error("Erro ao consultar usuário:", err);
      return res.status(500).json({ message: "Erro interno do servidor." });
    }

    if (results.length === 0) {
      // Usuário ou senha inválidos
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    const user = results[0];

    // Gerar um token JWT com informações básicas do usuário
    const token = jwt.sign(
      {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expira em 1 hora
    );

    // Resposta com o token e informações básicas do usuário
    res.json({
      message: "Login realizado com sucesso.",
      token,
      user: {
        id_usuario: user.id_usuario,
        nome: user.nome,
        email: user.email,
      },
    });
  });
});

// Rota de cadastro de quadras com upload de imagens
app.post("/cadastro-anuncio",autenticarToken, upload.array("imagens"), (req, res) => {
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
    db.query(
      sql_endereco,
      [cep, logradouro, numero_e, bairro, municipio, uf],
      (erro, resultado) => {
        if (erro) {
          console.error("Erro ao inserir endereço:", erro);
          return res.status(500).send("Erro ao cadastrar endereço");
        }

        const id_endereco = resultado.insertId;

        // Cadastrando a quadra
        const sql_quadra = `INSERT INTO Quadra (nome, descricao, preco_hora, fk_endereco) VALUES (?, ?, ?, ?)`;
        db.query(
          sql_quadra,
          [nome, descricao, preco_hora, id_endereco],
          (erro, resultado) => {
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
                return res
                  .status(500)
                  .send("Erro ao atualizar esporte com fk_quadra");
              }

              // Inserindo imagens na tabela Imagem
              const sql_imagens = `INSERT INTO Imagem (caminho, fk_quadra) VALUES ?`;
              const valores_imagens = imagens.map((caminho) => [
                caminho,
                id_quadra,
              ]);

              db.query(sql_imagens, [valores_imagens], (erro) => {
                if (erro) {
                  console.error("Erro ao salvar imagens:", erro);
                  return res.status(500).send("Erro ao salvar imagens");
                }

                // Relacionando esporte e quadra na tabela Relacao
                const sql_relacao = `INSERT INTO Relacao (fk_esporte, fk_quadra) VALUES (?, ?)`;
                db.query(sql_relacao, [id_esporte, id_quadra], (erro) => {
                  if (erro) {
                    console.error(
                      "Erro ao cadastrar relação entre esporte e quadra:",
                      erro
                    );
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
                    },
                  });
                });
              });
            });
          }
        );
      }
    );
  });
});

app.get("/quadras-destaque", (req, res) => {
  //rota para retornar as quadras melhores avaliadas, mais populares e com menor custo
  // Consulta para melhores avaliações
  const sqlAvaliacoes = `
      SELECT 
          q.id_quadra AS id, 
          q.nome AS titulo, 
          q.descricao, 
          q.preco_hora AS preco, 
          FORMAT(AVG(a.qualificacao), 2) AS media_avaliacao,
          en.municipio,
          en.bairro,
          GROUP_CONCAT(i.caminho) AS fotos 
      FROM Quadra q
      LEFT JOIN Avaliacao a ON q.id_quadra = a.fk_quadra
      LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra  
      LEFT JOIN Endereco en ON q.fk_endereco = en.id_endereco 
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
           en.municipio,
          en.bairro,
          COUNT(r.id_reserva) AS total_reservas,
          GROUP_CONCAT(i.caminho) AS fotos,  
          FORMAT(AVG(a.qualificacao), 2) AS media_avaliacao
      FROM Quadra q
      LEFT JOIN Reserva r ON q.id_quadra = r.fk_quadra
      LEFT JOIN Avaliacao a ON q.id_quadra = a.fk_quadra
      LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra  
      LEFT JOIN Endereco en ON q.fk_endereco = en.id_endereco 
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
    en.municipio,
     en.bairro,
    GROUP_CONCAT(i.caminho) AS fotos,
    FORMAT(AVG(a.qualificacao), 2) AS media_avaliacao
FROM Quadra q
LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra
LEFT JOIN Avaliacao a ON q.id_quadra = a.fk_quadra
LEFT JOIN Endereco en ON q.fk_endereco = en.id_endereco 
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
          return quadras.map((quadra) => ({
            ...quadra,
            fotos: quadra.fotos ? quadra.fotos.split(",") : [], // Apenas formata o campo 'fotos'
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
  FORMAT(AVG(a.qualificacao), 2) AS media_avaliacao,
  en.cep,
  en.municipio,
  en.bairro
FROM Quadra q
LEFT JOIN Imagem i ON q.id_quadra = i.fk_quadra  
LEFT JOIN Esportes e ON q.id_quadra = e.fk_quadra
LEFT JOIN Avaliacao a ON q.id_quadra = a.fk_quadra  
LEFT JOIN Endereco en ON q.fk_endereco = en.id_endereco  
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

    if (quadra.basquete) esportesDisponiveis.push("basquete");
    if (quadra.futebol) esportesDisponiveis.push("futebol");
    if (quadra.outros) esportesDisponiveis.push("outros");
    if (quadra.golfe) esportesDisponiveis.push("golfe");
    if (quadra.natacao) esportesDisponiveis.push("natacao");
    if (quadra.volei) esportesDisponiveis.push("volei");
    if (quadra.tenis) esportesDisponiveis.push("tenis");
    if (quadra.pong) esportesDisponiveis.push("pong");
    if (quadra.skate) esportesDisponiveis.push("skate");
    if (quadra.futsal) esportesDisponiveis.push("futsal");

    // Retorna a quadra com as informações formatadas
    res.json({
      id: quadra.id,
      titulo: quadra.titulo,
      descricao: quadra.descricao,
      preco_por_hora: quadra.preco_por_hora,
      fotos: quadra.fotos ? quadra.fotos.split(",") : [], // Divide a string de fotos em um array
      esportes: esportesDisponiveis,
      media_avaliacao: quadra.media_avaliacao
        ? parseFloat(quadra.media_avaliacao).toFixed(2)
        : null, // Formata a média para 2 casas decimais
      cep: quadra.cep,
      municipio: quadra.municipio,
      bairro: quadra.bairro,
    });
  });
});

app.get("/busca", (req, res) => {
  const termoPesquisa = req.query.termo || ""; // Use query string para o termo
  const modalidade = req.query.modalidade || null; // Use query string para a modalidade

  // Verifica se ao menos um dos parâmetros foi fornecido
  if (!termoPesquisa && !modalidade) {
    return res
      .status(400)
      .json({ error: "Nenhum termo ou modalidade fornecido." });
  }

  // Valida se a modalidade fornecida é uma modalidade válida
  const modalidadesValidas = [
    "basquete",
    "futebol",
    "volei",
    "tenis",
    "golfe",
    "natacao",
    "skate",
    "futsal",
    "outros",
    "pingpong",
  ]; // Exemplo de modalidades
  let queryParams = [termoPesquisa, termoPesquisa];
  let query = `
    SELECT 
      q.id_quadra, 
      q.nome, 
      q.descricao, 
      q.preco_hora, 
      en.municipio,
      en.bairro,
      i.caminho AS imagem 
     
  
    FROM 
      Quadra q
    LEFT JOIN 
      Imagem i ON q.id_quadra = i.fk_quadra
    LEFT JOIN 
      Esportes e ON q.id_quadra = e.id_esporte
      LEFT JOIN Endereco en ON q.fk_endereco = en.id_endereco 
    WHERE 
      (q.nome LIKE CONCAT('%', ?, '%') OR q.descricao LIKE CONCAT('%', ?, '%'))
  `;

  // Se uma modalidade válida foi fornecida, adiciona a condição booleana correspondente
  if (modalidade && modalidadesValidas.includes(modalidade)) {
    query += ` AND e.${modalidade} = true`; // Exemplo: "e.basquete = true"
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      console.error("Erro ao executar a query:", err);
      return res.status(500).json({ error: "Erro ao buscar quadras." });
    }

    res.json(results);
  });
});

//NAO TESTEI POIS MEU BANCO DE DADOS NAO ESTA FUNCIONANDO, SUJEITO A VARIOS ERROS 

// Cadastro da conta do usuario
app.post('/usuario', (req, res) => {
  const { nome, email, senha } = req.body;

  const query = 'INSERT INTO Usuario (nome, email, senha) VALUES (?, ?, ?)';
  db.query(query, [nome, email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao inserir usuário:', err);
      return res.status(500).json({ error: 'Erro ao inserir usuário' });
    }

    res.status(201).json({ message: 'Usuário criado com sucesso', usuarioId: result.insertId });
  });
});

// Put da tabela Usuario para mudar informações 
// app.put('/usuario/:id', (req, res) => {
//   const { nome, email, senha } = req.body;
//   const { id } = req.params;

//   const query = 'UPDATE Usuario SET nome = ?, email = ?, senha = ? WHERE id_usuario = ?';
//   db.query(query, [nome, email, senha, id], (err, result) => {
//     if (err) {
//       console.error('Erro ao atualizar usuário:', err);
//       return res.status(500).json({ error: 'Erro ao atualizar usuário' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Usuário não encontrado' });
//     }

//     res.status(200).json({ message: 'Usuário atualizado com sucesso' });
//   });
// });

// ATUALIZA TUDO DE UMA VEZ ⬆

// Put individual nas informações 

// Put nome
app.put('/usuario/:id/nome',autenticarToken, (req, res) => {
  const { nome } = req.body;
  const { id } = req.params;

  // Validação que o nome seja informado
  if (!nome || nome.trim() === '') {
    return res.status(400).json({ error: 'Nome é obrigatório' });
  }

  // Consulta para atualizar o nome do usuário
  const query = 'UPDATE Usuario SET nome = ? WHERE id_usuario = ?';
  db.query(query, [nome, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar nome do usuário:', err);
      return res.status(500).json({ error: 'Erro ao atualizar nome do usuário' });
    }

    // Verifica se nenhuma linha foi afetada, indicando que o usuário não foi encontrado
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Sucesso na atualização do nome
    res.status(200).json({ message: 'Nome do usuário atualizado com sucesso' });
  });
});


// Put email
// Atualiza o email do usuário
app.put('/usuario/:id/email',autenticarToken, (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  // Validação simples para garantir que o email seja informado
  if (!email || email.trim() === '') {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }

  // Validação básica de formato de email 
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Email inválido' });
  }

  const query = 'UPDATE Usuario SET email = ? WHERE id_usuario = ?';
  db.query(query, [email, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar email do usuário:', err);
      return res.status(500).json({ error: 'Erro ao atualizar email do usuário' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Email do usuário atualizado com sucesso' });
  });
});

// Atualiza a senha do usuário
app.put('/usuario/:id/senha', (req, res) => {
  const { senha } = req.body;
  const { id } = req.params;

  // Validação simples para garantir que a senha seja informada
  if (!senha || senha.trim() === '') {
    return res.status(400).json({ error: 'Senha é obrigatória' });
  }

  // Validação simples para garantir que a senha tenha ao menos 6 caracteres (exemplo)
  if (senha.length < 6) {
    return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
  }

  const query = 'UPDATE Usuario SET senha = ? WHERE id_usuario = ?';
  db.query(query, [senha, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar senha do usuário:', err);
      return res.status(500).json({ error: 'Erro ao atualizar senha do usuário' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Senha do usuário atualizada com sucesso' });
  });
});


// Tabela reserva 
// Post 
// Criação de reserva
app.post('/reserva', (req, res) => {
  const { data_reserva, horario_inicio, horario_final, estado, fk_quadra, fk_usuario } = req.body;

  // Validação dos campos obrigatórios
  if (!data_reserva || !horario_inicio || !horario_final || !estado || !fk_quadra || !fk_usuario) {
    return res.status(400).json({ error: 'Todos os campos (data_reserva, horario_inicio, horario_final, estado, fk_quadra, fk_usuario) são obrigatórios' });
  }

  // Validação do formato de data e horário
  const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
  const timePattern = /^\d{2}:\d{2}:\d{2}$/; // Formato HH:MM:SS

  if (!datePattern.test(data_reserva)) {
    return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD.' });
  }
  if (!timePattern.test(horario_inicio) || !timePattern.test(horario_final)) {
    return res.status(400).json({ error: 'Formato de horário inválido. Use HH:MM:SS.' });
  }

  // Validação do estado (exemplo simples, adaptável conforme os valores possíveis)
  const estadosValidos = ['pendente', 'confirmada', 'concluída', 'cancelada']; // Exemplo de estados válidos
  if (!estadosValidos.includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido. Valores válidos: pendente, confirmada, concluída, cancelada.' });
  }

  // Verificação se fk_quadra e fk_usuario existem nas respectivas tabelas
  const checkQuadraQuery = 'SELECT COUNT(*) AS count FROM Quadra WHERE id_quadra = ?';
  db.query(checkQuadraQuery, [fk_quadra], (err, result) => {
    if (err) {
      console.error('Erro ao verificar a quadra:', err);
      return res.status(500).json({ error: 'Erro ao verificar a quadra' });
    }
    if (result[0].count === 0) {
      return res.status(404).json({ error: 'Quadra não encontrada' });
    }

    const checkUsuarioQuery = 'SELECT COUNT(*) AS count FROM Usuario WHERE id_usuario = ?';
    db.query(checkUsuarioQuery, [fk_usuario], (err, result) => {
      if (err) {
        console.error('Erro ao verificar o usuário:', err);
        return res.status(500).json({ error: 'Erro ao verificar o usuário' });
      }
      if (result[0].count === 0) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Inserção da reserva no banco de dados
      const query = 'INSERT INTO Reserva (data_reserva, horario_inicio, horario_final, estado, fk_quadra, fk_usuario) VALUES (?, ?, ?, ?, ?, ?)';
      db.query(query, [data_reserva, horario_inicio, horario_final, estado, fk_quadra, fk_usuario], (err, result) => {
        if (err) {
          console.error('Erro ao inserir reserva:', err);
          return res.status(500).json({ error: 'Erro ao inserir reserva' });
        }

        res.status(201).json({ message: 'Reserva criada com sucesso', reservaId: result.insertId });
      });
    });
  });
});

// Put da tabela Reserva para mudar informações 
// app.put('/reserva/:id', (req, res) => {
//   const { data_reserva, horario_inicio, horario_final, estado, fk_quadra, fk_usuario } = req.body;
//   const { id } = req.params;

//   const query = 'UPDATE Reserva SET data_reserva = ?, horario_inicio = ?, horario_final = ?, estado = ?, fk_quadra = ?, fk_usuario = ? WHERE id_reserva = ?';
//   db.query(query, [data_reserva, horario_inicio, horario_final, estado, fk_quadra, fk_usuario, id], (err, result) => {
//     if (err) {
//       console.error('Erro ao atualizar reserva:', err);
//       return res.status(500).json({ error: 'Erro ao atualizar reserva' });
//     }

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ error: 'Reserva não encontrada' });
//     }

//     res.status(200).json({ message: 'Reserva atualizada com sucesso' });
//   });
// });

// Put individual nas informações da reserva

// Atualização do estado da reserva
app.put('/reserva/:id/estado', (req, res) => {
  // Extração do estado da reserva e ID da URL da requisição
  const { estado } = req.body;
  const { id } = req.params;

  // Validação do estado
  // Lista dos estados válidos para a reserva
  const estadosValidos = ['pendente', 'confirmada', 'concluída', 'cancelada'];
  
  // Verifica se o estado recebido é um dos valores válidos
  if (!estadosValidos.includes(estado)) {
    // Se não for válido, retorna um erro com status 400 (Bad Request)
    return res.status(400).json({ error: 'Estado inválido. Valores válidos: pendente, confirmada, concluída, cancelada.' });
  }

  // Definindo a consulta SQL para atualizar o estado da reserva
  const query = 'UPDATE Reserva SET estado = ? WHERE id_reserva = ?';

  // Executando a consulta no banco de dados
  db.query(query, [estado, id], (err, result) => {
    // Se ocorrer algum erro durante a execução da consulta
    if (err) {
      // Registra o erro no console e retorna erro 500 (Erro interno do servidor)
      console.error('Erro ao atualizar estado da reserva:', err);
      return res.status(500).json({ error: 'Erro ao atualizar estado da reserva' });
    }

    // Verifica se a reserva foi encontrada e o estado foi realmente atualizado
    if (result.affectedRows === 0) {
      // Se não houverem linhas afetadas (ou seja, a reserva não foi encontrada)
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    // Se a atualização foi bem-sucedida, retorna uma resposta com sucesso
    res.status(200).json({ message: 'Estado da reserva atualizado com sucesso' });
  });
});


// Consulta de todas as reservas
app.get('/reservas', (req, res) => {
  const query = 'SELECT * FROM Reserva';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar reservas:', err);
      return res.status(500).json({ error: 'Erro ao buscar reservas' });
    }

    res.status(200).json(results);
  });
});

// Consulta de reservas por usuário
app.get('/reservas/:usuarioId', (req, res) => {
  const { usuarioId } = req.params;

  // Validação de ID de usuário
  if (!usuarioId || isNaN(usuarioId)) {
    return res.status(400).json({ error: 'ID de usuário inválido' });
  }

  const query = 'SELECT * FROM Reserva WHERE fk_usuario = ?';
  db.query(query, [usuarioId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar reservas do usuário:', err);
      return res.status(500).json({ error: 'Erro ao buscar reservas do usuário' });
    }

    res.status(200).json(results);
  });
});

// Consulta de reservas por data
app.get('/reservas/data/:data', (req, res) => {
  const { data } = req.params;

  // Validação de data
  const datePattern = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD
  if (!datePattern.test(data)) {
    return res.status(400).json({ error: 'Formato de data inválido. Use YYYY-MM-DD.' });
  }

  const query = 'SELECT * FROM Reserva WHERE data_reserva = ?';
  db.query(query, [data], (err, results) => {
    if (err) {
      console.error('Erro ao buscar reservas por data:', err);
      return res.status(500).json({ error: 'Erro ao buscar reservas por data' });
    }

    res.status(200).json(results);
  });
});

// Exclusão de reserva
app.delete('/reserva/:id', (req, res) => {
  const { id } = req.params;

  // Validação de ID de reserva
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID de reserva inválido' });
  }

  const query = 'DELETE FROM Reserva WHERE id_reserva = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir reserva:', err);
      return res.status(500).json({ error: 'Erro ao excluir reserva' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reserva não encontrada' });
    }

    res.status(200).json({ message: 'Reserva excluída com sucesso' });
  });
});

// Exclusão de usuário
app.delete('/usuario/:id', (req, res) => {
  const { id } = req.params;

  // Validação de ID de usuário
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID de usuário inválido' });
  }

  const query = 'DELETE FROM Usuario WHERE id_usuario = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir usuário:', err);
      return res.status(500).json({ error: 'Erro ao excluir usuário' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  });
});


//Adiconar mais segurança para as senhas 


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
 


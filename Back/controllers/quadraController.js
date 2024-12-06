const db = require('../db');

const upload = require('../middlewares/upload'); // Middleware para upload das imagens, se necessário

exports.createQuadra = async (req, res) => {
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
  
    } = req.body;

    const { id_usuario } = req.user; // O id do usuário autenticado via JWT

    // Validação dos campos obrigatórios
    if (!nome || !preco_hora || !descricao || !cep || !uf || !municipio || !bairro || !logradouro || !numero_e) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Validação de imagens (se houver)
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("Nenhuma imagem foi enviada");
    }

    const imagens = req.files.map((file) => `/img/${file.filename}`);
    const esporteData = JSON.parse(req.body.esporte); // Exemplo: { futebol: true, basquete: false }
    const esporteValues = [
        esporteData.basquete || false,
        esporteData.futebol || false,
        esporteData.outros || false,
        esporteData.golfe || false,
        esporteData.natacao || false,
        esporteData.volei || false,
        esporteData.tenis || false,
        esporteData.pong || false,
        esporteData.skate || false,
        esporteData.futsal || false,
    ];

    const connection = await db.getConnection();
    try {
        // Iniciar a transação
        await connection.beginTransaction();

        // Inserir endereço
        const [cadastroEndereco] = await connection.execute(
            "INSERT INTO Endereco (cep, uf, municipio, bairro, logradouro, numero) VALUES (?, ?, ?, ?, ?, ?)",
            [cep, uf, municipio, bairro, logradouro, numero_e]
        );

        const id_endereco = cadastroEndereco.insertId;

        // Inserir esportes
        const sql_esporte = `INSERT INTO Esportes (basquete, futebol, outros, golfe, natacao, volei, tenis, pong, skate, futsal)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        const [cadastroEsporte] = await connection.execute(sql_esporte, esporteValues);
        const id_esporte = cadastroEsporte.insertId;

        // Inserir quadra
        const [cadastroQuadra] = await connection.execute(
            "INSERT INTO Quadra (nome, descricao, preco_hora, fk_endereco, fk_usuario) VALUES (?, ?, ?, ?, ?)",
            [nome, descricao, preco_hora, id_endereco, id_usuario]
        );

        const id_quadra = cadastroQuadra.insertId;

        // Associar relação entre esportes e quadra
        const sql_relacao = `INSERT INTO Relacao (fk_esporte, fk_quadra) VALUES ?`;
        const esportesAssociados = esporteValues
            .map((esporte, index) => (esporte ? [id_esporte, id_quadra] : null)) // Adiciona apenas os esportes "true"
            .filter((item) => item !== null); // Remove valores nulos

        await connection.query(sql_relacao, [esportesAssociados]);

        // Inserir imagens
        const sql_imagens = `INSERT INTO Imagem (caminho, fk_quadra) VALUES ?`;
        const valores_imagens = imagens.map((caminho) => [caminho, id_quadra]);
        await connection.query(sql_imagens, [valores_imagens]);

        // Confirmar transação
        await connection.commit();

        // Resposta de sucesso
        res.status(201).json({
            message: "Quadra criada com sucesso",
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
    } catch (error) {
        // Reverter transação em caso de erro
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: "Erro ao criar a quadra", details: error.message });
    } finally {
        // Liberar a conexão com o banco
        connection.release();
    }
};


// Obter todas as quadras
exports.getQuadra = async (req, res) => {
    const connection = await db.getConnection();
    try {
        const [quadras] = await connection.execute('SELECT * FROM Quadra');

        if (quadras.length === 0) {
            return res.status(404).json({ error: 'Nenhuma quadra encontrada' });
        }

        res.status(200).json(quadras);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter as quadras' });
    } finally {
        connection.release();
    }
};

// Obter unm quadra por ID
exports.getQuadraID = async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
        // Define a query SQL
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
        LEFT JOIN Relacao r ON q.id_quadra = r.fk_quadra
        LEFT JOIN Esportes e ON r.fk_esporte = e.id_esporte 
        LEFT JOIN Avaliacao a ON q.id_quadra = a.fk_quadra  
        LEFT JOIN Endereco en ON q.fk_endereco = en.id_endereco  
        WHERE q.id_quadra = ?
        GROUP BY q.id_quadra, e.basquete, e.futebol, e.outros, e.golfe, e.natacao, e.volei, e.tenis, e.pong, e.skate, e.futsal, en.cep, en.municipio, en.bairro;`;

        // Executa a consulta SQL de forma assíncrona
        const [resultado] = await connection.query(sql, [id]);

        // Verifica se a quadra foi encontrada
        if (resultado.length === 0) {
            return res.status(404).send("Quadra não encontrada");
        }

        const quadra = resultado[0];
        console.log("Resultado da consulta:", quadra);

        // Filtra os esportes disponíveis
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
            fotos: quadra.fotos ? [...new Set(quadra.fotos.split(","))] : [], // Remove duplicatas
            esportes: esportesDisponiveis,
            media_avaliacao: quadra.media_avaliacao
                ? parseFloat(quadra.media_avaliacao).toFixed(2)
                : null, // Formata a média para 2 casas decimais
            cep: quadra.cep,
            municipio: quadra.municipio,
            bairro: quadra.bairro,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao obter a quadra' });
    } finally {
        // Libera a conexão
        connection.release();
    }
};

exports.getQuadraEsporte = async (req, res) => {
  // Obter os parâmetros de consulta
  const modalidade = req.query.modalidade || null;  // Modalidade recebida via query
  const termo = req.query.termo || "";  // Termo de pesquisa para o nome ou descrição

  // Valida se tanto 'termo' quanto 'modalidade' são passados na requisição
  if (termo && modalidade) {
    return res.status(400).json({ error: "Você pode buscar apenas por termo ou por modalidade, mas não pelos dois." });
  }

  const modalidadesValidas = [
    "basquete", "futebol", "volei", "tenis", "golfe", 
    "natacao", "skate", "futsal", "outros", "pong",
  ];

  // Valida se a modalidade fornecida é válida
  if (modalidade && !modalidadesValidas.includes(modalidade)) {
    return res.status(400).json({ error: "Modalidade inválida fornecida." });
  }

  // Array de parâmetros para a consulta
  let queryParams = [];
  let query = `
    SELECT 
      q.id_quadra, 
      q.nome, 
      q.descricao, 
      q.preco_hora, 
      en.municipio,
      en.bairro,
      (SELECT i.caminho 
       FROM Imagem i 
       WHERE i.fk_quadra = q.id_quadra
       LIMIT 1) AS Imagem
    FROM 
      Quadra q
    LEFT JOIN 
      Endereco en ON q.fk_endereco = en.id_endereco
    LEFT JOIN
      Relacao r ON q.id_quadra = r.fk_quadra
    LEFT JOIN
      Esportes e ON r.fk_esporte = e.id_esporte
    WHERE 
  `;

  // Se o termo for fornecido, procura no nome ou na descrição
  if (termo) {
    query += ` (q.nome LIKE ? OR q.descricao LIKE ?) `;
    queryParams.push(`%${termo}%`, `%${termo}%`);  // Adiciona os parâmetros para o LIKE
  }

  // Se a modalidade for fornecida, a busca será feita somente por modalidade
  if (modalidade) {
    // A condição de modalidade será adicionada à consulta
    query += ` e.${modalidade} = 1 `;
  }

  // Exibe a consulta gerada para depuração
  console.log("Consulta gerada:", query);
  console.log("Parâmetros SQL:", queryParams);

  try {
    // Executa a consulta no banco de dados com Promise
    const [results] = await db.query(query, queryParams);  // Usando `await` para aguardar a execução
    // Retorna os resultados para o cliente
    res.json(results);
    console.log("Resultados:", results);
  } catch (err) {
    console.error("Erro ao executar a query:", err);
    return res.status(500).json({ error: "Erro ao buscar quadras." });
  }
};
















// Atualizar uma quadra
exports.updateQuadra = async (req, res) => {
    const { id } = req.params;
    const { nome, preco_hora, fk_endereco, descricao } = req.body;

    if (!nome || !preco_hora || !fk_endereco || !descricao) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute(
            'UPDATE Quadra SET nome = ?, preco_hora = ?, fk_endereco = ?, descricao = ? WHERE id_quadra = ?',
            [nome, preco_hora, fk_endereco, descricao, id]
        );

        await connection.commit();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Quadra atualizada com sucesso' });
        } else {
            res.status(404).json({ error: 'Quadra não encontrada' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar a quadra' });
    } finally {
        connection.release();
    }
};

// Deletar uma quadra
exports.deleteQuadra = async (req, res) => {
    const { id } = req.params;
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [result] = await connection.execute('DELETE FROM Quadra WHERE id_quadra = ?', [id]);

        await connection.commit();

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Quadra deletada com sucesso' });
        } else {
            res.status(404).json({ error: 'Quadra não encontrada' });
        }
    } catch (error) {
        await connection.rollback();
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar a quadra' });
    } finally {
        connection.release();
    }
};


exports.getDestaque = async (req, res) => {
    // Conecta-se ao banco de dados
    const connection = await db.getConnection();
    
    try {
      // Consultas para as quadras: melhores avaliações, mais reservas, e menor custo
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
  
      // Realiza todas as consultas de forma assíncrona utilizando Promise.all
      const [resultadosAvaliacoes, resultadosReservas, resultadosCusto] = await Promise.all([
        connection.query(sqlAvaliacoes),
        connection.query(sqlReservas),
        connection.query(sqlCusto)
      ]);
      
      // Função para formatar as fotos (convertendo o campo 'fotos' para um array)
      const formatarFotos = (quadras) => {
        return quadras.map((quadra) => ({
          ...quadra,
          fotos: quadra.fotos ? quadra.fotos.split(",") : [] // Apenas formata o campo 'fotos'
        }));
      };
  
      // Envia a resposta com os resultados das 3 consultas
      res.json({
        melhoresAvaliacoes: formatarFotos(resultadosAvaliacoes[0]),
        maisReservas: formatarFotos(resultadosReservas[0]),
        menorCusto: formatarFotos(resultadosCusto[0]),
      });
      
    } catch (error) {
      console.error("Erro ao buscar quadras destaque:", error);
      res.status(500).send("Erro ao buscar quadras destaque");
    } finally {
      // Libera a conexão com o banco
      connection.release();
    }
  };
  
    

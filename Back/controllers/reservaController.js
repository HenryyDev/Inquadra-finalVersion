const db = require("../db");

// Criar uma nova reserva
exports.createReserva = async (req, res) => {
  const { data_reserva, horario_inicio, horario_final, id_quadra, preco_hora } =
    req.body;
  const { id_usuario } = req.user;

  if (!data_reserva || !horario_inicio || !horario_final) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [reserva] = await connection.execute(
      "INSERT INTO Reserva (data_reserva, horario_inicio, horario_final, fk_quadra, fk_usuario) VALUES (?, ?, ?, ?, ?)",
      [data_reserva, horario_inicio, horario_final, id_quadra, id_usuario]
    );

    const id_reserva = reserva.insertId;

    const extrairHora = (horario_final, horario_inicio) => {
      const [hora_final] = horario_final.split(":").map(Number);
      const [hora_inicial] = horario_inicio.split(":").map(Number);
      const diferencaHora = hora_final - hora_inicial;
      return diferencaHora;
    };

    const preco_quadra = parseFloat(preco_hora);
    console.log(preco_quadra);
    const quantia = extrairHora(horario_final, horario_inicio) * preco_quadra;

    const [pago] = await connection.execute(
      "INSERT INTO Pago (fk_reserva, quantia) VALUES (?, ?)",
      [id_reserva, quantia]
    );

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: "Erro ao criar a reserva" });
  } finally {
    connection.release();
  }
};

// Obter todas as reservações
exports.getReserva = async (req, res) => {
  try {
    const [reservas] = await db.execute("SELECT * FROM Reserva");
    res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter as reservas" });
  } finally {
    connection.release();
  }
};

// Obter uma reservação por ID
exports.getReservaID = async (req, res) => {
  const { id_usuario } = req.user;
  const connection = await db.getConnection();
  try {
    // Realizando o join entre Reserva, Quadra e Imagem
    const [reservas] = await db.execute(
      `
    SELECT 
    r.*,                     
    q.descricao AS descricao_quadra, 
    q.preco_hora AS preco,
    q.nome as nome,
    i.caminho AS caminho_imagem
    FROM 
    Reserva r
    JOIN 
    Quadra q ON r.fk_quadra = q.id_quadra 
    LEFT JOIN 
    Imagem i ON i.fk_quadra = q.id_quadra
    WHERE 
    r.fk_usuario = ?
        `,
      [id_usuario]
    );

    if (reservas.length > 0) {
      res.status(200).json(reservas); // Retorna a reserva encontrada
    } else {
      res.status(204).json(); // Retorna 204 se não houver reservas
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao obter as reservas" });
  } finally {
    connection.release();
  }
};

// Atualizar uma reservação
exports.updateReserva = async (req, res) => {
  const { id_reserva } = req.params;
  const { data_reserva, horario_inicio, horaio_final } = req.body;

  if (!data_reserva || !horario_inicio || !horaio_final) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios" });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [reserva] = await connection.execute(
      "UPDATE Reserva SET data_reserva = ?, horario_inicio = ?, horaio_final = ? WHERE id_reserva = ?",
      [data_reserva, horario_inicio, horaio_final, id_reserva]
    );

    await connection.commit();

    if (reserva.affectedRows > 0) {
      res.status(200).json({ message: "Reserva atualizada com sucesso" });
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar a reserva" });
  } finally {
    connection.release();
  }
};

// Deletar uma reservação
exports.deleteReserva = async (req, res) => {
  const { id_reserva } = req.params;
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [deletarPago] = await connection.execute(
      "DELETE FROM Pago WHERE fk_reserva = ?",
      [id_reserva]
    );

    const [deletarReserva] = await connection.execute(
      "DELETE FROM Reserva WHERE id_reserva = ?",
      [id_reserva]
    );

    await connection.commit();

    if (deletarPago.affectedRows > 0 && deletarReserva.affectedRows > 0) {
      res.status(200).json({ message: "Reserva deletada com sucesso" });
    } else {
      res.status(404).json({ error: "Reserva não encontrada" });
    }
  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar a reserva" });
  } finally {
    connection.release();
  }
};

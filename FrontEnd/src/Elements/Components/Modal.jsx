import React, { useState, useEffect } from "react";
import ver from "../../assets/ver.png";
import ocultar from "../../assets/ocultar.png";

export default function ModalConfirmacao({
  show,
  onClose,
  onConfirm,
  titulo,
  mensagem,
  erro,
  setErro,
  tipo,
}) {
  const [senha, setSenha] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");  // Adicionamos o estado para confirmar a senha
  const [formErro, setFormErro] = useState("");  // Erro do formulário
  const [viewSenha, setViewSenha] = useState(false);  // Estado para alternar a visibilidade da senha atual
  const [viewNovaSenha, setViewNovaSenha] = useState(false); // Estado para alternar a visibilidade da nova senha
  const [viewConfirmarSenha, setViewConfirmarSenha] = useState(false); // Estado para alternar a visibilidade da confirmar senha

  // Função para validar a senha
  const validatePassword = (senha) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\/\-+*_\\|@$!%*?&])[A-Za-z\d#\/\-+*_\\|@$!%*?&]{8,}$/;
    return passwordRegex.test(senha);
  };

  // Resetando os campos quando o modal é fechado
  useEffect(() => {
    if (!show) {
      setSenha("");
      setNovaSenha("");
      setConfirmarSenha("");  // Limpa a confirmação da senha
      setFormErro("");  // Limpa o erro de formulário
    }
  }, [show]);

  const handleConfirm = async () => {
    // Verificando se a senha e a confirmação são iguais
    if (senha.trim() === "") {
      setFormErro("A senha atual é obrigatória. Por favor, insira sua senha para continuar.");
      return;
    }

    if (tipo === "alterar-senha" && novaSenha.trim() === "") {
      setFormErro("A nova senha é obrigatória. Por favor, insira a nova senha.");
      return;
    }

    if (tipo === "alterar-senha" && novaSenha !== confirmarSenha) {
      setFormErro("As senhas não coincidem. A nova senha e a confirmação devem ser iguais. Por favor, tente novamente.");
      return;
    }

    // Valida a nova senha
    if (tipo === "alterar-senha" && !validatePassword(novaSenha)) {
      setFormErro("A nova senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais (#, /, -, +, *, _, \\).");
      return;
    }

    try {
      if (tipo === "deletar") {
        await onConfirm(senha); // Para desativar a conta, enviamos a senha
      } else if (tipo === "alterar-senha") {
        await onConfirm(senha, novaSenha); // Para alterar senha, passamos senha e nova senha
      } else if (tipo === "excluir-anuncio") {
        await onConfirm(senha); // Para excluir o anúncio, passamos apenas a senha
      }
      onClose(); // Fecha o modal após confirmação
    } catch (error) {
      console.log(error);  // Log para depuração
      setErro(error.response?.data?.message || "Erro ao processar sua solicitação. Por favor, tente novamente.");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      aria-labelledby="exampleModalLabel"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{titulo}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>{mensagem}</p>

            {(tipo === "deletar" || tipo === "excluir-anuncio") && (
              <div className="mt-2">
                <label>Digite sua senha para continuar:</label>
                <div style={{ position: "relative" }}>
                  <input
                    required
                    type={viewSenha ? "text" : "password"} // Alterna entre "password" e "text"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="form-control"
                  />
                  <img
                    src={viewSenha ? ver : ocultar}
                    alt="Ícone de visibilidade"
                    width="40px"
                    height="40px"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setViewSenha(!viewSenha)} // Alterna entre visível e oculto
                  />
                </div>
              </div>
            )}

            {tipo === "alterar-senha" && (
              <div className="mt-2">
                <label>Senha atual:</label>
                <div style={{ position: "relative" }}>
                  <input
                    required
                    type={viewSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="form-control"
                  />
                  <img
                    src={viewSenha ? ver : ocultar}
                    alt="Ícone de visibilidade"
                    width="40px"
                    height="40px"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setViewSenha(!viewSenha)}
                  />
                </div>

                <label>Nova senha:</label>
                <div style={{ position: "relative" }}>
                  <input
                    required
                    type={viewNovaSenha ? "text" : "password"}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    className="form-control"
                  />
                  <img
                    src={viewNovaSenha ? ver : ocultar}
                    alt="Ícone de visibilidade"
                    width="40px"
                    height="40px"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setViewNovaSenha(!viewNovaSenha)}
                  />
                </div>

                <label>Confirmar nova senha:</label>
                <div style={{ position: "relative" }}>
                  <input
                    required
                    type={viewConfirmarSenha ? "text" : "password"}
                    value={confirmarSenha}
                    onChange={(e) => setConfirmarSenha(e.target.value)}
                    className="form-control"
                  />
                  <img
                    src={viewConfirmarSenha ? ver : ocultar}
                    alt="Ícone de visibilidade"
                    width="40px"
                    height="40px"
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                    }}
                    onClick={() => setViewConfirmarSenha(!viewConfirmarSenha)}
                  />
                </div>
              </div>
            )}

            {formErro && <p style={{ color: "red" }}>{formErro}</p>}
          </div>
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleConfirm}
              disabled={formErro !== ""}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

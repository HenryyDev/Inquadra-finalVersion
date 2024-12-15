import React, { useState, useEffect } from "react";
import ver from "../../assets/ver.png";
import ocultar from "../../assets/ocultar.png";

const InputSenha = ({ value, onChange, view, toggleView, label }) => (
  <div className="mt-2">
    <label>{label}</label>
    <div style={{ position: "relative" }}>
      <input
        required
        type={view ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="form-control"
      />
      <img
        src={view ? ver : ocultar}
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
        onClick={toggleView}
      />
    </div>
  </div>
);

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
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [formErro, setFormErro] = useState("");
  const [viewSenha, setViewSenha] = useState(false);
  const [viewNovaSenha, setViewNovaSenha] = useState(false);
  const [viewConfirmarSenha, setViewConfirmarSenha] = useState(false);
  const [nota, setNota] = useState(0);

  const validatePassword = (senha) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#\/\-+*_\\|@$!%*?&])[A-Za-z\d#\/\-+*_\\|@$!%*?&]{8,}$/;
    return passwordRegex.test(senha);
  };

  useEffect(() => {
    if (!show) {
      setSenha("");
      setNovaSenha("");
      setConfirmarSenha("");
      setFormErro("");
      setNota(0);
    }
  }, [show]);

  const handleConfirm = async () => {
    if (tipo === "avaliar" && nota === 0) {
      setFormErro("Por favor, selecione uma nota antes de continuar.");
      return;
    }
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

    if (tipo === "alterar-senha" && !validatePassword(novaSenha)) {
      setFormErro("A nova senha deve ter no mínimo 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.");
      return;
    }

    try {
      if (tipo === "deletar" || tipo === "excluir-anuncio") {
        await onConfirm(senha);
      } else if (tipo === "alterar-senha") {
        await onConfirm(senha, novaSenha);
      } else if (tipo === "avaliar") {
        await onConfirm(nota);
      }
      onClose();
    } catch (error) {
      console.log(error);
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
              <InputSenha
                value={senha}
                onChange={setSenha}
                view={viewSenha}
                toggleView={() => setViewSenha(!viewSenha)}
                label="Digite sua senha para continuar:"
              />
            )}

            {tipo === "alterar-senha" && (
              <>
                <InputSenha
                  value={senha}
                  onChange={setSenha}
                  view={viewSenha}
                  toggleView={() => setViewSenha(!viewSenha)}
                  label="Senha atual:"
                />
                <InputSenha
                  value={novaSenha}
                  onChange={setNovaSenha}
                  view={viewNovaSenha}
                  toggleView={() => setViewNovaSenha(!viewNovaSenha)}
                  label="Nova senha:"
                />
                <InputSenha
                  value={confirmarSenha}
                  onChange={setConfirmarSenha}
                  view={viewConfirmarSenha}
                  toggleView={() => setViewConfirmarSenha(!viewConfirmarSenha)}
                  label="Confirmar nova senha:"
                />
              </>
            )}

            {tipo === "avaliar" && (
              <div>
                <p>Selecione uma nota para avaliar:</p>
                <div>
                  {[1, 2, 3, 4, 5].map((numero) => (
                    <label key={numero} style={{ marginRight: "10px" }}>
                      <input
                        type="radio"
                        name="avaliacao"
                        value={numero}
                        checked={nota === numero}
                        onChange={() => setNota(numero)}
                      />
                      {numero}
                    </label>
                  ))}
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
              disabled={false}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

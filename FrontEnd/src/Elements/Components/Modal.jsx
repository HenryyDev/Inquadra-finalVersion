import React, { useState, useEffect } from "react";

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
    const [formErro, setFormErro] = useState("");  // Erro do formulário

    // Resetando os campos quando o modal é fechado
    useEffect(() => {
        if (!show) {
            setSenha("");
            setNovaSenha("");
            setFormErro("");  // Limpa o erro de formulário
        }
    }, [show]);

    const handleConfirm = async () => {
        if (senha.trim() === "") {
            setFormErro("A senha é obrigatória.");
            return;
        }

        if (tipo === "alterar-senha" && novaSenha.trim() === "") {
            setFormErro("A nova senha é obrigatória.");
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
            setErro(error.response?.data?.message || "Erro ao processar sua solicitação.");
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
                                <input
                                    required
                                    type="password"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        )}

                        
                        {tipo === "alterar-senha" && (
                            <div className="mt-2">
                                <label>Nova senha:</label>
                                <input
                                    required
                                    type="password"
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                        )}

                      
                        {formErro && <p style={{ color: "red" }}>{formErro}</p>}
                    </div>
                    {erro && <p style={{ color: "red" }}>{erro}</p>}
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="button" className="btn btn-danger" onClick={handleConfirm}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

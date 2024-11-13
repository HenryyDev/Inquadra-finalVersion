const CheckCEP = (e,setFormData, setErrors) => {
    const cep = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    // Verifica se o CEP tem 8 caracteres
    if (cep.length !== 8) {
      setErrors((prevState) => ({
        ...prevState,
        cep: "CEP inválido. Certifique-se de que o CEP tenha 8 dígitos.",
      }));
      return;
    }

    // Faz a requisição para o ViaCEP
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
     
      .then((data) => {
        console.log(data)
        if (data.erro) {
          setErrors((prevState) => ({
            ...prevState,
            cep: "CEP não encontrado.",
            
          }));
        } else {
          
          setFormData((prevState) => ({
            ...prevState,
            rua: data.logradouro || "", // Atualiza a rua se o CEP for válido
          }));
          setErrors((prevState) => ({
            ...prevState,
            cep: "", // Limpa o erro de CEP
          }));
        }
      })
      .catch(() => {
        setErrors((prevState) => ({
          ...prevState,
          cep: "Erro ao buscar o CEP. Tente novamente.",
        }));
      });
  };
  export default CheckCEP
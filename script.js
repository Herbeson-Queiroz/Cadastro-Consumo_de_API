async function buscaEndereco(cep){
    let mensagemErro = document.querySelector("#erro");
    mensagemErro.innerHTML = "";
    try {
        
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCepConvertida = await consultaCep.json();
        
        if (consultaCepConvertida.erro){
            throw Error('CEP não existente');
        }

        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let bairro = document.getElementById('bairro');
        let estado = document.getElementById('estado');
        
        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        bairro.value = consultaCepConvertida.bairro;
        estado.value = consultaCepConvertida.uf;

        // console.log(consultaCepConvertida);
        return consultaCepConvertida;
    } catch (erro) {
        mensagemErro.innerHTML = '<p>CEP inválido, tente novamente</p>';
        console.log(erro)
    }
}

let cep = document.querySelector('#cep');
cep.addEventListener('focusout', () => buscaEndereco(cep.value));
//Axios
const url = "https://homologacao.windel.com.br:3000/teste-front"
descProdutoInput.focus()
function criaProduto() {
    //Dados do Input

    const descProdutoInput = document.querySelector("#descProdutoInput")
    const vlrVendaInput = (document.querySelector("#vlrVendaInput"))
    const refProdutoInput = document.querySelector("#refProdutoInput")
    const unInput = document.querySelector("#unInput")
    const fabProdutoUnput = document.querySelector("#fabProdutoUnput")
    const estoqueProdutoInput = document.querySelector("#estoqueProdutoInput")
    const imagemInput = document.querySelector("#imagemInput")


    //transformando em valores
    const descProduto = (descProdutoInput).value
    const vlrVenda = (vlrVendaInput).value
    const refProduto = (refProdutoInput).value
    const un = (unInput).value
    const fabProduto = (fabProdutoUnput).value
    const estoqueProduto = (estoqueProdutoInput).value
    const imagem = (imagemInput).value

    //criação do produto
    const novoProduto = {
        nome: descProduto,
        valorVenda: parseFloat(vlrVenda),
        referencia: refProduto,
        unidadeMedida: un,
        fabricante: fabProduto,
        estoque: parseInt(estoqueProduto),
        imagemProduto: imagem,
    }

    return novoProduto
}

//mandando para a api o produto novo
function addNovoProduto() {
    novoProduto = criaProduto()
    axios.post(url, novoProduto)
        .then(response => {
            console.log(response.data)
            const mensagem = response.data.message
            console.log(mensagem)
            alert(`${mensagem} ${novoProduto.nome}`)
            window.location.href = "/index.html"
        })
        .catch(error => console.log(error))

}

function voltar(){
    window.location.href = "/index.html"
}
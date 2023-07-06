//Axios
const url = "https://homologacao.windel.com.br:3000/teste-front"


const id = localStorage.getItem('id'); // Obtém o ID do localStorage
console.log(id);// Exibe o valor na console


//inputs
const descProdutoInput = document.querySelector("#descProdutoInput")
const vlrVendaInput = document.querySelector("#vlrVendaInput")
const refProdutoInput = document.querySelector("#refProdutoInput")
const unInput = document.querySelector("#unInput")
const fabProdutoUnput = document.querySelector("#fabProdutoUnput")
const estoqueProdutoInput = document.querySelector("#estoqueProdutoInput")
const imagemInput = document.querySelector("#imagemInput")

async function buscaProduto(id) {
    try {
        const response = await axios.get(`${url}/${id}`);
        const produto = response.data;
        const idProduto = produto.id
        const salvaId = document.querySelector("#salvaId")
        descProdutoInput.value = produto.nome
        vlrVendaInput.value = produto.valorVenda
        refProdutoInput.value = produto.referencia
        unInput.value = produto.unidadeMedida
        fabProdutoUnput.value = produto.fabricante
        estoqueProdutoInput.value = produto.estoque
        imagemInput.value = produto.imagemProduto
        salvaId.value = idProduto
        descProdutoInput.focus()

    } catch (error) {
        alert('Algo inesperado aconteceu, tente novamente')
    }

}

buscaProduto(id)

function editProduct() {
    produto = {
        nome: descProdutoInput.value,
        valorVenda: parseFloat(vlrVendaInput.value),
        referencia: refProdutoInput.value,
        unidadeMedida: unInput.value,
        fabricante: fabProdutoUnput.value,
        estoque: parseInt(estoqueProdutoInput.value),
        imagemProduto: imagemInput.value,
    }
    console.log(id)
    axios.patch(`${url}/${id}`, produto)
        .then(response => {
            console.log(response.data)
            const mensagem = response.data.message
            console.log(mensagem)
            alert(`${mensagem} ${produto.nome}`)
            localStorage.removeItem('id');
            window.location.href="/index.html"
        })
        .catch(error => {
            console.log(error)
        })
}

function voltar(){
    window.location.href = "/index.html"
}

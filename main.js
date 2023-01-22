
//Axios
const url = "https://windelweb.windel.com.br:3000/teste-front"

//Dados do Input
const form = document.querySelector("#form")
const descProdutoInput = document.querySelector("#descProdutoInput")
const vlrVendaInput = (document.querySelector("#vlrVendaInput"))
const refProdutoInput = document.querySelector("#refProdutoInput")
const unInput = document.querySelector("#unInput")
const fabProdutoUnput = document.querySelector("#fabProdutoUnput")
const estoqueProdutoInput = document.querySelector("#estoqueProdutoInput")
const imagemInput = document.querySelector("#imagemInput")

//Criação hora
const criacaoProduto = new Date()


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
    createdAt:criacaoProduto,
    nome: descProduto,
    valorVenda:vlrVenda,
    referencia:refProduto,
    unidadeMedida: un,
    fabricante: fabProduto,
    estoque:1,
    imagemProduto:1
}


console.log(novoProduto)

function criarCelula(textoDaCelula){
    let td = document.createElement("td")
    td.innerHTML = textoDaCelula
    return td
}

//função lista de produtos
async function listaDeProdutos(){
    const tabelaProdutos = document.querySelector("#tabelaListaProdutos")
    axios.get(url)

    .then(response =>{
        const produtos = response.data
        

        //console.log(produtos) 
        for (const [key, produto] of Object.entries(produtos)) {
          console.log(produto.nome) 

          let celulaNome = criarCelula(produto.nome)
          let celulaReferencia = criarCelula(produto.referencia)
          let celulaValorDeVenda = criarCelula(produto.valorVenda)
          let celulaFabricante = criarCelula(produto.fabricante)
          let celulaEstoque = criarCelula(produto.estoque)
         
         

          let celulaImagemProduto = criarCelula(`<img src="${produto.imagemProduto}" class="imagem-produto">`)

          let linha = document.createElement("tr")
          linha.classList.add("container-produto") 



          linha.appendChild(celulaImagemProduto)
          linha.appendChild(celulaNome)
          linha.appendChild(celulaReferencia)
          linha.appendChild(celulaValorDeVenda)
          linha.appendChild(celulaFabricante)
          linha.appendChild(celulaEstoque)

          tabelaProdutos.appendChild(linha)
          
        }
        //renderResults.textContent = JSON.stringify(produtos)    
    })
    .catch(error => console.log(error))
}
listaDeProdutos()

/* form.addEventListener("submit", (event) => {
    event.preventDefault()

    if(descProduto.value === ""){
        alert("Favor insira seu a Descrição do Produto")
        return
    } if(vlrVenda.value === ""){
        alert("Digite o valor de venda")
        return
    }
    if(un.value === ''){
        alert('Digite a Unidade de Medida')
        return
    } */


/*function addNovoProduto() {
    axios.post(url, novoProduto)
    then.(response => {
        console.log(response.data)
    })
    .catch(error => console.log(error))
}
addNovoProduto()*/
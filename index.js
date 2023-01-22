const form = (document.querySelector("#form"))
const descProduto = document.querySelector("#descProdutoInput")
const vlrVenda = (document.querySelector("#vlrVendaInput"))
const refProduto = document.querySelector("#refProdutoInput")
const un = document.querySelector("#unInput")
const fabProduto = document.querySelector("#fabProdutoUnput")
const estoqueProduto = document.querySelector("#estoqueProdutoInput")
const imagem = document.querySelector("#imagemInput")

const criacaoProduto = new Date()

let produto = [{}]
let indice = 0

console.log(descProduto)
form.addEventListener("submit", (event) => {
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
    }

    indice++
    
    let descProdutoV = descProduto.value
    let vlrVendaV =  vlrVenda.value
    let refProdutoV = refProduto.value
    let unV = un.value
    let fabProdutoV = fabProduto.value
    let estoqueProdutoV = estoqueProduto.value
    let imagemV = imagem.value
    
    console.log(descProdutoV)
    let produto = [{indice,criacaoProduto, descProdutoV,vlrVendaV,refProdutoV,unV,fabProdutoV,estoqueProdutoV,imagemV}]
    console.log(produto)
    
})



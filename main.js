
//Axios
const url = "https://windelweb.windel.com.br:3000/teste-front"

function addNovoProduto() {

    //Dados do Input

    const form = document.querySelector("#form")
    const descProdutoInput = document.getElementById("descProdutoInput")
    const vlrVendaInput = (document.querySelector("#vlrVendaInput"))
    const refProdutoInput = document.querySelector("#refProdutoInput")
    const unInput = document.querySelector("#unInput")
    const fabProdutoUnput = document.querySelector("#fabProdutoUnput")
    const estoqueProdutoInput = document.querySelector("#estoqueProdutoInput")
    const imagemInput = document.querySelector("#imagemInput")

    //Criação hora
    //const criacaoProduto = new Date()


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
        valorVenda: Number(vlrVenda),
        referencia: refProduto,
        unidadeMedida: un,
        fabricante: fabProduto,
        estoque: Number(estoqueProduto),
        imagemProduto: imagem,
    }
    console.log(novoProduto)


    axios.post(url, novoProduto)
        .then(response => {
            console.log(response.data)
        })
        .catch(error => console.log(error))
    listaDeProdutos()

}


//criando td (celula/linha)
function criarCelula(textoDaCelula) {

    let td = document.createElement("td")
    td.innerHTML = textoDaCelula
    return td
}

//função lista de produtos
async function listaDeProdutos() {
    const tabelaProdutos = document.querySelector("#tabelaListaProdutos")
    axios.get(url)

        .then(response => {
            const produtos = response.data


            //console.log(produtos) 
            for (const [key, produto] of Object.entries(produtos)) {
                //console.log(produto.nome) 


                let celulaNome = criarCelula(produto.nome)
                let celulaReferencia = criarCelula(produto.referencia)
                let celulaValorDeVenda = criarCelula(produto.valorVenda)
                let celulaFabricante = criarCelula(produto.fabricante)
                let celulaEstoque = criarCelula(produto.estoque)

                //Icones (del)
                let celularIcons = criarCelula(`<i class="fa-solid fa-trash"></i>`)

                //Imagem na tabela
                let celulaImagemProduto = criarCelula(`<img src="${produto.imagemProduto}" class="imagem-produto">`)

                let linha = document.createElement("tr")
                linha.classList.add("container-produto")



                linha.appendChild(celulaImagemProduto)
                linha.appendChild(celulaNome)
                linha.appendChild(celulaReferencia)
                linha.appendChild(celulaValorDeVenda)
                linha.appendChild(celulaFabricante)
                linha.appendChild(celulaEstoque)
                linha.appendChild(celularIcons)

                tabelaProdutos.appendChild(linha)

            }
            //renderResults.textContent = JSON.stringify(produtos)    
        })
        .catch(error => console.log(error))
}
listaDeProdutos()
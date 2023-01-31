
//Axios
const url = "https://windelweb.windel.com.br:3000/teste-front"

//const de ordenação da lista
const ordemCrescente = true;

const pagina = 1  //Sem mais paginas (Paginação)

//Altera Titulo
function limpaH1() {
    const registroH = document.getElementById('registro').innerHTML = "Novo Registro"
}

criarOuEditar = () => { (document.getElementById('salvaId.value') === "") ? (addNovoProduto()) : (alteraProduto(salvaId.value)) }

//bloco de leitura dos Inputs
function criaProduto() {
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
        valorVenda: parseFloat(vlrVenda),
        referencia: refProduto,
        unidadeMedida: un,
        fabricante: fabProduto,
        estoque: parseInt(estoqueProduto),
        imagemProduto: imagem,
    }
    console.log(novoProduto)
    return novoProduto
}

//mandando para a api o produto novo
function addNovoProduto() {
    novoProduto = criaProduto()
    axios.post(url, novoProduto)
        .then(response => {
            console.log(response.data)
            window.location.reload(true)
        })
        .catch(error => console.log(error))

}

//criando td (celula/linha)
function criarCelula(textoDaCelula) {
    let td = document.createElement("td")
    td.innerHTML = textoDaCelula
    return td
}

//limpaProdutos

function limpaProdutos() {
    const tabelaProdutos = document.querySelectorAll("#tabelaListaProdutos > tr")
    if (tabelaProdutos && tabelaProdutos.length > 0) {
        tabelaProdutos.forEach(tr => tr.remove())
    }

}

//função lista de produtos

async function listaDeProdutos() {
    const tabelaProdutos = document.querySelector("#tabelaListaProdutos")
    limpaProdutos()
    axios.get(`${url}/pagination/${pagina}`)
        .then(response => {
            const produtos = response.data
            //console.log(produtos) 
            for (const [key, produto] of Object.entries(produtos)) {
                //console.log(produto.nome) 

                let celulaNome = criarCelula(produto.nome)
                let celulaReferencia = criarCelula(produto.referencia)
                let celulaValorDeVenda = criarCelula(produto.valorVenda)
                let celulaFabricante = criarCelula(produto.fabricante)
                let celulaEstoque = criarCelula(`${produto.estoque} ${produto.unidadeMedida}`)

                //Icones (del)
                let celulaIcons = criarCelula(`<button onclick="onDeleteClick(${produto.id})" class="imagem-acao"><i class="fa-solid fa-trash"></i></button> 
                <button onclick="editProduto(${produto.id})" class="imagem-acao"><i class="fa-solid fa-pen-to-square"></i></button>`)

                //Imagem na tabela
                let celulaImagemProduto = criarCelula(`<img src="${produto.imagemProduto}" class="imagem-produto">`)

                //Criando Linha
                let linha = document.createElement("tr")
                linha.classList.add("container-produto")



                linha.setAttribute("id", "produto-" + produto.id)

                //acrescentando no html
                linha.appendChild(celulaImagemProduto)
                linha.appendChild(celulaNome)
                linha.appendChild(celulaReferencia)
                linha.appendChild(celulaValorDeVenda)
                linha.appendChild(celulaFabricante)
                linha.appendChild(celulaEstoque)
                linha.appendChild(celulaIcons)

                tabelaProdutos.appendChild(linha)

            }
            //renderResults.textContent = JSON.stringify(produtos)    
        })
        .catch(error => console.log(error))

}
listaDeProdutos()


function ordernar(element, valorNumerico) {
    window.ordemCrescente = !window.ordemCrescente
    const asc = window.ordemCrescente;  // ordem: ascendente ou descendente
    const coluna = element.cellIndex
    // Coluna Ordenada
    const tabela = document.getElementById('tabelaListaProdutos');

    const linhas = Array.from(tabela.querySelectorAll('tbody tr'));
    console.log(linhas)
    linhas.sort((a, b) => {
        let a_val = a.children[coluna].textContent
        let b_val = b.children[coluna].textContent
        if (valorNumerico) {
            a_val = parseFloat(a_val)
            b_val = parseFloat(b_val)
            return (asc) ? (a_val - b_val) : (b_val - a_val)
        }
        return (asc) ? a_val.localeCompare(b_val) : b_val.localeCompare(a_val)
    })
    linhas.forEach(elem => {
        tabela.appendChild(elem)
    })
}

//Função delete
function onDeleteClick(produtoId) {
    if (confirm('Tem certeza que deseja deletar este Produto?')) {
        axios.delete(`${url}/${produtoId}`)
            .then(response => {
                console.log(response.data)
                listaDeProdutos()
            })
            .catch(error => console.log(error))
    }
}

function naoImplementado() {
    alert("Função não habilitada!")
}

function editProduto(produtoId) {
    const idProduto = produtoId
    const produtoLinha = document.getElementById("produto-" + produtoId)
    const descProdutoInput = document.querySelector("#descProdutoInput")
    const vlrVendaInput = document.querySelector("#vlrVendaInput")
    const refProdutoInput = document.querySelector("#refProdutoInput")
    const unInput = document.querySelector("#unInput")
    const fabProdutoUnput = document.querySelector("#fabProdutoUnput")
    const estoqueProdutoInput = document.querySelector("#estoqueProdutoInput")
    const imagemInput = document.querySelector("#imagemInput")
    const salvaId = document.querySelector("#salvaId")

    const estoqueUn = produtoLinha.children[5].textContent.split(' ')
    const arraySemEspacos = estoqueUn.filter(item => item.trim() !== "");

    descProdutoInput.value = produtoLinha.children[1].textContent
    vlrVendaInput.value = produtoLinha.children[3].textContent
    refProdutoInput.value = produtoLinha.children[2].textContent
    unInput.value = arraySemEspacos[1]
    fabProdutoUnput.value = produtoLinha.children[4].textContent
    estoqueProdutoInput.value = arraySemEspacos[0]
    imagemInput.value = produtoLinha.children[0].children[0].src
    salvaId.value = idProduto

    const registroH = document.getElementById('registro').innerHTML = "Editar Registro"
    descProdutoInput.focus()
    

}

function alteraProduto(salvaId) {
    const produto = criaProduto()
    console.log(salvaId)
    axios.patch(`${url}/${salvaId}`, produto)
        .then(response => {
            console.log(response)
            window.location.reload(true)
            // ou limpaH1()
            // listaDeProdutos()

        })
        .catch(error => {
            console.log(error)
        })
}

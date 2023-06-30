//Axios
const url = "https://homologacao.windel.com.br:3000/teste-front"

//const de ordenação da lista
const ordemCrescente = true;

//const renderização
let renderTimerId = null;

const paginaAtual = 1;

const itensPorPage = 5;


//criando td (celula/linha)
function criarCelula(textoDaCelula) {
    let td = document.createElement("td")
    td.innerHTML = textoDaCelula
    return td
};

//Formatando Valor de Venda
const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

//limpaProdutos

function limpaProdutos() {
    const tabelaProdutos = document.querySelectorAll("#tabelaListaProdutos > tr")
    if (tabelaProdutos && tabelaProdutos.length > 0) {
        tabelaProdutos.forEach(tr => tr.remove());
    }
}


const descInput = document.querySelector("#descInput");
const refInput = document.querySelector("#refInput");
const fabInput = document.querySelector("#fabInput");
descInput.addEventListener("input", handleInputChange);
refInput.addEventListener("input", handleInputChange);
fabInput.addEventListener("input", handleInputChange);


function handleInputChange() {
    listaDeProdutos();
}

//filtro
async function filter() {
    const descInput = document.querySelector("#descInput").value.toLowerCase();
    const refInput = document.querySelector("#refInput").value.toLowerCase();
    const fabInput = document.querySelector("#fabInput").value.toLowerCase();

    try {
        const response = await axios.get(`${url}`);
        const produtos = response.data;


        const filteredProdutos = produtos.filter((produto) => {
            if (descInput && !produto.nome.toLowerCase().includes(descInput.toLowerCase())) {
                return false;
            }
            if (refInput && !produto.referencia.toLowerCase().includes(refInput.toLowerCase())) {
                return false;
            }
            if (fabInput && !produto.fabricante.toLowerCase().includes(fabInput.toLowerCase())) {
                return false;
            }
            return true;
        });

        console.log(filteredProdutos);
        return filteredProdutos;

    } catch (error) {
        console.log(error);
    }
}

//função lista de produtos

async function listaDeProdutos() {
    const filteredProdutos = await filter();
    if (filteredProdutos && filteredProdutos.length > 0) {
        const produtos = filteredProdutos
        limpaProdutos()
        listaDeProdutosRender(produtos)
    } else {
        limpaProdutos()
        const tabelaProdutos = document.querySelector("#tabelaListaProdutos")
        let linha = document.createElement("tr")
        linha.classList.add("container-produto")
        linha.innerHTML = "Não foi encontrado produto com este Filtro"
        tabelaProdutos.appendChild(linha)

    }
}



function listaDeProdutosRender(produtos) {
    const tabelaProdutos = document.querySelector("#tabelaListaProdutos")

    //Itens por pagina
    const startPagina = (paginaAtual - 1) * itensPorPage;
    const endPagina = startPagina + itensPorPage;
    const totalPaginas = Math.ceil((produtos.length) / (itensPorPage));

    const displayProdutos = produtos.slice(startPagina, endPagina)
    console.log(displayProdutos)
    const containerPagina = document.getElementById('container-pagina');

    for (let i = 1; i <= totalPaginas; i++) {
        const pageLink = document.createElement("button");
        pageLink.classList.add("buttonNext")
        pageLink.textContent = i;
        containerPagina.appendChild(pageLink)
        pageLink.addEventListener('click', () => {
            console.log(i)
            paginaAtual = i; // Atualiza a página atual
            displayProducts(paginaAtual) ={ };
        });
        function displayProducts(page) {
            const startIndex = (page - 1) * itensPorPage;
            const endIndex = startIndex + itensPorPage;
            const displayedProducts = products.slice(startIndex, endIndex)
        }
        
    };



    for (const [key, produto] of Object.entries(displayProdutos)) {
        //console.log(produto.nome) 
        let valorFormatado = formatter.format(produto.valorVenda)
        let celulaNome = criarCelula(produto.nome)
        let celulaReferencia = criarCelula(produto.referencia)
        let celulaValorDeVenda = criarCelula(valorFormatado)
        let celulaFabricante = criarCelula(produto.fabricante)
        let celulaEstoque = criarCelula(`${produto.estoque} ${produto.unidadeMedida}`)

        //Icones (del)
        let celulaIcons = criarCelula(`<div><button onclick="onDeleteClick(${produto.id})" class="imagem-acao del"><i class="fa-solid fa-trash"></i></button></div> 
        <div><button class="imagem-acao edit" onclick="onEditClick(${produto.id})"><i class="fa-solid fa-pen-to-square"></i></button><div>`)

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
}
listaDeProdutos()

//Função edit
function onEditClick(id) {
    localStorage.setItem('id', id); // Armazena o ID no localStorage
    window.location.href = `/pages/editProduct/editProduct.html`;
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

//Função ordenar
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



function naoImplementado() {
    alert("Função não habilitada!")
}



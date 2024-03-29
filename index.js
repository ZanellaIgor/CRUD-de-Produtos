//Axios
const url = "https://homologacao.windel.com.br:3000/teste-front"

//const de ordenação da lista
const ordemCrescente = true;


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

//limparTabelaDeProdutos

function limparTabelaDeProdutos() {
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
    inicializar();
}

//filtro
async function filter() {
    const descInput = document.querySelector("#descInput").value.toLowerCase();
    const refInput = document.querySelector("#refInput").value.toLowerCase();
    const fabInput = document.querySelector("#fabInput").value.toLowerCase();

    try {
        const response = await axios.get(`${url}`);
        const produtos = response.data;
        console.log(response)

        const filteredProdutos = produtos.filter((produto) => {
            // if (descInput && !produto["nome"].toLowerCase().includes(descInput.toLowerCase())) {
            //     return false;
            // }
            // if (refInput && !produto.referencia.toLowerCase().includes(refInput.toLowerCase())) {
            //     return false;
            // }
            // if (fabInput && !produto.fabricante.toLowerCase().includes(fabInput.toLowerCase())) {
            //     return false;
            // }
            if(filtroPorPropriedade(produto,"nome",descInput)){
                return false
            }
            if(filtroPorPropriedade(produto,"referencia",refInput)){
                return false
            }
            if(filtroPorPropriedade(produto,"fabricante",fabInput)){
                return false
            }
            return true;
        });
        return filteredProdutos;

    } catch (error) {
        console.log(error);
    }
}

function filtroPorPropriedade(produto,nomePropriedade,propriedadeFiltrada){
    return propriedadeFiltrada && !produto[nomePropriedade].toLowerCase().includes(propriedadeFiltrada.toLowerCase())
}

//função lista de produtos
async function inicializar() {
    const filteredProdutos = await filter();
    if (filteredProdutos && filteredProdutos.length > 0) {
        const produtos = filteredProdutos
        limparTabelaDeProdutos()
        criarPaginacao(produtos)
        renderizarTabelaDeProdutos(produtos, paginaAtual)
        
    } else {
        limparTabelaDeProdutos()
        const tabelaProdutos = document.querySelector("#tabelaListaProdutos")
        let linha = document.createElement("tr")
        linha.classList.add("container-produto")
        linha.innerHTML = "Não foi encontrado produto com este Filtro"
        tabelaProdutos.appendChild(linha)

    }
}

function criarPaginacao(listaDeProdutos) {
    //Itens por pagina
    const totalPaginas = Math.ceil((listaDeProdutos.length) / (itensPorPage));
    const containerPagina = document.getElementById('container-pagina');
    containerPagina.innerHTML=''
    
    for (let i = 1; i <= totalPaginas; i++) {
        
        const pageLink = document.createElement("button");
        pageLink.classList.add("buttonNext")
        pageLink.textContent = i;
        containerPagina.appendChild(pageLink)
        pageLink.addEventListener('click', () => {
            limparTabelaDeProdutos()
            renderizarTabelaDeProdutos(listaDeProdutos, i)
        });
    };
}


function renderizarTabelaDeProdutos(produtos, numeroDaPaginaAtual) {
    const tabelaProdutos = document.querySelector("#tabelaListaProdutos")
    const startPagina = (numeroDaPaginaAtual - 1) * itensPorPage;
    const endPagina = startPagina + itensPorPage;
    const displayProdutos = produtos.slice(startPagina, endPagina)
    console.log(displayProdutos)

    for (const [key, produto] of Object.entries(displayProdutos)) {
        //console.log(produto.nome) 
        let valorFormatado = formatter.format(produto.valorVenda)
        let celulaNome = criarCelula(produto.nome)
        let celulaReferencia = criarCelula(produto.referencia)
        let celulaValorDeVenda = criarCelula(valorFormatado)
        let celulaFabricante = criarCelula(produto.fabricante)
        let celulaEstoque = criarCelula(`${produto.estoque} ${produto.unidadeMedida}`)

        //Icones (del)
        let celulaIcons = criarCelula(`<div><button onclick="removerProduto(${produto.id})" class="imagem-acao del"><i class="fa-solid fa-trash"></i></button></div> 
        <div><button class="imagem-acao edit" onclick="alterarProduto(${produto.id})"><i class="fa-solid fa-pen-to-square"></i></button><div>`)

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


//Função edit
function alterarProduto(id) {
    localStorage.setItem('id', id); // Armazena o ID no localStorage
    window.location.href = `/paginas/editarProduto/editarProduto.html`;
}

//Função delete
function removerProduto(produtoId) {
    if (confirm('Tem certeza que deseja deletar este Produto?')) {
        axios.delete(`${url}/${produtoId}`)
            .then(response => {
                console.log(response.data)
                inicializar()
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

function displayProducts(page, produtos) {
    const startIndex = (page - 1) * itensPorPage;
    const endIndex = startIndex + itensPorPage;
    console.log(produtos)
}

function naoImplementado() {
    alert("Função não habilitada!")
}

inicializar()

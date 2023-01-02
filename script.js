//Declarando variáveis;
const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sNome = document.querySelector('#m-nome')
const sFuncao = document.querySelector('#m-funcao')
const sSalario = document.querySelector('#m-salario')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) { // Quando for incluir um novo item, não passa nenhum parâmetro por isso está como 'false' e o 'index=0';
  modal.classList.add('active') // Ao abrir a modal, vai ser adicionado a classe 'active' para a modal ficar visível em tela;

// Cada clique fora da modal vai ser removida a class 'active' , assim ocultando a modal em tela;
  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

// Condição para quando for um item de edição;
  if (edit) { //Carrega para os itens no modal o nome, a função e o salário;
    sNome.value = itens[index].nome
    sFuncao.value = itens[index].funcao
    sSalario.value = itens[index].salario
    id = index //Atribui à variável 'id' o 'index';

  } else { // Caso não seja uma edição, o modal vai carregar com todos os valores em branco;
    sNome.value = ''
    sFuncao.value = ''
    sSalario.value = ''
  }
  
}

//Função de edição;
function editItem(index) { // Passa o index do item;
  openModal(true, index)   // Chama a outra função : 'openModal';
}

//Função de delete
function deleteItem(index) { // Passa o index do item;
  itens.splice(index, 1) // No array 'itens' vai ser feito um splice do index, removendo um item;
  setItensBD() // Após o processo, atualiza o banco de dados, com o array atualizado;
  loadItens() // Carregar novamente os dados em tela;
}

// Função que vai criar cada linha;
function insertItem(item, index) { //Passa as variáveis 'item' e 'index' no banco de dados;
  let tr = document.createElement('tr') //Cria um elemento 'tr';

// Através do innerHTML ele vai implementar no documento principal... criando os 'td'(nome,funcao,salario);
// Cria também as colunas de edição e exclusão da tabela; 
  tr.innerHTML = ` 
    <td>${item.nome}</td>
    <td>${item.funcao}</td>
    <td>R$ ${item.salario}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr) // Conforme cada itens for sendo carregado no 'insertItem', vai incluindo no tbody que vai ser apresentado em tela;
}

// Função para o botão salvar;
btnSalvar.onclick = e => {
  
  if (sNome.value == '' || sFuncao.value == '' || sSalario.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) { // Se o 'id' for diferente de undefined, ou seja, vier de uma edição... ele vai atualizar o array com os valores de tela;
    itens[id].nome = sNome.value
    itens[id].funcao = sFuncao.value
    itens[id].salario = sSalario.value
  } else { // Caso contrário, ele vai dar um 'push' incluindo o novo item no banco de dados;
    itens.push({'nome': sNome.value, 'funcao': sFuncao.value, 'salario': sSalario.value})
  }

  setItensBD() // Após isso ele vai atualizar o banco, mesmo sendo edição ou inclusão;

  modal.classList.remove('active') // Remove a class 'active', ocultando ela em tela;
  loadItens() // Carregar novamente os dados em tela;
  id = undefined //Por último seta o id como undefined;
}

//Função que vai ser executada assim que a tela for carregada;
function loadItens() { 
  itens = getItensBD() //Pega 'itens' do banco de dados;
  tbody.innerHTML = ''
  itens.forEach((item, index) => {  // Aplicando um *for* em cada dado,
    insertItem(item, index)         // para que seja criado cada linha;
  })

}

// Funções que pegam os items do banco de dados através do 'getItem';
const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [] //Caso nao tenha nada no database(dbfunc) ele retorba um array vazio;
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens)) //Função que vai setar a variável itens pra dentro do banco de dados; 

loadItens() // Carregar novamente os dados em tela;
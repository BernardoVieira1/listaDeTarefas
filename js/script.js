let input = document.querySelector('input[name=tarefa]');

let botao = document.querySelector('#botao');

let lista = document.querySelector('#lista');

let card = document.querySelector('.card');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
  lista.innerHTML = '';

  for(tarefa of tarefas){
    let itemLista = document.createElement('li');

    itemLista.setAttribute('class', 'list-group-item list-group-item-action')

    itemLista.onclick = function(){
      deletarTarefa(this);
    }

    let itemTexto = document.createTextNode(tarefa);

    itemLista.appendChild(itemTexto);
    lista.appendChild(itemLista);
  };
};

renderizarTarefas();

botao.onclick = function(){
  let texto = input.value;

  if(texto !== ""){
    tarefas.unshift(texto);
    
    renderizarTarefas();
   
    input.value = '';
   
    removerSpan();

    armazenarTarefaNoStorege();

  }else{
    removerSpan();   
    let span = document.createElement('span');
   
    span.setAttribute('class','alert alert-warning');
    
    let msg = document.createTextNode('Você precisa digitar algo!')
   
    span.appendChild(msg);
   
    card.appendChild(span);
  };
};

function removerSpan(){
  let spans = document.querySelectorAll('span');

  for(let i = 0; i < spans.length; i++){
    card.removeChild(spans[i]);
  }
}

function deletarTarefa(tar){
  tarefas.splice(tarefas.indexOf(tar.textContent), 1);
  renderizarTarefas();
  armazenarTarefaNoStorege();

}

function armazenarTarefaNoStorege(){
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}



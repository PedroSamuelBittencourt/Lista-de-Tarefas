var tarefas = [];
var tarefaAlterada = null;

function adicionar(){
    tarefaAlterada = null;
    mostrarModal()
    limparform()
}
function mostrarModal(){
    let containerModal = document.getElementById("container-modal");
    containerModal.style.display = "flex";
   
}

function ocultarModal(){
    limparform();
    let containerModal = document.getElementById("container-modal");
    containerModal.style.display = "none";
}

function limparform(){
    document.getElementById("titulo").value = "";
    document.getElementById("data").value = "";
    document.getElementById("texto").value = "";
}

function cancelar(){
    ocultarModal();
}

function salvar(){
    let data = document.getElementById("data").value;
    let texto = document.getElementById("texto").value;
    let titulo = document.getElementById("titulo").value;

    if(tarefaAlterada == null){
        let tarefa = { "titulo": titulo,
                       "texto": texto,
                       "data": data };
                       
        tarefas.push(tarefa);
        console.log(tarefas);
    } else {
        tarefaAlterada.texto = texto;
        tarefaAlterada.data = data;
        tarefaAlterada.titulo = titulo;
    }
    
    tarefaAlterada = null;
    console.log(data, texto, titulo);
    limparform();
    ocultarModal();
    exibirDados();
}
function alterarstyle(){
    let label = document.getElementsByClassName("label_form");
    label.style.color = "#223A40";
}
function alterar(indice) {
    
    if (indice >= 0 && indice < tarefas.length) {

        let tarefa = tarefas[indice];
        document.getElementById("texto").value = tarefa.texto;
        document.getElementById("data").value = tarefa.data;
        document.getElementById("titulo").value = tarefa.titulo;
        tarefaAlterada = tarefa;
       
        mostrarModal();
        alterarstyle()
    } else {
        console.error("Índice inválido.");
    }
}

function excluir(indice){
    if (confirm("Você deseja realmente excluir?")) {
        if (indice >= 0 && indice < tarefas.length) {
            tarefas.splice(indice, 1); 
            exibirDados();
            
        } else {
            console.error("Índice inválido.");
        }
    }
}

function concluir(indice){
    if (confirm("Você deseja realmente concluir essa tarefa?")){
        let tarefa = tarefas[indice];
        if (indice >= 0 && indice < tarefas.length) {
            tarefas.splice(indice, 1); 
            let celebre = document.getElementById("celebrar");
            celebre.style.display = "flex";
            exibirDados();
           
        } else {
            console.error("Índice inválido.");
        }
        tarefa.concluida = true; 
        exibirDados();
      
       
    }
}

function exibirDados(){
    let tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; 

    for(let i = 0; i < tarefas.length; i++){
        let linha = `
        <tr>
            <td>${tarefas[i].titulo}</td>
            <td>${tarefas[i].data}</td>
            <td>${tarefas[i].texto}</td>
            <td>
                <button onclick="concluir(${i})" id="concluir">Concluir</button>
                <button onclick="alterar(${i})" id="alterar">Alterar</button>
                <button onclick="excluir('${i}')" id="excluir">Excluir</button>
            </td>
        </tr>`;
        
        let tr = document.createElement("tr");
        tr.innerHTML = linha;

        tbody.appendChild(tr);
    }
}

function celebre(){
    let celebre = document.getElementById("celebrar");
    celebre.style.display = "none";
}

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
    let salvar = document.getElementById("Salvar");
    salvar.style.display = "inline-block";
    ocultarModal();
}

function salvar(){
    let data = document.getElementById("data").value;
    let texto = document.getElementById("texto").value;
    let titulo = document.getElementById("titulo").value;

   
    if(texto.trim() == "" || titulo.trim() == "" || data.trim() == ""){
        showAlert();
        return false
    }else{

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
        salvarNoLocalStorage();
    }
    
}

function alterar(indice) {
    
    if (indice >= 0 && indice < tarefas.length) {

        let tarefa = tarefas[indice];
        document.getElementById("texto").value = tarefa.texto;
        document.getElementById("data").value = tarefa.data;
        document.getElementById("titulo").value = tarefa.titulo;
        tarefaAlterada = tarefa;
        document.getElementById("texto").disabled = false
        document.getElementById("data").disabled = false
        document.getElementById("titulo").disabled = false

        mostrarModal();
        
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

function visualizar(indice) {
    
    if (indice >= 0 && indice < tarefas.length) {

        let tarefa = tarefas[indice];
        document.getElementById("texto").value = tarefa.texto;
        document.getElementById("data").value = tarefa.data;
        document.getElementById("titulo").value = tarefa.titulo;
        tarefaAlterada = tarefa;
        document.getElementById("texto").disabled = true
        document.getElementById("data").disabled = true
        document.getElementById("titulo").disabled = true
        let salvar = document.getElementById("Salvar");
        salvar.style.display = "none";
        mostrarModal();
      
    } else {
        console.error("Índice inválido.");
    }
}

function exibirDados(){
    let tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; 

    for(let i = 0; i < tarefas.length; i++){
        let linha = `
         <tr>
            <td class="td_mobile_aparece">${tarefas[i].titulo}</td>
            <td class="td_mobile">${tarefas[i].data}</td>
            <td class="td_mobile">${tarefas[i].texto}</td>
            <td class="td_mobile_aparece">
                <button title="Concluir"  onclick="concluir(${i})" id="concluir"><i class="fa-regular fa-floppy-disk"></i></button>
                <button title="Alterar"  onclick="alterar(${i})" id="alterar"><i class="fa-solid fa-pen"></i></button>
                <button title="Visualizar"  onclick="visualizar(${i})" id="visualizar"><i class="fa-regular fa-eye"></i></button>
                <button title="Excluir"  onclick="excluir('${i}')" id="excluir"><i class="fa-solid fa-trash"></i></button>
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

//confetes
document.getElementById("animate_confetti").addEventListener("click", () => {
    
    let params = {
        particleCount: 500, // Quantidade de confetes
        spread: 90, // O quanto eles se espalham
        startVelocity: 70, // Velocidade inicial
        origin: { x: 0, y: 0.5 }, // Posição inicial na tela
        angle: 45 // Ângulo em que os confetes serão lançados
    };

    // Joga confetes da esquerda pra direita
    confetti(params);

    // Joga confetes da direita para a esquerda
    params.origin.x = 1;
    params.angle = 135;
    confetti(params);

});

// Função para salvar tarefas no localStorage
function salvarNoLocalStorage() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Função para carregar tarefas do localStorage
function carregarDoLocalStorage() {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
        exibirDados();
    }
}

window.onload = function() {
    carregarDoLocalStorage();
};

function showAlert() {
    document.getElementById('customAlert').style.display = 'block';
}

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}
async function buscarMedicos() {
    try {
        const response = await fetch("http://localhost:8080/"); // Requisição para a API
        if (response.ok) {
            const medicos = await response.json(); // Converte a resposta em JSON
            exibirMedicos(medicos); // Passa os dados para a função de exibição
        } else {
            console.error("Erro na requisição:", response.status);
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

// Função para exibir médicos no HTML
function exibirMedicos(medicos) {
    const container = document.getElementById("infosmedico"); // Encontra o container

    // Verifica se há médicos e exibe ou esconde as divs
    if (medicos.length === 0) {
        // Não há médicos
        container.style.display = "none"; // Esconde o container de médicos
    } else {
        // Há médicos
        container.style.display = "block"; // Exibe o container de médicos
        
        // Limpa qualquer conteúdo anterior no container
        container.innerHTML = "";

        // Cria uma div para cada médico
        medicos.forEach((medico, index) => {  // Adicionei o parâmetro 'index' aqui
            const medicoDiv = document.createElement("div"); // Cria uma nova div para o médico
            medicoDiv.classList.add("medico"); // Adiciona uma classe para estilo (opcional)

            // Altera a cor de fundo alternadamente com base no índice
            if (index % 2 === 0) {
                medicoDiv.style.backgroundColor = "#769C80";  // Cor para índice par
            } else {
                medicoDiv.style.backgroundColor = "#47654F";  // Cor para índice ímpar
            }

            // Adiciona o conteúdo da div do médico
            medicoDiv.innerHTML = `
                <p class="id">${medico.id}</p>
                <p class="foto_medico">O</p> <!-- Eu imagino que "O" seja um marcador para foto -->
                <p class="nome_medico">${medico.nome}</p>
                <p class="telefone_medico">${medico.telefone}</p>
                <p class="especialidade_medico">${medico.especialidade}</p>
                <p class="crm_medico">${medico.crm}</p>  
                <div class="exluir_editar">
                    <button class="botao_lixo"><img class="lixo" src="src/icons/Delete.svg"></button>
                    <button class="botao_editar"><img class="editar" src="src/icons/Pencil.svg"></button>
                </div>
            `;
            
            // Adiciona a div criada ao container
            container.appendChild(medicoDiv);
        });
    }
}

// Elementos do pop-up
const popup = document.getElementById("pop-up");
const openPopup = document.querySelector(".botao_cadastro");
const closePopup = document.getElementById("closePopup");
const form = document.getElementById("cadastroForm");

// Abrir o pop-up ao clicar no botão "Cadastrar"
openPopup.addEventListener("click", () => {
    popup.style.display = "flex"; // Exibe o pop-up
});

// Fechar o pop-up ao clicar no botão de fechar
closePopup.addEventListener("click", () => {
    popup.style.display = "none"; // Esconde o pop-up
});

// Fechar o pop-up ao clicar fora do conteúdo
popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});

// Processar o formulário de cadastro
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Evita o recarregamento da página
    
    // Coletar os dados do formulário
    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const especialidade = document.getElementById("especialidade").value;
    const crm = document.getElementById("crm").value;

    // Exemplo: Exibir os dados no console (pode substituir por uma requisição a um servidor)
    console.log({ nome, telefone, especialidade, crm });

    // Fechar o pop-up após o envio
    popup.style.display = "none";

    // Limpar os campos do formulário
    form.reset();
});

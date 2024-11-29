// Função para buscar médicos da API
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
                <img class="foto_medico" src="${medico.url_foto}">
                <p class="nome_medico">${medico.nome}</p>
                <p class="telefone_medico">${medico.telefone}</p>
                <p class="especialidade_medico">${medico.especialidade}</p>
                <p class="crm_medico">${medico.crm}</p>  
                <div class="exluir_editar">
                    <button class="botao_lixo" data-id="${medico.id}"><img class="lixo" src="src/icons/Delete.svg"></button>
                    <button class="botao_editar"><img class="editar" src="src/icons/Pencil.svg"></button>
                </div>
            `;
            
            // Adiciona a div criada ao container
            container.appendChild(medicoDiv);
        });

        // Adiciona event listeners nos botões de excluir
        const botoesExcluir = document.querySelectorAll(".botao_lixo");
        botoesExcluir.forEach(botao => {
            botao.addEventListener("click", async (e) => {
                const medicoId = e.target.closest("button").getAttribute("data-id"); // Pega o id do médico
                await excluirMedico(medicoId); // Chama a função para excluir o médico
            });
        });
    }
}

// Função para excluir um médico da API
async function excluirMedico(id) {
    try {
        const response = await fetch(`http://localhost:8080/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            alert("Médico excluído com sucesso!");
            buscarMedicos();  // Atualiza a lista de médicos após a exclusão
        } else {
            console.error("Erro ao excluir médico:", response.status);
        }
    } catch (error) {
        console.error("Erro de conexão ao excluir médico:", error);
    }
}

// Chama a função para buscar os médicos
buscarMedicos();

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
    const tabela = document.getElementById("tabela-medicos"); // Tabela onde os dados serão inseridos

    // Limpa qualquer conteúdo anterior na tabela (exceto o cabeçalho)
    tabela.querySelector("tbody").innerHTML = "";

    // Adiciona uma linha para cada médico
    medicos.forEach((medico, index) => {
        const novaLinha = document.createElement("tr");

        // Estilo alternado para as linhas (opcional)
        if (index % 2 === 0) {
            novaLinha.style.backgroundColor = "#769C80"; // Cor para índice par
        } else {
            novaLinha.style.backgroundColor = "#47654F"; // Cor para índice ímpar
        }
        if(medico.url_foto != null && medico.url_foto.substr(0,5) == "https"){
            novaLinha.innerHTML = `
            <th scope="row"><p class="id">${medico.id}</p></th>
            <td><img class="foto_medico" src="${medico.url_foto}" alt="Foto do médico"></td>
            <td><p class="nome_medico">${medico.nome}</p></td>
            <td><p class="telefone_medico">${medico.telefone}</p></td>
            <td><p class="especialidade_medico">${medico.especialidade}</p></td>
            <td><p class="crm_medico">${medico.crm}</p></td>
            <td>
                <div class="exluir_editar">
                    <button class="botao_lixo" data-id="${medico.id}">
                        <img class="lixo" src="src/icons/Delete.svg" alt="Deletar">
                    </button>
                    <button class="botao_editar" data-id="${medico.id}">
                        <img class="editar" src="src/icons/Pencil.svg" alt="Editar">
                    </button>
                </div>
            </td>
        `;
        }else{
            novaLinha.innerHTML = `
            <th scope="row"><p class="id" id="id_do_medico">${medico.id}</p></th>
            <td><img class="usersemfoto" src="src/icons/usersemimg.webp" alt="Foto do médico"></td>
            <td><p class="nome_medico">${medico.nome}</p></td>
            <td><p class="telefone_medico">${medico.telefone}</p></td>
            <td><p class="especialidade_medico">${medico.especialidade}</p></td>
            <td><p class="crm_medico">${medico.crm}</p></td>
            <td>
                <div class="exluir_editar">
                    <button class="botao_lixo" data-id="${medico.id}">
                        <img class="lixo" src="src/icons/Delete.svg" alt="Deletar">
                    </button>
                    <button class="botao_editar" data-id="${medico.id}">
                        <img class="editar" src="src/icons/Pencil.svg" alt="Editar">
                    </button>
                </div>
            </td>
        `;

        }

        

        // Adiciona a nova linha à tabela
        tabela.querySelector("tbody").appendChild(novaLinha);
    });

  
}

// Função para excluir um médico da API
async function excluirMedico(id) {
    try {
        const response = await fetch(`http://localhost:8080/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            buscarMedicos(); 
        } else {
            console.error("Erro ao excluir médico:", response.status);
        }
    } catch (error) {
        console.error("Erro de conexão ao excluir médico:", error);
    }
}


buscarMedicos();








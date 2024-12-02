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
            <th scope="row"><p class="id">${medico.id}</p></th>
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

    // Adiciona event listeners nos botões de excluir
    const botoesExcluir = document.querySelectorAll(".botao_lixo");
    botoesExcluir.forEach(botao => {
        botao.addEventListener("click", async (e) => {
            const medicoId = e.target.closest("button").getAttribute("data-id"); // Pega o id do médico
            await excluirMedico(medicoId); // Chama a função para excluir o médico
        });
    });
}

// Função para excluir um médico da API
async function excluirMedico(id) {
    try {
        const response = await fetch(`http://localhost:8080/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            alert("Médico excluído com sucesso!");
            buscarMedicos(); // Atualiza a lista de médicos após a exclusão
        } else {
            console.error("Erro ao excluir médico:", response.status);
        }
    } catch (error) {
        console.error("Erro de conexão ao excluir médico:", error);
    }
}

// Chama a função para buscar os médicos ao carregar a página
buscarMedicos();


document.addEventListener("DOMContentLoaded", () => {
    const tabelaMedicos = document.querySelector("table"); 
    const formularioEdit = document.getElementById("formulario-edicao");
    const botao_fechar = document.getElementById("fechar-formulario-edicao");
    if (tabelaMedicos) {
        tabelaMedicos.addEventListener("click", (event) => {
            // Verifica se o botão de edição foi clicado
            if (event.target.closest(".botao_editar")) {
                const botao = event.target.closest(".botao_editar");
                formularioEdit.style.display = "flex";
                const idMedico = botao.closest("tr").querySelector(".id").innerText;
                console.log("Editar médico com ID:", idMedico);
                botao_fechar.addEventListener('click', function(){
                formularioEdit.style.display = 'none';
            })
            }
        });
    } else {
        console.error("Tabela de médicos não encontrada!");
    }
});



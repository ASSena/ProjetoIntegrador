const dropAreaEdit = document.getElementById('area-arquivo-edicao');
let upImgEdicao = "";

async function buscarmedicoId(id) {
    try {
        const response = await fetch(`https://projeto-integrador-psi.vercel.app/${id}`); // Requisição para a API
        if (response.ok) {
            const medico = await response.json(); // Converte a resposta em JSON
            return medico;
        } else {
            console.error("Erro na requisição:", response.status);
        }
    } catch (error) {
        console.error("Erro de conexão:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const tabelaMedicos = document.querySelector("table"); 
    const formularioEdit = document.getElementById("formulario-edicao");
    const botao_fechar = document.getElementById("fechar-formulario-edicao");

    if (tabelaMedicos) {
        tabelaMedicos.addEventListener("click", async (event) => {  // Função assíncrona
            // Verifica se o botão de edição foi clicado
            if (event.target.closest(".botao_editar")) {
                const botao = event.target.closest(".botao_editar");
                formularioEdit.style.display = "flex";
                const idmedico = botao.closest("tr").querySelector(".id").innerText;
                
                // Espera a resposta de buscarmedicoId antes de preencher os campos
                const medico = await buscarmedicoId(idmedico); 
                if (medico) { // Verifica se os dados foram encontrados
                    document.getElementById('input-nome-edicao').value = medico.nome;
                    document.getElementById('input-telefone-edicao').value = medico.telefone;
                    
                    // Preencher o campo select com o valor correto
                    const especialidadeSelect = document.getElementById('input-especialidade-edicao');
                    especialidadeSelect.value = medico.especialidade; // Isso seleciona a opção correta
                    
                    document.getElementById('input-crm-edicao').value = medico.crm;
                   
                }
                
                // Aqui você pode chamar a função para enviar os dados se necessário
                enviarDadosEditar(idmedico);
       

                botao_fechar.addEventListener('click', function() {
                    formularioEdit.style.display = 'none';
                });
            }
        });
    } else {
        console.error("Tabela de médicos não encontrada!");
    }
});







dropAreaEdit.addEventListener('drop', async (event) => {
    event.preventDefault();
    dropArea.classList.remove('highlight');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            upImgEdicao = await uploadToCloudinary(file);
            console.log(upImgEdicao);  // Log da URL da imagem após o upload
       
        }
    }
});


async function enviarDadosEditar(id) {
    document.getElementById('form-editar-medico').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Coleta os dados do formulário
        const nome = document.getElementById('input-nome-edicao').value;
        const telefone = document.getElementById('input-telefone-edicao').value;
        const especialidade = document.getElementById('input-especialidade-edicao').value.toUpperCase();;
        const crm = document.getElementById('input-crm-edicao').value;
  


        // Criação do objeto médico com a URL da imagem
        const medico_edicao = {
            nome,
            telefone,
            especialidade,
            crm,
            url_foto: upImgEdicao, // Adiciona a URL da imagem ao objeto
        };

        // Envia os dados para o servidor
        try {
            const response = await fetch(`https://projeto-integrador-psi.vercel.app/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(medico_edicao), // Envia os dados em JSON
            });

            if (response.ok) {
                location.reload();  // Recarrega a página após sucesso
            } else {
                console.log(medico_edicao)
                console.log("ESSE É O ID DO MÉDICO:" + id)
             
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
        }
    });

    }




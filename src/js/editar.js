const dropAreaEdit = document.getElementById('area-arquivo-edicao');
let upImgEdicao = "";

async function buscarmedicoId(id) {
    try {
        const response = await fetch(`https://managerdoctor-bne9e9awe2h3gzgy.brazilsouth-01.azurewebsites.net/${id}`); // Requisição para a API
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



dropAreaEdit.addEventListener('dragleave', () => {
    dropAreaEdit.classList.remove('highlight');
});

dropAreaEdit.addEventListener('drop', async (event) => {
    event.preventDefault();
    dropAreaEdit.classList.remove('highlight');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            uploadedImageUrl = await uploadCloudinaryEdit(file);
            console.log(uploadedImageUrl);  // Log da URL da imagem após o upload
        } 
    }
});
async function uploadCloudinaryEdit(file) {
    const cloudinaryUrl =  "https://api.cloudinary.com/v1_1/dqyptlmsm/image/upload";
    const uploadPreset = "fotosusers";
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
    try {
        const response = await fetch(cloudinaryUrl, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Erro ao enviar a imagem.");
        }
        const data = await response.json();
        console.log("Imagem enviada com sucesso:", data.secure_url);
        return data.secure_url; // Retorna a URL da imagem
    } catch (error) {
        console.error("Erro no upload:", error);
        return null;
    }
}

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
            url_foto: uploadedImageUrl,
            crm,
            especialidade,
            telefone,           
             
        };

        // Envia os dados para o servidor
        try {
            const response = await fetch(`https://managerdoctor-bne9e9awe2h3gzgy.brazilsouth-01.azurewebsites.net/editarmedico${id}`, {
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




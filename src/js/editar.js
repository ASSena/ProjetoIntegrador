const area_edicao = document.getElementById('area-arquivo-edicao');
const inputEdit  = document.getElementById('input-arquivo-edicao');
const botao_editar = document.querySelectorAll(".botao_editar");

// Para armazenar a URL da imagem
let urlUp = "";

// Arrastar e soltar funcionalidade
area_edicao.addEventListener('dragover', (event) => {
    event.preventDefault();
    area_edicao.classList.add('highlight');
});

area_edicao.addEventListener('dragleave', () => {
    area_edicao.classList.remove('highlight');
});

area_edicao.addEventListener('drop', async (event) => {
    event.preventDefault();
    area_edicao.classList.remove('highlight');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            urlUp = await uploadToCloudinary(file);
            console.log(urlUp);  // Log da URL da imagem após o upload
        } else {
            alert("Por favor, selecione uma imagem.");
        }
    }
});

// Função para fazer upload da imagem para o Cloudinary
async function uploadToCloudinary(file) {
    const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dqyptlmsm/image/upload";
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

// Editar médico
botao_editar.forEach(botao => {
    botao.addEventListener("click", (e) => {
        const medicoId = e.target.closest("button").getAttribute("data-id"); // Pega o id do médico
        abrirFormularioEdicao(medicoId);
    });
});

// Função para abrir o formulário de edição e preencher com os dados do médico
async function abrirFormularioEdicao(medicoId) {
    // Aqui você deve pegar os dados do médico pelo ID e preencher o formulário
    // Vamos usar uma requisição para isso:
    const response = await fetch(`http://localhost:8080/${medicoId}`);
    const medico = await response.json();
    console.log(medico)

    // Preenchendo os campos com os dados do médico
    document.getElementById('input-nome-edicao').value = medico.nome;
    document.getElementById('input-telefone-edicao').value = medico.telefone;
    document.getElementById('input-especialidade-edicao').value = medico.especialidade;
    document.getElementById('input-crm-edicao').value = medico.crm;

    // Se já tiver uma foto, você pode exibi-la aqui (opcional)
    // document.querySelector(".imagemMedicoFormularioEdicao").src = medico.url_foto || "src/icons/usersemimg.webp";

    // Atualizar a URL da imagem ao enviar o formulário
    document.getElementById('form-editar-medico').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Coleta os dados do formulário
        const nome = document.getElementById('input-nome-edicao').value;
        const telefone = document.getElementById('input-telefone-edicao').value;
        const especialidade = document.getElementById('input-especialidade-edicao').value;
        const crm = document.getElementById('input-crm-edicao').value;

        // Se houver uma nova imagem, usa a URL obtida do upload
        const medico = {
            nome,
            telefone,
            especialidade,
            crm,
            url_foto: uploadedImageUrl || medico.url_foto, // Se não tiver nova imagem, mantém a original
        };
        // Enviar a atualização para a API
        try {
            const updateResponse = await fetch(`http://localhost:8080/${medicoId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(medico),
            });

            if (updateResponse.ok) {
                alert("Médico editado com sucesso!");
                buscarMedicos(); // Recarrega os médicos após a edição
            } else {
                console.error("Erro ao editar médico:", updateResponse.status);
            }
        } catch (error) {
            console.error("Erro de conexão:", error);
        }
    });
}


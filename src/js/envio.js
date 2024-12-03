const dropArea = document.getElementById('drop-area');

// Para armazenar a URL da imagem
let uploadedImageUrl = "";

// Arrastar e soltar funcionalidade
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.classList.add('highlight');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('highlight');
});

dropArea.addEventListener('drop', async (event) => {
    event.preventDefault();
    dropArea.classList.remove('highlight');
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            uploadedImageUrl = await uploadToCloudinary(file);
            console.log(uploadedImageUrl);  // Log da URL da imagem após o upload
        } 
    }
});

// Função para fazer upload da imagem para o Cloudinary
async function uploadToCloudinary(file) {
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

// Enviar formulário com a URL da imagem
document.getElementById('cadastroForm').addEventListener('submit', async (event) => {
    event.preventDefault();



    // Coleta os dados do formulário
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const especialidade = document.getElementById('especialidade').value.toUpperCase();
    const crm = document.getElementById('crm').value;
    
    

    // Criação do objeto médico com a URL da imagem
    const medico = {
        nome,
        telefone,
        especialidade,
        crm,
        url_foto: uploadedImageUrl, // Adiciona a URL da imagem ao objeto
    };

    // Envia os dados para o servidor
    try {
        const response = await fetch("https://managerdoctor-bne9e9awe2h3gzgy.brazilsouth-01.azurewebsites.net/cadastrarmedicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(medico), // Envia os dados em JSON
        });
        

        if (response.ok) {
            location.reload();  // Recarrega a página após sucesso
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
    }
});

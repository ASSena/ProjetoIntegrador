const dropArea = document.getElementById('drop-area');
const fileElem = document.getElementById('fileElem');
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
            console.log(uploadedImageUrl);
        } else {
            alert("Por favor, selecione uma imagem.");
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
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const especialidade = document.getElementById('especialidade').value;
    const crm = document.getElementById('crm').value;
    console.log(nome);
    event
    if (!uploadedImageUrl) {
        alert("Por favor, envie uma imagem antes de cadastrar.");
        return;
    }
    const medico = {
        nome,
        telefone,
        especialidade,
        crm,
        url_foto: uploadedImageUrl, // Adiciona a URL da imagem ao objeto
    };
    try {
        const response = await fetch("http://localhost:8080/cadastrarmedicos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(medico), // Envia os dados em JSON
        });
        if (response.ok) {
            location.reload();
            alert("Médico cadastrado com sucesso!");
        } else {
            alert("Erro ao cadastrar médico.");
        }
    } catch (error) {
        console.error("Erro ao enviar os dados:", error);
    }
});
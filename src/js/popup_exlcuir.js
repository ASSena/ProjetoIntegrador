document.addEventListener("DOMContentLoaded", () => {
    const tabelaMedicos = document.querySelector("table"); 
    const popupExcluir = document.getElementsByClassName("pop-up-exlcuir")[0];
    const popupSucesso = document.getElementsByClassName("pop-up-excluir-sucesso")[0];
    const botao_cancelar = document.getElementsByClassName("cancelar")[0];
    const botao_confirmar = document.getElementsByClassName("confirmar")[0];
    const botao_ok = document.getElementsByClassName("ok")[0];

    if (tabelaMedicos) {
        tabelaMedicos.addEventListener("click", async (event) => {
            // Verifica se o botão de excluir foi clicado
            const botaoLixo = event.target.closest(".botao_lixo");
            if (botaoLixo) {
                console.log("O botão está sendo clicado")
                const medicoId = botaoLixo.getAttribute("data-id");
                
                // Exibe o popup de confirmação
                popupExcluir.style.display = "flex";
                
                // Função para cancelar a exclusão
                botao_cancelar.addEventListener("click", () => {
                    popupExcluir.style.display = 'none';
                });

                // Função para confirmar a exclusão
                botao_confirmar.addEventListener("click", async () => {
                    popupExcluir.style.display = 'none';
                    await excluirMedico(medicoId);
                    popupSucesso.style.display = 'flex';

                    // Fechar popup de sucesso
                    botao_ok.addEventListener('click', () => {
                        popupSucesso.style.display = 'none';
                    });
                });
            }
        });
    } else {
        console.error("Tabela de médicos não encontrada!");
    }
});

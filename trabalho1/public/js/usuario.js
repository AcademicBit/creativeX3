// Elementos DOM
const modalEditar = document.getElementById('modalEditar');
const modalConfirmarExclusao = document.getElementById('modalConfirmarExclusao');
const formEditar = document.getElementById('formEditar');

// Botões
const btnEdit = document.getElementById('btnEdit');
const btnDelete = document.getElementById('btnDelete');
const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao');

// Funções auxiliares
function showModal(modal) {
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function hideModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function hideAllModals() {
    [modalEditar, modalConfirmarExclusao].forEach(modal => {
        if (modal) hideModal(modal);
    });
}

// Função para formatar data
function formatarData(dataString) {
    if (!dataString) return 'Não disponível';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Obtém o ID do usuário da URL
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Carrega os dados do usuário
async function carregarUsuario() {
    try {
        const response = await fetch(`http://localhost:8800/api/usuarios/${userId}`);
        
        if (!response.ok) {
            throw new Error('Usuário não encontrado');
        }
        
        const usuario = await response.json();
        console.log('Dados do usuário recebidos:', usuario); // Log para debug

        // Função auxiliar para preencher campo com valor padrão
        const preencherCampo = (id, valor) => {
            const elemento = document.getElementById(id);
            if (elemento) {
                elemento.textContent = valor || 'Não informado';
            } else {
                console.error(`Elemento com ID '${id}' não encontrado`);
            }
        };

        // Preenche os campos usando a função auxiliar
        preencherCampo('userId', usuario.user.idusuarios);
        preencherCampo('userName', usuario.user.nome);
        preencherCampo('userCpf', usuario.user.cpf);
        preencherCampo('userPhone', usuario.user.telefone);

    } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao carregar dados do usuário');
        window.history.back();
    }
}

// Event Listeners
if (btnEdit) {
    btnEdit.addEventListener('click', () => {
        showModal(modalEditar);
    });
}

if (btnDelete) {
    btnDelete.addEventListener('click', () => {
        showModal(modalConfirmarExclusao);
    });
}

if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = parseInt(document.getElementById('editId').value, 10);
        
        if (!userId || isNaN(userId)) {
            console.error('ID do usuário inválido');
            return;
        }

        const formData = new FormData(formEditar);
        const dados = {};
        
        for (const [key, value] of formData.entries()) {
            if (value.trim() !== '') {
                const fieldName = key.replace('edit', '').toLowerCase();
                dados[fieldName] = value.trim();
            }
        }

        try {
            const response = await fetch(`http://localhost:8800/api/usuarios/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dados)
            });

            if (response.ok) {
                hideModal(modalEditar);
                formEditar.reset();
                carregarUsuario(); // Recarrega os dados do usuário
            } else {
                console.error('Erro ao atualizar usuário:', await response.text());
                alert('Erro ao atualizar usuário');
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
            alert('Erro ao atualizar usuário');
        }
    });
}

if (btnConfirmarExclusao) {
    btnConfirmarExclusao.addEventListener('click', async () => {
        try {
            const response = await fetch(`http://localhost:8800/api/usuarios/${userId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                window.location.href = '/actions.html'; // Redireciona para a página de ações
            } else {
                console.error('Erro ao excluir usuário:', await response.text());
                alert('Erro ao excluir usuário');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
            alert('Erro ao excluir usuário');
        }
    });
}

// Event Listeners para fechar modais
document.querySelectorAll('.modal-close, .modal-close-btn').forEach(button => {
    button.addEventListener('click', () => {
        hideAllModals();
    });
});

// Fechar modal ao clicar fora
document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideAllModals();
        }
    });
});

// Carrega os dados do usuário quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    if (userId) {
        carregarUsuario();
    } else {
        alert('ID do usuário não fornecido');
        window.history.back();
    }
}); 
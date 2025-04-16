// Elementos DOM
const modalCadastro = document.getElementById('modalCadastro');
const modalListaEditar = document.getElementById('modalListaEditar');
const modalEditar = document.getElementById('modalEditar');
const modalListaExcluir = document.getElementById('modalListaExcluir');
const modalConfirmarExclusao = document.getElementById('modalConfirmarExclusao');

// Botões de ação
const btnCadastrar = document.getElementById('btnCadastrar');
const btnEditar = document.getElementById('btnEditar');
const btnExcluir = document.getElementById('btnExcluir');

// Formulários
const formCadastro = document.getElementById('formCadastro');
const formEditar = document.getElementById('formEditar');

// Variável para armazenar o ID do usuário selecionado para exclusão
let usuarioParaExcluir = null;

// Funções auxiliares
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function hideAllModals() {
    [modalCadastro, modalListaEditar, modalEditar, modalListaExcluir, modalConfirmarExclusao].forEach(modal => {
        hideModal(modal);
    });
}

// Função para carregar a lista de usuários
async function carregarUsuarios(containerId) {
    try {
        const response = await fetch('/api/usuarios');
        const usuarios = await response.json();
        const container = document.getElementById(containerId);
        
        container.innerHTML = usuarios.map(usuario => `
            <div class="user-item" data-id="${usuario.idusuarios}">
                <div class="user-info">
                    <h3>${usuario.nome || ''}</h3>
                    <div class="user-details">
                        <p><strong>CPF:</strong> ${usuario.cpf || ''}</p>
                        <p><strong>Telefone:</strong> ${usuario.telefone || 'Não informado'}</p>
                    </div>
                </div>
            </div>
        `).join('');
        
        return usuarios;
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        return [];
    }
}

// Event Listeners para os botões principais
btnCadastrar.addEventListener('click', (e) => {
    e.preventDefault();
    showModal(modalCadastro);
});

btnEditar.addEventListener('click', async (e) => {
    e.preventDefault();
    await carregarUsuarios('listaUsuariosEditar');
    showModal(modalListaEditar);
});

btnExcluir.addEventListener('click', async (e) => {
    e.preventDefault();
    await carregarUsuarios('listaUsuariosExcluir');
    showModal(modalListaExcluir);
});

// Event Listener para o formulário de cadastro
formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formCadastro);
    const dados = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            hideModal(modalCadastro);
            formCadastro.reset();
            // Aqui você pode adicionar uma notificação de sucesso
        }
    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        // Aqui você pode adicionar uma notificação de erro
    }
});

// Event Listener para seleção de usuário para edição
document.getElementById('listaUsuariosEditar').addEventListener('click', async (e) => {
    const userItem = e.target.closest('.user-item');
    if (!userItem) return;

    // Pegando os dados que já estão visíveis na lista
    const nome = userItem.querySelector('h3').textContent;
    const cpf = userItem.querySelector('p:nth-child(1)').textContent.replace('CPF: ', '');
    const telefone = userItem.querySelector('p:nth-child(2)').textContent.replace('Telefone: ', '');

    // Preenchendo o formulário com os dados existentes
    document.getElementById('editId').value = userItem.dataset.id;
    document.getElementById('editNome').value = nome;
    document.getElementById('editCpf').value = cpf;
    document.getElementById('editTelefone').value = telefone === 'Não informado' ? '' : telefone;

    hideModal(modalListaEditar);
    showModal(modalEditar);
});

// Event Listener para o formulário de edição
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = document.getElementById('editId').value;
    const formData = new FormData(formEditar);
    
    // Criando objeto com os dados do formulário, removendo campos vazios
    const dados = {};
    for (const [key, value] of formData.entries()) {
        if (value.trim() !== '') {
            // Remove 'edit' do início do nome do campo
            const fieldName = key.replace('edit', '').toLowerCase();
            dados[fieldName] = value;
        }
    }

    try {
        const response = await fetch(`/api/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        if (response.ok) {
            hideModal(modalEditar);
            formEditar.reset();
            // Recarregar a lista de usuários após edição bem-sucedida
            await carregarUsuarios('listaUsuariosEditar');
            await carregarUsuarios('listaUsuariosExcluir');
        }
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
    }
});

// Event Listener para seleção de usuário para exclusão
document.getElementById('listaUsuariosExcluir').addEventListener('click', (e) => {
    const userItem = e.target.closest('.user-item');
    if (!userItem) return;

    usuarioParaExcluir = userItem.dataset.id;
    hideModal(modalListaExcluir);
    showModal(modalConfirmarExclusao);
});

// Event Listener para confirmação de exclusão
document.getElementById('btnConfirmarExclusao').addEventListener('click', async () => {
    if (!usuarioParaExcluir) return;

    try {
        const response = await fetch(`/api/usuarios/${usuarioParaExcluir}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            hideModal(modalConfirmarExclusao);
            usuarioParaExcluir = null;
            // Aqui você pode adicionar uma notificação de sucesso
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        // Aqui você pode adicionar uma notificação de erro
    }
});

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
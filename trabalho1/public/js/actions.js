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
    [modalCadastro, modalListaEditar, modalEditar, modalListaExcluir, modalConfirmarExclusao].forEach(modal => {
        if (modal) hideModal(modal);
    });
}

// Função para carregar a lista de usuários
async function carregarUsuarios(containerId) {
    try {
        const response = await fetch('/api/usuarios');
        const usuarios = await response.json();
        const container = document.getElementById(containerId);
        
        if (container) {
            container.innerHTML = usuarios.map(usuario => `
                <div class="user-item" data-id="${usuario.id}">
                    <div class="user-info">
                        <h3>${usuario.nome || ''}</h3>
                        <div class="user-details">
                            <p><strong>CPF:</strong> ${usuario.cpf || ''}</p>
                            <p><strong>Telefone:</strong> ${usuario.telefone || 'Não informado'}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        return usuarios;
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        return [];
    }
}

// Event Listeners para os botões principais
if (btnCadastrar) {
    btnCadastrar.addEventListener('click', (e) => {
        e.preventDefault();
        showModal(modalCadastro);
    });
}

if (btnEditar) {
    btnEditar.addEventListener('click', async (e) => {
        e.preventDefault();
        await carregarUsuarios('listaUsuariosEditar');
        showModal(modalListaEditar);
    });
}

if (btnExcluir) {
    btnExcluir.addEventListener('click', async (e) => {
        e.preventDefault();
        await carregarUsuarios('listaUsuariosExcluir');
        showModal(modalListaExcluir);
    });
}

// Event Listener para o formulário de cadastro
if (formCadastro) {
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
                await carregarUsuarios('listaUsuariosEditar');
                await carregarUsuarios('listaUsuariosExcluir');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
        }
    });
}

// Event Listener para seleção de usuário para edição
const listaUsuariosEditar = document.getElementById('listaUsuariosEditar');
if (listaUsuariosEditar) {
    listaUsuariosEditar.addEventListener('click', (e) => {
        const userItem = e.target.closest('.user-item');
        if (!userItem) return;

        const nome = userItem.querySelector('h3')?.textContent?.trim() || '';
        const cpfElement = userItem.querySelector('p strong')?.nextSibling;
        const cpf = cpfElement ? cpfElement.textContent.trim() : '';
        const telefoneElement = userItem.querySelectorAll('p')[1];
        const telefone = telefoneElement ? 
            (telefoneElement.textContent.includes('Não informado') ? '' : telefoneElement.textContent.split(':')[1]?.trim() || '') 
            : '';
        const userId = parseInt(userItem.dataset.id, 10);

        if (!userId || isNaN(userId)) {
            console.error('ID do usuário inválido');
            return;
        }

        // Preenchendo o formulário com os dados existentes
        document.getElementById('editId').value = userId;
        document.getElementById('editNome').value = nome;
        document.getElementById('editCpf').value = cpf;
        document.getElementById('editTelefone').value = telefone;

        hideModal(modalListaEditar);
        showModal(modalEditar);
    });
}

// Event Listener para o formulário de edição
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
                await carregarUsuarios('listaUsuariosEditar');
                await carregarUsuarios('listaUsuariosExcluir');
            } else {
                console.error('Erro ao atualizar usuário:', await response.text());
            }
        } catch (error) {
            console.error('Erro ao atualizar usuário:', error);
        }
    });
}

// Event Listener para seleção de usuário para exclusão
const listaUsuariosExcluir = document.getElementById('listaUsuariosExcluir');
if (listaUsuariosExcluir) {
    listaUsuariosExcluir.addEventListener('click', (e) => {
        const userItem = e.target.closest('.user-item');
        if (!userItem) return;

        usuarioParaExcluir = userItem.dataset.id;
        hideModal(modalListaExcluir);
        showModal(modalConfirmarExclusao);
    });
}

// Event Listener para confirmação de exclusão
const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao');
if (btnConfirmarExclusao) {
    btnConfirmarExclusao.addEventListener('click', async () => {
        if (!usuarioParaExcluir) return;

        try {
            const response = await fetch(`/api/usuarios/${usuarioParaExcluir}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                hideModal(modalConfirmarExclusao);
                usuarioParaExcluir = null;
                await carregarUsuarios('listaUsuariosEditar');
                await carregarUsuarios('listaUsuariosExcluir');
            }
        } catch (error) {
            console.error('Erro ao excluir usuário:', error);
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
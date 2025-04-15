function obterUsuarios() {
    const url = "http://localhost:8800/api/usuarios";
    const cards = document.getElementById('cards');

    fetch(url)
        .then(response => response.json())
        .then(usuarios => {
            cards.innerHTML = '';
            usuarios.forEach(usuario => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <div class="card-content">
                        <h3>ID: ${usuario.idusuarios}</h3>
                        <p>Nome: ${usuario.nome}</p>
                        <p>CPF: ${usuario.cpf}</p>
                    </div>
                `;
                cards.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao obter usuários:', error);
        });
}

function mostrarDetalhesUsuario(usuario) {
    const modal = document.getElementById('modal');
    const modalDetails = document.getElementById('modal-details');
    
    modalDetails.innerHTML = `
        <p><strong>ID:</strong> ${usuario.idusuarios}</p>
        <p><strong>Nome:</strong> ${usuario.nome}</p>
        <p><strong>Telefone:</strong> ${usuario.telefone}</p>
        <p><strong>CPF:</strong> ${usuario.cpf}</p>
    `;
    
    modal.style.display = "block";
}

function mostrarModalEditar(usuario) {
    const modal = document.getElementById('modalEdit');
    const form = document.getElementById('formEditUser');
    
    // Preenche o formulário com os dados atuais
    document.getElementById('editNome').value = usuario.nome;
    document.getElementById('editTelefone').value = usuario.telefone;
    document.getElementById('editCpf').value = usuario.cpf;
    form.dataset.userId = usuario.idusuarios;
    
    modal.style.display = "block";
}

function editarUsuario(event) {
    event.preventDefault();
    
    const userId = event.target.dataset.userId;
    const formData = {
        nome: document.getElementById('editNome').value,
        telefone: document.getElementById('editTelefone').value,
        cpf: document.getElementById('editCpf').value
    };

    fetch(`http://localhost:8800/api/usuarios/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.error || data.details || data.sqlMessage || 'Erro ao atualizar usuário');
            }
            return data;
        });
    })
    .then(data => {
        document.getElementById('modalEdit').style.display = "none";
        obterUsuarios(); // Atualiza a lista
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao atualizar usuário: ' + error.message);
    });
}

function criarUsuario(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    if (!nome || !cpf) {
        alert('Por favor, preencha o nome e o CPF!');
        return;
    }

    const formData = { 
        nome, 
        telefone: telefone || null,
        cpf 
    };

    fetch('http://localhost:8800/api/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.error || data.details || data.sqlMessage || 'Erro ao criar usuário');
            }
            return data;
        });
    })
    .then(data => {
        document.getElementById('modalCreate').style.display = "none";
        document.getElementById('formCreateUser').reset();
        obterUsuarios();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao criar usuário: ' + error.message);
    });
}

function deletarUsuario(userId) {
    fetch(`http://localhost:8800/api/usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                throw new Error(data.error || data.details || data.sqlMessage || 'Erro ao deletar usuário');
            }
            return data;
        });
    })
    .then(data => {
        obterUsuarios();
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao deletar usuário: ' + error.message);
    });
}

function confirmarDeletar(userId) {
    // Você pode colocar uma confirmação antes de deletar, se desejar
    deletarUsuario(userId);
}

// Registra os event listeners e executa as funções após o carregamento do DOM
document.addEventListener('DOMContentLoaded', () => {
    // Registrando listeners para fechar os modais, se os botões existirem
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            document.getElementById('modal').style.display = "none";
        });
    }
    
    const closeCreateBtn = document.querySelector('.close-create');
    if (closeCreateBtn) {
        closeCreateBtn.addEventListener('click', () => {
            document.getElementById('modalCreate').style.display = "none";
        });
    }
    
    const closeEditBtn = document.querySelector('.close-edit');
    if (closeEditBtn) {
        closeEditBtn.addEventListener('click', () => {
            document.getElementById('modalEdit').style.display = "none";
        });
    }

    // Removido o listener para 'btnAddUser' pois o botão não existe
    // Caso decida exibir o modalCreate automaticamente, pode chamar:
    // document.getElementById('modalCreate').style.display = "block";

    // Eventos dos formulários
    const formCreateUser = document.getElementById('formCreateUser');
    if (formCreateUser) {
        formCreateUser.addEventListener('submit', criarUsuario);
    }
    
    const formEditUser = document.getElementById('formEditUser');
    if (formEditUser) {
        formEditUser.addEventListener('submit', editarUsuario);
    }

    // Fecha os modais ao clicar fora deles
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('modal');
        const modalCreate = document.getElementById('modalCreate');
        const modalEdit = document.getElementById('modalEdit');
        
        if (event.target === modal) {
            modal.style.display = "none";
        }
        if (event.target === modalCreate) {
            modalCreate.style.display = "none";
        }
        if (event.target === modalEdit) {
            modalEdit.style.display = "none";
        }
    });

    // Executa imediatamente a função para buscar os usuários
    obterUsuarios();
});
function obterUsuarios() {
    const url = "http://localhost:8800/usuarios";
    const usuariosLista = document.getElementById('usuarios-lista');

    fetch(url)
        .then(response => response.json())
        .then(usuarios => {
            usuariosLista.innerHTML = '';
            usuarios.forEach(usuario => {
                const li = document.createElement('li');
                li.classList.add('usuario-item');
                li.innerHTML = `
                    <div class="usuario-content" onclick="mostrarDetalhesUsuario(${JSON.stringify(usuario).replace(/"/g, '&quot;')})">
                        <h3>ID: ${usuario.idusuarios}</h3>
                        <p>Nome: ${usuario.nome}</p>
                        <p>CPF: ${usuario.cpf}</p>
                    </div>
                    <div class="actions-container">
                        <button class="btn-edit" onclick="mostrarModalEditar(${JSON.stringify(usuario).replace(/"/g, '&quot;')})">
                            Editar
                        </button>
                        <button class="btn-delete" onclick="confirmarDeletar(${usuario.idusuarios})">
                            Deletar
                        </button>
                    </div>
                `;
                usuariosLista.appendChild(li);
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

    fetch(`http://localhost:8800/usuarios/${userId}`, {
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
    });
}

function criarUsuario(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    // Validação dos campos obrigatórios
    if (!nome || !cpf) {
        alert('Por favor, preencha o nome e o CPF!');
        return;
    }

    const formData = { 
        nome, 
        telefone: telefone || null,  // Se telefone estiver vazio, envia null
        cpf 
    };

    console.log('1. Enviando dados:', formData);

    fetch('http://localhost:8800/usuarios', {
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
        console.error('5. Erro completo:', error);
    });
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('modal').style.display = "none";
});

document.querySelector('.close-create').addEventListener('click', () => {
    document.getElementById('modalCreate').style.display = "none";
});

document.querySelector('.close-edit').addEventListener('click', () => {
    document.getElementById('modalEdit').style.display = "none";
});

document.getElementById('btnAddUser').addEventListener('click', () => {
    document.getElementById('modalCreate').style.display = "block";
});

document.getElementById('formCreateUser').addEventListener('submit', criarUsuario);
document.getElementById('formEditUser').addEventListener('submit', editarUsuario);

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

function confirmarDeletar(userId) {
    deletarUsuario(userId);
}

function deletarUsuario(userId) {
    fetch(`http://localhost:8800/usuarios/${userId}`, {
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
        obterUsuarios(); // Atualiza a lista
    })
    .catch(error => {
        console.error('Erro:', error);
    });
}

obterUsuarios();
function obterUsuarios() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const usuariosLista = document.getElementById('usuarios-lista');

    fetch(url)
        .then(response => response.json())  // Remove as chaves e retorna diretamente
        .then(usuarios => {
            // Para cada usuário, cria um elemento na lista
            usuarios.forEach(usuario => {
                const li = document.createElement('li');
                li.classList.add('usuario-item');
                li.innerHTML = `
                    <h3>${usuario.id}</h3>
                    <p>${usuario.name}</p>
                    <p>${usuario.email}</p>
                `;
                usuariosLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao obter usuários:', error);
        });
}

// Executa quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', obterUsuarios);

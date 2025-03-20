function obterUsuarios() {
    const url = "https://jsonplaceholder.typicode.com/users";
    const usuariosLista = document.getElementById('usuarios-lista');

    fetch(url)
        .then(response => response.json())
        .then(usuarios => {
            usuarios.forEach(usuario => {
                const li = document.createElement('li');
                li.classList.add('usuario-item');
                li.innerHTML = `
                    <h3>ID: ${usuario.id}</h3>
                    <p>Nome: ${usuario.name}</p>
                    <p>E-mail: ${usuario.email}</p>
                `;
                usuariosLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao obter usuários:', error);
        });
}
obterUsuarios();
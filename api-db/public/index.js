function obterUsuarios() {
    const url = "http://localhost:8800/usuarios";
    const usuariosLista = document.getElementById('usuarios-lista');

    fetch(url)
        .then(response => response.json())
        .then(usuarios => {
            usuarios.forEach(usuario => {
                const li = document.createElement('li');
                li.classList.add('usuario-item');
                li.innerHTML = `
                    <h3>ID: ${usuario.idusuarios}</h3>
                    <p>Nome: ${usuario.nome}</p>
                    <p>CPF: ${usuario.cpf}</p>
                `;
                usuariosLista.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Erro ao obter usuários:', error);
        });
}
obterUsuarios();
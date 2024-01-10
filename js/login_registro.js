// Pertenece al Inicio de Sesion


document.getElementById('enter').addEventListener('click', function () {
    const usuarioLogin = {
        correo: document.getElementById('correo').value,
        contrasena: document.getElementById('contrasena').value
    };

    fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuarioLogin)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('mensaje-estado').textContent = 'Inicio de sesión exitoso';
        } else {
            document.getElementById('mensaje-estado').textContent = data.message;
        }
    })
    .catch(error => {
        document.getElementById('mensaje-estado').textContent = 'Error en el inicio de sesión';
    });
});


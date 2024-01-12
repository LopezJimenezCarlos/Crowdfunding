document.addEventListener('DOMContentLoaded', function () {

    const login = document.querySelector('#formulario_login');

    login.onsubmit = function(event) {
        event.preventDefault();

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
        .then(response => {
            if (response.ok) {
                // Obtener el correo del usuario desde el formulario de login
                const correoUsuario = document.getElementById('correo').value;

                // Almacenar el correo del usuario en el sessionStorage
                sessionStorage.setItem('correoUsuario', correoUsuario);
                sessionStorage.setItem('usuarioLogeado', 'true');
                
                return response.text();
            } else {
                throw new Error('Error en el inicio de sesión');
            }
        })
        .then(data => {
            document.getElementById('mensaje-estado').textContent = data;
            // Redirigir a la página principal después de un inicio de sesión exitoso
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 2000);
        })
        .catch(error => {
            document.getElementById('mensaje-estado').textContent = error.message;
        })
        .finally(() => {
            // Ocultar la pantalla de carga después de completar el proceso
        });
    };
});

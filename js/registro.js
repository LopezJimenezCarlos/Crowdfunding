document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('#formulario_registro');
   
    formulario.onsubmit = function(event) {
        event.preventDefault();
        const contrasena2 = document.getElementById('contrasena2').value
        // Crear un objeto con los datos del formulario
        const usuario = {
            nombre: document.getElementById('nombre').value,
            apellidos: document.getElementById('apellidos').value,
            correo: document.getElementById('correo').value,
            contrasena: document.getElementById('contrasena1').value,
        };
        console.log('Contraseña:', usuario.contrasena);

        if (usuario.contrasena !== contrasena2) {
            console.log(usuario.contrasena);
            console.log(contrasena2);
            alert('Las contraseñas no coinciden');
            return;
        }
        // Enviar los datos al servidor
        fetch('http://localhost:4000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        })
        .then(correoUsuario = document.getElementById('correo').value)
        /*Lo guardamos en el sessionStorage para poder usarlo en la página de donaciones*/
        .then(sessionStorage.setItem('usuarioLogeado', 'true')) 
        .then(sessionStorage.setItem('correoUsuario', correoUsuario))
        .then(response => response.json())
        .then(data => alert('Usuario registrado con éxito'))
        .then(window.location.href = 'index.html')
        .catch(error => console.error('Error:', error));
    };
});
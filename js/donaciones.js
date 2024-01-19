document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('usuarioLogeado') !== 'true') {
        window.location.href = 'indexLogin.html';
    }

    document.getElementById('btnRealizarDonacion').addEventListener('click', function () {
        const cantidadDonada = document.getElementById('donation').value;
        const metodoPago = document.getElementById('metodo_pago').value;
        const comentario = document.getElementById('comentario').value;

        // Obtén el correo del usuario actual del sessionStorage
        const correoUsuario = sessionStorage.getItem('correoUsuario');

        // Envia la información al servidor para procesamiento
        enviarDonacionAlServidor(cantidadDonada, metodoPago, comentario, correoUsuario);
        console.log(cantidadDonada, metodoPago, comentario, correoUsuario);
    });
});

function enviarDonacionAlServidor(cantidad, metodoPago, comentario, correoUsuario) {
    fetch('http://localhost:4000/procesar_donacion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cantidad: cantidad,
            metodoPago: metodoPago,
            comentario: comentario,
            correoUsuario: correoUsuario,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al procesar la donación. Por favor, inténtalo de nuevo.');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);

        // Redirige a PayPal después de manejar la respuesta del servidor.
        const urlPayPal = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=carloslopji@gmail.com&item_name=Donation&currency_code=EUR&amount=${cantidad}&return=http://localhost:3000/success&cancel_return=http://localhost:4000/cancel`;
        window.location.href = urlPayPal;
    })
    .catch(error => {
        console.error('Error:', error.message);
        
    });
}
document.addEventListener('DOMContentLoaded', function () {
    const usuarioLogeado = sessionStorage.getItem('usuarioLogeado') === 'true';
    const loginItem = document.getElementById('loginItem');

    // Función para cerrar sesión

    // Cambiar dinámicamente el contenido del enlace de inicio de sesión
    function actualizarEstadoLogin() {
        if (usuarioLogeado) {
            loginItem.innerHTML = '<a href="#" class="nav__link" onclick="cerrarSesion()">Cerrar Sesión</a>';
        } else {
            loginItem.innerHTML = '<a href="indexLogin.html" class="nav__link">Iniciar Sesión</a>';
        }
    }
   
    actualizarEstadoLogin();

   
});
function cerrarSesion() {
    sessionStorage.removeItem('usuarioLogeado');
    // Redirigir a la página de inicio 
    window.location.href = 'indexLogin.html';
}
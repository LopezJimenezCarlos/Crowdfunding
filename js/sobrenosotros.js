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
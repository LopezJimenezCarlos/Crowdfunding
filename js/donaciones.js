document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.getItem('usuarioLogeado') !== 'true') {
        window.location.href = 'indexLogin.html'; // Redirigir a la página de inicio de sesión
    }
});

function scrollFunction() {
    var barraSuperior = document.getElementById("barraSuperior");
    var logo = document.getElementById("logo");
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        barraSuperior.style.height = "70px"; // Altura más pequeña al hacer scroll
        barraSuperior.style.transition = "height 0.5s"; // Transición de 0.5 segundos
        logo.style.width = "60px"; // Tamaño más pequeño al hacer scroll        
        logo.style.height = "50px"; // Tamaño más pequeño al hacer scroll
        logo.style.transition = " 0.6s"; // Transición de 0.5 segundos
        logo.style.position = "relative"; // Transición de 0.5 segundos
        barraSuperior.style.boxShadow=" 0px 5px 3px rgba(0, 0, 0, 0.2)";
    } else {
        barraSuperior.style.height = "100px"; // Altura normal en la parte superior
        logo.style.width = "100px"; // Tamaño más pequeño al hacer scroll        
        logo.style.height = "95px"; // Tamaño más pequeño al hacer scroll
        barraSuperior.style.boxShadow= " 0px 10px 3px rgba(0, 0, 0, 0.2)";
    }   
}
window.onscroll = function() {

    scrollFunction();
};
// Supongamos que 'filas' es la respuesta del servidor
/*var filas = respuestaDelServidor;

var nombre = document.getElementById("Usuario");
nombre.innerText = filas[0].nombre;*/

function toggleBusqueda() {
    const campoBusqueda = document.getElementById('campoBusqueda');
    const linkBuscar = document.getElementById('linkBuscar');

    campoBusqueda.classList.toggle('mostrar');
    campoBusqueda.style.display = campoBusqueda.classList.contains('mostrar') ? 'block' : 'none';
    campoBusqueda.focus();
    linkBuscar.style.display = campoBusqueda.classList.contains('mostrar') ? 'none' : 'inline';
}

window.onload = function() {
    const intervalo = 2000; // Intervalo en milisegundos (1 segundo)
    const imagenes = document.getElementsByClassName('imagen');
    let index = 0;

    function desplazarImagenes() {
        // Reiniciar opacidad de todas las imágenes
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].style.opacity = 0;
            imagenes[i].style.zIndex = 0;
        }

        // Aparecer la siguiente imagen
        imagenes[index].style.opacity = 1;
        imagenes[index].style.zIndex = 1;

        // Actualizar el índice para la siguiente imagen
        index = (index + 1) % imagenes.length;
    }

    setInterval(desplazarImagenes, intervalo);
};
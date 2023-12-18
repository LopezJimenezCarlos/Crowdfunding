function scrollFunction() {
    var barraSuperior = document.getElementById("barraSuperior");
    var logo = document.getElementById("logo");
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        barraSuperior.style.height = "70px"; // Altura más pequeña al hacer scroll
        barraSuperior.style.transition = "height 0.5s"; // Transición de 0.5 segundos
        logo.style.width = "60px"; // Tamaño más pequeño al hacer scroll        
        logo.style.height = "50px"; // Tamaño más pequeño al hacer scroll
        logo.style.transition = "0.6s"; // Transición de 0.5 segundos
        
    } else {
        barraSuperior.style.height = "100px"; // Altura normal en la parte superior
        logo.style.width = "100px"; // Tamaño más pequeño al hacer scroll        
        logo.style.height = "95px"; // Tamaño más pequeño al hacer scroll
    }   
}
window.onscroll = function() {
    scrollFunction();
};
// Supongamos que 'filas' es la respuesta del servidor
var filas = respuestaDelServidor;

var nombre = document.getElementById("Usuario");
nombre.innerText = filas[0].nombre;




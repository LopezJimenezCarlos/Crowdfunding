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

function toggleBusqueda() {
    const campoBusqueda = document.getElementById('campoBusqueda');
    const linkBuscar = document.getElementById('linkBuscar');
    const botonAceptarBusqueda = document.getElementById('botonAceptarBusqueda');

    campoBusqueda.classList.toggle('mostrar');
    campoBusqueda.style.display = campoBusqueda.classList.contains('mostrar') ? 'block' : 'none';
    campoBusqueda.focus();
    
    if (campoBusqueda.classList.contains('mostrar')) {
        linkBuscar.style.display = 'none';
        botonAceptarBusqueda.style.display = 'inline';
    } else {
        linkBuscar.style.display = 'inline';
        botonAceptarBusqueda.style.display = 'none';
    }
}

window.onload = function() {
    const intervalo = 3000;
    const imagenes = document.getElementsByClassName('imagen_contenedor');
    let index = 0;

    function desplazarImagenes() {
        for (let i = 0; i < imagenes.length; i++) {
            imagenes[i].style.opacity = 0;
            imagenes[i].style.zIndex = 0;
        }

        imagenes[index].style.opacity = 1;
        imagenes[index].style.zIndex = 1;

        index = (index + 1) % imagenes.length;
    }

    setInterval(desplazarImagenes, intervalo);
};

function searchInSite(query) {
    const resultsContainer = document.getElementById('resultadosBusqueda');
    const container = document.getElementById('resultadosContainer');

    // Limpiar resultados anteriores
    resultsContainer.innerHTML = '';

    // Realizar búsqueda en todos los elementos de texto
    const elements = document.querySelectorAll('p, h1, h2, h3, a');
    const matchingElements = [];

    elements.forEach(element => {
        if (element.textContent.toLowerCase().includes(query.toLowerCase())) {
            matchingElements.push(element);
            element.id = 'resultado_' + matchingElements.length;
        }
    });

    matchingElements.forEach(match => {
        console.log(match.textContent);
        const resultItem = document.createElement('li');
        resultItem.textContent = match.textContent;
        resultItem.setAttribute('onclick', `scrollToElement('${match.id}')`);
        resultsContainer.appendChild(resultItem);
    });

    if (matchingElements.length > 0) {
        // Mostrar resultados si hay coincidencias
        container.classList.remove('ocultar');
    } else {
        // Ocultar resultados si no hay coincidencias
        container.classList.add('ocultar');
    }
}

// Función para desplazarse al elemento específico al hacer clic en un resultado
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Función para realizar la búsqueda en tiempo real
function realizarBusquedaEnTiempoReal() {
    const query = document.getElementById('campoBusqueda').value.trim();
    if (query !== '') {
        // Llama a la función de búsqueda personalizada
        searchInSite(query);
    }
}

// Agrega un evento de escucha al campo de búsqueda para activar la búsqueda en tiempo real
document.getElementById('campoBusqueda').addEventListener('input', realizarBusquedaEnTiempoReal);

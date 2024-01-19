const total =document.getElementById("total")
function scrollFunction() {
    var barraSuperior = document.getElementById("barraSuperior");
    var logo = document.getElementById("logo");
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
        barraSuperior.style.height = "70px"; // Altura más pequeña al hacer scroll
        barraSuperior.style.transition = "height 0.5s"; // Transición de 0.5 segundos
        logo.style.width = "60px"; // Tamaño más pequeño al hacer scroll        
        logo.style.height = "50px"; // Tamaño más pequeño al hacer scroll
        logo.style.transition = " 0.6s"; // Transición de 0.5 segundos
        logo.style.position = "relative"; // TransicióWn de 0.5 segundos
        barraSuperior.style.boxShadow=" 0px 5px 3px rgba(0, 0, 0, 0.2)";
    } else {
        barraSuperior.style.height = "100px"; // Altura normal en la parte superior
        logo.style.width = "100px"; // Tamaño más pequeño al hacer scroll        
        logo.style.height = "95px"; // Tamaño más pequeño al hacer scroll
        logo.style.transition = " 0.6s";
        logo.style.position = "relative"
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
    const resultsContainer = document.getElementById('resultadosBusqueda');
    
    campoBusqueda.classList.toggle('mostrar');
    campoBusqueda.style.display = campoBusqueda.classList.contains('mostrar') ? 'block' : 'none';
    campoBusqueda.focus();
    
    if (campoBusqueda.classList.contains('mostrar')) {
        linkBuscar.style.display = 'none';
        botonAceptarBusqueda.style.display = 'inline';
        resultsContainer.style.display = 'inline';
        
    } else {
        linkBuscar.style.display = 'inline';
        botonAceptarBusqueda.style.display = 'none';
        resultsContainer.style.display = 'none';
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

        resultsContainer.addEventListener('click', function() {
            container.classList.add('ocultar');
        });
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
        searchInSite(query);
    }
}

document.getElementById('campoBusqueda').addEventListener('input', realizarBusquedaEnTiempoReal);


document.addEventListener('DOMContentLoaded', function() {
const contenedorPrincipal = document.querySelector('.contenedor_donadores');
    fetch('http://localhost:4000/donaciones', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        const totalElement = document.getElementById('total');

        if (totalElement) {
            totalElement.innerHTML = "Cantidad total donada: " + data.suma_total + " €";
        } else {
            console.error("Elemento con id 'total' no encontrado.");
        }
    })
    .catch(error => console.error('Error:', error));
    fetch('http://localhost:4000/donadores', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length && i <= data.length; i++) {
            const donador = document.createElement("div");
            donador.classList.add("donador");  
            const texto = document.createElement("p");
            texto.innerText = data[i].Nombre + ": " + data[i].Donacion+ " €";
            donador.appendChild(texto);  // Corregido el orden de los elementos
            contenedorPrincipal.appendChild(donador);
        }
    })
    .catch(error => console.error('Error:', error));
});

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
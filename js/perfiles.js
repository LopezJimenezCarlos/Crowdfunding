
document.addEventListener("DOMContentLoaded", function() {
    // Datos de los perfiles
    const perfiles = [
        { nombre: "Carlos López", imagen: "carlos.jpg", instagram: "https://www.instagram.com/lopezzzcarlos/", twitter: "https://twitter.com/carlitossmdz", linkedin: "https://www.linkedin.com/in/carlos-l%C3%B3pez-jim%C3%A9nez-a5165b265/" },
        { nombre: "David Rodríguez", imagen: "david.jpg", instagram: "https://www.instagram.com/david_rd25/", twitter: "https://twitter.com/DavidRd25", linkedin: "#" }
    ];

    // Obtén el contenedor de perfiles
    const contenedorPerfiles = document.getElementById("contenedorPerfiles");

    // Itera sobre los perfiles y crea elementos HTML dinámicamente
    perfiles.forEach(perfil => {
        const perfilHTML = `
            <div class="imagen_nombre">
                <img class="perfilnuestro" src="${perfil.imagen}" alt="Foto de ${perfil.nombre}" width="150">
                <p>${perfil.nombre}</p>
                <div class="redes">
                    <a href="${perfil.instagram}"><img src="instagram.png" class="logo_redes"></a>
                    <a href="${perfil.twitter}"><img src="gorjeo.png" class="logo_redes"></a>
                    <a href="${perfil.linkedin}"><img src="linkedin.png" class="logo_redes"></a>
                </div>
            </div>
        `;
        // Agrega el perfil al contenedor
        contenedorPerfiles.innerHTML += perfilHTML;
    });
});


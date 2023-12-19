// Pertenece al Inicio de Sesion

let signUp = document.getElementById("signUp");
let signIn = document.getElementById("signIn");
let nameInput = document.getElementById("nameInput");
let title = document.getElementById("title");

signIn.onclick = function () {
    nameInput.style.maxHeight = "0";
    title.innerHTML = "Login";
    signUp.classList.add("disanble");
    signIn.classList.remove("disanble");
}

signUp.onclick = function () {
    nameInput.style.maxHeight = "100px";
    title.innerHTML = "Registro";
    signUp.classList.remove("disanble");
    signIn.classList.add("disanble");
    
}
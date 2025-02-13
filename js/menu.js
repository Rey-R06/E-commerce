const menuIcon = document.getElementById("menu");
const ul = document.querySelector("ul");
const contenedorMenu = document.getElementById("contenedorMenu");

menuIcon.addEventListener("click", mostrarMenu)

function mostrarMenu() {
            // Verificar si ya existe el div antes de crearlo
            if (!document.querySelector(".menuResponsive")) {
                
                let div = document.createElement("div");
                div.classList.add("menuResponsive");
                div.innerHTML = `
                    <img class="logoCelular" src="/multimedia/logos/REY-06 .png">
                    <button class="ocultarMenu" id="ocultarMenu" translate="no">X</button>
                `;

                contenedorMenu.prepend(div);

                ul.style.visibility = "visible";
                ul.style.display = "block";

                // Seleccionar el botón después de que ha sido creado
                let ocultarMenu = document.getElementById("ocultarMenu");
                ocultarMenu.addEventListener("click", ()=>{
                    contenedorMenu.style.display = "none";
                    contenedorMenu.style.visibility = "hidden";
                });
        }else{
            contenedorMenu.style.display = "block";
            contenedorMenu.style.visibility = "visible";
        }
}

window.addEventListener("resize", function() {
    if (window.innerWidth > 550) {
        contenedorMenu.style.display = "block";
        contenedorMenu.style.visibility = "visible";
    }
});
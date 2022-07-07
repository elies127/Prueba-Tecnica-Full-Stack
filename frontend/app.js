
async function App() {
    const respuesta = await fetch('https://dog.ceo/api/breeds/list/all');
    const data = await respuesta.json();
    mostrarListaRazas(data);

}
async function mostrarListaRazas(data) {
    const razaObject = data.message;
    const razas = Object.keys(razaObject); // Con Object.keys transformamos a Arrays con el valor de la propiedad names
    
    console.log("Raza " + 0 + ":" + razas[0]); // Debug
    for (let i = razas.length; i > 0; i--) {

        console.log("Raza " + i + ":" + razas[i]); // Debug
        const divRazas = document.createElement("div"); // creamos nuestro div, y más adelante le añadimos la clase de la raza
        const headerConElNombre = document.createElement("h3"); // Creamos nuestro h3 con el nombre de la raza
        headerConElNombre.innerText = razas[i]; // Introducimos el nombre de la raza dentro del h3 antes de introducirlo como hijo en divRazas
        const divImagenes = document.createElement("div");

        divRazas.appendChild(headerConElNombre);
        divRazas.appendChild(divImagenes);
        divRazas.className = razas[i];
        var divGeneral = document.getElementsByClassName("General");
        divGeneral[0].insertAdjacentElement("afterbegin", divRazas)

        for (let j = 0; j < 3; j++) {
            
            const dataImg = await fetch('https://dog.ceo/api/breed/' + razas[i] + "/images/random");
            const data = await dataImg.json();
            divImagenes.insertAdjacentHTML("afterbegin", `<img src="${
                data.message
            }" width="100" height="100" class="img-click">`)
        }
        divRazas.insertAdjacentHTML("afterbegin", `</div>`);
    }
    finalizarCarga();
   
};

function finalizarCarga(){ //Tareas que se ejecutan una vez haya finalizado la carga de fotos de perritos
    const imagenes = document.getElementsByClassName("img-click");
    console.log(imagenes);
    Array.from(imagenes).forEach(function (imagen) {
        imagen.addEventListener('click', function handleClick() {
            const src = imagen.getAttribute("src");
            const aux = document.getElementsByClassName("segunda_columna");
            const divSegunda_col = aux[0];
            divSegunda_col.innerHTML = `<img src="${src}" class="imagen-grande"></img>`;
        }, false);
    });
}
function buscar(){
    var input = document.getElementById("barraBusqueda");
    console.log("iniciando búsqueda -> " + input.value);
    filtrarRazas(input.value);
    


}
function filtrarRazas(raza){ //Tareas que se ejecutan una vez haya finalizado la carga de fotos de perritos
    const aux = document.getElementsByClassName("General");
    const todasLasRazasDiv = aux[0].children;
    console.log(todasLasRazasDiv);
     Array.from(todasLasRazasDiv).forEach(function (razaDiv) {
        if(razaDiv.className.includes(raza)){
            console.log("Encontrada raza en el include ->" + razaDiv.className);
            razaDiv.style.display = 'block';
        } else {
            razaDiv.style.display = 'none';
        }
    });
 
}

async function ordenarAlfabeticamente() {
    const aux = document.getElementsByClassName("General");
    const todasLasRazasDiv = aux[0].children;
    console.log(todasLasRazasDiv);
    Array.from(todasLasRazasDiv).sort(function(a, b){
        var divA = a.className.toLowerCase(), divB = b.className.toLowerCase();
        if (divA < divB) //Ordenando ascendentemente
         return -1;
        if (divA > divB)
         return 1;
        return 0; 
       });
    console.log("----------")
    console.log(todasLasRazasDiv);
      // todasLasRazasDiv.replaceChild(todasLasRazasDiv, aux[0]);
       
}
App();

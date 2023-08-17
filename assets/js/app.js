//obtener los elementos raiz 
const contenedorPrincipal = document.querySelector(".contenedor-principal");
const valorBuscado = document.querySelector("#valorBuscado");
let marvelData;
let filteredData;


//limpia el contenedor en donde estan las peliculas a mostrar
const clearAll = ()=>{
    contenedorPrincipal.innerHTML= "";
}

const llamadaApi = ()=>{
    fetch("https://gateway.marvel.com/v1/public/characters?limit=100&ts=1000&apikey=82d4f96a5322de83d14cbf1680a696a8&hash=ed3d739c4ca06834c2f9ffb1a274b79a")
        .then(response => response.json())
        .then(data => {
            marvelData = data;
            filteredData = marvelData.data.results
            console.log(filteredData)
            getMovieData(); //renderiza todo marvel
        })
}


//dibuja en la pantalla la informacion del array de peliculas
let nombre;
let descripcion;
let image;
let comics;
let position;
const getMovieData= ()=>{
    for(i=0;i < filteredData.length; i++){
        nombre = filteredData[i].name;
        descripcion = filteredData[i].modified;
        image = `${filteredData[i].thumbnail.path}.${filteredData[i].thumbnail.extension}` ;
        if(!image.includes("image_not_available")){ //renderiza solo personajes que la imagen este disponible
            renderMovies()
        } 
    }   
}

//renderiza peliculas filtradas
const getMovieFiltered = () =>{
    for(j=0; j <contactsFiltered.length; j++){
        nombre = contactsFiltered[j].name;
        descripcion = contactsFiltered[j].modified;
        image = `${contactsFiltered[j].thumbnail.path}.${contactsFiltered[j].thumbnail.extension}`;
        if(!image.includes("image_not_available")){
            renderMovies();
        }  
    }
}


//crea los elementos clases y atributos html
const renderMovies = () =>{
    const divContenido = document.createElement("div");
    const cardBody = document.createElement("div");
    const imagen = document.createElement("img");
    const titulo = document.createElement("p");
    const descripcionP = document.createElement("p");

    divContenido.classList.add("col-sm-6");
    divContenido.classList.add("col-md-4");
    divContenido.classList.add("col-lg-3");
    divContenido.classList.add("card");
    divContenido.classList.add("contenido-pelicula");
    imagen.classList.add("card-img-top");
    imagen.classList.add("imagen-pelicula");
    cardBody.classList.add("card-body");
    cardBody.classList.add("card-body-text");
    titulo.classList.add("card-text");
    titulo.classList.add("titulo");
    descripcionP.classList.add("card-text");
    descripcionP.classList.add("descripcion");
    

    imagen.setAttribute("src", image);
    titulo.innerHTML = `${nombre}`;
    descripcionP.innerHTML= `Modificado: ${descripcion}`;

    contenedorPrincipal.appendChild(divContenido);
    divContenido.appendChild(imagen);
    divContenido.appendChild(cardBody);
    cardBody.appendChild(titulo);
    cardBody.appendChild(descripcionP);

  
}


//evento para cada que se ingresa una letra en el buscador cambie
let contactsFiltered;
valorBuscado.addEventListener('keyup', (event) => {
    if(event?.target?.value === ""){
        clearAll();
        getMovieData();
    } else{
        clearAll();
        const inputText = event?.target?.value.toLocaleLowerCase() || '';
        contactsFiltered = buscador(inputText);
        getMovieFiltered()
    }
    
});


//buscador
let filtrador;
const buscador = (textoBuscado) =>{
    filtrador = filteredData.filter(elemento =>{
        const nombrePelicula = elemento.name;
        console.log(elemento);
        console.log(nombrePelicula.toLocaleLowerCase().includes(textoBuscado));
        return (nombrePelicula.toLocaleLowerCase().includes(textoBuscado)); //retornara true
    })
    console.log(filtrador)
    return filtrador; //devuelve el o los elementos filtrados
}


//al cargar la pagina hace la llamada a la api y renderiza el contenido
window.addEventListener('load',() => {
    llamadaApi()
});
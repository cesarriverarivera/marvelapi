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
    fetch("http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=82d4f96a5322de83d14cbf1680a696a8&hash=ed3d739c4ca06834c2f9ffb1a274b79a")
        .then(response => response.json())
        .then(data => {
            marvelData = data;
            filteredData = marvelData.data.results
            console.log(filteredData)
            getMovieData(); //renderiza todo marvel
        })
}

//llamadaApi() //onload 

//dibuja en la pantalla la informacion del array de peliculas
let nombre;
let descripcion;
let image;
const getMovieData= ()=>{
    for(i=0;i < filteredData.length; i++){
        nombre = filteredData[i].name;
        descripcion = filteredData[i].modified;
        image = `${filteredData[i].thumbnail.path}.${filteredData[i].thumbnail.extension}` ;
        renderMovies()
    }
}


//renderiza peliculas filtradas
const getMovieFiltered = () =>{
    for(j=0; j <contactsFiltered.length; j++){
        nombre = contactsFiltered[j].name;
        descripcion = contactsFiltered[j].modified;
        image = `${contactsFiltered[j].thumbnail.path}.${contactsFiltered[j].thumbnail.extension}`;
        renderMovies();
        console.log(nombre);  
    }
}


//crea los elementos clases y atributos html
const renderMovies = () =>{
    const divContenido = document.createElement("div");
    const divPortada = document.createElement("div");
    const imagen = document.createElement("img");
    const tituloPelicula = document.createElement("div");
    const titulo = document.createElement("p");
    const descripcionPelicula =document.createElement("div");
    const descripcionP = document.createElement("p");

    divContenido.classList.add("col-2");
    divContenido.classList.add("contenido-pelicula");
    divPortada.classList.add("portada");
    imagen.classList.add("imagen-pelicula");
    tituloPelicula.classList.add("titulo-pelicula");
    descripcionPelicula.classList.add("descripcion-pelicula");

    imagen.setAttribute("src", image);
    titulo.innerHTML = `${nombre}`;
    descripcionP.innerHTML= `Modificado: ${descripcion}`;

    contenedorPrincipal.appendChild(divContenido);
    divContenido.appendChild(divPortada);
    divPortada.appendChild(imagen);
    divContenido.appendChild(tituloPelicula);
    tituloPelicula.appendChild(titulo);
    divContenido.appendChild(descripcionPelicula);
    descripcionPelicula.appendChild(descripcionP);
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
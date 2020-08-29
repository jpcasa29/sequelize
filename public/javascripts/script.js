function elemento(elemento) {
    return document.getElementById(elemento)
}

window.addEventListener('load', function() {
    let buscador = elemento("buscador");
    
    let listado = elemento('listado')
    
    let peliculas = []

    fetch('http://localhost:3000/api/buscador')
    .then(function(response){
        return response.json()
    })
    .then(function(dataDecode){
        peliculas = dataDecode

        const filtrar = function() {
            listado.innerHTML = '';
            let texto = buscador.value.toLowerCase()
            for (let pelicula of peliculas) {
                let nombre = pelicula.title.toLowerCase()
                if (nombre.indexOf(texto) !== -1){
                    listado.innerHTML += '<li class="listado">' + pelicula.title + '     <a id="detalle" href="/peliculas/detalle/' + pelicula.id + '">Ver Detalle</a></li>'
                    
                }
            }
            if(listado.innerHTML == '') {
                listado.innerHTML += '<li>Pelicula no encontrada...</li>'
            }

        }
        
        

        buscador.addEventListener('keyup', filtrar)
            
        filtrar()

        //console.log(dataDecode)
    })

    

    

})
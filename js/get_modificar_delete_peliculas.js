
//REGION GET_PELICULAS

document.addEventListener('DOMContentLoaded', async () => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
   // const response = await fetch('http://localhost:8080/apisimple/peliculas', options);
   const response = await fetch('http://localhost/cac/grupo16_front/api/peliculas.php', options);
    const data = await response.json();
    console.log(data);// ARRAY DE OBJETOS DEL TIPO PELICULA
    
    const movies = data;
    const tbody = document.getElementById('bodyTablePeliculas');
    
    // RECORRO EL ARRAY CON UN FOREACH Y LLENO LA TABLA CON LOS DATOS DE LAS PELICULAS
    movies.forEach(movie => {
        const tr = document.createElement('tr');
        const idMovie = document.createElement('td');
        idMovie.textContent = movie.idPelicula;
        const tdTitle = document.createElement('td');
        tdTitle.textContent = movie.titulo;
        const tdDuration = document.createElement('td');
        tdDuration.textContent = movie.duracion;
        const tdGenres = document.createElement('td');
        tdGenres.textContent = movie.genero;
        const tdImage = document.createElement('td');
        const img = document.createElement('img');
        img.src = "../assets/img/" + movie.imagen;
        img.width = '150';
        img.alt = movie.titulo;
        tdImage.appendChild(img);
        img.classList.add('img-fluid', 'img-thumbnail');
        
        tr.appendChild(idMovie);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDuration);
        tr.appendChild(tdGenres);
        tr.appendChild(tdImage);
        
        const tdActions = document.createElement('td');
        const btnModify = document.createElement('button');
        btnModify.textContent = 'Modificar';
        btnModify.classList.add('btn', 'btn-warning', 'btn-sm', 'btnModificar');
        
        const btnDelete = document.createElement('button');
        btnDelete.textContent = 'Eliminar';
        btnDelete.classList.add('btn', 'btn-danger', 'btn-sm', 'btnEliminar');
        
        tdActions.appendChild(btnModify);
        tdActions.appendChild(btnDelete);
        tr.appendChild(tdActions);
        tbody.appendChild(tr);
    });
    // END REGION GET_PELICULAS TERMINA LOGICA DEL GET ., TERMINA LOGICA DE LLENAR LA TABLA DE PELICULAS


    //
    console.log(document.querySelectorAll('.btnModificar'));
    // Agregar eventos después de crear los botones
    document.querySelectorAll('.btnModificar').forEach(button => {
      
        button.addEventListener('click', async (event) => {
            console.log("hizo click");
            console.log(event);
            console.log(event.target);// etiqueta de html del button que presiono 
            const row = event.target.closest('tr');
            console.log(row);
            const peliculaId = row.querySelector('td:first-child').innerText.trim();// de la fila levanto el id de la pelicula por su clase, por un selector de hijo primero
            
            try {
                const response = await fetch(`http://localhost/cac/grupo16_front/api/peliculas.php?id=${peliculaId}`);
                if (!response.ok) {
                    // lanzo una excepcion en caso de que no funcione el fetch, esto se ve en la consola
                    throw new Error('Error al obtener los datos de la película');
                }
                const data = await response.json();
                const movieUnica = data[0];
                console.log(data);
                // son los id del formulario, como son unicos e irrepetibles dentro del html, sabe a quien insertarles los valores
                document.getElementById('idPelicula').value = movieUnica.idPelicula;
                document.getElementById('titulo').value = movieUnica.titulo;
                document.getElementById('genero').value = movieUnica.genero;
                document.getElementById('duracion').value = movieUnica.duracion;
                //que el scroll se vaya al formulario
                window.scrollTo(0, 0);
              
                // manejo de excepciones, levanto la excepcion si hay error y la muestro en consola
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
    // evento para el eliminar 
    document.querySelectorAll('.btnEliminar').forEach(button => {
        button.addEventListener('click', async (event) => {
            const row = event.target.closest('tr');
            const peliculaId = row.querySelector('td:first-child').innerText.trim();
            try {
                const response = await fetch(`http://localhost/cac/grupo16_front/api/peliculas.php?id=${peliculaId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    alert('Error al eliminar la película');
                    throw new Error('Error al eliminar la película');
                }
                const data = await response.json();
                // si da ok muestro alerta que se elimino correctamente
               
                alert('Pelicula eliminada correctamente');
                console.log(data);
                location.reload();// recargo la pagina 
               
              
               
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });
});

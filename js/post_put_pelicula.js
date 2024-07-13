document.addEventListener('DOMContentLoaded', async () => {
    const formNuevaPelicula = document.getElementById('formPelicula');

    formNuevaPelicula.addEventListener('submit', async (event) => {
        event.preventDefault();

        const idPelicula = document.getElementById('idPelicula').value;
        const titulo = document.getElementById('titulo').value;
        const genero = document.getElementById('genero').value;
        const duracion = document.getElementById('duracion').value;
        const imagen = document.getElementById('imagen').files[0] || document.getElementById('imagen').getAttribute('data-current-image');

        // Validar los campos
        if (titulo === '' || genero === '' || duracion === '' || !imagen) {
            alert('Todos los campos son obligatorios');
            return;
        }

        let url = 'http://localhost/cac/grupo16_front/api/peliculas.php';
        let method = 'POST';

        // Construir el objeto con los datos de la película
        const movieData = {
            titulo: titulo,
            genero: genero,
            duracion: duracion,
            imagen: imagen.name 
        };

        // Si hay un ID de película (es una modificación), incluirlo en el objeto movieData
        if (idPelicula) {
            movieData.idPelicula = idPelicula;
            method = 'PUT';
        }

        // Configurar opciones para la petición fetch
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieData)
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Error al guardar la película');
            }

            const responseData = await response.json();

            if (method === 'POST') {
                // si el código es 201, la película se creó correctamente
                if (response.status !== 201) {
                    alert('Error al guardar la película');
                    throw new Error('Error al guardar la película');
                    
                }
                alert('Película agregada correctamente');
            } else {
                // si el código es 200, la película se modificó correctamente
                if (response.status !== 200) {
                    alert('Error al modificar la película');
                    throw new Error('Error al modificar la película');
                }
                alert('Película modificada correctamente');
            }

            formNuevaPelicula.reset();
            location.reload(); // Recargar la página para mostrar los cambios
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar la película');
        }
    });
});

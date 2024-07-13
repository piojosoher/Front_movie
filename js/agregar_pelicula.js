// validacion de campos de formulario cuando se carga el dom
document.addEventListener('DOMContentLoaded', () => {
    // verificar si se toco el boton submit del formulario del administrador
    const form = document.getElementById('formPelicula');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // obtener los valores de los campos del formulario
        const titulo = document.getElementById('titulo').value;
        const genero = document.getElementById('genero').value;
        const duracion = document.getElementById('duracion').value;
        const imagen = document.getElementById('imagen').value;

        // verificar si los campos estan vacios

        // si alguno de los campos esta vacio se muestra un mensaje de error en el div correspondiente al input

        // objeto literal de pelicula 
        // pegar a la api POST /peliculas


    });
});
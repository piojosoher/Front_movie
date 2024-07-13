// si se carga el dom entonces se ejecuta la función
document.addEventListener('DOMContentLoaded', async () => {

    formUserRegistro = document.getElementById('formUserRegistro');
    formUserRegistro.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(formUserRegistro);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const fechaNacimiento = formData.get('fechaNacimiento');
        const pais = formData.get('pais');
        if (name === '' || email === '' || password === '' || fechaNacimiento === '' || pais === '') {
            alert('Todos los campos son obligatorios');
            return;
        }
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                fechaNacimiento: fechaNacimiento,
                pais: pais
            })
        };
        const response = await fetch('http://localhost/cac/grupo16_front/api/crear_usuario.php', options);
        const data = await response.json();
        if (response.status === 201) {
            alert('Usuario registrado correctamente');
            formUserRegistro.reset();
            location.reload();
        } else {
            alert('Error al registrar usuario');
        }
    });

});
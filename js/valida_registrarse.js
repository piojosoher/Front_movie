/*Esta línea añade un evento al documento que se activa cuando el contenido HTML ha sido completamente cargado y parseado. En otras palabras, se ejecuta cuando el DOM está listo para ser manipulado.*/
document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.querySelector('#form-registro'); // Corregido: selector por ID

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario

        if (!validateForm()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
        } else {
            console.log('El formulario es válido. Enviar datos...');

            const formData = new FormData(form);
            const nombre = formData.get('nombre');
            const apellido = formData.get('apellido');
            const email = formData.get('email');
            const password = formData.get('password');
            const fechaNacimiento = formData.get('fechaNacimiento');
            const pais = formData.get('pais');

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombre,
                    apellido: apellido,
                    email: email,
                    password: password,
                    fechaNacimiento: fechaNacimiento,
                    pais: pais
                })
            };

            try {
                const response = await fetch('http://localhost/cac/grupo16_front/api/crear_usuario.php', options);
                const data = await response.json();

                if (response.ok) { // Verificar si la respuesta fue exitosa
                    alert('Usuario registrado correctamente');
                    form.reset();
                    location.href = '../pages/iniciosesion.html';
                } else {
                    alert('Error al registrar usuario: ' + data.message);
                }
            } catch (error) {
                console.error('Error al enviar la solicitud:', error);
                alert('Error al registrar usuario');
            }
        }
    });

    const validateForm = () => {
        let isValid = true;

        // Validar campo de nombre
        isValid = validateField('nombre', 'El nombre es obligatorio') && isValid;

        // Validar campo de apellido
        isValid = validateField('apellido', 'El apellido es obligatorio') && isValid;

        // Validar campo de email
        isValid = validateEmailField('email', 'El correo electrónico no es válido') && isValid;

        // Validar campo de contraseña
        isValid = validateField('password', 'La contraseña es obligatoria') && isValid;

        // Validar campo de fecha de nacimiento
        isValid = validateField('fechaNacimiento', 'La fecha de nacimiento es obligatoria') && isValid;

        // Validar campo de país
        isValid = validateField('pais', 'El país es obligatorio') && isValid;

        // Validar checkbox de términos y condiciones
        const terminos = document.getElementById('terminos').checked;
        if (!terminos) {
            isValid = false;
            setErrorFor(document.getElementById('terminos'), 'Debes aceptar los términos y condiciones');
        } else {
            setSuccessFor(document.getElementById('terminos'));
        }

        return isValid;
    };

    const validateField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        if (value === '') {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const validateEmailField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const email = field.value.trim();
        if (email === '') {
            setErrorFor(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const setErrorFor = (input, message) => {
        const formControl = input.closest('div');
        const errorText = formControl.querySelector('.error-text');
        formControl.classList.add('error');
        errorText.innerText = message;
        input.focus();
    };

    const setSuccessFor = (input) => {
        const formControl = input.closest('div');
        formControl.classList.remove('error');
        const errorText = formControl.querySelector('.error-text');
        errorText.innerText = '';
    };

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };
      // Agrega eventos para borrar las clases de error cuando se completa el input o se presiona Tab
      form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            // Obtiene el valor del campo y elimina los espacios en blanco al principio y al final
            const value = input.value.trim();
            // Si el campo no está vacío, elimina cualquier mensaje de error
            if (value !== '') {
                setSuccessFor(input);
            }
        });
    });
     // Agrega eventos para borrar las clases de error cuando se selecciona una opción del select
     form.querySelectorAll('select').forEach(select => {
        select.addEventListener('change', () => {
            // Obtiene el valor seleccionado del campo de selección
            const value = select.value;
            // Si se selecciona una opción, elimina cualquier mensaje de error
            if (value !== '') {
                setSuccessFor(select);
            }
        });
    });
});

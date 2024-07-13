document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form'); // Corregido para seleccionar el formulario por ID

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Evita que el formulario se envíe antes de la validación

        if (!validateForm()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
        } else {
            console.log('El formulario es válido. Enviar datos...');

            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            };

            try {
                const response = await fetch('http://localhost/cac/grupo16_front/api/login.php', options);
                const data = await response.json();

                if (response.status === 200) {
                    alert('Usuario logueado correctamente');
                    form.reset();
                    location.href = 'administrador.html';
                } else {
                    alert('Error al loguear usuario');
                }
            } catch (error) {
                console.error('Error en la solicitud:', error);
                alert('Error en la solicitud. Por favor, intenta nuevamente.');
            }
        }
    });

    const validateForm = () => {
        let isValid = true;

        isValid = validateEmailField('email', 'El correo electrónico no es válido') && isValid;
        isValid = validateField('password', 'La contraseña es obligatoria') && isValid;

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

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value.trim();
            if (value !== '') {
                setSuccessFor(input);
            }
        });
    });

});


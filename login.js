// ------------------------------------------------------------------------------------------------
     const usuarioCorrecto = "admin";
    const contrasenaCorrecta = "1234";

        document.getElementById('formulario-login').addEventListener('submit', function(event) {
            event.preventDefault(); 

            const usuario = document.getElementById('usuario').value;
            const contrasena = document.getElementById('contrasena').value;

            if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
                window.location.href = 'game.html';
            } else {
                document.getElementById('mensaje-error').style.display = 'block';
            }
        });

// ------------------------------------------------------------------------------------------------


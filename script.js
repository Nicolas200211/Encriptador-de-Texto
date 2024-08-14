const textoInput = document.getElementById('texto');
const encriptadoInput = document.getElementById('texto2');
const encriptarButton = document.getElementById('encriptar');
const desencriptarButton = document.getElementById('desencriptar');
const copiarButton = document.getElementById('copiar');

textoInput.addEventListener('input', () => { // Evento 'input' para detectar cambios
    const texto = textoInput.value;
    if (texto.trim() === '') { // Verifica si el texto está vacío
        mensajeVacio.classList.remove('hidden'); // Muestra el mensaje
    } else {
        mensajeVacio.classList.add('hidden'); // Oculta el mensaje
        
    }
});

encriptarButton.addEventListener('click', () => {
    const texto = textoInput.value;
    if (texto.trim() === '') { // Verifica si el texto está vacío
        encriptadoInput.value = 'Ningún mensaje fue encontrado.\nIngresa el texto que desees encriptar o desencriptar.';
    } else {
        const textoEncriptado = encriptar(texto, 3);
        encriptadoInput.value = textoEncriptado;
    }
});

copiarButton.addEventListener('click', () => {
    navigator.clipboard.writeText(encriptadoInput.value)
        .then(() => {
            // Opcional: Mostrar un mensaje de confirmación
            alert('¡Texto copiado!');
        })
        .catch(err => {
            console.error('Error al copiar el texto:', err);
        });
});

function encriptar(texto, desplazamiento) {
    let textoEncriptado = '';
    for (let i = 0; i < texto.length; i++) {
        const letra = texto[i];
        if (letra.match(/[a-z]/i)) {
            const codigoAscii = letra.charCodeAt(0);
            let codigoEncriptado = codigoAscii + desplazamiento;
            if (letra.match(/[a-z]/)) { // Si es minúscula
                if (codigoEncriptado > 122) { // Si se pasa de la 'z'
                    codigoEncriptado = 96 + (codigoEncriptado - 122);
                }
            } else { // Si es mayúscula
                if (codigoEncriptado > 90) { // Si se pasa de la 'Z'
                    codigoEncriptado = 64 + (codigoEncriptado - 90);
                }
            }
            textoEncriptado += String.fromCharCode(codigoEncriptado);
        } else {
            textoEncriptado += letra;
        }
    }
    return textoEncriptado;
}

desencriptarButton.addEventListener('click', () => { // Agrega este evento
    const texto = textoInput.value;
    if (texto.trim() === '') { // Verifica si el texto está vacío
        encriptadoInput.value = 'Ningún mensaje fue encontrado.\nIngresa el texto que desees encriptar o desencriptar.';
    } else {
        const textoDesencriptado = desencriptar(texto, 3); // Usa la función desencriptar
        encriptadoInput.value = textoDesencriptado;
    }
});

function desencriptar(texto, desplazamiento) { // Agrega esta función
    let textoDesencriptado = '';
    for (let i = 0; i < texto.length; i++) {
        const letra = texto[i];
        if (letra.match(/[a-z]/i)) {
            const codigoAscii = letra.charCodeAt(0);
            let codigoDesencriptado = codigoAscii - desplazamiento;
            if (letra.match(/[a-z]/)) { // Si es minúscula
                if (codigoDesencriptado < 97) { // Si se pasa de la 'a'
                    codigoDesencriptado = 123 - (97 - codigoDesencriptado);
                }
            } else { // Si es mayúscula
                if (codigoDesencriptado < 65) { // Si se pasa de la 'A'
                    codigoDesencriptado = 91 - (65 - codigoDesencriptado);
                }
            }
            textoDesencriptado += String.fromCharCode(codigoDesencriptado);
        } else {
            textoDesencriptado += letra;
        }
    }
    return textoDesencriptado;
}
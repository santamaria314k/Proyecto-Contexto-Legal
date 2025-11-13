const preguntas = [
    {
        pregunta: "Tu empresa crea una IA capaz de generar emociones humanas. ¿Qué haces?",
        opciones: ["A) La lanzo al mercado sin restricción", "B) Implemento un comité ético y registro ante la Agencia de IA"],
        correcta: "B",
        regulacionA: "Tu empresa fue sancionada por incumplir la Ley Europea de IA Consciente 2028. Riesgo alto de manipulación emocional.",
        regulacionB: "Cumples la Ley Europea de IA Consciente 2028. Tu IA obtiene certificación de transparencia emocional."
    },
    {
        pregunta: "Un cliente te pide acceso total a los datos cerebrales recolectados por un casco neuronal. ¿Qué haces?",
        opciones: ["A) Los entregas a cambio de financiamiento", "B) Proteges los datos bajo la Ley de Neuroprivacidad 2029"],
        correcta: "B",
        regulacionA: "Violaste la Ley de Neuroprivacidad 2029. Los datos neuronales son considerados información biológica sensible.",
        regulacionB: "Proteges los derechos cognitivos del usuario. Tu reputación legal mejora un 20%."
    },
    {
        pregunta: "Tu metaverso permite alterar identidades legales. ¿Cómo lo manejas?",
        opciones: ["A) Permites identidades falsas para atraer usuarios", "B) Exiges verificación biométrica segura"],
        correcta: "B",
        regulacionA: "Tu metaverso fue bloqueado por la ONU Digital por riesgo de suplantación masiva.",
        regulacionB: "Cumples con la Regulación de Identidad Digital Segura 2030. Accedes a subvenciones públicas."
    },
    {
        pregunta: "Desarrollas nanobots para mejorar la memoria humana. ¿Qué política adoptas?",
        opciones: ["A) Los distribuyes libremente sin control médico", "B) Requieres aprobación bioética y consentimiento informado"],
        correcta: "B",
        regulacionA: "Los nanobots causaron efectos secundarios no regulados. Violación de la Ley de Biohacking Responsable 2027.",
        regulacionB: "Cumples con la Ley de Biohacking Responsable 2027. Los nanobots se aprueban como tecnología médica ética."
    },
    {
        pregunta: "Tu sistema de IA predice crímenes potenciales. ¿Qué haces?",
        opciones: ["A) Lo vendes a gobiernos sin revisión ética", "B) Exiges auditoría algorítmica independiente"],
        correcta: "B",
        regulacionA: "Acusado de discriminación algorítmica. Tu IA fue vetada bajo el Tratado de Justicia Predictiva 2029.",
        regulacionB: "Implementas auditorías éticas conforme al Tratado de Justicia Predictiva 2029. Ganas reputación como desarrollador responsable."
    }
];

let preguntaActual = 0;
let puntuacion = 0;
let respondida = false;
let totalPreguntas = 5;

const textoPregunta = document.getElementById('texto-pregunta');
const contadorPreguntas = document.getElementById('contador-preguntas');
const elementoPuntuacion = document.getElementById('puntuacion');
const elementoPorcentaje = document.getElementById('porcentaje');
const opciones = document.querySelectorAll('.opcion');
const botonSiguiente = document.getElementById('boton-siguiente');
const contenedorResultado = document.getElementById('resultado');
const puntuacionFinal = document.getElementById('puntuacion-final');
const puntuacionPromedio = document.getElementById('puntuacion-promedio');
const botonReiniciar = document.getElementById('boton-reiniciar');
const barraProgreso = document.getElementById('barra-progreso');

function iniciarJuego() {
    const preguntasSeleccionadas = [...preguntas].sort(() => 0.5 - Math.random()).slice(0, totalPreguntas);
    preguntaActual = 0;
    puntuacion = 0;
    respondida = false;
    elementoPuntuacion.textContent = puntuacion;
    actualizarPorcentaje();
    contadorPreguntas.textContent = `1/${totalPreguntas}`;
    contenedorResultado.style.display = 'none';
    botonSiguiente.style.display = 'block';
    barraProgreso.style.width = '0%';
    cargarPregunta(preguntasSeleccionadas);
}

function cargarPregunta(conjuntoPreguntas) {
    respondida = false;
    const pregunta = conjuntoPreguntas[preguntaActual];
    textoPregunta.textContent = pregunta.pregunta;
    opciones.forEach((opcion, indice) => {
        opcion.textContent = pregunta.opciones[indice];
        opcion.dataset.opcion = pregunta.opciones[indice].charAt(0);
        opcion.classList.remove('correcta', 'incorrecta');
    });
    contadorPreguntas.textContent = `${preguntaActual + 1}/${totalPreguntas}`;
    barraProgreso.style.width = `${(preguntaActual / totalPreguntas) * 100}%`;
}

function verificarRespuesta(opcionSeleccionada) {
    if (respondida) return;
    respondida = true;
    const pregunta = preguntas.find(p => p.pregunta === textoPregunta.textContent);
    opciones.forEach(opcion => {
        if (opcion.dataset.opcion === pregunta.correcta) {
            opcion.classList.add('correcta');
        } else if (opcion.dataset.opcion === opcionSeleccionada) {
            opcion.classList.add('incorrecta');
        }
    });
    if (opcionSeleccionada === pregunta.correcta) {
        puntuacion += 10;
        elementoPuntuacion.textContent = puntuacion;
        actualizarPorcentaje();
    }
}

function actualizarPorcentaje() {
    const porcentaje = (puntuacion / ((preguntaActual + 1) * 10)) * 100;
    elementoPorcentaje.textContent = `${porcentaje.toFixed(1)}%`;
}

function siguientePregunta() {
    if (!respondida) {
        alert('Por favor, selecciona una respuesta antes de continuar.');
        return;
    }
    preguntaActual++;
    if (preguntaActual < totalPreguntas) {
        cargarPregunta(preguntas);
    } else {
        mostrarResultados();
    }
}

function mostrarResultados() {
    contenedorResultado.style.display = 'block';
    botonSiguiente.style.display = 'none';
    const promedio = (puntuacion / (totalPreguntas * 10)) * 100;
    puntuacionFinal.textContent = `Puntuación final: ${puntuacion}`;
    puntuacionPromedio.textContent = `Porcentaje de aciertos: ${promedio.toFixed(1)}%`;
    barraProgreso.style.width = '100%';
}

opciones.forEach(opcion => {
    opcion.addEventListener('click', () => {
        const letraSeleccionada = opcion.dataset.opcion;
        const pregunta = preguntas.find(p => p.pregunta === textoPregunta.textContent);
        let retroalimentacion = (letraSeleccionada === "A") ? pregunta.regulacionA : pregunta.regulacionB;
        verificarRespuesta(letraSeleccionada);
        alert("📜 REGULACIÓN 2030:\n\n" + retroalimentacion);
    });
});

botonSiguiente.addEventListener('click', siguientePregunta);
botonReiniciar.addEventListener('click', iniciarJuego);
window.onload = iniciarJuego;

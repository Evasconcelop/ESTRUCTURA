<template>
    <div class="chatbot-container">
      <h1>Leoncito Chat</h1>
      <div class="chatbox">
        <p>{{ mensajeActual }}</p>
        <input type="text" v-model="respuestaUsuario" @keyup.enter="procesarRespuesta" placeholder="Escribe tu respuesta (1-5)">
        <button @click="procesarRespuesta">Enviar</button>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    // Clase Nodo
    class Nodo {
      constructor(pregunta) {
        this.pregunta = pregunta;
        this.respuestas = {};
      }

      agregarRespuesta(respuesta, nodo) {
        this.respuestas[respuesta] = nodo;
      }
    }

    // Clase Árbol de Decisión
    class ArbolDecision {
      constructor(raiz) {
        this.raiz = raiz;
        this.actual = raiz;
      }

      reiniciar() {
        this.actual = this.raiz;
      }

      responder(respuesta) {
        if (this.actual.respuestas[respuesta]) {
          this.actual = this.actual.respuestas[respuesta];
          return this.actual.pregunta;
        } else {
          return "No entiendo esa respuesta. Por favor, elige una opción válida.";
        }
      }
    }

    // Crear el árbol de decisiones
    const nodoRaiz = new Nodo("¡Hola! Bienvenido a Inge Chat. ¿Qué te gustaría saber?\n1. Costo de créditos\n2. Carreras\n3. Requisitos de inscripción\n4. Calendario escolar\n5. Contacto de profesores");

    const nodoCostoCreditos = new Nodo("El costo de los créditos es de $950 por crédito.\n¿Quieres preguntar algo más? (Escribe 'ok' o 'no')");
    const nodoPlanesEstudio = new Nodo("Nuestros planes de estudio incluyen Ingeniería en TI, Ingeniería Civil, Ingeniería Mecatrónica, y más.\n¿Quieres preguntar algo más? (Escribe 'ok' o 'no')");
    const nodoRequisitosInscripcion = new Nodo("Los requisitos de inscripción incluyen una copia de tu identificación, certificado de estudios previos, y comprobante de pago.\n¿Quieres preguntar algo más? (Escribe 'ok' o 'no')");
    const nodoHorariosClases = new Nodo("El calendario Enero-Julio es el siguiente: https://www.anahuac.mx/oaxaca/calendario-2024 . Por favor, consulta la página web de la universidad para más detalles.\n¿Quieres preguntar algo más? (Escribe 'ok' o 'no')");
    const nodoContactoProfesores = new Nodo("Puedes contactar a los profesores a través de sus correos institucionales, disponibles en la página web de la universidad.\n¿Quieres preguntar algo más? (Escribe 'ok' o 'no')");

    nodoRaiz.agregarRespuesta("1", nodoCostoCreditos);
    nodoRaiz.agregarRespuesta("2", nodoPlanesEstudio);
    nodoRaiz.agregarRespuesta("3", nodoRequisitosInscripcion);
    nodoRaiz.agregarRespuesta("4", nodoHorariosClases);
    nodoRaiz.agregarRespuesta("5", nodoContactoProfesores);

    const arbol = new ArbolDecision(nodoRaiz);

    return {
      arbol,
      mensajeActual: arbol.actual.pregunta,
      respuestaUsuario: ''
    };
  },
  methods: {
    procesarRespuesta() {
      if (this.arbol.actual.respuestas[this.respuestaUsuario]) {
        this.mensajeActual = this.arbol.responder(this.respuestaUsuario.trim());
        this.respuestaUsuario = '';
      } else {
        if (this.respuestaUsuario.trim().toLowerCase() === 'ok') {
          this.arbol.reiniciar();
          this.mensajeActual = this.arbol.actual.pregunta;
          this.respuestaUsuario = '';
        } else if (this.respuestaUsuario.trim().toLowerCase() === 'no') {
          this.arbol.reiniciar();
          this.mensajeActual = "¡Espero haberte ayudado! Vuelve pronto.Si quieres volver a hablar escribe hola";
          this.respuestaUsuario = '';
        } else if (this.respuestaUsuario.trim().toLowerCase() === 'hola') {
          this.arbol.reiniciar();
          this.mensajeActual = this.arbol.actual.pregunta;
          this.respuestaUsuario = '';
        } else {
          this.mensajeActual = "No entiendo esa respuesta. Por favor, elige una opción válida. ";
        }
      }
    }
  }
};
</script>

<style scoped>
.chatbot-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #007bff;
}

.chatbox {
  width: 100%;
}

p {
  font-size: 18px;
  margin-bottom: 20px;
  white-space: pre-wrap;
  color: #333;
}

input {
  width: calc(100% - 40px);
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.mensaje-final {
  font-style: italic;
  color: #555;
}
</style> 
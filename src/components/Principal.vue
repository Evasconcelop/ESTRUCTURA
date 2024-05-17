<template>
  <div class="career-and-subjects-container">
    <!-- Contenedor principal -->
    <div class="main-container">
      <h1 class="titulo">Bienvenido a nuestra plataforma de seguimiento académico</h1>
      <p class="descripcion">Aquí podrás ver tu progreso en la carrera y realizar otras acciones.</p>
      <div class="botones-principales">
        <button class="boton-seleccionar" @click="redirectToSubjects">Seleccionar materias</button>
        <button class="boton-selecionar" @click="redirectToChat">preguntas frecuentes</button>
      </div>
    </div>

    <!-- Contenedor de comentarios -->
    <div class="comentarios-container">
      <div class="comentarios">
        <h2>AVISOS</h2>
        <ul v-if="!pilaComentarios.estaVacia()">
          <li v-for="(comentario, index) in pilaComentarios.items" :key="index">{{ comentario }}</li>
        </ul>
        <p v-else>No hay avisos.</p>
        <label for="nuevoComentario">Agregar un aviso:</label>
        <input type="text" id="nuevoComentario" v-model="nuevoComentario">
        <div class="botones-container">
          <button @click="agregarComentario">Agregar</button>
          <button @click="sacarComentario">Eliminar Último Aviso</button>
        </div>
      </div>
    </div>

    <!-- Contenedor de citas -->
    <div class="citas-container">
      <div class="citas">
        <h2>GESTIÓN DE CITAS</h2>
        <ul v-if="!listaCitas.estaVacia()">
          <li v-for="(cita, index) in listaCitas.items" :key="index">
            <strong>{{ cita.director }}</strong>: {{ cita.motivo }} - {{ cita.estudiante }}
          </li>
        </ul>
        <p v-else>No hay citas agendadas.</p>
        <label for="directorCita">Director de carrera:</label>
        <input type="text" id="directorCita" v-model="nuevoDirector">
        
        <label for="motivoCita">Motivo de la cita:</label>
        <input type="text" id="motivoCita" v-model="nuevoMotivo">

        <label for="estudianteCita">Estudiante:</label>
        <input type="text" id="estudianteCita" v-model="nuevoEstudiante">
        
        <div class="botones-container">
          <button @click="agregarCita">Agregar Cita</button>
          <button @click="eliminarCita">Eliminar Última Cita</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Clase Pila
class Pila {
  constructor() {
    this.items = [];
  }

  agregarComentario(comentario) {
    this.items.push(comentario);
  }

  sacarComentario() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items.pop();
  }

  estaVacia() {
    return this.items.length === 0;
  }
}

// Clase Lista para citas
class Lista {
  constructor() {
    this.items = [];
  }

  agregarCita(cita) {
    this.items.push(cita);
  }

  eliminarCita() {
    if (this.items.length === 0) {
      return null;
    }
    return this.items.pop();
  }

  estaVacia() {
    return this.items.length === 0;
  }
}

export default {
  data() {
    return {
      pilaComentarios: new Pila(),
      nuevoComentario: '',
      listaCitas: new Lista(),
      nuevoDirector: '',
      nuevoMotivo: '',
      nuevoEstudiante: ''
    };
  },
  methods: {
    redirectToSubjects() {
      this.$router.push('/materias'); 
    },

    redirectToChat() {
      this.$router.push('/chatbot'); 
    },

    agregarComentario() {
      if (this.nuevoComentario.trim() !== '') {
        this.pilaComentarios.agregarComentario(this.nuevoComentario);
        this.nuevoComentario = ''; 
      }
    },
    sacarComentario() {
      this.pilaComentarios.sacarComentario();
    },
    agregarCita() {
      if (this.nuevoDirector.trim() !== '' && this.nuevoMotivo.trim() !== '' && this.nuevoEstudiante.trim() !== '') {
        const nuevaCita = {
          director: this.nuevoDirector,
          motivo: this.nuevoMotivo,
          estudiante: this.nuevoEstudiante
        };
        this.listaCitas.agregarCita(nuevaCita);
        this.nuevoDirector = '';
        this.nuevoMotivo = '';
        this.nuevoEstudiante = ''; 
      }
    },
    eliminarCita() {
      this.listaCitas.eliminarCita();
    }
  }
};
</script>

<style scoped>
.career-and-subjects-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.main-container {
  text-align: center;
}

.titulo {
  font-size: 40px;
  margin-bottom: 20px;
  color: white; 
  
}

.descripcion {
  color: white; 
}

button {
  padding: 10px 20px;
  background-color: #492b1b;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.541);
  transition: 0.3s ease;
  margin-left: 10px;
}

button:hover {
  background-color: #000000;
}

.botones-principales {
  margin-bottom: 30px; /* Mayor margen inferior */
}

.boton-seleccionar {
  margin-bottom: 20px; /* Margen inferior solo para el botón "Seleccionar materias" */
}

.comentarios-container,
.citas-container {
  width: 100%;
  margin-top: 20px;
}

.comentarios,
.citas {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.comentarios h2,
.citas h2 {
  font-size: 24px;
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.comentarios ul,
.citas ul {
  list-style-type: none;
  padding-left: 0;
}

.comentarios li,
.citas li {
  margin-bottom: 5px;
}

.comentarios input[type="text"],
.citas input[type="text"] {
  width: calc(100% - 40px);
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.botones-container {
  display: flex;
  justify-content: center;
}

.botones-container button {
  margin-right: 10px;
}

.botones-container button:last-child {
  margin-right: 0;
}

.botones-container button:hover {
  background-color: #000000;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}
</style>

<template>
  <div class="career-and-subjects-container">
    <!-- Contenedor principal -->
    <div class="main-container">
      <h1 class="titulo">Bienvenido a nuestra plataforma de seguimiento académico</h1>
      <p class="descripcion">Aquí podrás ver tu progreso en la carrera y realizar otras acciones.</p>
      <div class="botones-principales">
        <button class="boton-seleccionar" @click="redirectToSubjects">Seleccionar materias</button>
        <button class="boton-agendar" @click="redirectToCitas">Agendar Cita</button>
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

// Componente Vue
export default {
  data() {
    return {
      pilaComentarios: new Pila(),
      nuevoComentario: ''
    };
  },
  methods: {
    redirectToSubjects() {
      this.$router.push('/materias'); 
    },
    redirectToCitas() {
      this.$router.push('/citas'); 
    },
    agregarComentario() {
      if (this.nuevoComentario.trim() !== '') {
        this.pilaComentarios.agregarComentario(this.nuevoComentario);
        this.nuevoComentario = ''; 
      }
    },
    sacarComentario() {
      this.pilaComentarios.sacarComentario();
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
  color: white; /* Cambio de color a blanco */
}

.descripcion {
  color: white; /* Cambio de color a blanco */
}

button {
  padding: 10px 20px;
  background-color: #ff5900;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #ff5900;
}

.botones-principales {
  margin-bottom: 30px; /* Mayor margen inferior */
}

.boton-seleccionar {
  margin-bottom: 20px; /* Margen inferior solo para el botón "Seleccionar materias" */
}

.boton-agendar {
  margin-top: 20px; /* Margen superior solo para el botón "Agendar Cita" */
}

.comentarios-container {
  width: 100%;
  margin-top: 20px;
}

.comentarios {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.comentarios h2 {
  font-size: 24px;
  margin-bottom: 10px;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.comentarios ul {
  list-style-type: none;
  padding-left: 0;
}

.comentarios li {
  margin-bottom: 5px;
}

.comentarios input[type="text"] {
  margin-bottom: 10px;
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
  background-color: #0056b3;
}
</style>
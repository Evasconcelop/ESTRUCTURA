<template>
  <div class="pagina-web">
    <!-- Contenido principal -->
    <main class="contenido">
      <!-- Sección de bienvenida -->
      <section id="inicio" class="bienvenida">
        <h1 class="titulo">Bienvenido a Ingeniería</h1>
        <p class="parrafo">Para poder consultar tu avance en la carrera, primero regístrate o inicia sesión.</p>
        <button class="boton-iniciar" @click="toggleLoginForm">Iniciar Sesión</button>
        <span class="espacio"></span> <!-- Espacio adicional -->
        <button class="boton-registrarse" @click="toggleRegisterForm">Registrarse</button>
      </section>

      <!-- Formulario de inicio de sesión -->
      <section id="iniciar-sesion" class="login-form" :class="{ active: showLoginForm }">
        <h2 class="subtitulo">Iniciar Sesión</h2>
        <!-- Formulario de inicio de sesión -->
        <form @submit.prevent="enviarInicioSesion">
          <input type="email" placeholder="Correo electrónico">
          <input type="password" placeholder="Contraseña">
          <button type="submit" class="boton-iniciar">Iniciar Sesión</button>
        </form>
      </section>

      <!-- Formulario de registro -->
      <section id="registro" class="login-form" :class="{ active: showRegisterForm }">
        <h2 class="subtitulo">Registro</h2>
        <form @submit.prevent="enviarRegistro">
          <input type="text" placeholder="Nombre">
          <input type="text" placeholder="Apellido">
          <input type="email" placeholder="Correo electrónico">
          <input type="text" placeholder="Carrera">
          <input type="password" placeholder="Contraseña">
          <button type="submit" class="boton-iniciar">Registrarse</button>
        </form>
      </section>

      <!-- Secciones de comentarios, citas, etc. -->
      <!-- ... -->
    </main>
  </div>
</template>

<script>
export default {
  name: 'PaginaWeb',
  data() {
    return {
      showLoginForm: false,
      showRegisterForm: false
    };
  },
  methods: {
    toggleLoginForm() {
      this.showLoginForm = !this.showLoginForm;
    },
    toggleRegisterForm() {
      this.showRegisterForm = !this.showRegisterForm;
    },
    enviarRegistro() {
      // Procesar datos del formulario de registro
      // Validar datos...

      // Redirigir al usuario a la página de bienvenida (Principal.vue)
      this.$router.push('/principal');
    },
    enviarInicioSesion() {
      // Procesar datos del formulario de inicio de sesión
      // Validar datos...

      // Redirigir al usuario a la página de bienvenida (Principal.vue)
      this.$router.push('/principal');
    }
  }
}
</script>

<style scoped>
/* Estilos para el contenedor principal */
.contenido {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* Alineado a la izquierda */
  padding-left: 20px; /* Espaciado en el lado izquierdo */
}

.bienvenida {
  /* Estilos para la sección de bienvenida */
  text-align: left; /* Alineado a la izquierda */
  color: white;
  margin-bottom: 20px; /* Espaciado inferior */
}

.titulo {
  font-size: 2.5em; /* Tamaño de fuente más grande */
}

.parrafo {
  margin-top: 15px; /* Espaciado superior */
}

.login-form {
  /* Estilos para el formulario de inicio de sesión y registro */
  display: none;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.login-form.active {
  /* Estilos cuando el formulario de inicio de sesión o registro está activo */
  display: block;
}

.subtitulo {
  font-size: 1.5em; /* Tamaño de fuente más grande para el subtitulo */
}

.boton-iniciar,
.boton-registrarse {
  /* Estilos para los botones */
  padding: 12px 24px; /* Espaciado interno */
  font-size: 16px;
  background-color: #007bff; /* Color de fondo */
  color: white; /* Color de texto */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cursor de puntero */
  transition: background-color 0.3s; /* Transición de color de fondo */
}

.boton-iniciar:hover,
.boton-registrarse:hover {
  /* Estilos cuando se pasa el mouse sobre los botones */
  background-color: #0056b3; /* Color de fondo más oscuro */
}

.espacio {
  /* Espacio entre los botones */
  margin-right: 10px;
}
input[type="email"],
input[type="password"],
input[type="text"] {
  width: 50%;
  padding: 10px;
  margin-bottom: 15px; /* Espaciado inferior entre inputs */
  border: 1px solid #ced4da; /* Borde suave */
  border-radius: 5px;
  box-sizing: border-box; /* Incluir el padding en el ancho */
}

</style>

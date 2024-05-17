<template>
  <div class="fondo">
    <div class="container">
      <div class="screen">
        <div class="screen__content">
          <form class="login">
            <div class="login__field">
              <h3 class="titulo">Bienvenido a ingeniería</h3>
              <input type="text" class="login__input" placeholder="Correo">
            </div>
            <div class="login__field">
              <input type="password" class="login__input" placeholder="contraseña">
            </div>
            <button class="button login__submit" @click="enviarInicioSesion">
              <span class="button__text">Iniciar sesión</span>
            </button>        
          </form>
        </div>
        <div class="screen__background">
          <span class="screen__background__shape screen__background__shape4"></span>
          <span class="screen__background__shape screen__background__shape3"></span>    
          <span class="screen__background__shape screen__background__shape2"></span>
          <span class="screen__background__shape screen__background__shape1"></span>
        </div>    
      </div>
    </div>
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
@import url('https://fonts.googleapis.com/css?family=Raleway:800,700');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;  
  font-family: Raleway, sans-serif;
}

.fondo {
  background-image: url('https://merida.anahuac.mx/hs-fs/hubfs/fondoi_instalaciones_explanada%20dia%201.jpeg?width=1920&height=1080&name=fondoi_instalaciones_explanada%20dia%201.jpeg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;

}

.titulo {
  transform: translateY(-30px);
  font-size: 20px;
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.screen {    
  background: linear-gradient(90deg, #eb7d23, #db6a0d);    
  position: relative;  
  height: 600px;
  width: 360px;  
  box-shadow: 0px 0px 24px #000000;
}

.screen__content {
  z-index: 1;
  position: relative;  
  height: 100%;
}

.screen__background {    
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);  
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #FFF;  
  top: -50px;
  right: 120px;  
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #e75906;  
  top: -172px;
  right: 0;  
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #df4305, #e75906);
  top: -24px;
  right: 0;  
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: linear-gradient(270deg, #df4305, #e75906);
  top: 420px;
  right: 50px;  
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;  
  position: relative;  
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #df4f0c;
}

.login__input {
  border: none;
  border-bottom: 2px solid #e23b12;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #e94d0f;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #eb5013;
  box-shadow: 0px 2px 2px #832b08;
  cursor: pointer;
  transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #92310a;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #e64514;
}

.social-login {  
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;  
  text-shadow: 0px 0px 8px #7875B5;
}

.social-login__icon:hover {
  transform: scale(1.5);  
}
</style>

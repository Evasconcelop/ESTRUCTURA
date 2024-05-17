<template>
  <div class="container">
    <div class="materias-container">
      <!-- Sección de Selección de Materias -->
      <div v-if="currentSection === 'seleccion'" class="section seleccion">
        <h2>Selecciona tus materias cursadas</h2>
        <div class="courses-list">
          <div v-for="course in allCourses" :key="course.id" class="course-item">
            <label>
              <input type="checkbox" v-model="selectedCourseIds" :value="course.id">
              {{ course.name }}
            </label>
          </div>
        </div>
        <button class="btn btn-primary" @click="proceedToTopsort">Continuar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allCourses: [
        { id: 1, name: 'Algoritmos y Programación', type: 'bloque-profesional', credits: 4.5, prerequisites: [] },
        { id: 2, name: 'Programación Orientada a Objetos', type: 'bloque-profesional', credits: 4.5, prerequisites: ['Algoritmos y Programación'] },
        { id: 3, name: 'Estructura de Datos', type: 'bloque-profesional', credits: 4.5, prerequisites: ['Programación Orientada a Objetos'] },
        { id: 5, name: 'Habilidades de Emprendimiento', type: 'bloque-interdisciplinario', credits: 6, prerequisites: [] },
        { id: 6, name: 'Emprendimiento e Innovación', type: 'bloque-interdisciplinario', credits: 6, prerequisites: ['Habilidades de Emprendimiento'] },
        { id: 7, name: 'Responsabilidad Social', type: 'bloque-interdisciplinario', credits: 6, prerequisites: ['Emprendimiento e Innovación'] },
      ],
      selectedCourseIds: [],
      currentSection: 'seleccion',
    };
  },
  methods: {
    proceedToTopsort() {
      const selectedCourses = this.allCourses.filter(course => this.selectedCourseIds.includes(course.id));
      this.$emit('selected-courses', selectedCourses);
      this.$router.push('/topsort');
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.materias-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.section {
  margin-bottom: 20px;
}

.h2 {
  margin-bottom: 20px;
}

.courses-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.course-item {
  flex: 1 1 45%;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: 0.3s ease;
}

.course-item:hover {
  transform: scale(1.1);
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
}
</style>

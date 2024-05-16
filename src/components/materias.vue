<template>
    <div>
      <!-- Sección de Selección de Materias -->
      <div v-if="currentSection === 'seleccion'">
        <h2>Selecciona tus materias cursadas</h2>
        <div v-for="course in allCourses" :key="course.id">
          <label>
            <input type="checkbox" v-model="selectedCourseIds" :value="course.id">
            {{ course.name }}
          </label>
        </div>
        <button @click="proceedToDragDrop">Continuar</button>
      </div>
  
      <!-- Sección de Arrastrar y Soltar -->
      <div v-if="currentSection === 'dragdrop'">
        <h2>Organiza tu plan de estudio</h2>
        <DragAndDrop :remainingCourses="remainingStack" :selectedCourses="cursadasStack" @updateCourses="updateCourses" />
        <button @click="goToSection('seleccion')">Regresar a la Selección de Materias</button>
        <button @click="goToSection('cursadas')">Ver Materias Cursadas</button>
      </div>
  
      <!-- Sección de Materias Cursadas -->
      <div v-if="currentSection === 'cursadas'">
        <h2>Materias Cursadas</h2>
        <ul>
          <li v-for="course in cursadasStack" :key="course.id">
            {{ course.name }}
            <button @click="removeCursada(course)">Remover de Cursadas</button>
          </li>
        </ul>
        <button @click="goToSection('dragdrop')">Regresar al Plan de Estudio</button>
      </div>
    </div>
  </template>
  
  <script>
  import DragAndDrop from './dragAndDrop.vue';
  
  export default {
    components: {
      DragAndDrop,
    },
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
        cursadasStack: [],
        remainingStack: [],
        currentSection: 'seleccion',
      };
    },
    methods: {
      proceedToDragDrop() {
        const selectedCourses = this.allCourses.filter(course => this.selectedCourseIds.includes(course.id));
        const unselectedCourses = this.allCourses.filter(course => !this.selectedCourseIds.includes(course.id));
  
        this.cursadasStack = selectedCourses;
        this.remainingStack = unselectedCourses;
  
        this.currentSection = 'dragdrop';
      },
      updateCourses({ remainingCourses, selectedCourses }) {
        this.remainingStack = remainingCourses;
        this.cursadasStack = selectedCourses;
      },
      goToSection(section) {
        this.currentSection = section;
      },
      removeCursada(course) {
        const index = this.cursadasStack.findIndex(c => c.id === course.id);
        if (index !== -1) {
          this.cursadasStack.splice(index, 1);
          this.remainingStack.push(course);
        }
      }
    }
  };
  </script>
  
  <style>
  .draggable-item {
    cursor: grab;
    padding: 8px;
    margin-bottom: 4px;
    background-color: #f0f0f0;
  }
  </style>  
  
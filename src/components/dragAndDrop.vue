<template>
    <div class="flex">
      <div class="column-container">
        <div class="column" v-for="(column, columnIndex) in columns" :key="columnIndex" @dragover.prevent @drop="dropToColumn($event, columnIndex)">
          <h2 class="titulo">{{ column.name }}</h2>
          <div class="card" v-for="(card, cardIndex) in column.cards" :key="cardIndex" :class="card.type"
               draggable="true" @dragstart="dragStart(columnIndex, cardIndex)" @dragend="dragEnd">
            {{ card.name }}
          </div>
        </div>
      </div>
      <div class="materia" @dragover.prevent @drop="dropToMateria">
        <h2 class="titulo">Materias</h2>
        <div class="card" v-for="(card, index) in remainingCourses" :key="index" :class="card.type" draggable="true"
             @dragstart="dragStartGeneral(index)" @dragend="dragEnd">
          {{ card.name }}
        </div>
      </div>
      <div class="botones-container">
        <button @click="addSemester" class="boton">Agregar Semestre</button>
        <button @click="removeSemester" class="boton">Eliminar Semestre</button>
        <button @click="calculatePlan" class="boton">Calcular Plan</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, watch } from "vue";
  
  export default {
    props: ['remainingCourses', 'selectedCourses'],
    setup(props, { emit }) {
      const columns = ref([
        { name: "Semestre 1", cards: props.selectedCourses },
        { name: "Semestre 2", cards: [] },
        { name: "Semestre 3", cards: [] },
        { name: "Semestre 4", cards: [] },
        { name: "Semestre 5", cards: [] },
        { name: "Semestre 6", cards: [] },
        { name: "Semestre 7", cards: [] },
        { name: "Semestre 8", cards: [] },
      ]);
  
      let draggedCard = null;
  
      watch(props.remainingCourses, (newRemainingCourses) => {
        columns.value[0].cards = newRemainingCourses;
      }, { immediate: true });
  
      function dragStart(columnIndex, cardIndex) {
        draggedCard = JSON.parse(JSON.stringify(columns.value[columnIndex].cards[cardIndex]));
      }
  
      function dragStartGeneral(index) {
        draggedCard = JSON.parse(JSON.stringify(props.remainingCourses[index]));
      }
  
      function dragEnd() {
        draggedCard = null;
      }
  
      function dropToColumn(event, columnIndex) {
        if (draggedCard !== null) {
          const existingColumnIndex = columns.value.findIndex(column => isCardInColumn(column, draggedCard));
          if (existingColumnIndex === -1) {
            columns.value[columnIndex].cards.push(draggedCard);
          } else if (existingColumnIndex !== columnIndex) {
            columns.value[existingColumnIndex].cards = columns.value[existingColumnIndex].cards.filter(card => card.name !== draggedCard.name);
            columns.value[columnIndex].cards.push(draggedCard);
          }
          draggedCard = null;
          emitUpdate();
        }
      }
  
      function isCardInColumn(column, card) {
        return column.cards.some(c => c.name === card.name);
      }
  
      function dropToMateria() {
        if (draggedCard !== null) {
          const existingIndex = props.remainingCourses.findIndex(card => card.name === draggedCard.name);
          if (existingIndex !== -1) {
            props.remainingCourses.splice(existingIndex, 1);
          }
          props.remainingCourses.push(draggedCard);
          columns.value.forEach(column => {
            column.cards = column.cards.filter(card => card.name !== draggedCard.name);
          });
          draggedCard = null;
          emitUpdate();
        }
      }
  
      function addSemester() {
        const newSemesterName = `Semestre ${columns.value.length + 1}`;
        columns.value.push({ name: newSemesterName, cards: [] });
      }
  
      function removeSemester() {
        if (columns.value.length > 1) {
          columns.value.splice(columns.value.length - 1, 1);
        } else {
          console.log("No se pueden eliminar más semestres.");
        }
      }
  
      function emitUpdate() {
        emit('updateCourses', {
          remainingCourses: props.remainingCourses,
          selectedCourses: columns.value.flatMap(column => column.cards)
        });
      }
  
      return {
        columns,
        dragStart,
        dragStartGeneral,
        dragEnd,
        dropToColumn,
        dropToMateria,
        addSemester,
        removeSemester
      };
    },
  };
  </script>

<style scoped>
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(-50px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.plan-status {
    margin-top: 10px;
    font-weight: bold;
}

.flex {
    display: flex;
}

.AllMaterias {
    margin-bottom: 20px;
}

.column {
    flex-basis: calc(33.33% - 20px);
    margin-bottom: 20px;
    padding: 20px;
    background-color: #f9f9f9;
    border: 1px solid #ffffff;
    margin-right: 20px;
    margin-top: 10px;
    border-radius: 10px;
    height: 500px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.541);
    animation: slideIn 0.5s ease forwards;
}

.column-container {
    overflow-x: auto;
    white-space: nowrap;
    display: flex;
    animation: slideIn 0.5s ease forwards;
}


.column-container::-webkit-scrollbar {
    height: 10px;
    background-color: transparent;
}

.column-container::-webkit-scrollbar-thumb {
    background-color: #ffffff;
    border-radius: 4px;
}

.column-container::-webkit-scrollbar-thumb:hover {
    background-color: #999;
}

.card {
    width: 180px;
    height: 50px;
    margin-bottom: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.541);
    animation: slideIn 0.5s ease forwards;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

.bloque-anahuac {
    background-color: #FF5733;
    /* Naranja */
    color: rgb(255, 255, 255);
    margin-left: 30px;
    padding: 10px;
}

.bloque-profesional {
    background-color: #3498DB;
    /* Azul */
    color: white;
    margin-left: 30px;
    padding: 10px;
}

.bloque-interdisciplinario {
    background-color: #32bb26;
    /* Verde */
    color: white;
    margin-left: 30px;
    padding: 10px;
}

.materia {
    width: auto;
    flex-direction: column;
    align-items: center;
    height: auto;
    display: flex;
    border: 1px solid rgb(255, 255, 255);
    background-color: #f9f9f9;
    padding: 10px;
    margin-right: 10px;
    margin-left: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 30px;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.541);
    animation: slideIn 0.5s ease forwards;
}

.botones-container{
    width: 600px;
    height: 40px;
    justify-content: center;
}

.boton {
    padding: 10px 20px;
    font-size: 16px;
    background-color: #3a1704;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
    margin-left: 10px;
    
}

.boton:hover {
    transform: scale(1.2);
    margin-left: 40px;
    margin-right: 40px;
    background-color: black;
}



@media (max-width: 768px) {
    .bottom-button {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
    }
}
</style>
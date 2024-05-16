<template>
    <div class="flex">
        <!-- Contenedor para las fichas arrastradas -->
        <div class="column-container">
        <div class="column" v-for="(column, columnIndex) in columns" :key="columnIndex" @dragover.prevent
            @drop="dropToColumn($event, columnIndex)">
            <h2 class="titulo">{{ column.name }}</h2>
            <div class="card" v-for="(card, cardIndex) in column.cards" :key="cardIndex" :class="card.type"
                draggable="true" @dragstart="dragStart(columnIndex, cardIndex)" @dragend="dragEnd">
                {{ card.name }}
            </div>
        </div>
        </div>
    </div>
    <div class="materia" @dragover.prevent @drop="dropToMateria">
        <h2 class="titulo">Materias</h2>
        <div class="card" v-for="(card, index) in droppedCards" :key="index" :class="card.type" draggable="true"
            @dragstart="dragStartGeneral(index)" @dragend="dragEnd">
            {{ card.name }}
        </div>
    </div>
    <div class="botones-container">
        <button @click="addSemester" class="boton">Agregar Semestre</button>
        <button @click="removeSemester" class="boton">Eliminar Semestre</button>
        <button @click="calculatePlan" class="boton">Calcular Plan</button>
    </div>

</template>

<script>
import { ref } from "vue";
import Swal from "sweetalert2";

export default {
    setup() {
        const initialCardsAnahuac = [
            { name: "Liderazgo", type: "bloque-anahuac", credits: 3, prerequisites: [] },
            { name: "Antropología Fundamental", type: "bloque-anahuac", credits: 3, prerequisites: ["Liderazgo"] },
            { name: "Persona y Trascendencia", type: "bloque-anahuac", credits: 3, prerequisites: ["Antropología Fundamental"] },
        ];

        const initialCardsProfesional = [
            { name: "Algoritmos y Programación", type: "bloque-profesional", credits: 4.5, prerequisites: [] },
            { name: "Programación Orientada a Objetos", type: "bloque-profesional", credits: 4.5, prerequisites: ["Algoritmos y Programación"] },
            { name: "Estructura de Datos", type: "bloque-profesional", credits: 4.5, prerequisites: ["Programación Orientada a Objetos"] },
        ];

        const initialCardsInterdisciplinario = [
            { name: "Habilidades de Emprendimiento", type: "bloque-interdisciplinario", credits: 6, prerequisites: [] },
            { name: "Emprendimiento e Innovación", type: "bloque-interdisciplinario", credits: 6, prerequisites: ["Habilidades de Emprendimiento"] },
            { name: "Responsabilidad Social", type: "bloque-interdisciplinario", credits: 6, prerequisites: ["Emprendimiento e Innovación"] },
        ];

        const droppedCards = ref([...initialCardsAnahuac, ...initialCardsProfesional, ...initialCardsInterdisciplinario]);

        const columns = ref([
            { name: "Semestre 1", cards: [] },
            { name: "Semestre 2", cards: [] },
            { name: "Semestre 3", cards: [] },
            { name: "Semestre 4", cards: [] },
            { name: "Semestre 5", cards: [] },
            { name: "Semestre 6", cards: [] },
            { name: "Semestre 7", cards: [] },
            { name: "Semestre 8", cards: [] },
        ]);

        let draggedCard = null;

        const subjects = {
            ...initialCardsAnahuac.reduce((acc, card) => {
                acc[card.name] = card.prerequisites;
                return acc;
            }, {}),
            ...initialCardsProfesional.reduce((acc, card) => {
                acc[card.name] = card.prerequisites;
                return acc;
            }, {}),
            ...initialCardsInterdisciplinario.reduce((acc, card) => {
                acc[card.name] = card.prerequisites;
                return acc;
            }, {}),
        };

        const planStatus = ref(null);

        function dragStart(columnIndex, cardIndex) {
            draggedCard = JSON.parse(JSON.stringify(columns.value[columnIndex].cards[cardIndex]));
        }

        function dragStartGeneral(index) {
            draggedCard = JSON.parse(JSON.stringify(droppedCards.value[index]));
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
            }
        }

        function isCardInColumn(column, card) {
            return column.cards.some(c => c.name === card.name);
        }

        function dropToMateria() {
            if (draggedCard !== null) {
                const existingIndex = droppedCards.value.findIndex(card => card.name === draggedCard.name);
                if (existingIndex !== -1) {
                    droppedCards.value.splice(existingIndex, 1);
                }
                droppedCards.value.push(draggedCard);
                columns.value.forEach(column => {
                    column.cards = column.cards.filter(card => card.name !== draggedCard.name);
                });
                draggedCard = null;
            }
        }

        function addSemester() {
            if (columns.value.length < 12) {
                const newSemesterName = `Semestre ${columns.value.length + 1}`;
                columns.value.push({ name: newSemesterName, cards: [] });
            } else{
                console.log("No se pueden agregar más semestres.");
            }
        }

        function removeSemester() {
            if (columns.value.length > 1) {
                columns.value.splice(columns.value.length - 1, 1);
            } else {
                console.log("No se pueden eliminar más semestres.");
            }
        }

        function topologicalSort(graph) {
            const visited = new Set();
            const stack = [];

            function dfs(node) {
                visited.add(node);
                for (const neighbor of graph[node] || []) {
                    if (!visited.has(neighbor)) {
                        dfs(neighbor);
                    }
                }
                stack.push(node);
            }

            for (const node in graph) {
                if (!visited.has(node)) {
                    dfs(node);
                }
            }

            return stack.reverse();
        }

        function calculatePlan() {
            planStatus.value = null;

            // Crear el grafo de dependencias
            const graph = {};
            for (const column of columns.value) {
                for (const card of column.cards) {
                    for (const prerequisite of subjects[card.name] || []) {
                        if (!graph[prerequisite]) {
                            graph[prerequisite] = new Set();
                        }
                        graph[prerequisite].add(card.name);
                    }
                }
            }

            // Aplicar el algoritmo de ordenamiento topológico
            const orderedSubjects = topologicalSort(graph);

            // Verificar el plan de estudios con el orden obtenido
            for (const subject of orderedSubjects) {
                // Buscar el índice del semestre donde se encuentra la materia
                const semesterIndex = findSemesterIndex(subject);
                if (semesterIndex === -1) {
                    planStatus.value = `Plan Erróneo: La materia "${subject}" no está en ningún semestre.`;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: planStatus.value = `Plan Erróneo: La materia "${subject}" no está en ningún semestre.`,
                    });
                    break;
                }
                // Verificar si los prerequisitos se cumplen en semestres anteriores
                for (const prerequisite of subjects[subject] || []) {
                    const prereqSemesterIndex = findSemesterIndex(prerequisite);
                    if (prereqSemesterIndex === -1 || prereqSemesterIndex >= semesterIndex) {
                        planStatus.value = `Plan Erróneo: No puedes cursar "${subject}" sin haber tomado "${prerequisite}"`;
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: planStatus.value = `Plan Erróneo: No puedes cursar "${subject}" sin haber tomado "${prerequisite}"`,
                        });
                        break;
                    }
                }
                if (planStatus.value) {
                    break;
                }
            }

            if (!planStatus.value) {
                planStatus.value = "Plan Correcto: Puedes cursar todas las materias en el orden adecuado.";
                Swal.fire({
                    icon: 'success',
                    title: '¡Genial!',
                    text: 'Plan Correcto: Puedes cursar todas las materias en el orden adecuado.',
                });
            }
        }

        function findSemesterIndex(subjectName) {
            // Busca el índice del semestre donde se encuentra la materia
            for (let i = 0; i < columns.value.length; i++) {
                const column = columns.value[i];
                if (column.cards.some(card => card.name === subjectName)) {
                    return i; // Retorna el índice del semestre donde se encuentra la materia
                }
            }
            return -1; // Retorna -1 si la materia no está en ningún semestre
        }

        return {
            columns,
            droppedCards,
            dragStart,
            dragStartGeneral,
            dragEnd,
            dropToColumn,
            dropToMateria,
            addSemester,
            removeSemester,
            calculatePlan,
            planStatus,
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
    height: 100px;
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
    transition: 0.3s;
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
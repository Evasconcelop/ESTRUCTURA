<template>
    <div class="flex">
        <topsort @selected-courses="handleSelectedCourses" />
        <!-- Contenedor para las fichas arrastradas -->
        <div class="column-container">
            <div class="column" v-for="(column, columnIndex) in columns" :key="columnIndex" @dragover.prevent @drop="dropToColumn($event, columnIndex)">
                <h2 class="titulo">{{ column.name }}</h2>
                <div class="card" v-for="(card, cardIndex) in column.cards" :key="cardIndex" :class="card.type" draggable="true" @dragstart="dragStart(columnIndex, cardIndex)" @dragend="dragEnd">
                    {{ card.name }}
                </div>
            </div>
        </div>
    </div>

    <div class="materia" @dragover.prevent @drop="dropToMateria">
        <h2 class="AllMaterias">Materias</h2>
        
        <!-- Simbología de colores -->
        <div class="legend">
            <div class="legend-item">
                <span class="legend-color bloque-anahuac"></span>
                <span>Bloque Anahuac</span>
            </div>
            <div class="legend-item">
                <span class="legend-color bloque-profesional"></span>
                <span>Bloque Profesional</span>
            </div>
            <div class="legend-item">
                <span class="legend-color bloque-interdisciplinario"></span>
                <span>Bloque Interdisciplinario</span>
            </div>
        </div>

        <div class="cards-container">
            <div class="card" v-for="(card, index) in droppedCards" :key="index" :class="card.type" draggable="true" @dragstart="dragStartGeneral(index)" @dragend="dragEnd">
                {{ card.name }}
            </div>
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
            { name: "Liderazgo Personal", type: "bloque-anahuac", credits: 3, prerequisites: [] },
            { name: "Liderazgo en Equipos", type: "bloque-anahuac", credits: 3, prerequisites: ["Liderazgo Personal"] },
            { name: "Ser Universitario", type: "bloque-anahuac", credits: 3, prerequisites: [] },
            { name: "Antropología", type: "bloque-anahuac", credits: 3, prerequisites: ["Ser Universitario"] },
            { name: "Persona y Trascendencia", type: "bloque-anahuac", credits: 3, prerequisites: ["Antropología"] },
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
                    planStatus.value = {
                        valid: false,
                        message: `La materia ${subject} no está en ningún semestre.`,
                    };
                    Swal.fire({
                        icon: 'error',
                        title: 'Error en el Plan de Estudios',
                        text: planStatus.value.message,
                    });
                    return;
                }

                // Verificar las materias que deben ser cursadas antes
                for (const prerequisite of subjects[subject] || []) {
                    const prerequisiteSemesterIndex = findSemesterIndex(prerequisite);
                    if (prerequisiteSemesterIndex === -1 || prerequisiteSemesterIndex >= semesterIndex) {
                        planStatus.value = {
                            valid: false,
                            message: `La materia ${subject} tiene la prerrequisito ${prerequisite} en un semestre posterior.`,
                        };
                        Swal.fire({
                            icon: 'error',
                            title: 'Error en el Plan de Estudios',
                            text: planStatus.value.message,
                        });
                        return;
                    }
                }
            }

            // Si no se encontraron errores
            planStatus.value = {
                valid: true,
                message: 'El plan de estudios es válido.',
            };
            Swal.fire({
                icon: 'success',
                title: 'Plan de Estudios Válido',
                text: planStatus.value.message,
            });
        }

        function findSemesterIndex(subject) {
            for (let i = 0; i < columns.value.length; i++) {
                if (columns.value[i].cards.some(card => card.name === subject)) {
                    return i;
                }
            }
            return -1;
        }

        function handleSelectedCourses(selectedCourses) {
            droppedCards.value = selectedCourses;
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
            handleSelectedCourses,
            planStatus,
        };
    },
};
</script>

<style scoped>
.column-container {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

.column {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
}

.titulo {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.card {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: grab;
}

.materia {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f9f9f9;
}

.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.boton {
    padding: 10px 20px;
    margin-right: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

.boton:hover {
    background-color: #0056b3;
}

/* Colores para las materias */
.bloque-anahuac {
    background-color: #ff8800;
}

.bloque-profesional {
    background-color: #007bff;
}

.bloque-interdisciplinario {
    background-color: #28a745;
}

/* Estilos para la leyenda */
.legend {
    margin-bottom: 20px;
    display: flex;
    margin-left: 25%;
}

.legend-item {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    margin-left: 5%;
}

.legend-color {
    width: 20px;
    height: 20px;
    display: inline-block;
    margin-right: 10px;
}
</style>

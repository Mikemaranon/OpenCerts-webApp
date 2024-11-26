// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    const jsonUrl = '../Answers/dp203/dp-203.json';

    fetch(jsonUrl) // esta ruta tiene que ser una variable para poder usarse en distintos exámenes
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el JSON');
            return response.json();
        })
        .then(data => {
            renderQuestions(data); // Llama a la función de renderizado
        })
        .catch(error => {
            console.error('Error:', error);
        });
});


function renderQuestions(jsonList) {
    const container = document.querySelector('.center-section'); // Contenedor de las preguntas

    for (let i = 0; i < jsonList.length; i++) {
        const question = jsonList[i];
        let questionHTML = '';

        switch (question.type) {
            case 'single-select':
                questionHTML = `
                <div class="question" id="question${question.id}">
                    <h3>Pregunta ${question.id}</h3>
                    <p class="description">${question.question}</p>
                    <form class="single-select" id="question${question.id}-form">
                        ${question.options
                            .map(
                                (option, index) => `
                            <label>
                                <input type="radio" name="question${question.id}" value="${index}">
                                ${option}
                            </label>
                        `
                            )
                            .join('')}
                    </form>
                </div>`;
                break;

            case 'multiple-choice':
                questionHTML = `
                <div class="question" id="question${question.id}">
                    <h3>Pregunta ${question.id}</h3>
                    <p class="description">${question.question}</p>
                    <form class="multiple-choice" id="question${question.id}-form">
                        ${question.options
                            .map(
                                (option, index) => `
                            <label>
                                <input type="checkbox" name="question${question.id}" value="${index}">
                                ${option}
                            </label>
                        `
                            )
                            .join('')}
                    </form>
                </div>`;
                break;

            case 'drag-drop':
                questionHTML = `
                <div class="question drag-drop" id="question${question.id}">
                    <h3>Pregunta ${question.id}</h3>
                    <p class="description">${question.question}</p>
                    <div class="drag-drop-container">
                        <div class="draggables">
                            ${question.options
                                .map(
                                    (option, index) => `
                                <div class="draggable" draggable="true" id="drag${question.id}-${index}">
                                    ${option}
                                </div>
                            `
                                )
                                .join('')}
                        </div>
                        <div class="droppables">
                            ${question.options
                                .map(
                                    (_, index) => `
                                <div class="droppable" id="drop${question.id}-${index}">
                                    <!-- Drop here -->
                                </div>
                            `
                                )
                                .join('')}
                        </div>
                    </div>
                </div>`;
                break;

            default:
                console.error(`Unknown question type: ${question.type}`);
        }

        // Añadir la pregunta generada al contenedor principal
        // container.innerHTML += questionHTML;
        mainContent.appendChild(questionHTML);
    }
}

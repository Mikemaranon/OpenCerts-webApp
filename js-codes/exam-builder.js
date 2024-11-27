// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

    const jsonUrl = '../../Answers/dp203/dp-203.json'; // esta ruta tiene que ser una variable para poder usarse en distintos exámenes

    fetch(jsonUrl) 
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
                        <div class="buttons">
                            <button type="submit">Enviar</button>
                        </div>
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
                        <div class="buttons">
                            <button type="submit">Enviar</button>
                        </div>  
                    </form>
                </div>`;
                break;

            case 'drag-drop':
                questionHTML = `
                <div class="question" id="question${question.id}">
                    <h3>Pregunta ${question.id}</h3>
                    <p class="description">${question.question}</p>
                    <form class="drag-drop" id="question${question.id}">
                        <div class="drag-drop-zone-container">
                            <div class="drag-zone">
                                ${question.options
                                    .map(
                                        (option, index) => `
                                    <div class="draggable ${index + 1}" draggable="true" id="block${question.id}-${index + 1}">
                                        ${option}
                                    </div> 
                                `
                                    )
                                    .join('')}
                            </div>
                            <div class="drop-zone">
                                ${question.options
                                    .map(
                                        (_, index) => `
                                    <div class="droppable" id="zone${index + 1}">
                                        <!-- Drop here -->
                                    </div>
                                `
                                    )
                                    .join('')}
                            </div>
                        </div>
                        <div class="buttons">
                            <button type="submit">Enviar</button>
                            <button type="button" id="reset-btn" onclick="">Reiniciar</button>
                        </div>
                    </form>
                </div>`;
                break;

            case 'hot-spot':
                questionHTML = `
                <div class="question" id="question${question.id}">
                    <h3>Pregunta ${question.id}</h3>
                    <p class="description">${question.question}</p>
                    <form class="hot-spot" id="question${question.id}-form">
                        ${Object.keys(question.options)
                            .map(
                                (key, index) => `
                            <label class="margin-label">${key}
                            <select name="question[${index + 1}]" id="select[${index + 1}]">
                                ${question.options[key]
                                    .map(
                                        (option, subIndex) => `
                                    <option value="opcion${subIndex + 1}">${option}</option>
                                `
                                    )
                                    .join('')}
                            </select></label>
                        `
                            )
                            .join('')}
                        <div class="buttons">
                            <button type="submit">Enviar</button>
                        </div>
                    </form>
                </div>`;
                break;

            default:
                console.error(`Unknown question type: ${question.type}`);
        }
        questionHTML += `<br>`
        // Añadir la pregunta generada al contenedor principal
        container.innerHTML += questionHTML;
    }

    
    questionHTML = ` <footer>
        Web designed by Miguel Marañón Quero & Roberto García Moreno
    </footer>`

    container.innerHTML += questionHTML;

    ini_dragDrop();
    ini_multipleChoice();
    ini_singleSelect();
    ini_hotSpot();
}
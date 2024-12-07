// Espera a que el DOM esté completamente cargado

jsonUrl = document.querySelector(".jsonDirectory").innerHTML;
const JSON_LIST = fetch(jsonUrl);

document.addEventListener('DOMContentLoaded', () => {

    console.log(jsonUrl)

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

    
    tags = document.querySelector(".jsonDirectoryTags").innerHTML;

    // Cargar el JSON y procesarlo
    fetch(tags)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al cargar el JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            setTagSelector(data);
        })
        .catch(error => {
            console.error('Error al procesar el JSON:', error);
        });

});

function recallQuestions() {
    console.log(jsonUrl)

    fetch(jsonUrl) 
        .then(response => {
            if (!response.ok) throw new Error('Error al cargar el JSON');
            return response.json();
        })
        .then(data => {
            applyFilter(data); // Llama a la función de renderizado
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function applyFilter(data) {
    const container = document.querySelector('.questions-container');
    const index = document.querySelector('.topic-index');
    const taggedData = [];
    let contador = 0;

    if (tag_list.length == 0) {
        container.innerHTML = '';
        index.innerHTML = '<h2>Índice</h2><br>';
        renderQuestions(data);
    } else {
        console.log("cantidad de etiquetas: ", tag_list.length);

        for(let i = 0; i < data.length; i++) { // leemos cada pregunta en data
            for(let x = 0; x < data[i].tags.length; x++) { // leemos cada etiqueta en la pregunta
                for(let y = 0; y < tag_list.length; y++) { // leemos cada elemento de la lista de etiquetas
                    if(data[i].tags[x] == tag_list[y]) { // comparamos cada etiqueta de la pregunta con cada elemento de la lista
                        contador++;
                        if(contador == tag_list.length) {
                            taggedData.push(data[i]);
                            contador = 0;
                            break;
                        }
                    }
                }
            }
        }
        container.innerHTML = '';
        index.innerHTML = '<h2>Índice</h2><br>';
        renderQuestions(taggedData);
    }
    
    taggedData.length = 0;
    tag_list.length = 0;    
}

function renderQuestions(jsonList) {

    const container = document.querySelector('.questions-container'); // Contenedor de las preguntas
    const index = document.querySelector('.topic-index'); // Contenedor del índice
    let questionHTML = '';
    let questionContent = '';
    let indexHTML = `
        <ul>
    `;
    let currentTopic = 0;
            
    for (let i = 0; i < jsonList.length; i++) {

        const question = jsonList[i];

        // Condicional de crear tema nuevo solo si se aumenta de tema
        if (currentTopic != question.topic) {
            // Si es el primero, no hay que cerrar lista anterior
            if (currentTopic != 0) {
                indexHTML += '</ul></li>';
            }
            currentTopic = question.topic;
            // Creamos tema nuevo, asignamos enlace a la primera pregunta del tema
            indexHTML += `
                <li>    
                    <a href="#t${currentTopic}q1" id="t${currentTopic}">Tema ${currentTopic}</a>
                    <ul class="sublist">
                        <li><a href="#t${question.topic}q${question.id}">Pregunta ${question.id}</a></li>
            `;
        } else {
            if (question.id % 10 === 0) {
                indexHTML += `
                <li><a href="#t${question.topic}q${question.id}">Pregunta ${question.id}</a></li>
                `;
            }
        }

        switch (question.type) {
            case 'single-select':
                questionContent = '';

                // Procesamos el contenido de la pregunta basado en las claves desc1, desc2, etc.
                Object.keys(question.question).forEach(key => {
                    if (key.startsWith('desc')) {
                        // Añadimos el contenido de las descripciones dentro de un <p class="description">
                        questionContent += `<p class="description">${question.question[key]}</p>`;
                    }
                    if (key.startsWith('img')) {
                        // Añadimos la imagen dentro de un <img>
                        questionContent += `<img src="${question.question[key]}" />`;
                    }
                    if (key === 'u_list') {
                        // Creamos una lista <ul> para los elementos de la lista u-list
                        questionContent += `<ul class="u_list">`;
                        question.question[key].forEach(item => {
                            questionContent += `<li>${item}</li>`;
                        });
                        questionContent += `</ul>`;
                    }
                    if (key.startsWith('code')) {
                        questionContent += `<div class="code">${question.question[key]}</div>`;
                    }
                });
                questionHTML = `
                <br id="t${question.topic}q${question.id}">
                <div class="question" id="question${question.id}">
                    <h1>Pregunta ${question.id}</h1><br>
                    ${questionContent}<br>
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
                questionContent = '';

                // Procesamos el contenido de la pregunta basado en las claves desc1, desc2, etc.
                Object.keys(question.question).forEach(key => {
                    if (key.startsWith('desc')) {
                        // Añadimos el contenido de las descripciones dentro de un <p class="description">
                        questionContent += `<p class="description">${question.question[key]}</p>`;
                    }
                    if (key.startsWith('img')) {
                        // Añadimos la imagen dentro de un <img>
                        questionContent += `<img src="${question.question[key]}" />`;
                    }
                    if (key === 'u_list') {
                        // Creamos una lista <ul> para los elementos de la lista u-list
                        questionContent += `<ul class="u_list">`;
                        question.question[key].forEach(item => {
                            questionContent += `<li>${item}</li>`;
                        });
                        questionContent += `</ul>`;
                    }
                    if (key.startsWith('code')) {
                        questionContent += `<div class="code">${question.question[key]}</div>`;
                    }
                });
                questionHTML = `
                <br id="t${question.topic}q${question.id}">
                <div class="question" id="question${question.id}">
                    <h1>Pregunta ${question.id}</h1><br>
                    ${questionContent}<br>
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
                questionContent = '';

                // Procesamos el contenido de la pregunta basado en las claves desc1, desc2, etc.
                Object.keys(question.question).forEach(key => {
                    if (key.startsWith('desc')) {
                        // Añadimos el contenido de las descripciones dentro de un <p class="description">
                        questionContent += `<p class="description">${question.question[key]}</p>`;
                    }
                    if (key.startsWith('img')) {
                        // Añadimos la imagen dentro de un <img>
                        questionContent += `<img src="${question.question[key]}" />`;
                    }
                    if (key === 'u_list') {
                        // Creamos una lista <ul> para los elementos de la lista u-list
                        questionContent += `<ul class="u_list">`;
                        question.question[key].forEach(item => {
                            questionContent += `<li>${item}</li>`;
                        });
                        questionContent += `</ul>`;
                    }
                    if (key.startsWith('code')) {
                        questionContent += `<div class="code">${question.question[key]}</div>`;
                    }
                });
                questionHTML = `
                <br id="t${question.topic}q${question.id}">
                <div class="question" id="question${question.id}">
                    <h1>Pregunta ${question.id}</h1><br>
                    ${questionContent}<br>
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
                questionContent = '';

                // Procesamos el contenido de la pregunta basado en las claves desc1, desc2, etc.
                Object.keys(question.question).forEach(key => {
                    if (key.startsWith('desc')) {
                        // Añadimos el contenido de las descripciones dentro de un <p class="description">
                        questionContent += `<p class="description">${question.question[key]}</p>`;
                    }
                    if (key.startsWith('img')) {
                        // Añadimos la imagen dentro de un <img>
                        questionContent += `<img src="${question.question[key]}" />`;
                    }
                    if (key === 'u_list') {
                        // Creamos una lista <ul> para los elementos de la lista u-list
                        questionContent += `<ul class="u_list">`;
                        question.question[key].forEach(item => {
                            questionContent += `<li>${item}</li>`;
                        });
                        questionContent += `</ul>`;
                    }
                    if (key.startsWith('code')) {
                        questionContent += `<div class="code">${question.question[key]}</div>`;
                    }
                });
                questionHTML = `
                <br id="t${question.topic}q${question.id}">
                <div class="question" id="question${question.id}">
                    <h1>Pregunta ${question.id}</h1><br>
                    ${questionContent}<br>
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
        // Añadir la pregunta generada y el enlace al contenedor principal
        container.innerHTML += questionHTML;

        questionHTML = '';
    }
    
    questionHTML = `<footer>
        Web designed by Miguel Marañón Quero & Roberto García Moreno
    </footer>`;

    indexHTML += '</ul>'
    // Añade contenido generado al DOM
    index.innerHTML += indexHTML;
    container.innerHTML += questionHTML;

    // Inicializar las funcionalidades
    ini_dragDrop();
    ini_multipleChoice();
    ini_singleSelect();
    ini_hotSpot();
    ini_searchTag();
}
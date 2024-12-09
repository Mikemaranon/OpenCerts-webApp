let tag_list = [];

function ini_searchTag() {
    const input = document.getElementById('searchable-select');
    const button = document.getElementById('addButton');
    const container = document.getElementById('container');
    
    // Función para añadir un div
    button.addEventListener('click', () => {
        const text = input.value.trim(); // Captura el texto y elimina espacios extra
        if (text !== '') {
            const newDiv = document.createElement('div');
            newDiv.className = 'dynamic-div'; // Clase para el estilo
            newDiv.type = 'btn'
            newDiv.textContent = text; // Establece el texto

            // Añade evento para eliminar al hacer doble clic
            newDiv.addEventListener('click', () => {
              container.removeChild(newDiv); // Elimina el div del contenedor
            });
          
            container.appendChild(newDiv); // Añade el div al contenedor
            input.value = ''; // Limpia el input
        }
    });
    
    // Permitir añadir al presionar "Enter"
    input.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            button.click();
        }
    });
}

function refreshTags() {
    const tags = document.querySelectorAll('.dynamic-div');

    for (const tag of tags) {
        tag_list.push(tag.innerHTML);
        console.log(tag.innerHTML);
    }
    recallQuestions();
}

$(document).ready(function() {
    $('#searchable-select').select2({
        placeholder: "Select an option",
        width: "150px",
        height: "100px !important",
        allowClear: true,
        borderRadius: "10px",  
    });
});

const selectElement = document.getElementById('searchable-select');
let data = null;

function addExamTags() {
    data = document.querySelector('.jsonDirectoryTags')
}

function setTagSelector(data) {
    // Iterar sobre el JSON y agregar opciones al <select>
    data.forEach(item => {
        if (item !== "") { // Ignorar valores vacíos
            const option = document.createElement('option');
            option.value = item; // Asignar el valor
            option.textContent = item; // Asignar el texto visible
            selectElement.appendChild(option); // Añadir al <select>
        }
    });
}
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
            newDiv.addEventListener('dblclick', () => {
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
        height: "80px",
        allowClear: true
    });
});

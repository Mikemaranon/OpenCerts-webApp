function sendDragDropResponse(questionId) {
    let form = document.querySelector(`#${questionId}-form`);
    let droppedBlocks = form.querySelectorAll('.droppable');

    let answers = [];
    droppedBlocks.forEach(zone => {
        let block = zone.firstChild ? zone.firstChild.id : null;
        if (block) {
            answers.push({ zone: zone.id, block: block });
        }
    });

    if (answers.length > 0) {
        // Enviar las respuestas al servidor PHP
        fetch('validate_answer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: questionId,
                answers: answers
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.isCorrect) {
                alert('Respuesta correcta');
            } else {
                alert('Respuesta incorrecta');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Por favor arrastra los bloques a las zonas de respuesta');
    }
}

document.querySelectorAll('.drag-drop').forEach((form) => {
    const draggables = form.querySelectorAll('.draggable');
    const droppables = form.querySelectorAll('.droppable');
    const resetButton = form.querySelector('#reset-btn');
    const dragZone = form.querySelector('.drag-zone');

    // Almacenar el ID del formulario activo
    let currentFormId = form.id;

    // Configurar el evento de inicio de arrastre
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData('text/plain', draggable.id);
            event.dataTransfer.setData('form-id', currentFormId); // Guardar el ID del formulario activo
            setTimeout(() => {
                draggable.style.display = 'none'; // Ocultar temporalmente el elemento arrastrado
            }, 0);
        });

        draggable.addEventListener('dragend', () => {
            draggable.style.display = ''; // Restaurar la visibilidad del elemento al finalizar el arrastre
        });
    });

    // Configurar el comportamiento de las zonas de respuesta
    droppables.forEach(zone => {
        zone.addEventListener('dragover', (event) => {
            event.preventDefault(); // Permitir el evento drop
            zone.style.backgroundColor = '#b2ebf2'; // Indicar visualmente que el droppable está activo
        });

        zone.addEventListener('dragleave', () => {
            zone.style.backgroundColor = ''; // Restaurar el color cuando el ratón salga de la zona
        });

        zone.addEventListener('drop', (event) => {
            event.preventDefault();

            const blockId = event.dataTransfer.getData('text/plain');
            const block = document.getElementById(blockId);
            const formId = event.dataTransfer.getData('form-id');

            // Verificar si el bloque pertenece al formulario actual
            if (formId === currentFormId) {
                if (zone.childElementCount === 0) {
                    zone.appendChild(block); // Mover el bloque al droppable
                    zone.style.backgroundColor = ''; // Restaurar el color de fondo
                } else {
                    zone.style.backgroundColor = '#ffcccc'; // Indicar error si ya hay un elemento
                    setTimeout(() => {
                        zone.style.backgroundColor = '';
                    }, 500);
                }
            } else {
                alert('Este elemento pertenece a otra pregunta.');
            }
        });
    });

    // Configurar el botón de reinicio
    resetButton.addEventListener('click', () => {
        // Obtener todos los bloques de la zona de arrastre y de las zonas de respuesta
        const allBlocks = Array.from(form.querySelectorAll('.draggable'));

        // Ordenar los bloques por el número detrás del guion en su atributo id
        allBlocks.sort((a, b) => {
            const numA = parseInt(a.id.split('-')[1], 10);
            const numB = parseInt(b.id.split('-')[1], 10);
            return numA - numB; // Orden ascendente
        });

        // Vaciar todas las zonas de respuesta devolviendo los bloques a la zona de arrastre
        droppables.forEach(zone => {
            while (zone.firstChild) {
                dragZone.appendChild(zone.firstChild);
            }
        });

        // Reordenar los bloques en la zona de arrastre
        allBlocks.forEach(block => dragZone.appendChild(block));
    });
});


document.querySelectorAll('.drag-drop').forEach((form) => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Formulario enviado sin recargar la página');
    });
})
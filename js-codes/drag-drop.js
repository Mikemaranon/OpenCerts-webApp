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
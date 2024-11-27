function sendMultipleChoiceResponse(questionId) {
    let form = document.getElementById(`${questionId}-form`);
    let selectedOptions = form.querySelectorAll('input[type="checkbox"]:checked');
    let answers = Array.from(selectedOptions).map(option => option.value);

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
                alert('Respuestas correctas');
            } else {
                alert('Algunas respuestas son incorrectas');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    } else {
        alert('Por favor selecciona al menos una opción');
    }
}

function ini_multipleChoice() {
    document.querySelectorAll('.multiple-choice').forEach((form) => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Formulario enviado sin recargar la página');
        });
    });
}

                    

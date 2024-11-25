function sendSingleSelectResponse(questionId) {
    let form = document.getElementById(`${questionId}-form`);
    let selectedOption = form.querySelector('input[type="radio"]:checked');

    if (selectedOption) {
        let answer = selectedOption.value;
        
        // Enviar la respuesta al servidor PHP
        fetch('validate_answer.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                questionId: questionId,
                answer: answer
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
        alert('Por favor selecciona una opción');
    }
} 

document.querySelectorAll('.single-select').forEach((form) => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Formulario enviado sin recargar la página');
    });
})
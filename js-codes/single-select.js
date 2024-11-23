
function singleSelect_checkAnswer() {
    let form = document.getElementById('question10-form');
                    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('Formulario enviado sin recargar la página');
    });
}
    
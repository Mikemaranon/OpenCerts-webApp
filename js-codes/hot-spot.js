function ini_hotSpot() {
    document.querySelectorAll('.hot-spot').forEach((form) => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            console.log('Formulario enviado sin recargar la página');
        });
    })
}
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleDropdown");
    const dropdownMenu = document.getElementById("dropdownMenu");
    toggleButton.addEventListener("click", function () {
        // Alterna la visibilidad del menú desplegable
        const isVisible = dropdownMenu.style.display === "flex";
        dropdownMenu.style.display = isVisible ? "none" : "flex";
    });
    // Cierra el menú si se hace clic fuera de él
    document.addEventListener("click", function (event) {
        if (!toggleButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    });
});

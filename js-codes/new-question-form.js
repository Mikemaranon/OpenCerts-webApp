function addImageInput() {
    const container = document.getElementById("additional-fields");

    // Crear un contenedor para la imagen y su vista previa
    const imageDiv = document.createElement("div");
    imageDiv.classList.add("image-container");

    // Crear un input de tipo archivo
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.name = "uploaded_image";
    imageInput.classList.add("image-input");
    imageInput.onchange = function (event) {
        handleImageUpload(event, imageDiv, imageInput);
    };

    // Crear el botón de eliminar
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-button");
    deleteButton.disabled = false; // Disable the button initially

    deleteButton.onclick = () => {
        imageDiv.remove();
        imageInput.value = ""; // Clear the input value
        deleteButton.disabled = true; // Disable the button again
        // Re-add the delete button to the imageDiv
        imageDiv.appendChild(deleteButton);
    };

    // Añadir input y botón al contenedor
    imageDiv.appendChild(deleteButton);
    imageDiv.appendChild(imageInput);
    container.appendChild(imageDiv);
    container.appendChild(document.createElement("br"));
}


function handleImageUpload(event, imageDiv, imageInput) {
    const file = event.target.files[0];

    if (file) {
        // Crear vista previa de la imagen
        const reader = new FileReader();
        const imagePreview = document.createElement("img");
        const imageTitle = document.createElement("p");
        const deleteButton = document.createElement("div");

        // Añadir clases a los elementos
        imagePreview.classList.add("image-preview");
        imageTitle.classList.add("image-title");
        deleteButton.classList.add("delete-button");

        reader.onload = function (e) {
            imagePreview.src = e.target.result;
            imageTitle.textContent = file.name;
        };
        reader.readAsDataURL(file);

        // Ocultar el input de archivo
        imageInput.style.display = "none";

        // Funcionalidad del botón X
        deleteButton.textContent = "X";
        deleteButton.onclick = function () {
            imageDiv.innerHTML = ""; // Eliminar contenido del contenedor
            imageDiv.appendChild(imageInput); // Volver a añadir el botón de cargar imagen
            imageInput.value = ""; // Resetear el input
            imageInput.style.display = "block"; // Mostrar el input nuevamente
            // Re-enable and re-add the original delete button
            const originalDeleteButton = document.createElement("button");
            originalDeleteButton.textContent = "x";
            originalDeleteButton.classList.add("delete-button");
            originalDeleteButton.disabled = false;
            originalDeleteButton.onclick = () => {
                imageDiv.remove();
                imageInput.value = ""; // Clear the input value
                originalDeleteButton.disabled = true; // Disable the button again
                imageDiv.appendChild(originalDeleteButton);
            };
            imageDiv.appendChild(originalDeleteButton);
        };

        // Añadir elementos al contenedor
        imageDiv.appendChild(imagePreview);
        imageDiv.appendChild(imageTitle);
        imageDiv.appendChild(deleteButton);
    }
}

// Add event listener to the image input
//document.getElementById("image-input").addEventListener("change", handleImageUpload);

// Función para añadir un textarea
function addTextarea(type) {
    const container = document.getElementById("additional-fields");

    const textareaDiv = document.createElement("div");
    textareaDiv.classList.add("textarea-container");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    deleteButton.classList.add("delete-button");
    deleteButton.onclick = () => {
        textareaDiv.remove();
    };

    const textarea = document.createElement("textarea");
    textarea.classList.add("custom-textarea");

    if (type == "list") {
        textarea.name = "list_elements";
        textarea.placeholder = "Introduce una lista de elementos separados por comas";
    } else if (type == "code") {
        textarea.name = "code_snippet";
        textarea.placeholder = "Introduce código en SQL u otro lenguaje";
    } else if (type == "description") {
        textarea.name = "description";
        textarea.placeholder = "Introduce una descripción";
    }

    textareaDiv.appendChild(deleteButton);
    textareaDiv.appendChild(textarea);
    container.appendChild(textareaDiv);
}
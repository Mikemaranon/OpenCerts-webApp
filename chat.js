const chatHistory = document.getElementById('chat-history');
const chatMessage = document.getElementById('chat-message');

// Función para enviar el mensaje del usuario
function sendMessage() {
    const message = chatMessage.value;
    if (message.trim() !== "") {
        // Crear el div del mensaje del usuario
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user');
        userMessageDiv.textContent = message;
        chatHistory.appendChild(userMessageDiv);

        // Limpiar el campo de entrada
        chatMessage.value = "";

        // Simular una respuesta de la IA
        getAIResponse(message);

        // Desplazar el historial hacia abajo
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

// Función para simular la respuesta de la IA
function getAIResponse(userMessage) {
    // Simulamos una espera de 1 segundo para la respuesta
    setTimeout(() => {
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.classList.add('message', 'ai');
        aiMessageDiv.textContent = "IA: Esta es una respuesta simulada a tu mensaje: " + userMessage;
        chatHistory.appendChild(aiMessageDiv);

        // Desplazar el historial hacia abajo
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1000);
}

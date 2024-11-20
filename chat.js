const chatHistory = document.getElementById('chat-history');
const chatMessage = document.getElementById('chat-message');

// Función para enviar el mensaje y agregarlo al historial
function sendMessage() {
    const message = chatMessage.value;
    if (message.trim() !== "") {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = "Tú: " + message;
        chatHistory.appendChild(messageDiv);
        
        // Aquí se agregaría la llamada a la API para obtener la respuesta de la IA
        getAIResponse(message);
        
        // Limpiar el campo de mensaje
        chatMessage.value = "";
        
        // Desplazar el historial hacia abajo
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

// Función para obtener la respuesta de la IA
function getAIResponse(message) {
    // Simulamos una respuesta de IA por el momento
    setTimeout(() => {
        const aiResponse = document.createElement('div');
        aiResponse.textContent = "IA: Esta es la respuesta a tu mensaje.";
        chatHistory.appendChild(aiResponse);
        
        // Desplazar el historial hacia abajo
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 1000);
}

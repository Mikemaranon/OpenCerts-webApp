<?php
    // Obtener los datos del cliente
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Conexión a la base de datos
    $conn = new mysqli('localhost', 'usuario', 'contraseña', 'base_de_datos');
    
    // Verificar la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }
    
    // Validar la respuesta
    $questionId = $data['questionId'];
    $answers = $data['answers'];
    
    // Aquí deberías hacer la validación según el tipo de pregunta y las respuestas
    // Esto es solo un ejemplo de cómo validar las respuestas
    $query = "SELECT correct_answer FROM questions WHERE question_id = '$questionId'";
    $result = $conn->query($query);
    $row = $result->fetch_assoc();
    
    $isCorrect = false;
    if ($row) {
        $correctAnswer = $row['correct_answer'];
        
        // Validar la respuesta para single choice o multiple choice
        if (is_array($answers)) {
            // Múltiples respuestas
            $isCorrect = ($correctAnswer == implode(',', $answers));
        } else {
            // Una sola respuesta
            $isCorrect = ($correctAnswer == $answers);
        }
    }
    
    echo json_encode(['isCorrect' => $isCorrect]);
    
    $conn->close();
?>

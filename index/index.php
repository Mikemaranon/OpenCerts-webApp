<?php
    // Habilitar el manejo de errores (solo para desarrollo)
    ini_set('display_errors', 1);
    error_reporting(E_ALL);

    // Conexión a la base de datos MySQL
    $servername = "db"; // Nombre del servicio de la base de datos en Docker Compose
    $username = "root";
    $password = "rootpass";
    $dbname = "opencerts_db";

    // Crear la conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar la conexión
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Definir la cabecera para indicar que la respuesta será en JSON
    header('Content-Type: application/json');

    // Lógica del servidor: procesar diferentes tipos de peticiones
    $request_method = $_SERVER['REQUEST_METHOD'];

    switch ($request_method) {
        case 'GET':
            // Por ejemplo, obtener todos los exámenes
            getExams($conn);
            break;

        case 'POST':
            // Por ejemplo, agregar un nuevo examen
            addExam($conn);
            break;

        default:
            echo json_encode(["message" => "Método no soportado"]);
            break;
    }

    // Función para obtener todos los exámenes
    function getExams($conn) {
        $sql = "SELECT id, exam_name, created_at FROM exams";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $exams = [];
            while($row = $result->fetch_assoc()) {
                $exams[] = $row;
            }
            echo json_encode($exams);
        } else {
            echo json_encode([]);
        }
    }

    // Función para agregar un nuevo examen
    function addExam($conn) {
        // Asumimos que los datos vienen en formato JSON en el cuerpo de la petición
        $data = json_decode(file_get_contents("php://input"), true);

        if (isset($data['exam_name'])) {
            $exam_name = $conn->real_escape_string($data['exam_name']);
            $sql = "INSERT INTO exams (exam_name) VALUES ('$exam_name')";

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["message" => "Examen agregado correctamente"]);
            } else {
                echo json_encode(["error" => "Error al agregar el examen: " . $conn->error]);
            }
        } else {
            echo json_encode(["error" => "El nombre del examen es requerido"]);
        }
    }

    // Cerrar la conexión
    $conn->close();
?>

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Home Page</title>
        <link rel="stylesheet" href="../styles/generalStyle.css">
        <link rel="stylesheet" href="../styles/body-style.css">
        <link rel="stylesheet" href="../styles/header-style.css">
        <link rel="stylesheet" href="../styles/background.css">
        <link rel="stylesheet" href="../styles/home.css">

        <style>
            .center-section {
                width: 60%;
                margin-left: 20%;
                margin-right: 20%;
                padding: 50px;
            }
        </style>
    </head>
    <body>
        <header>
            <div class="title">
                <h1>Welcome to Our Website</h1>
            </div>
            <div class="button-container">
                <button onclick="window.location.href='login.html'">Login</button>
            </div>
        </header>
        <main>
            <section class="center-section">
                <h2>Introduction</h2>
                <p>Welcome to our project! Our goal is to enhance the examination experience by providing a system for corrections and additions to exams, ensuring continuous improvement of their content.</p>
                <p>For users, we aim to store all important statistics in a database, such as accuracy percentage, most frequently missed questions, and the number of exams taken. Using this information, we can automatically generate personalized exams to improve the user experience.</p>
                <p>Additional features include a database for uploading official and verified documentation, and a chatbot implemented using the free Groq API, which is fed with the necessary documentation to assist users flexibly and adaptively.</p>
            </section>
        </main>
        <footer>
            <p>&copy; 2025 OpenCerts. All rights reserved.</p>
        </footer>
    </body>
</html>
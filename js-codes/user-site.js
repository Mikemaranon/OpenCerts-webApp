// Simulación de datos recibidos del servidor
const userData = {
    username: "Juan123",
    photo: "styles/user-photo.jpg",
    exams: [
        { name: "dp-203", result: "85%", time: "60 minutos" },
        { name: "az-900", result: "90%", time: "45 minutos" },
        { name: "az-104", result: "78%", time: "70 minutos" }
    ],
    stats: {
        exams: {
            dp203: 30,
            az900: 45,
            az104: 25
        }, // pruebas realizadas de cada examen
        hours: {
            dp203: 13,
            az900: 40,
            az104: 5
        }, // Horas invertidas en cada examen
        types: {
            single_select: 98,
            multiple_choice: 79,
            drag_n_drop: 45,
            hot_spot: 87,
        }, // Rendimiento por tipo de pregunta
        average: {
            dp203: 50,
            az900: 70,
            az104: 25
        }, // Media de rendimiento
    }
};

// Cargar datos del usuario al inicio
function loadUserData() {
    // Cargar nombre y foto del usuario
    document.getElementById("username").textContent = userData.username;
    document.getElementById("user-photo").src = userData.photo;

    // Mostrar últimos exámenes
    const examList = document.getElementById("exam-list").getElementsByTagName('tbody')[0];
    examList.innerHTML = ""; // Limpiar lista
    userData.exams.forEach(exam => {
        const row = document.createElement("tr");

        const examName = document.createElement("td");
        examName.textContent = exam.name;
        row.appendChild(examName);

        const examResult = document.createElement("td");
        examResult.textContent = exam.result;
        row.appendChild(examResult);

        const examTime = document.createElement("td");
        examTime.textContent = exam.time;
        row.appendChild(examTime);

        examList.appendChild(row);
    });
}

// Configuración de la gráfica y colores
let chart; // Variable global para almacenar la gráfica actual

function updateChart(type) {
    const labels = Object.keys(userData.stats[type]);
    const data = Object.values(userData.stats[type]);
    const colors = ["#f7931e", "#ffcc33", "#ff8b42", "#4caf50", "#2196f3", "#9c27b0", "#e91e63", "#00bcd4"]; // Colores para la gráfica

    if (chart) {
        chart.destroy(); // Destruir la gráfica anterior si existe
    }

    const ctx = document.getElementById("chart").getContext("2d");

    chart = new Chart(ctx, {
        type: chartType, // Usar la variable chartType
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: chartType !== "bar" }, // Mostrar leyenda solo si no es "bar"
                tooltip: { enabled: true }  // Mostrar tooltip
            },
            scales: chartType === "bar" ? { // Add scales option for bar chart
                y: {
                    beginAtZero: true
                }
            } : {}
        }
    });
}

function setChartTypeToPie() {
    chartType = "pie";
}

function setChartTypeToBar() {
    chartType = "bar";
}


// Inicializar la página al cargar
window.onload = () => {
    loadUserData();
    setChartTypeToPie(); // Establecer el tipo de gráfico inicial a "pie"
    updateChart("exams"); // Mostrar el gráfico inicial con el tipo "exams"
};

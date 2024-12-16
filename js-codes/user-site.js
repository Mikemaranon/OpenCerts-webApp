// Simulación de datos recibidos del servidor
const userData = {
    username: "Juan123",
    photo: "foto",
    exams: [
        { name: "Examen 1", result: "85%", time: "60 minutos" },
        { name: "Examen 2", result: "90%", time: "45 minutos" },
        { name: "Examen 3", result: "78%", time: "70 minutos" }
    ],
    stats: {
        exams: [30, 45, 25], // Porcentaje de actividad por examen
        hours: [5, 7, 3],    // Horas invertidas en cada examen
        types: [40, 35, 25], // Rendimiento por tipo de pregunta
        average: [80, 85, 90] // Media de rendimiento
    }
};

// Cargar datos del usuario al inicio
function loadUserData() {
    // Cargar nombre y foto del usuario
    document.getElementById("username").textContent = userData.username;
    document.getElementById("user-photo").textContent = userData.photo;

    // Mostrar últimos exámenes
    const examList = document.getElementById("exam-list");
    examList.innerHTML = ""; // Limpiar lista
    userData.exams.forEach(exam => {
        const listItem = document.createElement("li");
        listItem.textContent = `${exam.name} - ${exam.result} - ${exam.time}`;
        examList.appendChild(listItem);
    });
}

// Configuración de la gráfica y colores
let chart; // Variable global para almacenar la gráfica actual

function updateChart(type) {
    const labels = userData.exams.map(exam => exam.name);
    const data = userData.stats[type];
    const colors = ["#f7931e", "#ffcc33", "#ff8b42"]; // Colores para la gráfica

    // Actualizar la leyenda
    const legendContainer = document.getElementById("legend");
    legendContainer.innerHTML = ""; // Limpiar leyenda anterior
    labels.forEach((label, index) => {
        const legendItem = document.createElement("div");
        legendItem.innerHTML = `
            <span style="background-color: ${colors[index]}; width: 20px; height: 20px; display: inline-block;"></span>
            ${label}: ${data[index]}%
        `;
        legendContainer.appendChild(legendItem);
    });

    // Destruir la gráfica anterior si existe
    if (chart) chart.destroy();

    // Crear un nuevo gráfico circular con Chart.js
    const ctx = document.getElementById("chart").getContext("2d");
    chart = new Chart(ctx, {
        type: "pie",
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
                legend: { display: false }, // Ocultar leyenda por defecto
                tooltip: { enabled: true }  // Mostrar tooltip
            }
        }
    });
}

// Inicializar la página al cargar
window.onload = () => {
    loadUserData();
    updateChart("exams"); // Mostrar el gráfico inicial
};

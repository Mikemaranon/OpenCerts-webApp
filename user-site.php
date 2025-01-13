<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Dashboard de Usuario</title>
        <link rel="stylesheet" href="styles/user-site.css">
        <link rel="stylesheet" href="styles/body-style.css">
        <link rel="stylesheet" href="styles/chat-style.css">
        <link rel="stylesheet" href="styles/generalStyle.css">
        <link rel="stylesheet" href="styles/topic-index.css">
        <link rel="stylesheet" href="styles/questions.css"> 
        <link rel="stylesheet" href="styles/background.css">
        
        <style>
            .right-section {
                top: 15px;
                height: calc(100% - 50px);
            }
            .back-section-right {
                width: 100%;
                position: relative;
                margin-right: 15px;
                max-width: 19%;
            }
            .center-section {
                width: 50%;
                top: -64px;
            }
            .center-section h1 {
                color: white;
                margin-left: 30px;
            }
        </style>

        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> <!-- Librería para gráficos -->
    </head>
    <body>
        <main>
            <section class="center-section" id="main-content">
                <div class="container">
                    <section class="name">
                        <div style="padding: 20px;">
                            <h1>Bienvenido <br><br><span id="username">@user</span></h1>
                        </div>
                        <div style="padding: 20px;">
                            <div class="photo">
                                <img id="user-photo">
                            </div>
                        </div>
                    </section>
        
                    <section class="last-exams">
                        <div style="padding: 20px;">
                            <table class="exams-table" id="exam-list">
                                <caption>Últimos 3 exámenes</caption>
                                <thead>
                                    <tr height="30">
                                        <th id="left">Examen</th>
                                        <th>Resultado (%)</th>
                                        <th id="right">Tiempo</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    <!-- Table rows will go here -->
                                </tbody>
                                <tfoot>
                                    <tr class="empty-row">
                                        <td colspan="4"></td>
                                    </tr>
                                </tfoot>
                            </table><br>
                            <div class="button-container">
                                <button onclick="window.location.href='exams-list.html'">Ir a Inicio</button>
                                <button>Cerrar sesión</button>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <section class="back-section-right"></section>
            <section class="right-section">
                <!-- Panel de rendimiento -->
                <section class="performance">
                    <div class="summary">
                        <button onclick="setChartTypeToPie(); updateChart('exams')">Exámenes realizados</button>
                        <button onclick="setChartTypeToPie(); updateChart('hours')">Horas invertidas</button>
                        <button onclick="setChartTypeToBar(); updateChart('types')">Rendimiento por tipo de pregunta</button>
                        <button onclick="setChartTypeToBar(); updateChart('average')">Media de rendimiento</button>
                    </div>
                </section>
                <?php
                    if (isset($_SESSION['user_logged_in']) && $_SESSION['role'] === 'editor') {
                        echo '<button onclick="window.location.href=\'errors-list.html\'">Ir a Inicio</button>';
                    }
                ?>
                <!-- Gráfica y leyenda -->
                <section class="graphics">
                    <div class="chart">
                        <canvas id="chart" height="400"></canvas> <!-- Gráfico circular -->
                    </div>
                </section>
            
            </section>
            <!-- Contenedor principal -->
        </main>

        <script src="js-codes/user-site.js"></script>
    </body>
</html>

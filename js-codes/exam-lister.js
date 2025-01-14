async function loadExams() {
    const response = await fetch('exam-list.json');
    const exams = await response.json();
    const sectionContent = document.getElementById('section-content');

    exams.forEach(exam => {
        const examContainer = document.createElement('div');
        examContainer.className = 'exam-container';

        const title = document.createElement('h1');
        title.textContent = exam.title;
        examContainer.appendChild(title);

        const description = document.createElement('p');
        description.textContent = exam.description;
        examContainer.appendChild(description);

        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'buttons';

        const infoButton = document.createElement('button');
        infoButton.textContent = 'Más información';
        infoButton.onclick = () => window.location.href = exam.infoLink;
        buttonsDiv.appendChild(infoButton);

        const examButton = document.createElement('button');
        examButton.textContent = 'Ir a examen';
        examButton.onclick = () => window.location.href = `battery/battery.html?examName=${encodeURIComponent(exam.examName)}`;
        buttonsDiv.appendChild(examButton);

        examContainer.appendChild(buttonsDiv);
        sectionContent.appendChild(examContainer);
    });
}

document.addEventListener('DOMContentLoaded', loadExams);
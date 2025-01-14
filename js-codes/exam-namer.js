// Add the script fragment to handle URL parameters and replace placeholders
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

const examName = getQueryParam('examName');
const lowercaseExamName = examName.toLowerCase();

document.querySelectorAll('.jsonDirectory').forEach(element => {
    element.textContent = element.textContent.replace(/@cert/g, examName).replace(/@lowcaseCert/g, lowercaseExamName);
});

document.querySelectorAll('.jsonDirectoryTags').forEach(element => {
    element.textContent = element.textContent.replace(/@cert/g, examName).replace(/@lowcaseCert/g, lowercaseExamName);
});

document.querySelectorAll('h1').forEach(element => {
    element.textContent = element.textContent.replace(/@cert/g, examName);
});

function getExamName() {
    return examName;
}

function getLowExamName() {
    return lowercaseExamName;
}

function replaceInputValue() {
    document.getElementById('exam-name').value = examName;
}


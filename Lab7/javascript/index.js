
function calcAnglesWithHeight(b1, b2, h) {
    let base_angle = Math.atan(h / Math.abs(b1 - b2)) * (180 / Math.PI);
    return [90, 90, base_angle, (180 - base_angle)];
}

function calcAnglesWithSide(b1, b2, side) {
    let base_angle = Math.acos(Math.abs(b1 - b2) / side) * (180 / Math.PI);
    return [90, 90, base_angle, (180 - base_angle)];
}

function calcPerimeterWithHeight(b1, b2, h) {
    let side = Math.sqrt(Math.pow(b1 - b2, 2) + Math.pow(h, 2));
    return b1 + b2 + h + side;
}

function calcPerimeterWithSide(b1, b2, side) {
    let h = Math.sqrt(Math.pow(side, 2) - Math.pow(b1 - b2, 2));
    return b1 + b2 + side + h;
}

function calcAreaWithHeight(b1, b2, h) {
    return (0.5) * (b1 + b2) * h;
}

function calcAreaWithSide(b1, b2, side) {
    let h = Math.sqrt(Math.pow(side, 2) - Math.pow(b1 - b2, 2));
    return (0.5) * (b1 + b2) * h;
}


function updateUI() {
    const type = document.getElementById('input-type').value;
    const label3 = document.getElementById('param3-label');
    const img = document.getElementById('trap-img');

    if (type === 'height') {
        label3.innerText = 'Высота (h):';
        img.src = 'images/trapecia-2.png';
    } else {
        label3.innerText = 'Боковая сторона (c):';
        img.src = 'images/trapecia-1.png';
    }

    clearForm();
}

function clearForm() {
    const b1 = document.getElementById('base1');
    const b2 = document.getElementById('base2');
    const p3 = document.getElementById('param3');

    if (b1) b1.value = '';
    if (b2) b2.value = '';
    if (p3) p3.value = '';

    clearResults();
    clearErrors();
}

function clearResults() {
    const res = document.getElementById('results');

    if (res) {
        let children = res.childNodes;
        while(children.length !== 0) {
            res.removeChild(children[0]);
        }
        res.setAttribute('hidden','');
    }
}

function clearErrors() {
    let inputs = document.getElementsByTagName('input');
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('is-invalid');
    }
    let errors = document.getElementsByClassName('error-message');
    for(let i = 0; i < errors.length; i++) {
        errors[i].setAttribute('hidden', '');
    }
}

function showError(inputId, errorId) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('is-invalid');
    if (error) error.removeAttribute('hidden');
}



function calculate() {
    clearResults();
    clearErrors();

    const type = document.getElementById('input-type').value;
    let b1 = Number(document.getElementById('base1').value);
    let b2 = Number(document.getElementById('base2').value);
    let param3 = Number(document.getElementById('param3').value);

    let isValid = true;

    if (isNaN(b1) || b1 <= 0) { showError('base1', 'error-base1'); isValid = false; }
    if (isNaN(b2) || b2 <= 0 || b1 === b2) { showError('base2', 'error-base2'); isValid = false; }
    if (isNaN(param3) || param3 <= 0) { showError('param3', 'error-param3'); isValid = false; }

    if (!isValid) return;

    if (type === 'side' && param3 <= Math.abs(b1 - b2)) {
        showError('param3', 'error-math');
        return;
    }

    const doAngles = document.getElementById('do-angles').checked;
    const doPerimeter = document.getElementById('do-perimeter').checked;
    const doArea = document.getElementById('do-area').checked;

    if(!doAngles && !doPerimeter && !doArea) {
        showError('do-angles', 'error-checkbox');
        showError('do-perimeter', 'error-checkbox');
        showError('do-area', 'error-checkbox');
        return;
    }

    let res = document.getElementById('results');
    res.removeAttribute('hidden');
    res.innerHTML = `<p>Результат:</p>`;

    let angles, perimeter, area;

    if (type === 'height') {
        if (doAngles) angles = calcAnglesWithHeight(b1, b2, param3);
        if (doPerimeter) perimeter = calcPerimeterWithHeight(b1, b2, param3);
        if (doArea) area = calcAreaWithHeight(b1, b2, param3);
    } else {
        if (doAngles) angles = calcAnglesWithSide(b1, b2, param3);
        if (doPerimeter) perimeter = calcPerimeterWithSide(b1, b2, param3);
        if (doArea) area = calcAreaWithSide(b1, b2, param3);
    }

    if (doAngles) {
        let angleElement = document.createElement('p');
        angleElement.innerHTML = 'Углы: ' + angles.join(', ');
        res.appendChild(angleElement);
    }
    if (doPerimeter) {
        let perimeterElement = document.createElement('p');
        perimeterElement.innerHTML = `Периметр: ${perimeter}`;
        res.appendChild(perimeterElement);
    }
    if (doArea) {
        let areaElement = document.createElement('p');
        areaElement.innerHTML = `Площадь: ${area}`;
        res.appendChild(areaElement);
    }
}

function hideErrorOnFocus(inputIds, errorIds) {
    inputIds.forEach(inputId => {
        let input = document.getElementById(inputId);
        if (!input) { return }
        input.onfocus = function (){
            this.classList.remove('is-invalid');
            errorIds.forEach(errorId => {
                document.getElementById(errorId).setAttribute('hidden', '');
            });
        }
    });
}

function assignButton(id, func){
    let button = document.getElementById(id);
    button.onclick = func;
}

assignButton('show-button', updateUI)
assignButton('calc-button', calculate);
assignButton('clear-button', clearForm);
hideErrorOnFocus(['base1'], ['error-base1']);
hideErrorOnFocus(['base2'], ['error-base2']);
hideErrorOnFocus(['param3'], ['error-param3','error-math']);
hideErrorOnFocus(['do-angles','do-perimeter','do-area'], ['error-checkbox']);


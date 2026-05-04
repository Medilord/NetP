
document.addEventListener("DOMContentLoaded", function() {
    const width = 600;
    const height = 600;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);


    const settingForm = document.getElementById("settings")

    const drawButton = settingForm.querySelector('input[value="Нарисовать"]');
    const clearButton = settingForm.querySelector('input[value="Очистить"]')
    const animateButton = settingForm.querySelector('input[value="Анимировать"]');
    drawButton.addEventListener('click', () => draw(settingForm));
    clearButton.addEventListener('click', () => clear(svg));
    animateButton.addEventListener('click', () => runAnimation(settingForm));
    const animCheckbox = document.getElementById('do_animation');
    const pathAnimCheckbox = document.getElementById('path_animation');


    animCheckbox.addEventListener('change', () => changeAnimationFields(animCheckbox.checked, drawButton, pathAnimCheckbox));
    pathAnimCheckbox.addEventListener('change', () => changePathAnimsFields(pathAnimCheckbox.checked));


    changeAnimationFields(false, drawButton, pathAnimCheckbox);
})


const draw = (dataForm) => {
    const svg = d3.select("svg")
    let pict = drawSmile(svg)
    pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) scale(${dataForm.sx.value}, ${dataForm.sy.value}) rotate(${dataForm.ang.value}, ${dataForm.cx.value}, ${dataForm.cy.value})`);
}


const clear = (svg) => {
    svg.selectAll('*').remove();
}

const runAnimation = (dataForm) => {
    const svg = d3.select("svg");
    let pict = drawSmile(svg);

    const animsTypesSelect = document.getElementById('animations_types_select');
    let animType;

    switch (animsTypesSelect.value) {
        case "linear":
            animType = d3.easeLinear;
            break;
        case "elastic":
            animType = d3.easeElastic;
            break;
        case "bounce":
            animType = d3.easeBounce;
            break;
    }

    const isPathAnim = document.getElementById('path_animation').checked;

    if (!isPathAnim) {
        pict.attr("transform", `translate(${dataForm.cx.value}, ${dataForm.cy.value}) scale(${dataForm.sx.value}, ${dataForm.sy.value}) rotate(${dataForm.ang.value})`)
            .transition()
            .duration(6000)
            .ease(animType)
            .attr("transform", `translate(${dataForm.cx_finish.value}, ${dataForm.cy_finish.value}) scale(${dataForm.sx_finish.value}, ${dataForm.sy_finish.value}) rotate(${dataForm.ang_finish.value})`)
    } else {
        const pathType = document.getElementById('paths').getElementsByTagName('select')[0].selectedIndex;
        let path = drawPath(pathType);
        pict
            .transition()
            .ease(animType)
            .duration(6000)
            .attrTween('transform', translateAlong(path.node()));
    }
}



const changeAnimationFields = (isChecked, drawButton, pathAnimCheckbox) => {
    const expandClass = document.querySelectorAll(".expand_form");

    if (isChecked) {
        expandClass.forEach(element => {element.style.display = ''});
        drawButton.style.display = 'none';
    } else {
        expandClass.forEach(element => {element.style.display = 'none'});
        drawButton.style.display = '';

         if (pathAnimCheckbox.checked) {
             pathAnimCheckbox.click();
         }
    }
}


const changePathAnimsFields = (isChecked) => {
    pathsSettings = document.getElementById('paths');
    fields = ['coords', 'rotation', 'transformation'];


    if (isChecked) {
        fields.forEach(id => document.getElementById(id).style.display = 'none');
        pathsSettings.style.display = '';
    } else {
        fields.forEach(id => document.getElementById(id).style.display = '');
        pathsSettings.style.display = 'none';
    }
}

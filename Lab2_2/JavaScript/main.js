document.addEventListener("DOMContentLoaded", function() {
    const width = 1280;
    const height = 1280;
    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height) ;

    const settingForm = document.getElementById("setting");

    const clearButton = settingForm.querySelector('input[value="Очистить"]')
    const animateButton = settingForm.querySelector('input[value="Анимировать"]');
    clearButton.addEventListener('click', () => clear(svg));
    animateButton.addEventListener('click', () => runAnimation(settingForm));
});

const clear = (svg) => {
    svg.selectAll('*').remove();
}

const runAnimation = (dataForm) => {
    const time = Number(document.getElementById('time').value);
    const scaleXFrom = Number(document.getElementById('sx').value);
    const scaleXTo = Number(document.getElementById('sx_finish').value);
    const scaleYFrom = Number(document.getElementById('sy').value);
    const scaleYTo = Number(document.getElementById('sy_finish').value);
    const angleFrom = Number(document.getElementById('ang').value);
    const angleTo = Number(document.getElementById('ang_finish').value);

    const svg = d3.select("svg")
    let pict = drawCar(svg);
    pict.attr("transform", "translate(400, 500)");
    let path = drawPath();
    pict
        .transition()
        .ease(d3.easeLinear)
        .duration(time)
        .attrTween('transform', translateAlong(
            path.node(),
            {scaleXFrom: scaleXFrom, scaleYFrom: scaleYFrom, scaleXTo: scaleXTo, scaleYTo: scaleYTo},
            {angleFrom: angleFrom, angleTo: angleTo}
        ));
}
document.addEventListener("DOMContentLoaded", function() {
    const dataForm = document.getElementById("settings");


    const maxHeightCheckbox = dataForm.querySelector("#max_height");
    const minHeightCheckbox = dataForm.querySelector("#min_height");

    maxHeightCheckbox.addEventListener("change", e => {
        clearGraph();
        if(!maxHeightCheckbox.checked && !minHeightCheckbox.checked) {
            const error = dataForm.querySelector("#error");
            error.style.display = "block";

        } else {
            error.style.display = "none";
        }
    })

    minHeightCheckbox.addEventListener("change", e => {
        clearGraph();
        if(!maxHeightCheckbox.checked && !minHeightCheckbox.checked) {
            const error = dataForm.querySelector("#error");
            error.style.display = "block";
        } else {
            error.style.display = "none";
        }
    })


    drawGraph(buildings, dataForm);
    showTable('build', buildings);

    const buildButton = document.querySelector('input[value="Построить"]');
    buildButton.addEventListener('click', () => {
        if(maxHeightCheckbox.checked || minHeightCheckbox.checked) {
            drawGraph(buildings, dataForm);
        }
    })

    const table = document.getElementById('build');
    const toggleTableButton = document.querySelector('input[value="Скрыть таблицу"]');
    toggleTableButton.addEventListener('click', (e) => {
        table.classList.toggle('hidden');

        if (table.classList.contains('hidden')) {
            hideTable('build');
            e.target.value = 'Показать таблицу';
        } else {
            showTable('build', buildings);
            e.target.value = 'Скрыть таблицу';
        }
    });
})
document.addEventListener("DOMContentLoaded", function() {
    const dataForm = document.querySelector("#chart");

    const checkboxes = dataForm.querySelector("#checkboxes");
    const error = dataForm.querySelector("#error");

    checkboxes.addEventListener("change", () => {
        clearGraph();

        const anyChecked = dataForm.querySelectorAll(
            '#checkboxes input[type="checkbox"]:checked'
        ).length > 0;

        error.style.display = anyChecked ? "none" : "block";
    });

    drawGraph(tableAnimals, dataForm);

    const buildButton = dataForm.querySelector('input[value="Построить"]');

    buildButton.addEventListener("click", () => {
        drawGraph(tableAnimals, dataForm);
    });

    createTable(tableAnimals, "tbl");
});
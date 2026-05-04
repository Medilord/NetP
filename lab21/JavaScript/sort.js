const createSortArr = (data) => {
    let sortArr = [];
    const sortSelects = data.getElementsByTagName('select');

    for (const item of sortSelects) {
        const keySort = item.value;

        if (keySort == 0) {
            break;
        }

        const desc = document.getElementById(item.id + '_desc').checked;

        sortArr.push(
            {
                column: keySort - 1,
                direction: desc
            }
        );
    }

    return sortArr;
};

const resetSortForm = (data, sortForm) => {
    const allSelect = sortForm.getElementsByTagName('select');

    for (let select of allSelect) {
        select.innerHTML = '';
    }

    setSortSelects(data, sortForm);
    sortForm.reset();
};

const clearSort = (data, idTable, sortForm) => {
    resetSortForm(data, sortForm);

    const filterForm = document.getElementById('filter');
    filterTable(data, idTable, filterForm);
};


const sortTable = (idTable, formData) => {
    const sortArr = createSortArr(formData);

    if (sortArr.length === 0) {
        const filterForm = document.getElementById('filter');
        filterTable(buildings, idTable, filterForm);
        return false;
    }

    let table = document.getElementById(idTable);
    let rowData = Array.from(table.rows);

    const headerRow = rowData.shift();

    rowData.sort((first, second) => {
        for (let { column, direction } of sortArr) {
            const firstCell = first.cells[column].innerHTML;
            const secondCell = second.cells[column].innerHTML;
            let comparison = 0;

            if (column >= 5) {
                comparison = parseFloat(firstCell) - parseFloat(secondCell);
            } else {
                comparison = firstCell.localeCompare(secondCell);
            }

            if (comparison !== 0) {
                return (direction ? -comparison : comparison);
            }
        }

        return 0;
    });

    table.append(headerRow);

    let tbody = document.createElement('tbody');
    rowData.forEach(item => {
        tbody.append(item);
    });

    table.append(tbody);
}


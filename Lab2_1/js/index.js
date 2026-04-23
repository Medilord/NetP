document.addEventListener("DOMContentLoaded", function() {
    createTable(tableAnimals, 'tbl');

    const form = document.getElementById('filter');
    const filterBtn = form.querySelector('input[value="Найти"]');
    const clearBtn = form.querySelector('input[value="Очистить фильтры"]');

    clearBtn.addEventListener('click', function() {
        clearFilter('tbl', tableAnimals, form);
    });

    filterBtn.addEventListener('click', function() {
        resetSortForm(tableAnimals, sortForm);
        filterTable(tableAnimals, 'tbl', form);
    });

    clearBtn.addEventListener('click', function() {
        clearFilter('tbl', tableAnimals, form);
    });

    const sortForm = document.getElementById('sort');

    const resetSortBtn = sortForm.querySelector('input[value="Сбросить сортировку"]');
    resetSortBtn.addEventListener('click', function() {
        clearSort(tableAnimals,'tbl', sortForm);
    });

    clearBtn.addEventListener('click', function() {
        resetSortForm(tableAnimals, sortForm);
    });

    setSortSelects(tableAnimals, sortForm);

    const fieldsFirst = document.getElementById('sort1');
    fieldsFirst.addEventListener('change', function() {
        changeNextSelect(this, 'sort2');
    });

    const fieldsSecond = document.getElementById('sort2');
    fieldsSecond.addEventListener('change', function() {
        changeNextSelect(this, 'sort3');
    });

    const sortBtn = sortForm.querySelector('input[value="Сортировать"]');
    sortBtn.addEventListener('click', function() {
        sortTable('tbl', sortForm);
    });

});



const createOption = (str, val) => {
    let item = document.createElement('option');
    item.text = str;
    item.value = val;
    return item;
}
const setSortSelect = (arr, sortSelect) => {
    sortSelect.append(createOption('Нет', 0));

    arr.forEach((item, index) => {
        sortSelect.append(createOption(item, index + 1));
    });
}
const setSortSelects = (data, dataForm) => {
    const head = Object.keys(data[0]);
    const allSelect = dataForm.getElementsByTagName('select');

    let i = 0;
    for(const item of allSelect){
        setSortSelect(head, item);

        if (i !== 0) {
            item.disabled = true;
        }

        i += 1;
    }
}

const changeNextSelect = (curSelect, nextSelectId) => {
    let nextSelect = document.getElementById(nextSelectId);
    nextSelect.disabled = false;
    nextSelect.innerHTML = curSelect.innerHTML;

    if (curSelect.value != 0) {
        for (let i = 0; i < nextSelect.options.length; i++) {
            if (nextSelect.options[i].value === curSelect.value) {
                nextSelect.remove(i);
                break;
            }
        }
    } else {
        nextSelect.disabled = true;
    }

    if (nextSelectId === 'sort2') {
        const sort3 = document.getElementById('sort3');
        const sort1 = document.getElementById('sort1');
        sort3.innerHTML = sort1.innerHTML;
        sort3.disabled = true;
    }
}
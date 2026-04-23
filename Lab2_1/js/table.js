const createTable = (data, idTable) => {
    const table = document.getElementById(idTable);

    table.append(createHeaderRow(Object.keys(data[0])));
    table.append(createBodyRows(data));
};

const createHeaderRow = (headers) => {
    const tr = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.innerHTML = header;
        tr.append(th);
    });

    return tr;
};

const createBodyRows = (data) => {
    const tbody = document.createElement('tbody');

    data.forEach(item => {
        const tr = document.createElement('tr');

        for (let key in item) {
            const td = document.createElement('td');
            td.innerHTML = item[key];
            tr.append(td);
        }

        tbody.append(tr);
    });

    return tbody;
};

const clearTable = (idTable) => {
    document.getElementById(idTable).innerHTML = '';
};
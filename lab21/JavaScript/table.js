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


    data.map((row) => {
        const tr = document.createElement('tr');

        const item = Object.values(row)
        item.map(value => {
            const td = document.createElement('td');
            td.innerHTML = value;
            return td;
        }).reduce((row, cell) => {
            row.append(cell);
            return row
        }, tr)
        tbody.append(tr);
    })

    return tbody;

};



const clearTable = (idTable) => {
    document.getElementById(idTable).innerHTML = '';
};
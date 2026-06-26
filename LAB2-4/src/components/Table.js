import { useState } from "react";

import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';


const Table = (props) => {
    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(props.data);
    const [filteredData, setFilteredData] = useState(null);

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    }

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage("1");
    }

    const handleFiltering = (value) => {
        setFilteredData(value);
        updateDataTable(value);
    }

    const handleResetFilter = () => {
        setFilteredData(null);
        updateDataTable(props.data);
    }

    const handleResetSort = () => {
        updateDataTable(filteredData ? filteredData : dataTable);
    }

    const amountRows = props.isPaginated === "0" ? props.data.length : props.amountRows;
    const n = Math.ceil(dataTable.length / amountRows);
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    const pages = arr.map((item, index) =>
        <span
            key={ index }
            onClick={ changeActive }
            className={ index === Number(activePage) ? 'page-number page-number-active' : 'page-number' }
        >
            {item}
        </span>
    );

    return(
        <>
            <details open>
                <summary>Фильтры</summary>
                <Filter
                    onResetFilter={ handleResetFilter }
                    filtering={ handleFiltering }
                    fullData={ props.data }
                />
            </details>

            <details open>
                <summary>Сортировка</summary>
                <Sort
                    onResetSort={ handleResetSort }
                    sorting={ updateDataTable }
                    data={ dataTable }
                    fullData={ props.data }
                />
            </details>

            <table border="1" cellPadding="5" cellSpacing="0">
                <TableHead head={ Object.keys(props.data[0]) }/>
                <TableBody
                    body={ dataTable }
                    amountRows={ amountRows }
                    numPage={ props.isPaginated === "0" ? "1" : activePage }
                />
            </table>

            <div>
                { props.isPaginated === "0" ? "" : pages }
            </div>
        </>
    )
}

export default Table;

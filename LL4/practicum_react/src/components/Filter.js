import { useState } from 'react';

const initialFields = {
  name: '',
  type: '',
  country: '',
  city: '',
  yearFrom: '',
  yearTo: '',
  heightFrom: '',
  heightTo: '',
};

function includesText(value, filterValue) {
  return String(value).toLowerCase().includes(filterValue.trim().toLowerCase());
}

function inRange(value, from, to) {
  const numberValue = Number(value);
  const min = from === '' ? -Infinity : Number(from);
  const max = to === '' ? Infinity : Number(to);

  return numberValue >= min && numberValue <= max;
}

function Filter({ fullData, onFilter }) {
  const [fields, setFields] = useState(initialFields);

  const changeField = (event) => {
    const { name, value } = event.target;

    setFields((currentFields) => ({
      ...currentFields,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredData = fullData.filter((item) => {
      return (
        includesText(item['Название'], fields.name) &&
        includesText(item['Тип'], fields.type) &&
        includesText(item['Страна'], fields.country) &&
        includesText(item['Город'], fields.city) &&
        inRange(item['Год'], fields.yearFrom, fields.yearTo) &&
        inRange(item['Высота'], fields.heightFrom, fields.heightTo)
      );
    });

    onFilter(filteredData);
  };

  const clearFilter = () => {
    setFields(initialFields);
    onFilter(fullData);
  };

  return (
    <section className="filter-block">
      <h4>Фильтры</h4>

      <form className="filter-form" onSubmit={handleSubmit}>
        <label>
          <span>Название:</span>
          <input name="name" type="text" value={fields.name} onChange={changeField} />
        </label>

        <label>
          <span>Тип:</span>
          <input name="type" type="text" value={fields.type} onChange={changeField} />
        </label>

        <label>
          <span>Страна:</span>
          <input name="country" type="text" value={fields.country} onChange={changeField} />
        </label>

        <label>
          <span>Город:</span>
          <input name="city" type="text" value={fields.city} onChange={changeField} />
        </label>

        <label>
          <span>Год от:</span>
          <input name="yearFrom" type="number" value={fields.yearFrom} onChange={changeField} />
        </label>

        <label>
          <span>Год до:</span>
          <input name="yearTo" type="number" value={fields.yearTo} onChange={changeField} />
        </label>

        <label>
          <span>Высота от:</span>
          <input name="heightFrom" type="number" step="0.1" value={fields.heightFrom} onChange={changeField} />
        </label>

        <label>
          <span>Высота до:</span>
          <input name="heightTo" type="number" step="0.1" value={fields.heightTo} onChange={changeField} />
        </label>

        <div className="filter-actions">
          <button type="submit">Фильтровать</button>
          <button type="button" onClick={clearFilter}>Очистить фильтр</button>
        </div>
      </form>
    </section>
  );
}

export default Filter;

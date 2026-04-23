// Соответствие текста опции сортировки → ключу объекта животного
const sortFieldMap = {
    'Название':                 'name',
    'Место обитания':           'habitat',
    'Вес':                      'weight',
    'Размер':                   'size',
    'Продолжительность жизни':  'lifespan',
    'Год открытия':             'year'
}

// ─── Данные ───────────────────────────────────────────────

const tableAnimals = [
    {name: 'Фенек',               habitat: 'Пустыня',      weight: 1.5,   size: 40,  lifespan: 14, year: 1780},
    {name: 'Сурикат',             habitat: 'Пустыня',      weight: 0.7,   size: 35,  lifespan: 12, year: 1776},
    {name: 'Аксолотль',           habitat: 'Водная среда', weight: 0.3,   size: 30,  lifespan: 15, year: 1864},
    {name: 'Палочник',            habitat: 'Лес',          weight: 0.03,  size: 15,  lifespan: 2,  year: 1758},
    {name: 'Тукан',               habitat: 'Тропики',      weight: 0.6,   size: 65,  lifespan: 20, year: 1758},
    {name: 'Окапи',               habitat: 'Лес',          weight: 250,   size: 250, lifespan: 30, year: 1901},
    {name: 'Такин',               habitat: 'Горы',         weight: 300,   size: 220, lifespan: 16, year: 1850},
    {name: 'Малайский шестокрыл', habitat: 'Лес',          weight: 1.7,   size: 40,  lifespan: 17, year: 1758},
    {name: 'Дюгонь',             habitat: 'Водная среда', weight: 400,   size: 300, lifespan: 70, year: 1766},
    {name: 'Нарвал',              habitat: 'Арктика',      weight: 1600,  size: 500, lifespan: 50, year: 1758},
    {name: 'Ай-ай',               habitat: 'Лес',          weight: 2.5,   size: 44,  lifespan: 23, year: 1782},
    {name: 'Какапо',              habitat: 'Лес',          weight: 4,     size: 64,  lifespan: 90, year: 1845},
    {name: 'Звездонос',           habitat: 'Лес',          weight: 0.05,  size: 20,  lifespan: 3,  year: 1801},
    {name: 'Малая панда',         habitat: 'Горы',         weight: 6,     size: 64,  lifespan: 14, year: 1825},
    {name: 'Комондор',            habitat: 'Саванна',      weight: 60,    size: 80,  lifespan: 12, year: 1544},
    {name: 'Грифовая черепаха',   habitat: 'Водная среда', weight: 80,    size: 80,  lifespan: 70, year: 1783},
    {name: 'Мандрил',             habitat: 'Лес',          weight: 50,    size: 95,  lifespan: 40, year: 1758},
    {name: 'Голый землекоп',      habitat: 'Пустыня',      weight: 0.035, size: 13,  lifespan: 32, year: 1842},
    {name: 'Фосса',               habitat: 'Лес',          weight: 12,    size: 80,  lifespan: 20, year: 1833},
    {name: 'Тапир',               habitat: 'Лес',          weight: 300,   size: 220, lifespan: 30, year: 1758},
    {name: 'Капибара',            habitat: 'Водная среда', weight: 65,    size: 134, lifespan: 12, year: 1766},
    {name: 'Ленивец',             habitat: 'Лес',          weight: 9,     size: 75,  lifespan: 30, year: 1758},
    {name: 'Бинтуронг',           habitat: 'Лес',          weight: 14,    size: 96,  lifespan: 25, year: 1822},
    {name: 'Тасманский дьявол',   habitat: 'Лес',          weight: 12,    size: 65,  lifespan: 8,  year: 1807},
    {name: 'Вомбат',              habitat: 'Лес',          weight: 35,    size: 115, lifespan: 15, year: 1797},
    {name: 'Ехидна',              habitat: 'Лес',          weight: 6.5,   size: 53,  lifespan: 45, year: 1792},
    {name: 'Утконос',             habitat: 'Водная среда', weight: 2.4,   size: 50,  lifespan: 17, year: 1799},
    {name: 'Киви',                habitat: 'Лес',          weight: 3.3,   size: 55,  lifespan: 50, year: 1813},
    {name: 'Квокка',              habitat: 'Лес',          weight: 5,     size: 54,  lifespan: 10, year: 1696},
    {name: 'Носач',               habitat: 'Лес',          weight: 24,    size: 76,  lifespan: 20, year: 1781},
    {name: 'Галаго',              habitat: 'Лес',          weight: 0.3,   size: 37,  lifespan: 16, year: 1776},
    {name: 'Лори',                habitat: 'Лес',          weight: 0.9,   size: 38,  lifespan: 20, year: 1758},
    {name: 'Ирбис',               habitat: 'Горы',         weight: 55,    size: 130, lifespan: 15, year: 1775},
    {name: 'Филиппинский орёл',   habitat: 'Лес',          weight: 6.5,   size: 102, lifespan: 30, year: 1896},
    {name: 'Панголин',            habitat: 'Лес',          weight: 33,    size: 75,  lifespan: 20, year: 1758},
    {name: 'Геренук',             habitat: 'Саванна',      weight: 45,    size: 160, lifespan: 12, year: 1878},
    {name: 'Дикдик',              habitat: 'Саванна',      weight: 6.5,   size: 70,  lifespan: 10, year: 1846},
    {name: 'Гривистый волк',      habitat: 'Саванна',      weight: 23,    size: 130, lifespan: 15, year: 1815},
    {name: 'Манул',               habitat: 'Горы',         weight: 5,     size: 65,  lifespan: 12, year: 1776},
    {name: 'Сервал',              habitat: 'Саванна',      weight: 18,    size: 100, lifespan: 20, year: 1776},
    {name: 'Каракал',             habitat: 'Саванна',      weight: 19,    size: 105, lifespan: 19, year: 1776},
    {name: 'Сайгак',              habitat: 'Пустыня',      weight: 40,    size: 130, lifespan: 12, year: 1758},
    {name: 'Дзерен',              habitat: 'Пустыня',      weight: 30,    size: 110, lifespan: 10, year: 1777},
    {name: 'Горная вискача',      habitat: 'Горы',         weight: 3,     size: 45,  lifespan: 19, year: 1814},
    {name: 'Мархур',              habitat: 'Горы',         weight: 110,   size: 170, lifespan: 15, year: 1838},
    {name: 'Ньяла',               habitat: 'Лес',          weight: 120,   size: 135, lifespan: 16, year: 1849},
    {name: 'Бонго',               habitat: 'Лес',          weight: 400,   size: 250, lifespan: 19, year: 1861},
    {name: 'Аддакс',              habitat: 'Пустыня',      weight: 120,   size: 170, lifespan: 19, year: 1816},
    {name: 'Голубой баран',       habitat: 'Горы',         weight: 75,    size: 140, lifespan: 15, year: 1837}
]

// ─── Текущее состояние ────────────────────────────────────

let currentAnimals = [...tableAnimals]

// ─── Рендер таблицы ───────────────────────────────────────

function renderTable(animals) {
    const tbody = document.querySelector('.table__body')
    tbody.innerHTML = ''
    animals.forEach(animal => {
        const tr = document.createElement('tr')
        ;['name', 'habitat', 'weight', 'size', 'lifespan', 'year'].forEach(key => {
            const td = document.createElement('td')
            td.className = 'table__cell'
            td.textContent = animal[key]
            tr.appendChild(td)
        })
        tbody.appendChild(tr)
    })
}

// ─── Фильтрация ───────────────────────────────────────────

function applyFilter(e) {
    e.preventDefault()

    const name     = document.getElementById('name').value.trim().toLowerCase()
    const habitat  = document.getElementById('habitat').value.trim().toLowerCase()
    const weight   = parseFloat(document.getElementById('weight').value)
    const size     = parseFloat(document.getElementById('size').value)
    const lifespan = parseFloat(document.getElementById('lifespan').value)
    const yearFrom = parseInt(document.getElementById('yearFrom').value)
    const yearTo   = parseInt(document.getElementById('yearTo').value)

    currentAnimals = tableAnimals.filter(animal => {
        if (name     && !animal.name.toLowerCase().includes(name))       return false
        if (habitat  && !animal.habitat.toLowerCase().includes(habitat)) return false
        if (!isNaN(weight)   && animal.weight   < weight)                return false
        if (!isNaN(size)     && animal.size     < size)                  return false
        if (!isNaN(lifespan) && animal.lifespan < lifespan)              return false
        if (!isNaN(yearFrom) && animal.year     < yearFrom)              return false
        if (!isNaN(yearTo)   && animal.year     > yearTo)                return false
        return true
    })

    renderTable(currentAnimals)
}

// ─── Сортировка ───────────────────────────────────────────

function applySort(e) {
    e.preventDefault()

    // Собираем 3 уровня: [{field, desc}, ...]
    const levels = ['sort1', 'sort2', 'sort3']
        .map(name => ({
            field: sortFieldMap[document.querySelector(`select[name="${name}"]`).value],
            desc:  document.querySelector(`input[name="${name}__checkbox"]`).checked
        }))
        .filter(level => level.field) // пропускаем незаполненные

    const sorted = [...currentAnimals].sort((a, b) => {
        for (const { field, desc } of levels) {
            const valA = a[field]
            const valB = b[field]

            let cmp = 0
            if (typeof valA === 'string') {
                cmp = valA.localeCompare(valB, 'ru')
            } else {
                cmp = valA - valB
            }

            if (cmp !== 0) return desc ? -cmp : cmp
        }
        return 0
    })

    renderTable(sorted)
}

// ─── Навешиваем обработчики ───────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.filter').addEventListener('submit', applyFilter)
    document.querySelector('.sort').addEventListener('submit', applySort)
})
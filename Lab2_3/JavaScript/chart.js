const optionInfo = {
    max_weight: {
        keyY: "Вес",
        stat: "max",
        color: "red",
        label: "Максимальный вес"
    },
    avg_weight: {
        keyY: "Вес",
        stat: "avg",
        color: "orange",
        label: "Средний вес"
    },
    min_size: {
        keyY: "Размер",
        stat: "min",
        color: "blue",
        label: "Минимальный размер"
    },
    max_size: {
        keyY: "Размер",
        stat: "max",
        color: "green",
        label: "Максимальный размер"
    }
};

function getSelectedOptions(form) {
    return Array
        .from(form.querySelectorAll('#checkboxes input[type="checkbox"]:checked'))
        .map(input => {
            return {
                id: input.value, ...optionInfo[input.value]
            };
        }).filter(option => option.keyY);
}

function getValueByOption(item, option) {
    return item.values[option.keyY][option.stat];
}

function clearGraph() {
    const svg = d3.select("svg");
    svg.selectAll("circle").remove();
    svg.selectAll(".graph-line").remove();
    svg.selectAll("rect").remove();
}

function createArrGraph(data, keyX, keyY) {
    const keyYList = Array.isArray(keyY) ? keyY : [keyY];
    const groupObj = d3.group(data, d => d[keyX]);

    let arrGraph = [];

    for (let entry of groupObj) {
        const labelX = entry[0];
        const rows = entry[1];

        let values = {};

        keyYList.forEach(currentKeyY => {
            const nums = rows
                .map(d => Number(d[currentKeyY]))
                .filter(value => Number.isFinite(value));

            const min = d3.min(nums);
            const max = d3.max(nums);
            const avg = d3.mean(nums);

            values[currentKeyY] = {
                min: min,
                max: max,
                avg: avg
            };
        });

        arrGraph.push({
            labelX: labelX,
            values: values
        });
    }

    return arrGraph;
}

function createAxis(svg, data, attr_area, selectedOptions) {
    let values = [];

    selectedOptions.forEach(option => {
        values = values.concat(
            data
                .map(d => getValueByOption(d, option))
                .filter(value => Number.isFinite(value))
        );
    });

    const max = d3.max(values);
    const maxY = max > 0 ? max * 1.1 : 1;

    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX])
        .padding(0.2);

    const scaleY = d3.scaleLinear()
        .domain([0, maxY])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr(
            "transform",
            `translate(${attr_area.marginX}, ${attr_area.height - attr_area.marginY})`
        )
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-45)");

    svg.append("g")
        .attr(
            "transform",
            `translate(${attr_area.marginX}, ${attr_area.marginY})`
        )
        .call(axisY);

    return [scaleX, scaleY];
}

function getPointX(d, scaleX, optionIndex, optionCount) {
    const offset = (optionIndex - (optionCount - 1) / 2) * 8;
    return scaleX(d.labelX) + scaleX.bandwidth() / 2 + offset;
}

function createChart(svg, data, scaleX, scaleY, attr_area, option, optionIndex, optionCount) {
    const r = 4;

    svg.selectAll(null)
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => getPointX(d, scaleX, optionIndex, optionCount))
        .attr("cy", d => scaleY(getValueByOption(d, option)))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", option.color);
}

function createPath(svg, data, scaleX, scaleY, attr_area, option, optionIndex, optionCount) {
    const line = d3.line()
        .x(d => getPointX(d, scaleX, optionIndex, optionCount))
        .y(d => scaleY(getValueByOption(d, option)))
        .curve(d3.curveMonotoneX);

    svg.append("path")
        .datum(data)
        .attr("class", "graph-line")
        .attr("d", line)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("stroke", option.color)
        .style("stroke-width", "2px")
        .style("fill", "none");
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, option, optionIndex, optionCount) {
    const w = 6;
    const gap = 2;

    const step = w + gap;
    const groupWidth = optionCount * w + (optionCount - 1) * gap;
    const startOffset = -groupWidth / 2;

    svg.selectAll(null)
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => {
            return scaleX(d.labelX)
                + scaleX.bandwidth() / 2
                + startOffset
                + optionIndex * step;
        })
        .attr("y", d => scaleY(getValueByOption(d, option)))
        .attr("width", w)
        .attr("height", d => scaleY(0) - scaleY(getValueByOption(d, option)))
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", option.color);
}
function drawGraph(data, dataForm) {
    const form = dataForm;
    const svg = d3.select("svg");

    svg.selectAll("*").remove();

    const selectedOptions = getSelectedOptions(form);
    const error = form.querySelector("#error");
    const svgNode = svg.node();

    if (selectedOptions.length === 0) {
        error.style.display = "block";
        svgNode.style.display = "none";
        return;
    }

    error.style.display = "none";
    svgNode.style.display = "block";

    const keyX = form.querySelector('input[name="axis_x"]:checked').value;

    const keyY = [...new Set(selectedOptions.map(option => option.keyY))];

    let arrGraph = createArrGraph(data, keyX, keyY);

    if (keyX === "Год открытия" || keyX === "Продолжительность жизни") {
        arrGraph.sort((a, b) => Number(a.labelX) - Number(b.labelX));
    } else {
        arrGraph.sort((a, b) => String(a.labelX).localeCompare(String(b.labelX), "ru"));
    }

    const attr_area = {
        width: parseFloat(svg.style("width")),
        height: parseFloat(svg.style("height")),
        marginX: 50,
        marginY: 100
    };

    const [scX, scY] = createAxis(svg, arrGraph, attr_area, selectedOptions);

    const type = form.querySelector("#type").value;

    selectedOptions.forEach((option, index) => {
        if (type === "dots") {
            createChart(svg, arrGraph, scX, scY, attr_area, option, index, selectedOptions.length);
        }

        if (type === "column") {
            createHistogram(svg, arrGraph, scX, scY, attr_area, option, index, selectedOptions.length);
        }

        if (type === "graph") {
            createPath(svg, arrGraph, scX, scY, attr_area, option, index, selectedOptions.length);
            createChart(svg, arrGraph, scX, scY, attr_area, option, index, selectedOptions.length);
        }
    });
}
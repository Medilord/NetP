
function createArrGraph(data, key) {
    const groupObj = d3.group(data, d => d[key]);

    let arrGraph = [];
    for(let entry of groupObj) {
        const minMax = d3.extent(entry[1].map(d => d['Высота']));
        arrGraph.push({labelX : entry[0], values : minMax});
    }

    return arrGraph;
}

function drawGraph(data, dataForm) {
    const keyX = document.querySelector('input[name="axis_selection"]:checked').value;

    let arrGraph = createArrGraph(data, keyX);

    if (keyX === "Год") {
        arrGraph.sort((a, b) => a.labelX <= b.labelX ? -1 : 1);
    }

    const svg = d3.select("svg")
    svg.selectAll('*').remove();

    const attr_area = {
        width: parseFloat(svg.style('width')),
        height: parseFloat(svg.style('height')),
        marginX: 50,
        marginY: 50
    }


    const maxHeightCheckbox = dataForm.querySelector("#max_height");
    const minHeightCheckbox = dataForm.querySelector("#min_height");
    const isMaxHeight = maxHeightCheckbox.checked;
    const isMinHeight = minHeightCheckbox.checked;

    let chartMinMax = (isMaxHeight && isMinHeight) ? "minmax" : (isMinHeight ? "min" : (isMaxHeight ? "max" : ""));

    const selectedOption = dataForm.querySelector("#type").value;

    const [scX, scY] = createAxis(svg, arrGraph, attr_area, chartMinMax);

    if(isMaxHeight) {
        (selectedOption === "Точечная диаграмма")
            ? createChart(svg, arrGraph, scX, scY, attr_area, "red", true)
            : createHistogram(svg, arrGraph, scX, scY, attr_area, "red", true)
    }
    if(isMinHeight) {
        (selectedOption === "Точечная диаграмма")
            ? createChart(svg, arrGraph, scX, scY, attr_area, "blue", false)
            : createHistogram(svg, arrGraph, scX, scY, attr_area, "blue", false)
    }
}

function clearGraph(){
    const svg = d3.select("svg")
    svg.selectAll('circle').remove();
    svg.selectAll('rect').remove();

}

function createAxis(svg, data, attr_area, showMinMax) {
    let values = [];

    if (showMinMax.includes("min")) {
        values = data.map(d => d.values[0]);
    }
    if (showMinMax.includes("max")) {
        values = values.concat(data.map(d => d.values[1]));
    }

    const [min, max] = d3.extent(values);

    const scaleX = d3.scaleBand()
        .domain(data.map(d => d.labelX))
        .range([0, attr_area.width - 2 * attr_area.marginX]);

    const scaleY = d3.scaleLinear()
        .domain([min * 0.85, max * 1.1 ])
        .range([attr_area.height - 2 * attr_area.marginY, 0]);

    const axisX = d3.axisBottom(scaleX);
    const axisY = d3.axisLeft(scaleY);

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, 
                                      ${attr_area.height - attr_area.marginY})`)
        .call(axisX)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", d => "rotate(-45)");

    svg.append("g")
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .call(axisY);

    return [scaleX, scaleY]
}

function createChart(svg, data, scaleX, scaleY, attr_area, color, is_max) {
    const r = 4;

    const dots = svg.selectAll(".dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("r", r)
        .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
        .attr("cy", d => { //scaleY(d.values[1])
            let yPos = scaleY(d.values[is_max ? 1 : 0])

            console.log(d.values)
            if (d.values[0] === d.values[1]) {
                yPos += is_max ? -r / 4 : r / 4
            }

            return yPos;
        })
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}

function createHistogram(svg, data, scaleX, scaleY, attr_area, color, is_max) {
    const w = 8;

    const rects = svg.selectAll(".rects")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - (is_max ? 0 : w))
        .attr("y", d => scaleY(d.values[is_max ? 1 : 0]))
        .attr("width", w)
        .attr("height", d => attr_area.height - scaleY(d.values[is_max ? 1 : 0]) - 2 * attr_area.marginY)
        .attr("transform", `translate(${attr_area.marginX}, ${attr_area.marginY})`)
        .style("fill", color)
}
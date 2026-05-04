function createPath() {
    const svg = d3.select("svg")
    const width = svg.attr("width")
    const height = svg.attr("height")
    let data = [];
    const r = 100;
    const xOffset = 600;
    const yOffset = 600;

    for (let t = 0; t >= -Math.PI * 2; t -= 0.01) {
        offset = t;
        x_t = 4 * r * Math.cos(offset) - r * Math.cos(4 * offset);
        y_t = 4 * r * Math.sin(offset) - r * Math.sin(4 * offset);
        data.push(
            {
                x: x_t + xOffset,
                y: y_t + yOffset
            }
        );
    }
    return data;
}

const drawPath =() => {
    const line = d3.line()
        .x((d) => d.x)
        .y((d) => d.y);
    const svg = d3.select("svg")
    const path = svg.append('path')
        .attr('d', line(createPath()))
        .attr('stroke', 'blue')
        .attr('fill', 'none');

    return path;
}

function translateAlong(path, scales, angles) {
    const length = path.getTotalLength();

    return function() {
        return function(t) {
            const {x, y} = path.getPointAtLength(t * length);
            const rotation = angles.angleFrom + (angles.angleTo - angles.angleFrom) * t;
            const momentScaleX = scales.scaleXFrom + (scales.scaleXTo - scales.scaleXFrom) * t;
            const momentScaleY = scales.scaleYFrom + (scales.scaleYTo - scales.scaleYFrom) * t;

            return `translate(${x},${y}) rotate(${rotation}) scale(${momentScaleX}, ${momentScaleY})`;
        }
    }
}
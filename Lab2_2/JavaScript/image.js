
const drawCar = (svg) => {
    const car = svg.append("g");

    car.append("rect")
        .attr("x", -100)
        .attr("y", -25)
        .attr("width", 200)
        .attr("height", 50)
        .attr("fill", "red")
        .attr("rx", 15)
        .attr("ry", 15);

    car.append("rect")
        .attr("x", -50)
        .attr("y", -65)
        .attr("width", 100)
        .attr("height", 50)
        .attr("fill", "red")
        .attr("rx", 15)
        .attr("ry", 15);

    car.append("rect")
        .attr("x", 5)
        .attr("y", -60)
        .attr("width", 40)
        .attr("height", 35)
        .attr("fill", "white")
        .attr("ry", 5);

    car.append("circle")
        .attr("cx", -65)
        .attr("cy", 20)
        .attr("r", 30)
        .attr("fill", "white");

    car.append("circle")
        .attr("cx", -65)
        .attr("cy", 20)
        .attr("r", 25)
        .attr("fill", "red");

    car.append("circle")
        .attr("cx", 65)
        .attr("cy", 20)
        .attr("r", 30)
        .attr("fill", "white");

    car.append("circle")
        .attr("cx", 65)
        .attr("cy", 20)
        .attr("r", 25)
        .attr("fill", "red");

    car.append("circle")
        .attr("cx", 100)
        .attr("cy", -10)
        .attr("r", 10)
        .attr("fill", "white");


    return car;
}
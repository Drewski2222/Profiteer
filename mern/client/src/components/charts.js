import * as d3 from 'd3'

export const renderDonutChart = (data, range, containerSelector) => {
    let titleText;
    if (range === 7) {
        titleText = 'Spending by Category (1 Week)';
    } else if (range === 30) {
        titleText = 'Spending by Category (1 Month)';
    } else if (range === 90) {
        titleText = 'Spending by Category (3 Months)';
    } else if (range === 180) {
        titleText = 'Spending by Category (6 Months)';
    } else if (range === 365) {
        titleText = 'Spending by Category (1 Year)';
    }

    d3.select(containerSelector).selectAll("*").remove(); // Clear the container

    const width = 635;
    const height = 240;
    const radius = Math.min(width, height) / 2;

    const color = d3.scaleOrdinal()
        .range(["#4974A5", "#5C8BC6", "#709FD7", "#83B2E8", "#96C7F9", "#A9DBFA", "#6BA1D6"]);

    const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    const hoverArc = d3.arc()
        .outerRadius(radius - 5)
        .innerRadius(radius - 75);

    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    const svg = d3.select(containerSelector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2 },${height / 2 + 10})`);

    svg.append("text")
        .attr("x", 0)
        .attr("y", -height / 2 +7)
        .attr("text-anchor", "middle")
        .style("font-size", "1.2em")
        .style('font-family', 'Helvetica')
        .text(titleText);

    const g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");

    const path = g.append("path")
        .attr("d", arc)
        .style("fill", d => color(d.data.label))
        .each(function(d) { this._current = d; }) // store the initial angles

    g.on("mouseover", function(event, d) {
        d3.selectAll(".arc path")
            .transition()
            .duration(200)
            .style("opacity", 0.3);

        d3.select(this).select("path")
            .transition()
            .duration(200)
            .attr("d", hoverArc)
            .style("opacity", 1);

        d3.select(this).select("text")
            .transition()
            .duration(200)
            .style("opacity", 1);

        d3.select(this).select("polyline")
            .transition()
            .duration(200)
            .style("opacity", 1);
    })
    .on("mouseout", function(event, d) {
        d3.selectAll(".arc path")
            .transition()
            .duration(200)
            .style("opacity", 1)
            .attr("d", arc);

        d3.select(this).select("text")
            .transition()
            .duration(200)
            .style("opacity", 0);
        
        d3.select(this).select("polyline")
            .transition()
            .duration(200)
            .style("opacity", 0);
    });

    // Add labels and lines
    const text = g.append("text")
        .attr("transform", d => {
            const pos = hoverArc.centroid(d);
            pos[0] = radius * 0.99 * (midAngle(d) < Math.PI ? 1 : -1);
            return `translate(${pos})`;
        })
        .attr("dy", ".35em")
        .attr("text-anchor", d => midAngle(d) < Math.PI ? "start" : "end")
        .style("opacity", 0)
        .text(d => d.data.label);

    g.append("polyline")
        .attr("points", d => {
            const pos = hoverArc.centroid(d);
            const mid = arc.centroid(d);
            const outer = [radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1), pos[1]];
            return [mid, pos, outer];
        })
        .style("fill", "none")
        .style("stroke", "black")
        .style("opacity", 0)
        .style("stroke-width", "1px");

    function midAngle(d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    }
};


export const renderLineChart = (data, range, containerSelector) => {
    let titleText;
    if (range === 7) {
        titleText = 'Net Income (1 Week)'
    } else if (range === 30) {
        titleText = 'Net Income (1 Month)'
    } else if (range === 90) {
        titleText = 'Net Income (3 Months)'
    } else if (range === 180) {
        titleText = 'Net Income (6 Months)'
    } else if (range === 365) {
        titleText = 'Net Income (1 Year)'
    }

    // Remove any existing SVG elements
    d3.select(containerSelector).selectAll('*').remove();

    // Set up the dimensions
    const width = 635;
    const height = 261;
    const margin = { top: 10, right: 30, bottom: 30, left: 57 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Parse the date/time data
    const parseTime = d3.timeParse("%Y-%m-%d");

    // Set up scales
    const x = d3.scaleTime()
        .range([0, innerWidth]);

    const y = d3.scaleLinear()
        .range([innerHeight, 0]);

    // Define the line
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.value));

    // Convert data to proper format
    data.forEach(d => {
        d.date = parseTime(d.date);
        d.value = +d.value;
    });

    // Set domains
    x.domain(d3.extent(data, d => d.date));
    y.domain(d3.extent(data, d => d.value)); 

    // Create SVG element
    const svg = d3.select(containerSelector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add white background rectangle
    svg.append("rect")
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .style("fill", "white");

    // Append title
    svg.append('text')
    .attr('x', width/3 + 50)
    .attr('y', 20)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text(titleText);
    
    // Append path
    svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Append circles for data points
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("cx", d => x(d.date))
        .attr("cy", d => y(d.value))
        .attr("r", 8)
        .style("fill", "steelblue")
        .style("opacity", 0)
        .on("mouseover", function (event, d) {
            d3.select(this).transition().duration(200).style("opacity", 1);
            const [xCoord, yCoord] = d3.pointer(event);
            if (d && d.date && d.value) {
                tooltip.style("opacity", 1)
                    .html(`Date: ${d.date.toLocaleDateString()}<br>Value: ${d.value}`)
                    .style("left", (xCoord + 10) + "px")
                    .style("top", (yCoord - 20) + "px");
            }
        })
        .on("mouseout", function () {
            const circle = d3.select(this);
            circle.transition().duration(200).style("opacity", 0);
            setTimeout(() => {
            }, 300); // Delay hiding the tooltip
        });

    // Append x-axis
    let xAxis;
    if (range === 7) {
        xAxis = d3.axisBottom(x)
            .ticks(d3.timeDay.every(1))
            .tickFormat(d3.timeFormat("%b %d"));
    } else if (range === 30) {
        xAxis = d3.axisBottom(x)
            .ticks(d3.timeDay.every(4))
            .tickFormat(d3.timeFormat("%b %d"));
    } else if (range === 90) {
        xAxis = d3.axisBottom(x)
            .ticks(d3.timeDay.every(20))
            .tickFormat(d3.timeFormat("%b %d"));
    } else if (range === 180) {
        xAxis = d3.axisBottom(x)
            .ticks(d3.timeDay.every(40))
            .tickFormat(d3.timeFormat("%b %d"));
    } else if (range === 365) {
        xAxis = d3.axisBottom(x)
            .ticks(d3.timeDay.every(60))
            .tickFormat(d3.timeFormat("%b %d"));
    }

    svg.append("g")
        .attr("transform", `translate(0, ${innerHeight})`)
        .style('font-size', 13)
        .call(xAxis);

    // Append y-axis
    svg.append("g")
        .style('font-size', 13)
        .call(d3.axisLeft(y));

    // Append tooltip
    const tooltip = d3.select(containerSelector)
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("opacity", 0)
        .style("background-color", "white")
        .style("border", "1px solid #ddd")
        .style("padding", "5px")
        .style("border-radius", "5px")
        .on("mouseover", function () {
            tooltip.transition().duration(200).style("opacity", 1);
        })
        .on("mouseout", function () {
            tooltip.transition().duration(200).style("opacity", 0);
        });
};

export const renderBudgetPieChart = (data, containerSelector) => {
    const container = document.querySelector(containerSelector);
    const containerExists = container !== null;
    const title = "Spending Limit";

    if (!containerExists) {
        console.error(`Container ${containerSelector} not found in the DOM.`);
        return;
    }

    // Check if an SVG element already exists in the container
    const existingSvg = container.querySelector('svg');
    if (existingSvg) {
        // Remove the existing SVG element
        existingSvg.remove();
    }

    console.log(data);

    // Specify the chart's dimensions.
    const width = 635;
    const height = 347;
    const titleHeight = 30; // Height for the title

    // Create the color scale.
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(["#107ab0", "#4db4e8"]);

    // Create the pie layout and arc generator.
    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    const arcs = pie(data.map(d => ({ ...d, percentage: d.value / data.reduce((sum, d) => sum + d.value, 0) * 100 })));

    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(Math.min(width, height) / 2 - 1);

    // Create the SVG container.
    const svg = d3.select(containerSelector)
        .append("svg")
        .attr("width", width)
        .attr("height", height + titleHeight) // Increase the height to accommodate the title
        .attr("viewBox", [-width / 2, -height / 2 - titleHeight / 2, width, height]) // Adjust the viewBox
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Add the title
    svg.append("text")
        .attr("x", 0)
        .attr("y", -height / 2 - 25 + titleHeight / 4) // Position the title above the chart
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .text(title);
        
    // Add a sector path for each value.
    svg.selectAll()
      .data(arcs)
      .enter()
      .append("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString("en-US")}`);
  
    // Add percentage text
    svg.selectAll()
      .data(arcs)
      .enter()
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .style("fill", "white")
      .style("font-size", 18)
      .text(d => `${d.data.percentage.toFixed(1)}%`);

    // Create a group for the label line and text
    const labelGroup = svg.append("g")
    .attr("class", "label-group")
    .style("display", "none");

    svg.selectAll("path")
    .on("mouseover", function(event, d) {
        // Make all slices semi-transparent
        svg.selectAll("path")
        .transition()
        .duration(200)
        .style("opacity", 0.3);

        // Make the hovered slice opaque and change its color
        d3.select(this)
        .transition()
        .duration(200)
        .style("opacity", 1);

        // Show the label group
        labelGroup.style("display", null);

        // Add a line connecting the center of the pie to the hovered arc
        const [x, y] = arc.centroid(d);
        labelGroup
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", x - 20)
        .attr("y2", y - 50)
        .attr("stroke", "black")
        .attr("stroke-width", 1);

        // Add the category name text
        labelGroup
        .append("text")
        .attr("x", x - 20)
        .attr("y", y - 50)
        .attr("dy", "0.35em")
        .style("font-size", 15)
        .attr("text-anchor", x > 0 ? "start" : "end")
        .attr("fill", "black")
        .text(d.data.name + "" + d.data.value.toFixed(2));
    })
    .on("mouseout", function(event, d) {
        // Make all slices opaque again
        svg.selectAll("path")
        .transition()
        .duration(200)
        .style("opacity", 1)
        .attr("fill", function(d) { return color(d.data.name); }); // Reset the color

        // Hide the label group and remove its contents
        labelGroup.style("display", "none");
        labelGroup.selectAll("*").remove();
    });
    return svg.node();
  }
import * as d3 from 'd3'

export const renderDonutChart = (data, range, containerSelector) => {

    let titleText;
    if (range === 7) {
        titleText = 'Spending by Category (1 Week)'
    } else if (range === 30) {
        titleText = 'Spending by Category (1 Month)'
    } else if (range === 90) {
        titleText = 'Spending by Category (3 Months)'
    } else if (range === 180) {
        titleText = 'Spending by Category (6 Months)'
    } else if (range === 365) {
        titleText = 'Spending by Category (1 Year)'
    }

    d3.select(containerSelector).selectAll("*").remove();
    // Set up the dimensions and radius
    const width = 635;
    const height = 240;
    const radius = Math.min(width, height) / 2;
    const margin = { top: 10, right: 30, bottom: 30, left: 45 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    // Define color scale
    const color = d3.scaleOrdinal()
        .range(["#4974A5", "#5C8BC6", "#709FD7", "#83B2E8", "#96C7F9", "#A9DBFA", "#6BA1D6"  ]);

    // Define the arc generator
    const arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(radius - 70);

    // Define the pie generator
    const pie = d3.pie()
        .sort(null)
        .value(d => d.value);

    // Create SVG element
    const svg = d3.select(containerSelector)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2 },${height / 2 + 10})`);

    // Append title
    svg.append("text")
    .attr("x", 0)
    .attr("y", -height / 2 + margin.top - 5 )
    .attr("text-anchor", "middle")
    .style("font-size", "1.2em")
    .style('font-family', 'Helvetica')
    .text(titleText);


    
    // Append arcs
    const g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .on("mouseover", function(d) { // Add mouseover event
            d3.select(this).select("path")
                .transition()
                .duration(200)
                .attr("d", d3.arc() // Grow the hovered section
                    .outerRadius(radius - 5)
                    .innerRadius(radius - 75)
                );
        })
        .on("mouseout", function(d) { // Add mouseout event
            d3.select(this).select("path")
                .transition()
                .duration(200)
                .attr("d", arc); // Revert back to original size
        });

    // Append path
    g.append("path")
        .attr("d", arc)
        .style("fill", d => color(d.data.label))
        .transition() // Add transition for smooth loading
        .duration(1000) // Set duration for the transition
        .attrTween('d', function(d) {
            const i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
            return function(t) {
                d.endAngle = i(t);
                return arc(d);
            }
        });

    // Append text
    g.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("dy", ".35em")
        .text(d => d.data.label)
        .style("opacity", 0) // Hide text initially
        .transition() // Add transition for text to appear
        .delay(1000) // Delay appearance
        .style("opacity", 1) // Make text visible
        .style("fill", "black");
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
    const margin = { top: 10, right: 30, bottom: 30, left: 45 };
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
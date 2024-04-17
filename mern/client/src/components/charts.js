import * as d3 from 'd3'

export const renderDonutChart = (data, containerSelector) => {
    // Set up the dimensions and radius
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    // Define color scale
    const color = d3.scaleOrdinal()
        .range(["#4974A5", "#5C8BC6", "#709FD7", "#83B2E8", "#96C7F9", "#A9DBFA", "#ff8c00"]);

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
        .attr("transform", `translate(${width / 2},${height / 2})`);

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

export const renderLineChart = (data, containerSelector) => {
    // Declare the chart dimensions and margins.
    const width = 300;
    const height = 100;
    const marginTop = 5;
    const marginRight = 5;
    const marginBottom = 5;
    const marginLeft = 5;
  
    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc(d3.extent(data, d => d.date), [marginLeft, width - marginRight]);
  
    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(data, d => d.close)], [height - marginBottom, marginTop]);
  
    // Declare the line generator.
    const line = d3.line()
        .x(d => x(d.date))
        .y(d => y(d.close));
  
    // Create SVG element
    const svg = d3.select(containerSelector)
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [0, 0, width, height])
        .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
    // Add the x-axis.
    svg.append("g")
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));
  
    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y).ticks(height / 40))
        .call(g => g.select(".domain").remove())
        .call(g => g.selectAll(".tick line").clone()
            .attr("x2", width - marginLeft - marginRight)
            .attr("stroke-opacity", 0.1))
        .call(g => g.append("text")
            .attr("x", -marginLeft)
            .attr("y", 10)
            .attr("fill", "currentColor")
            .attr("text-anchor", "start")
            .text("↑ Daily close ($)"));
  
    // Append a path for the line.
    svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", line(data));
  
  }
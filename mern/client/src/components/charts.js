import * as d3 from 'd3'

const renderDonutChart = (data, containerSelector) => {
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

export default renderDonutChart;

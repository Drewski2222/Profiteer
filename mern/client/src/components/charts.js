import * as d3 from 'd3'
const renderDonutChart = (data, containerSelector) => {
    // Set up the dimensions and radius
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;
  
    // Define color scale
    const color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  
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
      .attr("class", "arc");
  
    // Append path
    g.append("path")
      .attr("d", arc)
      .style("fill", d => color(d.data.label));
  
    // Append text
    g.append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", ".35em")
      .text(d => d.data.label);
  };
  
  export default renderDonutChart;
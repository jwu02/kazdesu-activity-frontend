"use client"

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork
const DisjointForceGraph = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const SCALE = 0.7

    const svgElement = svgRef.current

    // const { width, height } = svgElement.getBoundingClientRect();
    const width = 928
    const height = 500

    const svg = d3.select(svgElement)
      .attr("viewBox", [-width*SCALE, -height*SCALE, width*2*SCALE, height*2*SCALE])
      .classed("w-full h-auto", true)

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links)
        .distance(d=>30+Math.pow(d.value, 2))
        .id(d => d.id))
      .force("charge", d3.forceManyBody())
      .force("x", d3.forceX())
      .force("y", d3.forceY())
    
    const tooltip = d3.select(tooltipRef.current)

    const link = svg.append("g")
      .classed("stroke-muted-foreground opacity-80", true)
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", d => Math.sqrt(d.value))

    const node = svg.append("g")
      .classed("fill-muted-foreground hover:cursor-pointer", true)
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.radius)
      .on("mousemove", mousemove)
      .on("mouseout", mouseout)

    node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))

    node.exit().remove()

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    })

    function mousemove (event) {
      d3.select(event.srcElement)
        .attr("r", event.srcElement.__data__.radius+2)
        // .raise()

      tooltip.transition().duration(3000)
      tooltip.html(event.srcElement.__data__.id)
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY-25}px`)
        .classed("hidden", false)
    }

    function mouseout (event) {
      d3.select(event.srcElement)
      .attr("r", event.srcElement.__data__.radius)

      tooltip.classed("hidden", true)
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(1).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y

      tooltip.classed("hidden", true)
    }

    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0)
      event.subject.fx = null
      event.subject.fy = null
    }

    return () => {
      simulation.stop()
      svg.selectAll("*").remove()
    }
  }, [nodes, links])

  return (
    <>
      <svg ref={svgRef} />
      <div ref={tooltipRef} className="hidden absolute translate-x-[-50%]" />
    </>
  );
};

export default DisjointForceGraph;

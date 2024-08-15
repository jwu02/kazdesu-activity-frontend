"use client"

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork
const DisjointForceGraph = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const SCALE = 1.2

    const svgElement = svgRef.current

    const width = 928
    const height = 500

    const svg = d3.select(svgElement)
      .attr("viewBox", [-width*SCALE, -height*SCALE, width*2*SCALE, height*2*SCALE])
      .classed("w-full h-auto active:cursor-grabbing", true)

    const g = svg.append("g") // Create a group to hold the graph elements

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2]) // Set zoom scale limits
      .on("zoom", zoomed)

    svg.call(zoom) // Apply the zoom behavior to the SVG container

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("collide", d3.forceCollide().radius(15))
      .force("x", d3.forceX())
      .force("y", d3.forceY())

    const link = g
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 1)
      .classed("stroke-node-secondary", true)

    const node = g
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.radius)
      .classed("hover:cursor-pointer", true)
      .classed("fill-node-primary", d => !d.isLeaf)
      .classed("fill-node-secondary", d => d.isLeaf)

    node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)

    // https://stackoverflow.com/questions/11102795/d3-node-labeling
    // Add text elements for each node
    const nodeText = g
      .attr("class", "node-text")
      .selectAll(".node-text")
      .data(nodes)
      .enter().append("text")
      .attr("visibility", "hidden")
      .style("fill", "hsl(var(--primary))")
      .classed("text-3xl", true)
      .text(d => d.id)
      
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
      
      nodeText.each(function(d) {
          // Get text width for centering text horizontally
          const bbox = this.getBBox()
          const textWidth = bbox.width

          d3.select(this)
            .attr("x", d.x)
            .attr("y", d.y)
            .attr("dx", -textWidth / 2)
            .attr("dy", -15-d.radius)
        })
    })

    function zoomed(event) {
      g.attr("transform", event.transform)
    }

    function mouseover(event, d) {
      // Make increase circle radius slightly
      d3.select(event.srcElement)
        .attr("r", event.srcElement.__data__.radius+2)

      // Highlight connected nodes
      const connectedNodeIds = new Set(d.connectedNodes)
      connectedNodeIds.add(d.id); // Add the hovered node itself to the set

      // Adjust fill color based on connection status
      node
        .classed("connected-node", d=>connectedNodeIds.has(d.id))
        .classed("fill-accent", d=>!connectedNodeIds.has(d.id))
        .raise()

      // Show the text of the hovered node
      nodeText
        .attr("visibility", node => node.id === d.id ? "visible" : "hidden")
        .raise()
    }

    function mouseout(event) {
      d3.select(event.srcElement)
      .attr("r", event.srcElement.__data__.radius)

      // Hide all text elements when not hovering
      nodeText.attr("visibility", "hidden")

      node.classed("connected-node", false)
      node.classed("fill-accent", false)
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(1).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y
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
    </>
  );
};

export default DisjointForceGraph;

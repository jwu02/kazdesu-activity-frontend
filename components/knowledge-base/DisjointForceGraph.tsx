"use client"

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork
const DisjointForceGraph = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const SCALE = 1.5

    const svgElement = svgRef.current

    const width = 928
    const height = 500

    const svg = d3.select(svgElement)
      .attr("viewBox", [-width*SCALE, -height*SCALE, width*2*SCALE, height*2*SCALE])
      .classed("w-full h-auto active:cursor-grabbing", true)

    const g = svg.append("g") // Create a group to hold the graph elements

    const zoom = d3.zoom()
      .scaleExtent([0.5, 3]) // Set zoom scale limits
      .on("zoom", zoomed)

    svg.call(zoom) // Apply the zoom behavior to the SVG container

    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-120))
      .force("collide", d3.forceCollide().radius(20))
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
    
    // https://stackoverflow.com/questions/11102795/d3-node-labeling
    // Add text elements for each node
    const nodeText = g
      .attr("class", "node-label")
      .selectAll(".node-label")
      .data(nodes)
      .enter().append("text")
      .attr("visibility", "hidden")
      .style("fill", "hsl(var(--primary))")
      .classed("text-3xl", true)
      .text(d => d.id)

    node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      
    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
      
      nodeText
        .attr("x", d => d.x)
        .attr("y", d => d.y)
    })

    function zoomed(event) {
      g.attr("transform", event.transform)
    }

    function mouseover(event, d) {
      // if (dragActive) return

      // Make increase circle radius slightly
      d3.select(event.srcElement)
        .attr("r", event.srcElement.__data__.radius+2)

      const connectedNodeIds = new Set(d.connectedNodes)
      connectedNodeIds.add(d.id); // Add the hovered node itself to the set

      link
        .classed("muted-link", l=>!(l.source.id===d.id || l.target.id===d.id))
      node
        .classed("muted-node", d=>!connectedNodeIds.has(d.id))
        .raise()

      // Highlight connected edges and nodes
      svg.selectAll("line")
        .filter(l=>(l.source.id===d.id || l.target.id===d.id))
        .classed("connected-link", true)
        .raise()
      svg.selectAll("circle")
        .filter(d=>connectedNodeIds.has(d.id))
        .classed("connected-node", true)
        .raise()

      // Show the text of the hovered node
      nodeText
        .attr("visibility", node => node.id === d.id ? "visible" : "hidden")
        .raise()

      nodeText.each(function(d) {
        // Get text width for centering text horizontally
        const bbox = this.getBBox()
        const textWidth = bbox.width
        d3.select(this)
          .attr("dx", -textWidth / 2)
          .attr("dy", -15-d.radius)
      })
    }

    function mouseout(event) {
      d3
        .select(event.srcElement)
        .attr("r", event.srcElement.__data__.radius)

      link
        .classed("connected-link", false)
        .classed("muted-link", false)
      node
        .classed("connected-node", false)
        .classed("muted-node", false)
        .raise()
      
      // Hide text element when not hovering
      nodeText.attr("visibility", "hidden")
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
      svg.on(".zoom", null) // Clean up the zoom listener on unmount
      svg.selectAll("*").remove()
    }
  }, [nodes, links])

  return (
    <div className="relative">
      {/* Fading Overlay for the edges */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background"></div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background"></div>
        <div className="absolute top-0 left-0 bottom-0 w-10 bg-gradient-to-r from-background"></div>
        <div className="absolute top-0 right-0 bottom-0 w-10 bg-gradient-to-l from-background"></div>
      </div>

      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DisjointForceGraph

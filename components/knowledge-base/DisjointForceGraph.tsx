"use client"

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork
const DisjointForceGraph = ({ nodes, links }) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const nodeLabelRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const SCALE = 1.3

    const svgElement = svgRef.current
    const nodeLabelElement = nodeLabelRef.current

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

    node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended))
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      .on("mousemove", mousemove)

    const nodeLabel = d3.select(nodeLabelElement)
      
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
        .classed("muted-node", d=>!connectedNodeIds.has(d.id))
        // .style("fill", d=>`hsl(var(--${connectedNodeIds.has(d.id) ? 
        //   "node-primary" : "muted"}))`)
        .raise()
      
      link
        .classed("connected-link", l=>(l.source.id===d.id || l.target.id===d.id))
        .classed("muted-link", l=>!(l.source.id===d.id || l.target.id===d.id))

      nodeLabel.transition().duration(3000)
      nodeLabel.classed("hidden", false)
    }

    function mouseout(event) {
      d3.select(event.srcElement)
      .attr("r", event.srcElement.__data__.radius)

      node
        .classed("connected-node", false)
        .classed("muted-node", false)
      link.classed("connected-link", false)
        .classed("muted-link", false)
      
      // Hide text element when not hovering
      nodeLabel.classed("hidden", true)
    }

    function mousemove(event) {
      nodeLabel.html(event.srcElement.__data__.id)
        .style("left", `${event.pageX}px`)
        .style("top", `${event.pageY-25}px`)
    }

    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(1).restart()
      event.subject.fx = event.subject.x
      event.subject.fy = event.subject.y
    }

    function dragged(event) {
      event.subject.fx = event.x
      event.subject.fy = event.y
      // nodeLabel.classed("hidden", true)
      try {
        mousemove(event.sourceEvent)
      } catch(e) {}
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
      <div ref={nodeLabelRef} className="hidden absolute translate-x-[-50%]" />
    </>
  );
};

export default DisjointForceGraph;

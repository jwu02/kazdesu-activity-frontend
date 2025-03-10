"use client"

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { Link, Node } from '@/lib/types'

interface DisjointForceGraphProps {
  nodes: Node[]
  links: Link[]
}

// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork
const DisjointForceGraph = ({ nodes, links }: DisjointForceGraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)

  useEffect(() => {
    const SCALE = 1.5

    const svgElement = svgRef.current
    if (!svgElement) return

    const width = 928
    const height = 500

    const svg = d3.select<SVGSVGElement, unknown>(svgElement)
      .attr("viewBox", [-width*SCALE, -height*SCALE, width*2*SCALE, height*2*SCALE])
      .classed("w-full h-auto active:cursor-grabbing", true)

    const g = svg.append("g") // Create a group to hold the graph elements

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3]) // Set zoom scale limits
      .on("zoom", zoomed)

    svg.call(zoom)

    // Create a simulation with these specific node types
    const simulation = d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody<Node>().strength(-120))
      .force("collide", d3.forceCollide<Node>().radius(20))
      .force("x", d3.forceX<Node>())
      .force("y", d3.forceY<Node>())

    const link = g
      .selectAll<SVGLineElement, Link>("line")
      .data(links)
      .enter().append("line")
      .attr("stroke-width", 1)
      .classed("stroke-node-secondary", true)

    const node = g
      .selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.radius)
      .classed("hover:cursor-pointer", true)
      .classed("fill-node-primary", d => !d.isLeaf)
      .classed("fill-node-secondary", d => d.isLeaf)
    
    const nodeText = g
      .attr("class", "node-label")
      .selectAll<SVGTextElement, Node>(".node-label")
      .data(nodes)
      .enter().append("text")
      .attr("visibility", "hidden")
      .style("fill", "var(--node-primary)")
      .classed("text-3xl", true)
      .text(d => d.id)

    const drag = d3.drag<SVGCircleElement, Node>()
      .on("start", (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
        if (!event.active) simulation.alphaTarget(1).restart()
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      })
      .on("drag", (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
        event.subject.fx = event.x
        event.subject.fy = event.y
      })
      .on("end", (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
        if (!event.active) simulation.alphaTarget(0)
        event.subject.fx = null
        event.subject.fy = null
      })

    node.call(drag)
      .on("mouseover", mouseover)
      .on("mouseout", mouseout)
      
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x ?? 0)
        .attr("y1", d => (d.source as Node).y ?? 0)
        .attr("x2", d => (d.target as Node).x ?? 0)
        .attr("y2", d => (d.target as Node).y ?? 0)

      node
        .attr("cx", d => d.x ?? 0)
        .attr("cy", d => d.y ?? 0)
      
      nodeText
        .attr("x", d => d.x ?? 0)
        .attr("y", d => d.y ?? 0)
    })

    function zoomed(event: d3.D3ZoomEvent<SVGSVGElement, unknown>) {
      g.attr("transform", event.transform.toString())
    }

    function mouseover(event: MouseEvent, d: Node) {
      // Make increase circle radius slightly
      d3.select(event.target as Element)
        .attr("r", d.radius + 2)

      const connectedNodeIds = new Set(d.connectedNodes)
      connectedNodeIds.add(d.id)

      link
        .classed("muted-link", l => !((l.source as Node).id === d.id || (l.target as Node).id === d.id))
      node
        .classed("muted-node", d => !connectedNodeIds.has(d.id))
        .raise()

      // Highlight connected edges and nodes
      svg.selectAll<SVGLineElement, Link>("line")
        .filter(l => ((l.source as Node).id === d.id || (l.target as Node).id === d.id))
        .classed("connected-link", true)
        .raise()
      svg.selectAll<SVGCircleElement, Node>("circle")
        .filter(d => connectedNodeIds.has(d.id))
        .classed("connected-node", true)
        .raise()

      // Show the text of the hovered node
      nodeText
        .attr("visibility", node => node.id === d.id ? "visible" : "hidden")
        .attr("colour", "white")
        .raise()

      nodeText.each(function(d) {
        const bbox = this.getBBox()
        const textWidth = bbox.width
        d3.select(this)
          .attr("dx", -textWidth / 2)
          .attr("dy", -15-d.radius)
      })
    }

    function mouseout(event: MouseEvent) {
      const target = event.target as Element
      const data = d3.select<Element, Node>(target).datum()
      d3.select(target).attr("r", data.radius)

      link
        .classed("connected-link", false)
        .classed("muted-link", false)
      node
        .classed("connected-node", false)
        .classed("muted-node", false)
        .raise()
      
      nodeText.attr("visibility", "hidden")
    }

    return () => {
      simulation.stop()
      svg.on(".zoom", null) // Clean up the zoom listener on unmount
      svg.selectAll("*").remove()
    }
  }, [nodes, links])

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default DisjointForceGraph

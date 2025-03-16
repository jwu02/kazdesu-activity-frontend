"use client"

import { useEffect, useRef, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import { Link, Node } from '@/lib/types'

interface DisjointForceGraphProps {
  nodes: Node[]
  links: Link[]
}

// https://observablehq.com/@d3/disjoint-force-directed-graph/2?intent=fork
const DisjointForceGraph = ({ nodes, links }: DisjointForceGraphProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const gRef = useRef<SVGGElement | null>(null)
  const simulationRef = useRef<d3.Simulation<Node, Link> | null>(null)

  // Memoize constants and configurations
  const config = useMemo(() => ({
    SCALE: 1.5,
    width: 928,
    height: 500,
    nodeRadius: 22,
    linkDistance: 120,
    chargeStrength: -300,
    zoomExtent: [0.2, 4] as [number, number]
  }), [])

  // Memoize the simulation configuration
  const createSimulation = useCallback(() => {
    return d3.forceSimulation<Node>(nodes)
      .force("link", d3.forceLink<Node, Link>(links)
        .id(d => d.id)
        .distance(d => ((d.source as Node).isLeaf || (d.target as Node).isLeaf) ? config.linkDistance * 0.7 : config.linkDistance))
      .force("charge", d3.forceManyBody<Node>()
        .strength(d => d.isLeaf ? config.chargeStrength * 0.5 : config.chargeStrength)
        .theta(0.9)
        .distanceMax(250))
      .force("collide", d3.forceCollide<Node>().radius(d => d.radius))
      .force("x", d3.forceX<Node>().strength(0.03))
      .force("y", d3.forceY<Node>().strength(0.03))
      .alphaDecay(0.015)
      .velocityDecay(0.35)
  }, [nodes, links, config])

  // Memoize zoom behavior
  const zoom = useMemo(() => {
    return d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent(config.zoomExtent)
      .on("zoom", (event: d3.D3ZoomEvent<SVGSVGElement, unknown>) => {
        if (gRef.current) {
          d3.select(gRef.current).attr("transform", event.transform.toString())
        }
      })
  }, [config.zoomExtent])

  // Optimize drag behavior with useCallback
  const drag = useCallback(() => {
    return d3.drag<SVGCircleElement, Node>()
      .on("start", (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
        if (!event.active && simulationRef.current) {
          simulationRef.current.alphaTarget(0.3).restart()
        }
        event.subject.fx = event.subject.x
        event.subject.fy = event.subject.y
      })
      .on("drag", (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
        event.subject.fx = event.x
        event.subject.fy = event.y
      })
      .on("end", (event: d3.D3DragEvent<SVGCircleElement, Node, Node>) => {
        if (!event.active && simulationRef.current) {
          simulationRef.current.alphaTarget(0)
        }
        event.subject.fx = null
        event.subject.fy = null
      })
  }, [])

  // Optimize mouse interactions with useCallback
  const handleMouseover = useCallback((event: MouseEvent, d: Node) => {
    const svg = d3.select(svgRef.current)
    
    // Use more efficient selections
    const target = d3.select(event.target as Element)
    target.attr("r", d.radius + 2)

    const connectedNodeIds = new Set(d.connectedNodes)
    connectedNodeIds.add(d.id)

    // Batch DOM operations
    svg.selectAll<SVGLineElement, Link>("line")
      .classed("muted-link", l => !((l.source as Node).id === d.id || (l.target as Node).id === d.id))
      .classed("connected-link", l => ((l.source as Node).id === d.id || (l.target as Node).id === d.id))

    svg.selectAll<SVGCircleElement, Node>("circle")
      .classed("muted-node", n => !connectedNodeIds.has(n.id))
      .classed("connected-node", n => connectedNodeIds.has(n.id))

    // Optimize text visibility updates
    svg.selectAll<SVGTextElement, Node>("text")
      .attr("visibility", n => n.id === d.id ? "visible" : "hidden")
      .filter(n => n.id === d.id)
      .each(function() {
        const bbox = this.getBBox()
        d3.select(this)
          .attr("dx", -bbox.width / 2)
          .attr("dy", -15-d.radius)
      })
  }, [])

  const handleMouseout = useCallback((event: MouseEvent) => {
    const svg = d3.select(svgRef.current)
    const target = event.target as Element
    const data = d3.select<Element, Node>(target).datum()
    
    // Batch DOM operations
    d3.select(target).attr("r", data.radius)
    
    svg.selectAll("line")
      .classed("connected-link muted-link", false)
    
    svg.selectAll("circle")
      .classed("connected-node muted-node", false)
    
    svg.selectAll("text")
      .attr("visibility", "hidden")
  }, [])

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select(svgRef.current)
      .attr("viewBox", [
        -config.width * config.SCALE,
        -config.height * config.SCALE,
        config.width * 2 * config.SCALE,
        config.height * 2 * config.SCALE
      ].join(","))
      .classed("w-full h-auto active:cursor-grabbing", true)

    // Clear previous content
    svg.selectAll("*").remove()

    const g = svg.append("g")
    gRef.current = g.node()

    // Apply zoom behavior
    svg.call(zoom)

    // Create and store simulation
    const simulation = createSimulation()
    simulationRef.current = simulation

    // Create elements with optimized attributes
    const link = g.selectAll<SVGLineElement, Link>("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1)
      .classed("stroke-node-secondary", true)

    const node = g.selectAll<SVGCircleElement, Node>("circle")
      .data(nodes)
      .join("circle")
      .attr("r", d => d.radius)
      .classed("hover:cursor-pointer fill-node-primary", d => !d.isLeaf)
      .classed("fill-node-secondary", d => d.isLeaf)

    const nodeText = g.selectAll<SVGTextElement, Node>("text")
      .data(nodes)
      .join("text")
      .attr("visibility", "hidden")
      .style("fill", "var(--node-primary)")
      .classed("text-3xl", true)
      .text(d => d.id)

    // Apply interactions
    node.call(drag())
      .on("mouseover", handleMouseover)
      .on("mouseout", handleMouseout)

    // Optimize tick function
    let rafId: number
    const ticked = () => {
      rafId = requestAnimationFrame(() => {
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
    }

    simulation.on("tick", ticked)

    // Cleanup
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (simulationRef.current) simulationRef.current.stop()
      svg.on(".zoom", null)
    }
  }, [nodes, links, config, zoom, handleMouseover, handleMouseout, createSimulation, drag])

  return (
    <div className="relative">
      <svg ref={svgRef}></svg>
    </div>
  )
}

export default DisjointForceGraph

import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { interpolateRdYlGn } from 'd3-scale-chromatic';
import { treeData } from './treeData';
import { HierarchyRectangularNode, TreeLayout, Selection, EnterElement } from 'd3';

@Component({
  selector: 'portfolio-weighted-tree',
  templateUrl: './weighted-tree.component.html',
  styleUrls: ['./weighted-tree.component.scss']
})
export class WeightedTreeComponent implements OnInit {

  // Set the dimensions and margins of the diagram
  margin = { top: 100, right: 0, bottom: 30, left: -100 };
  width = 1000;

  height = 75 * 10;
  data = treeData;
  svg: Selection<Element | EnterElement | Document | Window, {}, HTMLElement, any>
  treeMap: TreeLayout<any>

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin

  i = 0;
  duration = 750;
  root : HierarchyRectangularNode<any>;

  // declares a tree layout and assigns the size

  ngOnInit(): void {

    this.svg = d3.select("#wrapper").append("svg")
      .attr("preserveAspectRatio", "xMinYMin meet")
      .attr("height", this.height)
      .attr("width", '100%')
      .append("g")
      .attr("transform", "translate("
      + this.margin.left + "," + (this.height / 2) + ")");

    this.treeMap = d3.tree().nodeSize([35, 35]);

    this.root = <HierarchyRectangularNode<any>> d3.hierarchy(this.data, (d) => { return d.children; });
    this.root.x0 = 100;
    this.root.y0 = 0;
    

    // Collapse after the second level
    // this.root.children.forEach((d) => this.collapse(d));
    this.update(this.root);
  }


  // update(root);

  // Collapse the node and all it's children
  collapse(d) {

    if (d.children) {
      d._children = d.children
      d._children.forEach((d) => this.collapse(d))
      d.children = null
    }
  }

  update(source) {

    // Assigns the x and y position for the nodes
    let data = this.treeMap(this.root);
    
    
    // Compute the new tree layout.
    let nodes = data.descendants(),
    links = data.descendants().slice(1);      
    

    // Normalize for fixed-depth.
    let connectorLength = 175; // the length of the lines in pixels
    nodes.forEach((d) => { d.y = d.depth * connectorLength * 1.5 });

    nodes = nodes.filter((d) => {
      return d.depth != 0;
    })


    links = links.filter((d) => {
      return d.depth != 1;
    })

    // ****************** Nodes section ***************************

    // Update the nodes...
    var node = this.svg.selectAll('g.node')
      .data(nodes, (d: any) => {
        return d.id || (d.id = ++this.i);
      });
   
      
      // Enter any new modes at the parent's previous position.
      var nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .attr("transform", function (d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
      })
      .on('click', (e) => this.click(e));

    // Add labels for the nodes
    nodeEnter.append('text')
      .attr("dy", ".35em")
      .attr("fill", "wheat")
      .attr("x", (d: any) => {
        return d.children || d._children ? -13 : 13;
      })
      .attr("text-anchor", (d: any) => {
        return  d.children || d._children ? 'end' : "start";
      })
      .text((d) => { return d.data.name; });      
      
    // Add Circle for the nodes
    nodeEnter.append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style("fill", (d: any) => {
        return d._children ? '#ff4500' : "#fff";
      }).style('stroke', '#24e1f4').style('stroke-width', '3px');
    

    // UPDATE
    var nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate.transition()
      .duration(this.duration)
      .attr("transform", (d) => {
        return "translate(" + d.y + "," + d.x + ")";
      });
      
    // Update the node attributes and style
    nodeUpdate.select('circle.node')
      .attr('r', 10)
      .style("fill", (d: any) => {
        return d._children ? "#ff4500" : "#fff";
      })
      .attr('cursor', 'pointer');


    // Remove any exiting nodes
    var nodeExit = node.exit().transition()
      .duration(this.duration)
      .attr("transform", (d) => {
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('circle')
      .attr('r', 1e-6);

    // On exit reduce the opacity of text labels
    nodeExit.select('text')
      .style('fill-opacity', 1e-6);

    // ****************** links section ***************************

    // Update the links...
    var link = this.svg.selectAll('path.link')
      .data(links, (d: any) => { return d.id; });

    // Enter any new links at the parent's previous position.
    var linkEnter = link.enter().insert('path', "g")
      .attr("class", "link")
      .attr('d', (d) => { 
        var o = { x: source.x0, y: source.y0 }
        return this.diagonal(o, o)
      })
      .style('fill-opacity', '0')
      .style('stroke', '#832424')
      .style('stroke-width', '5px')

    // UPDATE
    var linkUpdate = linkEnter.merge(link);

    // Transition back to the parent element position
    linkUpdate.transition()
      .duration(this.duration)
      .attr('d',  (d) => { return this.diagonal(d, d.parent) });

    // Remove any exiting links
    var linkExit = link.exit().transition()
      .duration(this.duration)
      .attr('d',  (d) => {
        var o = { x: source.x, y: source.y }
        return this.diagonal(o, o)
      })
      .style('fill-opacity', '0')
      .style('stroke', '#fff')
      .style('stroke-width', '5px')
      .remove();

    // Store the old positions for transition.
    nodes.forEach( (d: any) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  // Creates a curved (diagonal) path from parent to the child nodes

  diagonal(s, d) {    
    return `M ${s.y} ${s.x}
     C ${(s.y + d.y) / 2} ${s.x},
      ${(s.y + d.y) / 2 } ${d.x},
      ${d.y}  ${d.x}
      `

  }

  // Toggle children on click.
  click(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.update(d);
  }
}
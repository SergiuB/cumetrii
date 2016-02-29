import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import d3 from 'd3'
import values from 'lodash/values'
import assign from 'lodash/assign'
import concat from 'lodash/concat'

// import 'bootstrap-css-only/css/bootstrap.css'
// import 'font-awesome/css/font-awesome.css'
import './assets/style'
import svgDefsUrl from "./assets/svg-defs.svg"

import {entities, relations} from './data'

let App = (props) => {
  return <div>{props.children}</div>
}

var size = 100;
var height = 800;
var width = 960;
var charge = -1000;
var linkDistance = 100;

function addType(arr, type) {
  return arr.map(item => assign(item, {type}))
}

let nodes = values(entities)

let links = relations
  .map(rel => assign(rel, {
    source: entities[rel.source],
    target: entities[rel.target],
  }))

let foci = {
  'state': {x: width*0.1, y: height*0.9},
  'person': {x: width*0.5, y: height*0.1},
  'company': {x: width*0.9, y: height*0.9}
};

class Svg extends React.Component {
  render() {
    let style = {width: this.props.width, height: this.props.height}
    return <svg style={style}>
      {this.props.children}
    </svg>
  }
}

class Link extends React.Component {
  linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
  }
  render() {
    let link = this.props.data
    let className = `link ${link.type}`
    return <path className={className} d={this.linkArc(link)}
      markerEnd={`url(${svgDefsUrl}#${link.type})`}/>
  }
}

class Node extends React.Component {
  render() {
    let point = this.props.data
    return <g className={point.type} transform={`translate(${point.x} ${point.y})`} >
      <circle r={15}></circle>
      <text x={-15} y={-15}>{point.name}</text>
    </g>
  }
}

class Graph extends React.Component {
  render () {
    let nodes = this.props.nodes.map(
      node => <Node key={node.id} data={node}/>
    )
    let links = this.props.links.map(
      link => <Link key={link.id} data={link}/>
    )
    return <Svg width={this.props.width} height={this.props.height}>
      {nodes}
      {links}
    </Svg>
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {nodes, links}
  }
  componentWillMount() {
    var force = d3.layout.force()
      .size([width, height])
      .nodes(this.state.nodes)
      .links(this.state.links)
      .linkDistance(linkDistance)
      .charge(d =>  charge)
      .start();
    force.on('tick', (e) => {
      var k = 0.1 * e.alpha;
      nodes.forEach(function(o, i) {
        o.y += (foci[o.type].y - o.y) * k;
        o.x += (foci[o.type].x - o.x) * k;
      });
      this.setState({nodes, links})
    })
  }

  render() {
    return <Graph nodes={this.state.nodes}
      links={this.state.links}
      height={height} width={width}>
    </Graph>
  }
}

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
</Router>, document.getElementById('app'))

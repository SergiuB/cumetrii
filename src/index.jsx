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
var charge = -3000;
var linkDistance = 100;
var bigLinkDistance = 300;
let radius = 25

function addType(arr, type) {
  return arr.map(item => assign(item, {type}))
}


function near(val, radius = 100) {
  let plusOrMinus = Math.random() < 0.5 ? -1 : 1
  return val + Math.random() * radius * plusOrMinus
}

let foci = {
'state': {x: width*0.1, y: height*0.9},
'person': {x: width*0.5, y: height*0.1},
'company': {x: width*0.9, y: height*0.9}
};

let nodes = values(entities)
  .map(e => assign(e, {x: near(foci[e.type].x), y: near(foci[e.type].y)}))

let links = relations
  .map(rel => assign(rel, {
    source: entities[rel.source],
    target: entities[rel.target],
  }))

class Svg extends React.Component {
  componentDidMount(){
     var markerNode = this._marker

     markerNode.setAttribute('markerWidth', 6)
     markerNode.setAttribute('markerHeight', 6)
     markerNode.setAttribute('refX', radius)
     markerNode.setAttribute('refY', -1.5)
     markerNode.setAttribute('orient', 'auto')
  }
  render() {
    let style = {width: this.props.width, height: this.props.height}
    return <svg style={style}>
      <defs>
        <marker ref={m=>this._marker=m} id="triMarker"
          viewBox="0 -5 10 10">
        <path d="M0,-5L10,0L0,5"></path>
      </marker>
    </defs>
      {this.props.children}
    </svg>
  }
}

class Link extends React.Component {
  componentDidMount(){
     this._tp.setAttribute("startOffset","50%")
  }
  linkArc(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0 1 " + d.target.x + "," + d.target.y;
  }

  linkTextArc(d) {
    let target = d.target
    let source = d.source
    let dir = 1
    if (target.x - d.source.x < 0) {
      [source, target] = [target, source]
      dir = 0
    }
    var dx = target.x - source.x,
        dy = target.y - source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
    return "M" + source.x + "," + source.y + "A" + dr + "," + dr + " 0 0 " + dir + " " + target.x + "," + target.y;
  }
  render() {
    let link = this.props.data
    let className = `link ${link.type}`
    return <g>
      <path id={`link${link.id}`} className='link-invisible' d={this.linkTextArc(link)}/>
      <path className={className} d={this.linkArc(link)}
        markerEnd={`url(#triMarker)`}/>
      <text className='pathLabel'
          dy="-12">

          <textPath ref={tp=>this._tp=tp}
              xlinkHref={`#link${link.id}`}>{link.name}</textPath>
      </text>
    </g>
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
      {links}
      {nodes}
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
      .linkDistance(d=> {
        if (d.target.type != d.source.type)
          return bigLinkDistance
        return linkDistance
      })
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

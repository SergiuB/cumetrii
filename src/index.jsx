import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'
import d3 from 'd3'

// import 'bootstrap-css-only/css/bootstrap.css'
// import 'font-awesome/css/font-awesome.css'
// import './assets/style'

let App = (props) => {
  return <div>{props.children}</div>
}

var size = 100;
var height = 800;
var width = 960;
var charge = -3;

var data = d3.range(size).map(function(){
  return {
    r: Math.floor(Math.random() * 8 + 2),
    circleId: Math.random()
  };
});


class Chart extends React.Component {
  render() {
    let style = {width: this.props.width, height: this.props.height}
    return <svg style={style}>
      {this.props.children}
    </svg>
  }
}

class DataSeries extends React.Component {
  render() {
    let style = {fill: "steelblue"}
    var circles = this.props.data.map(
      point => <circle key={point.circleId} cx={point.x} cy={point.y} r={point.r} style={style}></circle>
    )
    return <g>{circles}</g>;
  }
}

DataSeries.defaultProps = {
  title: '',
  data: []
}

class BubbleChart extends React.Component {
  render () {
    var data = this.props.data;
    return <Chart width={this.props.width} height={this.props.height}>
      <DataSeries data={data}></DataSeries>
    </Chart>
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data}
  }
  componentWillMount() {
    var force = d3.layout.force()
      .size([width, height])
      .nodes(this.state.data)
      .charge(d =>  d.r * d.r * charge)
      .start();
    force.on('tick', () => {
      this.setState({data})
    })
  }

  render() {
    return <BubbleChart data={this.state.data}
      height={height} width={width}></BubbleChart>
  }
}

ReactDOM.render(<Router history={hashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
  </Route>
</Router>, document.getElementById('app'))

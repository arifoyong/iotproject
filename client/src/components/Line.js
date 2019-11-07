import React from "react";
import Chart from "chart.js";

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };

    this.chartRef = React.createRef();
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidUpdate() {
    this.drawLineChart();
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  drawLineChart = () => {
    const wh = this.state.width
    const breakPoint = 480
    const fs = wh > breakPoint ? 12 : 8

    this.lineChart = new Chart(this.chartRef.current.getContext("2d"), {
      type: "line",
      data: { datasets: this.props.tempData },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          display: wh > breakPoint ? true : false,
          position: "bottom",
          fontSize: fs,
        },
        title: {
          display: true,
          text: this.props.title,
          fontSize: fs * 1.2
        },
        scales: {
          xAxes: [{
            type: "time",
            time: {
              unit: 'hour',
              unitStepSize: 0.5,
              round: 'hour',
              tooltipFormat: "h:mm:ss a",
              displayFormats: {
                hour: 'MMM D, h:mm a'
              }
            },
            ticks: {
              fontSize: fs,
              minRotation: 0,
              maxRotation: 12
            }
          }],
          yAxes: [{
            type: 'linear',
            ticks: {
              min: this.props.yMin,
              max: this.props.yMax,
              fontSize: fs
            },
            scaleLabel: {
              display: true,
              labelString: this.props.yLabel,
              fontSize: fs
            }
          }]
        }
      }

    });
  };

  render() {
    return (
      <div id="canvas-holder">
        <canvas id="myChart" style={{
          // "minHeight": "100%",
          // "minWidth": "70%"
        }
        } ref={this.chartRef} />
      </div>
    )

  }
}

export default Line;

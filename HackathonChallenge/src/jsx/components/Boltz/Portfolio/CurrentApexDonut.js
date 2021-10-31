import React from "react";
import ReactApexChart from "react-apexcharts";
 
class CurrentApexDonut extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			series: [34, 12, 41, 22],
			options: {
				chart: {
					height: 250,
					type: "donut",
					toolbar: {
						show: false,
					},
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
				  width: 0,
				},
				colors:['#374C98','#52CCCE','#1a8587','#95D47A','#688FAD','#3F647E','#4B256D','#EF3E5B','#FF782C', '#00ADA3','#FFAB2D'],
				legend: {
					position: 'bottom',
					show:false
				},
				responsive: [{
					breakpoint: 768,
					options: {
					    chart: {
							height:200
						},
					}
				}]
			},
		};
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (JSON.stringify(this.props.donutPerc) !== JSON.stringify(prevProps.donutPerc) ) {
			console.log(`CURRENT APEX DONUT =========> this.props.donutPerc: `,this.props.donutPerc)
			this.setState({series: this.props.donutPerc,})
		}
	}

	render() {
		return (
			<div id="chart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="donut"
				  height={250}
				/>
			</div>
		);
	}
}

export default CurrentApexDonut;
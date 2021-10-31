import React from "react";
import ReactApexChart from "react-apexcharts";

class CurrentRadialApex extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			series: [85, 60, 67, 50],
			options: {
				chart: {
					height: 350,
					type: "radialBar",
				},
				plotOptions: {
					radialBar: {
						startAngle:-90,
						endAngle: 90,
						dataLabels: {
							name: {
								fontSize: '22px',
							},
							value: {
								fontSize: '16px',
							},
						},
					},
				},
				stroke:{
					lineCap: 'round',
				},
				labels: ['A', 'B', 'C', 'D'],
				colors:['#FFAF65', '#4441DE','#60C695','#F34F80','#07EDE3'],
			},
		
		};
	}

	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (JSON.stringify(this.props.splits) !== JSON.stringify(prevProps.splits) ) {
			// console.log(`CURRENTRADIALAPEX 2 =========> this.props.msg: `,this.props.splits)
			this.setState({ series: this.props.splits.series, options: { labels:  this.props.splits.options.labels, }});
		}
	}

	render() {
		return (
			<div id="chart" >
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="radialBar"
				  height={350}
				/>
			</div>
		);
	}
}

export default CurrentRadialApex;
import React from "react";
import ReactApexChart from "react-apexcharts";

class MarketLineApex extends React.Component {
	constructor(props) {
		super(props);  

		this.state = {
			series: [
					{
						name: 'series1',
						data: [200, 200, 200, 450, 300, 400, 300,400, 500, 300]
					}, 
					{
						name: 'series2',
						data: [400, 300, 450, 350, 700, 200, 800, 800, 700, 750]
					}
			],
			options: {
				chart: {
					height: 350,
					type: "line",
					toolbar: {
						show: false,
					},
				},
				colors:["#2258BF","#FF7213"],
				dataLabels: {
					enabled: false
				},
				stroke: {
					curve: 'smooth',
					width: 10,
				},
				legend:{
					show:false
				},
				grid:{
					borderColor: '#AFAFAF',
					strokeDashArray: 10,
				},
				yaxis: {
					labels: {
						style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400
							
						},
						formatter: function (value) {
						  return value + "k";
						}
					},
				},
				xaxis: {
					categories: ["Day 01","Day 02","Day 03","Day 04","Day 05","Day 06","Day 07","Day 08","Day 09","Day 10"],
					labels:{
						  style: {
							colors: '#787878',
							fontSize: '13px',
							fontFamily: 'Poppins',
							fontWeight: 400
							
						},
					},
					axisBorder:{
						show:false,  
					},
					axisTicks:{
						show: false,
					},
				  
				},
				tooltip: {
					x: {
						format: 'dd/MM/yy HH:mm'
					},
				},
			
			},
		};
	}


	componentDidUpdate(prevProps) {
		// Typical usage (don't forget to compare props):
		if (JSON.stringify(this.props.chartData) !== JSON.stringify(prevProps.chartData) ) {
		   console.log(`MARKETLINEAPEX =========> this.props.msg: `,this.props.chartData)
		   this.setState({series: this.props.chartData});
		}
	}







	render() {
		return (
			<div id="chart">
				<ReactApexChart
				  options={this.state.options}
				  series={this.state.series}
				  type="line"
				  height={350}
				/>
			</div>
		);
	}
}

export default MarketLineApex;
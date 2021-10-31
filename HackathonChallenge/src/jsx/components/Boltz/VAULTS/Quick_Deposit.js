import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import {Dropdown} from 'react-bootstrap';


const Quick_Deposit = ({icons, tokens}) => {
	const [swapTech, setSwapTech] = useState("EVM");	

	return(
		<>
			<div className="card">
				<div className="card-header d-sm-flex d-block pb-0 border-0">
					<div>
						<h4 className="fs-20 text-black">Deposit</h4>
						<p className="fs-12">Deposit underlying coins and collect vault tokens</p>
					</div>
					<Dropdown className="quick-select">
						<Dropdown.Toggle variant="" as="div" className="form-control style-2 default-select cursor-pointer">{swapTech} </Dropdown.Toggle>
						<Dropdown.Menu >
							<Dropdown.Item onClick={() => setSwapTech("EVM")}>EVM</Dropdown.Item>
							<Dropdown.Item onClick={() => setSwapTech("API")}>API</Dropdown.Item>
						 </Dropdown.Menu>
					</Dropdown>
				</div>
				<div className="card-body">
					<div className="basic-form">
						<form className="form-wrapper">
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<Dropdown>
											<Dropdown.Toggle variant="" as="div" className="input-group-text form-control style-2 default-select cursor-pointer"><img alt="images" width={50} src={icons[0]} style={{ marginRight: "25px" }}/>{`Deposit ${tokens[0]}`} </Dropdown.Toggle>
										</Dropdown>
									</div>
									<input type="number" className="form-control" placeholder="" />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
									<Dropdown>
											<Dropdown.Toggle variant="" as="div" className="input-group-text form-control style-2 default-select cursor-pointer"><img alt="images" width={50} src={icons[2]} style={{ marginRight: "25px" }}/>{tokens.length>1? `Deposit ${tokens[1]}` : ""}</Dropdown.Toggle>
									</Dropdown>
									</div>
									<input type="number" className="form-control" />
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<span className="input-group-text">Fee (0.3%)</span>
									</div>
									<span className="form-control">0</span>
								</div>
							</div>
							<div className="form-group">
								<div className="input-group input-group-lg">
									<div className="input-group-prepend">
										<span className="input-group-text">Receive Vault Tokens</span>
									</div>
									<input type="number" className="form-control" />
								</div>
							</div>
							<div className="row mt-4 align-items-center">
								<div className="row pt-5 align-items-center">
									<div className="col-sm-12">
										<Link to={"#"} className="btn btn-primary d-block btn-lg rounded">Deposit</Link>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
export default Quick_Deposit;
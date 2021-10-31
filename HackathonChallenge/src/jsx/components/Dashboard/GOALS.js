import React, { useState} from 'react';
import { Link} from 'react-router-dom';
import {Dropdown, Modal} from 'react-bootstrap';
import swal from "sweetalert";
import {nanoid} from 'nanoid'; 
//Images
//source https://all-free-download.com/free-photos/ape.html
import watch from './../../../images/task/circle_clock_compass_dashboard_dial_instrument_604063.jpg';
import bike from './../../../images/task/bike_harley_davidson_motorcycle_227836.jpg';
import car from './../../../images/task/ford_mustang_car_215784.jpg';
import holidays from './../../../images/task/holiday_travel_204718.jpg';
import mortgage from './../../../images/task/home_money_euro_239954.jpg';
import laptop from './../../../images/task/macbook_air_038_mouse_on_wooden_desk_596582.jpg';
import ape_NFT from './../../../images/task/orangutan_201606.jpg';
import yacht from './../../../images/task/yacht_at_the_sea_192408.jpg';
import user from './../../../images/task/user.jpg';


const imageName = {
					ape_NFT,
					car,
					holidays,
					mortgage,
					yacht,
					bike,
					watch,
					laptop,
				  }

const CardListBlog = [
	{ 
		id:1, image: laptop, Cust_Id:"5Sb2MqczUNTA53MYptuTkU4pR9ptQu9NR7RvmZ3D7c1FzeKh", GoalTitle: "Macbook Pro",  GoalCreationDatte: "20/01/2021", Target:`2,250`, 
		Vaults: `${"ACA_DCA, ACA_DOT_MC"}`, Achieved:"1,547", HitRatio: "68.75"
	},
	{ 
		id:2, image: holidays, Cust_Id:`5QEhFY4VdFU2Un5SPLBYS5AbksWG67pv4Kdw9KkMaU2ofgjD`, GoalTitle: "Exotic Holidays", GoalCreationDatte: "20/01/2019", Target:`4,870`, 
		Vaults: `${"KAR_DCA, ACA_KAR_MC"}`, 	Achieved:"1,923", HitRatio: "39.49" 
	},
	{ 
		id:3, image: car, Cust_Id:`5PqQsT9rFVb9Gai9Sg8xtaKpPzbzqFfboNZp97MCZVH9DiVk`, GoalTitle: "Sports Car", GoalCreationDatte: "20/01/2020",Target:`105,000`, 
		Vaults: `${"XBTC_RENBTC_POLKABTC_MC"}`, Achieved:"55,000", HitRatio: "52.38" 
	},
	{ 
		id:4, image: yacht, Cust_Id:`5QEhFY4VdFU2Un5SPLBYS5AbksWG67pv4Kdw9KkMaU2ofgjD`, GoalTitle: "Sailing Yacht", GoalCreationDatte: "20/01/2018", Target:`225,000`, 
		Vaults: `${"DOT_DCA"}`, Achieved:"45,920", HitRatio: "20.41" 
	},
	
];

const PostPage = ({ setupSpecs, blockChainSpecs, blockHeader, extension, selectedAddress }) => {
    const [postModal, setPostModal] = useState(false);
    const [goals, setGoals] = useState(CardListBlog);
    // delete data  
    const handleDeleteClick = (goalId) => {
        const newGoals = [...goals];    
        const index = goals.findIndex((goal)=> goals.id === goalId);
        newGoals.splice(index, 1);
        setGoals(newGoals);
    }
    
    //Add data 
    const [addFormData, setAddFormData ] = useState({
		image:'',
        Cust_Id:'',
		GoalTitle:'',
        GoalCreationDatte:'',
        Target:'',
        Vaults:'',
		Achieved:'',
		HitRatio:'',
    }); 
    
    // Add goal function
    const handleAddFormChange = (event) => {
        event.preventDefault();    
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...addFormData};
        newFormData[fieldName] = fieldValue;
        setAddFormData(newFormData);
    };
    
     //Add Submit data
    const handleAddFormSubmit = (event)=> {
        event.preventDefault();
        var error = false;
		var errorMsg = '';

	    addFormData.Cust_Id = selectedAddress;

		if(addFormData.Cust_Id === "Choose Account"){
            error = true;
			errorMsg = 'Please choose an account';
		}else if(addFormData.GoalTitle === ""){
            error = true;
			errorMsg = 'Please fill Goal Title';
        }else if(addFormData.GoalCreationDatte === ""){
            error = true;
			errorMsg = 'Please fill Goal creation date';
        }
        else if(addFormData.Target === ""){
            error = true;
			errorMsg = 'Please fill Target USD amount';
        }
        if(!error){
            const newGoal = {
                id: nanoid(),
				image: addFormData.image,
                Cust_Id: addFormData.Cust_Id,
                GoalTitle:  addFormData.GoalTitle,
                GoalCreationDatte:  addFormData.GoalCreationDatte ,
                Target:  addFormData.Target,
				Vaults: addFormData.Vaults,
				Achieved:'',
				HitRatio:'',
            };
            const newGoals = [...goals, newGoal];
            setGoals(newGoals);
            setPostModal(false);
            swal('Good job!', 'Successfully Added', "success");
			addFormData.Cust_Id = addFormData.GoalTitle = addFormData.GoalCreationDatte = addFormData.Target = addFormData.Vaults = '';         
            
        }else{
			swal('Oops', errorMsg, "error");
		}
    }; 
    
    
    const [editModal, setEditModal] = useState(false);
    
    // Edit function editable page loop
    const [editgoalId, setEditgoalId] = useState(null);
   
    // Edit function button click to edit
    const handleEditClick = ( event, goal) => {
        event.preventDefault();
        setEditgoalId(goal.id);
        const formValues = {
            Cust_Id: goal.Cust_Id,
            Date_Join: goal.Date_Join,
            Cust_Name: goal.Cust_Name,
            Location: goal.Location,
			image: goal.image,
        }
        setEditFormData(formValues);
        setEditModal(true);
    };
    
    
    // edit  data  
    const [editFormData, setEditFormData] = useState({
        Cust_Id:'',
        Date_Join:'',
        Cust_Name:'',
        Location:'',
		image:'',
    })
    
    //update data function
    const handleEditFormChange = (event) => {
        event.preventDefault();   
        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        const newFormData = {...editFormData};
        newFormData[fieldName] = fieldValue;
        setEditFormData(newFormData);
    };
    
    // edit form data submit
    const handleEditFormSubmit = (event) => {
        event.preventDefault();
        const editedgoal = {
            id: editgoalId,
            Cust_Id: editFormData.Cust_Id,
            Date_Join: editFormData.Date_Join,
            Cust_Name: editFormData.Cust_Name,
            Location: editFormData.Location,
			image: editFormData.image,
        }
        const newGoals = [...goals];
        const index = goals.findIndex((goal)=> goals.id === editgoalId);
        newGoals[index] = editedgoal;
        setGoals(newGoals);
        setEditgoalId(null);
        setEditModal(false);    
    }
    
	

	//Image upload  
	const [goalImageName, setGoalImageName] = useState("select Goal");	
    const imageHandler = (goalImageName) => {
		setGoalImageName(goalImageName);
		addFormData.image = imageName[goalImageName]; 
    }

    
    return(
        <>
			<div className="mb-sm-5 mb-3 d-flex flex-wrap align-items-center text-head">
				<Link to={"#"} className="btn btn-primary font-w600 mb-2 me-auto" onClick={()=> setPostModal(true)}>+ New Task</Link>
				 {/* <!-- Modal --> */}
				<Modal className="modal fade"  show={postModal} onHide={setPostModal} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Add Goal</h4>
									<button type="button" className="btn-close" onClick={()=> setPostModal(false)} data-dismiss="modal"></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close"></i>
									<div className="add-goal-box">
										<div className="add-goal-content">

											<div className="image-placeholder">	
												<div className="avatar-preview">
													<div id="imagePreview">
														<img id="saveImageFile" src={goalImageName!=="select Goal"? imageName[`${goalImageName}`] : user} 
															alt={goalImageName!="select Goal"? goalImageName : null}
														/>
													</div>
												</div>
												<div style={{textAlign: "center"}}>
												        <Dropdown className="mb-4">
															<Dropdown.Toggle variant="" as="div" className="form-control style-3 default-select">{goalImageName} </Dropdown.Toggle>
															<Dropdown.Menu >
																<Dropdown.Item onClick={() => imageHandler("ape_NFT")}>Ape NFT</Dropdown.Item>
																<Dropdown.Item onClick={() => imageHandler("car")}>Car</Dropdown.Item>
																<Dropdown.Item onClick={() => imageHandler("holidays")}>Holidays</Dropdown.Item>
																<Dropdown.Item onClick={() => imageHandler("mortgage")}>Mortgage</Dropdown.Item>
																<Dropdown.Item onClick={() => imageHandler("yacht")}>Yacht</Dropdown.Item>
																<Dropdown.Item onClick={() => imageHandler("bike")}>Bike</Dropdown.Item>
																<Dropdown.Item onClick={() => imageHandler("watch")}>Watch</Dropdown.Item>
																<Dropdown.Item onClick={() => imageHandler("laptop")}>Laptop</Dropdown.Item>
															</Dropdown.Menu>
														</Dropdown>
												</div>
											</div> 

											 <div className="form-group mb-3">
												<label className="text-black font-w500">Owner</label>
												<div className="goal-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="Cust_Id" required="required"
                                                        onChange={handleAddFormChange}
														value={selectedAddress}
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Goal Title</label>
												<div className="goal-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="GoalTitle" required="required"
                                                        onChange={handleAddFormChange}
														placeholder="date"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Goal creation Date</label>
												<div className="goal-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="GoalCreationDatte" required="required"
                                                        onChange={handleAddFormChange}
														placeholder="date"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Target</label>
												<div className="goal-occupation">
													<input type="text"   autocomplete="off"
                                                        onChange={handleAddFormChange}
														name="Target" required="required"
														className="form-control" placeholder="name" 
													/>
												</div>
											</div>
											<div className="form-group mb-3">
												<label className="text-black font-w500">Vaults</label>
												<div className="goal-occupation">
													<input type="text"  autocomplete="off"
                                                        name="Vaults" required="required"
														onChange={handleAddFormChange}
														className="form-control" placeholder="Location" 
													/>
												</div>
											</div> 
										</div>
									</div>
								</div>
								<div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" onClick={handleAddFormSubmit}>Add</button>  
                                    <button type="button" onClick={()=> setPostModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Discard</button>      
								</div>
							</form>
                            
						</div>
					</div>
				</Modal>
                <Modal className="modal fade"  show={editModal} onHide={setEditModal} >
					<div className="" role="document">
						<div className="">
							<form >
								<div className="modal-header">
									<h4 className="modal-title fs-20">Edit Task</h4>
									<button type="button" className="btn-close" onClick={()=> setEditModal(false)} data-dismiss="modal"></button>
								</div>
								<div className="modal-body">
									<i className="flaticon-cancel-12 close" data-dismiss="modal"></i>
									<div className="add-goal-box">
										<div className="add-goal-content">
										
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Target</label>
												<div className="goal-name">
													<input type="text"  className="form-control"  autocomplete="off"
														name="Date_Join" required="required"
                                                        value={editFormData.Target}
                                                        onChange={handleEditFormChange}
														placeholder="update USD target to hit"
													/>
													<span className="validation-text"></span>
												</div>
											</div>
                                            <div className="form-group mb-3">
												<label className="text-black font-w500">Vault Contributors</label>
												<div className="goal-occupation">
													<input type="text"   autocomplete="off"
                                                        value={editFormData.Vaults}
                                                        onChange={handleEditFormChange}
														name="Cust_Name" required="required"
														className="form-control" placeholder="type tickers of vaults to finance goal" 
													/>
												</div>
											</div>
											
										</div>
									</div>
								</div>
								<div className="modal-footer">
                                    <button type="submit" className="btn btn-primary" onClick={handleEditFormSubmit}>Save</button>  
                                    <button type="button" onClick={()=> setEditModal(false)} className="btn btn-danger"> <i className="flaticon-delete-1"></i> Cancel</button>      
								</div>
							</form>
                            
						</div>
					</div>
				</Modal>
				
			</div>          
            <div className="row">
                {goals.map((goal, index)=>(
                    <div  className="col-xl-3 col-xxl-4 col-lg-6 col-md-6 col-sm-6" key={index}>
                        <div  className="card project-boxed">
							<div className="img-bx">
								<img src={goal.image} alt="" className=" me-3 card-list-img w-100" width="130" />
                            </div>	
							 
                            <div className="card-header align-items-start">
                                <div>
                                    <p className="mb-2 " style={{fontSize:10}}>#{goal.Cust_Id}</p>
                                    <h6 className="fs-18 font-w500 mb-3"><Link to={"#"}className="text-black user-name">{goal.GoalTitle}</Link></h6>
                                    <div className="text-dark fs-14 text-nowrap"><i className="fa fa-calendar-o me-3" aria-hidden="true"></i>{goal.GoalCreationDatte}</div>
                                </div>
                                <Dropdown className="">
                                    <Dropdown.Toggle variant="" as="div" className="btn-link i-false" >	
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
											<path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#342E59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
										</svg>                                    </Dropdown.Toggle>	
                                    <Dropdown.Menu alignRight={true} className="dropdown-menu-right">
                                        <Dropdown.Item 
                                            onClick={(event) => handleEditClick(event, goal)}
                                        >Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item className="text-danger"
                                            onClick={()=>handleDeleteClick(goal.id)}
                                        >Delete
                                        </Dropdown.Item>		
                                    </Dropdown.Menu>	
                                </Dropdown>
                            </div>
                            <div className="card-body p-0 pb-3">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <span className="mb-0 title">Target</span> :
                                        <span className="text-black ms-2">${goal.Target}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="mb-0 title">Vault Contributors</span> :
                                        <span className="text-black desc-text ms-2">{goal.Vaults}</span>
                                    </li>
                                    <li className="list-group-item">
                                        <span className="mb-0 title">Achieved</span> :
                                         <span className="text-black ms-2">${goal.Achieved}</span> 
                                    </li>
									<li className="list-group-item">
                                        <span className="mb-0 title">Hit Ratio</span> :
                                        <span className="text-black desc-text ms-2">{goal.HitRatio}%</span>
                                    </li>
                                </ul>
                            </div>
                           
                        </div>
                    </div>            
                ))}  
            </div>
        </>
    );     
}

export default PostPage;
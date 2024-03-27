import { useState } from "react";
import adminService from './../../services/AdminService';
function AddHalls(){
   
        // <p>add hall works</p>
    
        const [hall,setHall]=useState({
            "name":'',
            "floorNumber":0,
            "capacity":0,
            "date":new Date(),
            "costOfRoom":0,
            "isAvailable":true,
            "type":''
        });
    
        const handleSubmit = (e) => {
            e.preventDefault();
            console.log(hall);
            adminService.addHall(hall)
                .then(
                    
                    (resp) => {
                        setHall({});
                        //toast.success("Hall added successfully");
                        console.log(resp.data); 
                    }
                )
                .catch(
                    (err) => {
                        // console.log(err.response.data);
                        // setMessage("");
                        // setErrorMessage("Error : " + JSON.stringify(err.response.data));
                        //toast.error("Failed to add new hall");
                    }
                )
                }
        const handleHallChange=(e)=>{
            setHall({...hall,[e.target.name]:e.target.value});

        }
        return (
            <>
                <h3>Add new Hall:</h3>
    
                <form onSubmit={handleSubmit}>
                    <p>
                        Name: <input type="text" name="name" value={hall.name} onChange={handleHallChange}    required pattern="[a-zA-Z ]{3,16}" title="Name should contain min 3 & max 16 chars , no digits and special chars allowed."></input>
                    </p>
    
                    <p>
                        Floor Number: <input type="number" name="floorNumber" value={hall.floorNumber} onChange={handleHallChange} required></input>
                    </p>
    
                    <p>
                        Capacity: <input type="number" name="capacity" value={hall.capacity} onChange={handleHallChange}required></input>
                    </p>
                    <p>
                        Availabile Date: <input type="date" name="date" value={hall.date} onChange={handleHallChange} ></input>
                    </p>
                    <p>
                        Cost:<input type="number" name="costOfRoom" value={hall.costOfRoom} onChange={handleHallChange}></input>
                    </p>
                    <p>
                        Availability:<input type="boolean" name="isAvailable" value={hall.isAvailable} onChange={handleHallChange}></input>
                    </p>
                    <p>
                        Category:<input type="text" name="type" value={hall.type} onChange={handleHallChange}></input>
                    </p>
                    <button type="submit">Add Hall</button>
                </form>
            </>
        );
            }
export default AddHalls;
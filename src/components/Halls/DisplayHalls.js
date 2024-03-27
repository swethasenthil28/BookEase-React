import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../../services/axios-http-client';
import "../styles/displayMeetingRoom.css";

const DisplayHalls = () => {
    const [allMeetingRooms, setAllMeetingRooms] = useState([]); 
    const [searchResults, setSearchResults]  = useState([]);
    const [search, setSearch] = useState("");
    
    useEffect(() => {
        getHalls();
    }, []);

    useEffect(()=> {
        console.log(searchResults);
    },[searchResults])

    const getHalls = () => {
        axiosInstance.get("/viewallmeetingrooms")
            .then((res) => {
                setAllMeetingRooms(res.data);
            })
            .catch((error) => {
                console.error("Error fetching meeting room details", error);
            });
    }

    const handleDelete = (id) => {
        axiosInstance.delete("/deleteMeetingRoomById/"+id).then((res) => {
            getHalls();
            //toast.success("Hall deleted successfully");
        }).catch((err) => {
            //toast.error("Failed to delete hall");
        })
    }

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const handleSearch = () => {
        axiosInstance.get("/meetingroom/name/"+search).then((res) => {
            setSearchResults(res.data);
        }).catch((err) => {
            console.log("No rooms to display");
        })
    }

    return (
        <div class="container mt-4">
            <div>
                <input class="inpSearch" type="text" value = {search} placeholder="Search" className="form-control" onChange={handleInput}/>
                <button class="button" onClick={handleSearch}>Search</button>
            </div>
            <table class="table">   
                <div className="row mt-4">
                    {(searchResults.length > 0 ? searchResults : allMeetingRooms) ? (
                        allMeetingRooms.map(displayMeetingRoom => (
                            <div key={displayMeetingRoom.id} className="col-md-4">
                                <div className="card">
                                    <h4 className="card-title">{displayMeetingRoom.name}</h4><br />
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col-4">
                                            <h6>Capacity</h6>
                                        </div>
                                        <div className="col-4">{displayMeetingRoom.capacity}</div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <h6>Cost</h6>
                                        </div>
                                        <div className="col">{displayMeetingRoom.costOfRoom}</div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <h6>Type</h6>
                                        </div>
                                        <div className="col">{displayMeetingRoom.type}</div>
                                        <div className="col-2"></div>
                                    </div>

                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <h6>Date</h6>
                                        </div>
                                        <div className="col">{displayMeetingRoom.date}</div>
                                        <div className="col-2"></div>
                                    </div><br />

                                    
                                    <div className="row">
                                        <div className="col-2"></div>
                                        <div className="col">
                                            <button onClick={() =>(handleDelete(displayMeetingRoom.id))} className="btn btn-danger">Delete</button>
                                        </div>
                                        {/* <div className="col">
                                            <button className="btn btn-warning ml-2">Update</button>
                                        </div> */}
                                        <div className="col-2"></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h2>No meeting halls to display</h2>
                    )}
                </div>
            </table>
        </div>
    );
};

export default DisplayHalls;

import {axiosInstance} from "./axios-http-client"
class AdminService{

    addHall(hall){
        return axiosInstance.post('/addNewMeetingRoom',hall);
    }
    
   
}

export default new AdminService();
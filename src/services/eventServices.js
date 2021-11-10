// const { default: axios } = require("axios");
import axios from 'axios';
const oculusAPI = axios.create({
    baseURL: 'https://oculus-2022.herokuapp.com'
});

//** Event APIs */
async function getEvent (eventName){
    try{
        let eventData = await oculusAPI.get(`/event/${eventName}`,data);
        console.log('The eventData  is: ',eventData.data);
        return eventData.data;
    } catch(e){
        console.log('Error in eventData: ',e);
    }
}

async function updateEvent (data){
    try{
        let updateEvent = await oculusAPI.patch('/updateEvent',data);
        console.log('The updated Event is: ',updateEvent.data);
        return updateEvent.data;
    } catch(e){
        console.log('Error in update Event: ',e);
    }
}


//** Team APIs */
async function addTeam(email, eventName){
    try{
        let addTeam = await oculusAPI.post('/addOfflineTeam',{email:email,eventName:eventName});
        console.log('The addTeam  is: ',addTeam.data);
        return addTeam.data;
    } catch(e){
        console.log('Error in addTeam: ',e);
    }
}

async function removeTeam(teamCode){
    try{
        let  removeTeam = await oculusAPI.delete('/removeTeam',{teamCode:teamCode});
        console.log('The removeTeam  is: ',removeTeam.data);
        return removeTeam.data;
    } catch(e){
        console.log('Error in removeTeam: ',e);
    }
}

async function updateTeamDetails(data){
    try{
        let  updatedTeamDetail = await oculusAPI.patch('/updateTeamsDetails',data);
        console.log('The updatedTeamDetail  is: ',updatedTeamDetail.data);
        return updatedTeamDetail.data;
    } catch(e){
        console.log('Error in updatedTeamDetail: ',e);
    }
}

// .. Member team APIs./
async function addMemberToTeam(emailId,teamCode,eventName){
    try{
        let  addedMemberData = await oculusAPI.post('/memberToTeam',{eventName:eventName,emailId:emailId,teamCode:teamCode});
        console.log('The addedMemberData  is: ',addedMemberData.data);
        return addedMemberData.data;
    } catch(e){
        console.log('Error in addedMemberData: ',e);
    }
}

async function removeMemberFromTeam(emailId,teamCode,eventName){
    try{
        let  removedMemberData = await oculusAPI.delete('/memberToTeam',{eventName:eventName,emailId:emailId,teamCode:teamCode});
        console.log('The removedMemberData  is: ',removedMemberData.data);
        return removedMemberData.data;
    } catch(e){
        console.log('Error in removedMemberData: ',e);
    }
}


//** Voting APIs */
async function addVoting(teamCode,eventName){
    try{
        let  votingData = await oculusAPI.post('/addVoting',{eventName:eventName,teamCode:teamCode});
        console.log('The votingData  is: ',votingData.data);
        return votingData.data;
    } catch(e){
        console.log('Error in votingData: ',e);
    }
}


//** Notification APIs */
async function addNotification(imageURL, notificationText, timeStamp, eventName){
    try{
        let  notificationData = await oculusAPI.post('/addNotification',{imageURL:imageURL, notificationText:notificationText, timeStamp:timeStamp, eventName:eventName});
        console.log('The notificationData  is: ',notificationData.data);
        return notificationData.data;
    } catch(e){
        console.log('Error in notificationData: ',e);
    }
}


//** Question APIs */

async function answerQuestion(questionId,answer,eventName,showToAll){
    try{
        let  answerQuestionData = await oculusAPI.patch('/answerQuestion',{questionId:questionId,answer:answer,eventName:eventName, showToAll:showToAll});
        console.log('The answerQuestionData  is: ',answerQuestionData.data);
        return answerQuestionData.data;
    } catch(e){
        console.log('Error in answerQuestionData: ',e);
    }
}

async function deleteQuestion(questionId, eventName){
    try{
        let  answerQuestionData = await oculusAPI.delete('/answerQuestion',{questionId:questionId, eventName:eventName });
        console.log('The deleteQuestion  is: ',answerQuestionData.data);
        return answerQuestionData.data;
    } catch(e){
        console.log('Error in deleteQuestion: ',e);
    }
}

export const eventServies = {
    getEvent,
    updateEvent,
    addTeam,
    removeTeam,
    updateTeamDetails,
    addMemberToTeam,
    removeMemberFromTeam,
    addVoting,
    addNotification,
    answerQuestion,
    deleteQuestion
}

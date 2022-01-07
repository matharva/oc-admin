// const { default: axios } = require("axios");
import axios from "axios";
import firebase from "firebase";
// const userRef = firebase.firestore().collection("Users");
const eventRef = firebase.firestore().collection("Events");
const userRef = firebase.firestore().collection("Users");

// const sponserRef = firebase.firestore().collection("Sponsers");
const oculusAPI = axios.create({
  // baseURL: "https://oculus-2022.herokuapp.com",
  baseURL: "http://127.0.0.1:8000/",
});
//** Event APIs */
async function getEvent(eventName) {
  try {
    let eventData = await oculusAPI.get(`/event/${eventName}`);
    console.log("The eventData  is: ", eventData.data);
    return eventData.data;
  } catch (e) {
    console.log("Error in eventData: ", e);
  }
}

async function updateVote(eventName, value) {
  try {
    // let eventData = await oculusAPI.get(`/event/${eventName}`);

    // console.log("The eventData  is: ", eventData.data);
    // return eventData.data;

    let item = [];
    let querySnapShot = await eventRef.where("Title", "==", eventName).get();
    // console.log("Kaha agay tu bhai: ", eventName, querySnapShot);
    querySnapShot.forEach(async (doc) => {
      // console.log("The user data is: ", doc.data());
      const updateData = await doc.ref.update({
        isVotingLive: value,
      });
      // console.log("Teh update data is: ", updateData);
      item.push(doc.data());
      return item[0];
    });
  } catch (e) {
    console.log("Error in eventData: ", e);
  }
}

async function validateUser(email, phoneNumber, eventType) {
  try {
    // let eventData = await oculusAPI.get(`/event/${eventName}`);

    // console.log("The eventData  is: ", eventData.data);
    // return eventData.data;

    let item = [];
    let querySnapShot = await userRef.where("email", "==", email).get();
    // console.log("Kaha agay tu bhai: ", eventName, querySnapShot);
    querySnapShot.forEach(async (doc) => {
      // console.log("The user data is: ", doc.data());
      // const updateData = await doc.ref.update({
      //   phoneNumber: "",
      // });
      // console.log("Teh update data is: ", updateData);
      item.push(doc.data());
    });

    if (!item[0]) return false;

    if (eventType) {
      querySnapShot.forEach(async (doc) => {
        // console.log("The user data is: ", doc.data());
        const updateData = await doc.ref.update({
          phoneNumber: phoneNumber,
        });
        // console.log("Teh update data is: ", updateData);
        // item.push(doc.data());
      });
    }
    return true;
  } catch (e) {
    console.log("Error in ValidateUser: ", e);
  }
}

async function getChats(eventName) {
  try {
    let eventData = await oculusAPI.get(`/getChats/${eventName}`);
    console.log("The eventData  is: ", eventData.data);
    return eventData.data;
  } catch (e) {
    console.log("Error in eventData: ", e);
  }
}

async function getEventDetails(eventName) {
  try {
    let eventData = await oculusAPI.get(`/getEventDetails/${eventName}`);
    console.log("The eventData  is: ", eventData.data);
    return eventData.data;
  } catch (e) {
    console.log("Error in eventData: ", e);
  }
}

async function updateEvent(data) {
  try {
    let updateEvent = await oculusAPI.patch("/updateEvent/", data);
    console.log("The updated Event is: ", updateEvent.data);
    return updateEvent.data;
  } catch (e) {
    console.log("Error in update Event: ", e);
  }
}

//** Team APIs */
async function addTeam(data) {
  try {
    let addTeam = await oculusAPI.post("/adminAddOfflineTeam/", data);
    console.log("The addTeam  is: ", addTeam.data);
    return addTeam.data;
  } catch (e) {
    console.log("Error in addTeam: ", e);
  }
}

async function removeTeam(data) {
  try {
    let removeTeam = await oculusAPI.delete("/deleteTeam/", { data: data });
    console.log("The removeTeam  is: ", removeTeam.data);
    return removeTeam.data;
  } catch (e) {
    console.log("Error in removeTeam: ", e);
  }
}

async function updateTeamDetails(data) {
  try {
    let updatedTeamDetail = await oculusAPI.patch("/updateTeamsDetails/", data);
    console.log("The updatedTeamDetail  is: ", updatedTeamDetail.data);
    return updatedTeamDetail.data;
  } catch (e) {
    console.log("Error in updatedTeamDetail: ", e);
  }
}

async function updateUserInfo(data) {
  try {
    let updatedTeamDetail = await oculusAPI.patch("/updateUserInfo/", data);
    console.log("The updatedUserInfo  is: ", updatedTeamDetail.data);
    return updatedTeamDetail.data;
  } catch (e) {
    console.log("Error in updateUserInfo: ", e);
  }
}

// .. Member team APIs./
async function addMemberToTeam({ email, teamCode, eventName }) {
  try {
    let addedMemberData = await oculusAPI.post("/adminUpdateTeamMembers/", {
      eventName: eventName,
      email: email,
      teamCode: teamCode,
    });
    console.log("The addedMemberData  is: ", addedMemberData.data);
    return addedMemberData.data;
  } catch (e) {
    console.log("Error in addedMemberData: ", e);
  }
}

async function removeMemberFromTeam(data) {
  try {
    console.log("Delete data: ", data);
    let removedMemberData = await oculusAPI.delete("/adminUpdateTeamMembers/", {
      data: data,
    });
    console.log("The removedMemberData  is: ", removedMemberData.data);
    return removedMemberData.data;
  } catch (e) {
    console.log("Error in removedMemberData: ", e);
  }
}

//** Voting APIs */
async function addVoting(teamCode, eventName) {
  try {
    let votingData = await oculusAPI.post("/addVoting", {
      eventName: eventName,
      teamCode: teamCode,
    });
    console.log("The votingData  is: ", votingData.data);
    return votingData.data;
  } catch (e) {
    console.log("Error in votingData: ", e);
  }
}

//** Notification APIs */
async function addNotification(data) {
  try {
    let notificationData = await oculusAPI.post("/addNotification/", data);
    console.log("The notificationData  is: ", notificationData.data);
    return notificationData.data;
  } catch (e) {
    console.log("Error in notificationData: ", e);
  }
}

async function getNotifications(eventName) {
  try {
    let eventData = await oculusAPI.get(`/getNofications/${eventName}`);
    console.log("The eventData  is: ", eventData.data);
    return eventData.data;
  } catch (e) {
    console.log("Error in eventData: ", e);
  }
}

//** Question APIs */

async function addChat(data) {
  try {
    let addChat = await oculusAPI.post("/addChat/", data);
    console.log("The addChat  is: ", addChat.data);
    return addChat.data;
  } catch (e) {
    console.log("Error in addTeam: ", e);
  }
}

async function answerQuestion(data) {
  try {
    let answerQuestionData = await oculusAPI.patch("/updateChat/", data);
    console.log("The answerQuestionData  is: ", answerQuestionData.data);
    return answerQuestionData.data;
  } catch (e) {
    console.log("Error in answerQuestionData: ", e);
  }
}

async function deleteQuestion(questionId, eventName) {
  try {
    let answerQuestionData = await oculusAPI.delete("/answerQuestion", {
      questionId: questionId,
      eventName: eventName,
    });
    console.log("The deleteQuestion  is: ", answerQuestionData.data);
    return answerQuestionData.data;
  } catch (e) {
    console.log("Error in deleteQuestion: ", e);
  }
}

async function updatePayment(teamCode, paymentStatus) {
  try {
    let updatePayment = await oculusAPI.post("/updatePaymentStatus/", {
      teamCode: teamCode,
      paymentStatus: paymentStatus,
    });
    console.log("The update payment  is: ", updatePayment.data);
    return updatePayment.data;
  } catch (e) {
    console.log("Error in update Payment: ", e);
  }
}

export const eventServices = {
  getEvent,
  validateUser,
  updateVote,
  getChats,
  updateEvent,
  addTeam,
  removeTeam,
  updateTeamDetails,
  addMemberToTeam,
  removeMemberFromTeam,
  addVoting,
  addNotification,
  answerQuestion,
  deleteQuestion,
  updateUserInfo,
  getEventDetails,
  addChat,
  getNotifications,
  updatePayment,
};

export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function validatePhoneNumber(num) {
  return num.length === 10;
}

export const EVENT_MAP = {
  "athar@spit.ac.in": "IPL Auction",
};

export function getToken(id) {
  return JSON.parse(localStorage.getItem(id));
}

export function setToken(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getEventName() {
  return getToken("eventName");
}

export function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

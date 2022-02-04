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

  //   CULTURAL
  // Aelan-e-Jung
  "aej_oc@spit.ac.in": "Aelan-e-Jung", // pass: OC820335
  // Sargam
  "sargam_oc@spit.ac.in": "Sargam", // pass: OC295678
  // MUN
  "mun_oc@spit.ac.in": "Model United Nations", // pass: OC977158

  // Yeh events thodi hai
  // WOB (hardcode)

  // Open Mic
  "openmic_oc@spit.ac.in": "Open Mic", // pass: OC468841
  // Carnival
  "carnival_oc@spit.ac.in": "Carnival", // pass: OC694358
  // Abhinaya
  "abhinaya_oc@spit.ac.in": "Abhinaya", // pass: OC263396

  // TECHNICAL
  // Oculus Coding League
  "techroyale_oc@spit.ac.in": "Tech Royale", //pass: OC964373
  "lockknock_oc@spit.ac.in": "Lockout and Knockout", //pass: OC117167
  "stackedsquad_oc@spit.ac.in": "Stacked Squad", //pass: OC346096
  "febootcamp_oc@spit.ac.in": "FE Bootcamp", //pass: OC896435

  // Short Circuit / Hardware
  "shortcircuit_oc@spit.ac.in": "Short Circuit", // pass: OC526626
  // VSM
  "vsm_oc@spit.ac.in": "Virtual Stock Market", // pass: OC547174

  // FUN
  // IPL
  "iplauction_oc@spit.ac.in": "IPL Auction", // pass: OC584768
  // E-sports
  "esports_oc@spit.ac.in": "E-Sports", // pass: OC793913
  // Paintball
  "paintball_oc@spit.ac.in": "Paint Ball", // pass: OC747438 baaki
  // Footpool
  "footpool_oc@spit.ac.in": "Footpool", // pass: OC141940
  // Human Foosball
  "foosball_oc@spit.ac.in": "Human Foosball", // pass: OC784842

  // PRE-EVENTSadverteinstein_oc@spit.ac.in
  // SPIT Hackathon (hardcode)
  // Advert Einstein
  "adverteinstein_oc@spit.ac.in": "Advert Einstein", // pass: OC969705
  // Tech Race
  "techrace_oc@spit.ac.in": "Tech Race", // pass: OC555702
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
  // var dd = String(today.getDate()).padStart(2, "0");
  // var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  // var yyyy = today.getFullYear();

  // today = dd + "/" + mm + "/" + yyyy;
  return today;
}

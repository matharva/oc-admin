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
  "aej_oc@gmail.com": "Aelan-e-Jung", // pass: aej_oc@1234
  // Sargam
  "sargam_oc@gmail.com": "Sargam", // pass: sargam_oc@1234
  // MUN
  "mun_oc@gmail.com": "Model United Nations", // pass: mun_oc@1234

  // Yeh events thodi hai
  // WOB (hardcode)

  // Open Mic
  "openmic_oc@gmail.com": "Open Mic", // pass: openmic_oc@1234
  // Carnival
  "carnival_oc@gmail.com": "Carnival", // pass: carnival_oc@1234
  // Abhinaya
  "abhinaya_oc@gmail.com": "Abhinaya", // pass: abhinaya_oc@1234

  // TECHNICAL
  // Oculus Coding League
  "techroyale_oc@gmail.com": "Tech Royale", //pass:techroyale_oc@1234
  "lockknock_oc@gmail.com": "Lockout and Knockout", //pass:lockknock_oc@1234
  "stackedsquad_oc@gmail.com": "Stacked Squad", //pass:stackedsquad_oc@1234
  "febootcamp_oc@gmail.com": "FE Bootcamp", //pass:febootcamp_oc@1234

  // Short Circuit / Hardware
  "shortcircuit_oc@gmail.com": "Short Circuit", // pass: shortcircuit_oc@1234
  // VSM
  "vsm_oc@gmail.com": "Virtual Stock Market", // pass: vsm_oc@1234

  // FUN
  // IPL
  "ipl_oc@gmail.com": "IPL Auction", // pass: ipl_oc@1234
  // E-sports
  "esports_oc@gmail.com": "E-Sports", // pass: esports_oc@1234
  // Paintball
  "paintball_oc@gmail.com": "Paint Ball", // pass: paintball_oc@1234
  // Footpool
  "footpool_oc@gmail.com": "Footpool", // pass: footpool_oc@1234
  // Human Foosball
  "foosball_oc@gmail.com": "Human Foosball", // pass: foosball_oc@1234

  // PRE-EVENTSadverteinstein_oc@gmail.com
  // SPIT Hackathon (hardcode)
  // Advert Einstein
  "advertEinstein_oc@gmail.com": "Advert Einstein", // pass: advertEinstein_oc@1234
  // Tech Race
  "techrace_oc@gmail.com": "Tech Race", // pass: techrace_oc@1234
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

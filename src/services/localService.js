function getToken(id) {
  return JSON.parse(localStorage.getItem(id));
}

function setToken(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export const localService = {
  setToken,
  getToken,
};

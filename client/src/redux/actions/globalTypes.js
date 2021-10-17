export const GLOBALTYPES = {
  AUTH: "AUTH",
  ALERT: "ALERT",
  THEME: "THEME",
  STATUS: "STATUS",
  STATUS1: "STATUS1",
  STATUS2: "STATUS2",
  MODAL: "MODAL",
  USER_TYPE: "USER_TYPE",
  SOCKET: "SOCKET",
};

export const EditData = (data, id, post) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return newData;
};

export const EditDatabost = (data, id, bost) => {
  const newData = data.map((item) => (item._id === id ? bost : item));
  return newData;
};

export const EditDataall = (data, id, all) => {
  const newData = data.map((item) => (item._id === id ? all : item));
  return newData;
};

export const DeleteData = (data, id) => {
  const newData = data.filter((item) => item._id !== id);
  return newData;
};

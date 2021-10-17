import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPIbost = async (url, bost, token) => {
  const res = await axios.post(`/api/${url}`, bost, {
    headers: { Authorization: token },
  });
  return res;
};
export const postDataAPIall = async (url, all, token) => {
  const res = await axios.post(`/api/${url}`, all, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token) => {
  const res = await axios.put(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPIbost = async (url, bost, token) => {
  const res = await axios.put(`/api/${url}`, bost, {
    headers: { Authorization: token },
  });
  return res;
};
export const putDataAPIall = async (url, all, token) => {
  const res = await axios.put(`/api/${url}`, all, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const patchDataAPIbost = async (url, bost, token) => {
  const res = await axios.patch(`/api/${url}`, bost, {
    headers: { Authorization: token },
  });
  return res;
};
export const patchDataAPIall = async (url, all, token) => {
  const res = await axios.patch(`/api/${url}`, all, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

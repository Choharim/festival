import axios from "axios";

export const getFestivals = async () => {
  const response = await axios.get("http://localhost:5000/festivals");

  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get("http://localhost:5000/users");

  return response.data;
};

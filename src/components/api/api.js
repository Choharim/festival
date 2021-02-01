import axios from "axios";

export const getFestivals = async () => {
  const response = await axios.get("http://localhost:5000/festivals");

  return response.data;
};

export const getFestivalById = async (id) => {
  const response = await axios.get(`http://localhost:5000/festivals/${id}`);
  return response.data;
};

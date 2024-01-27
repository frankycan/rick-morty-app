import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/api`

const getCharacters = async (page) => {
  const { data } = await axios.get(baseUrl + "/characters", {
    params: { page: page },
    withCredentials: true,
  });
  return data;
};

const getCharacter = async (id) => {
  const { data } = await axios.get(baseUrl + "/characters/" + id, {
    withCredentials: true,
  });
  return data;
};

export { getCharacters, getCharacter };
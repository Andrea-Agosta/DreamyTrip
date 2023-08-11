import axios from 'axios';

const server = async (queryParams: null, path: string) => {
  try {
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_SERVER + path,
      params: queryParams,
      headers: { apikey: process.env.API_KEY_TEQUILA },
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make the API request');
  }
};

export default server;

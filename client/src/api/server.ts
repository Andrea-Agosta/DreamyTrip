import axios from 'axios';

const server = async (queryParams: null | { select: string }, path: string) => {
  try {
    const options = {
      method: 'GET',
      url: process.env.REACT_APP_SERVER + path,
      params: queryParams,
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw new Error('Failed to make the API request');
  }
};

export default server;

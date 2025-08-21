import { axiosInstance } from '../config/axios.config';
import { logger } from './logger';

const API_ENDPOINT_URL = import.meta.env.VITE_API_ENDPOINT_URL || 'http://localhost:8081/api/v1';

const transformResponseLog = (response) => {
  return {
    status: response?.status,
    data: response?.data || null,
    message: response?.statusText,
    headers: response?.headers,
    config: response?.config,
    requestAt: new Date().toISOString()
  };
};

export const request = async (option, data = null) => {
  const { method, url, headers } = option;

  try {
    const response = await axiosInstance({
      method: method || 'GET',
      url: API_ENDPOINT_URL + url,
      headers: headers || {},
      data: data || null
    });

    if (response.status >= 300) {
      throw new Error(transformResponseLog(response));
    }

    // Log the successful response
    if (import.meta.env.VITE_ENVIRONMENT === 'dev') {
      logger.debug(transformResponseLog(response), 'Request Success');
    }

    return transformResponseLog(response);
  } catch (error) {
    if (import.meta.env.VITE_ENVIRONMENT === 'dev') {
      logger.error(transformResponseLog(error.response || error), 'Request Error');
    }

    // Handle error response
  }
};

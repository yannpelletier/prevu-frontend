import axios from 'axios';
import {mapKeysDeep} from "./plugins/lodash";
import {camelCase, snakeCase, isPlainObject} from "lodash";

// TODO: Use api url from store/env/state.js
let apiUrl;
if (window.location.hostname.includes('prev-u.com')) {
  apiUrl = 'https://prev-u.com';
} else {
  apiUrl = 'http://' + window.location.hostname + ':5000';
}
export { apiUrl };

const api = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

const toCamelCase = (value) => {
  return mapKeysDeep(value, (value, key) => {
    return camelCase(key);
  });
};
const toSnakeCase = (value) => {
  return mapKeysDeep(value, (value, key) => {
    return snakeCase(key);
  });
};

function requestHandler(config) {
  if (config.data && isPlainObject(config.data)) {
    config.data = toSnakeCase(config.data);
  }
  return config;
};
function successReponseHandler(response) {
  response.data = toCamelCase(response.data);
  return response;
};
function errorResponseHandler(error) {
  if (error.response && error.response.data) {
    error.response.data = toCamelCase(error.response.data);
    throw {message: error.response.data.message, errors: error.response.data.errors};
  } else {
    throw {message: error.message, errors: {}};
  }
};

api.interceptors.request.use(
  config => requestHandler(config),
);
api.interceptors.response.use(
  response => successReponseHandler(response),
  error => errorResponseHandler(error),
)

export default api;

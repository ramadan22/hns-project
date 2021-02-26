import { axios } from '../../libraries'
import { getData, storageData } from '../../utils/localStorage'
// import router from "./router/router";

export const Api = axios.create({
  baseURL: 'http://travel.codelabsproject.com/hns-gateway',
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Accept-Language': 'ID'
  }
})

export const ApiImage = axios.create({
  baseURL: 'http://travel.codelabsproject.com/hns-gateway',
  headers: {
      'Content-Type': 'multipart/form-data',
      'Accept': 'application/json',
      'Accept-Language': 'ID'
  }
})

// LocalstorageService
// const localStorageService = getData('token');

// Add a request interceptor
Api.interceptors.request.use(
   config => {
       const token = getData('token');
       if (token) {
        config.headers.Authorization = `Bearer ${getData('token')}`
       }
       // config.headers['Content-Type'] = 'application/json';
       return config;
   },
   error => {
       Promise.reject(error)
   });



//Add a response interceptor
Api.interceptors.response.use((response) => {
  return response
}, function (error) {
  const originalRequest = error.config;
  // const token = localStorageService;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    return Api.post('/auth/api/v1/generateToken', {}, {auth:{username: 'codelabs-web', password: 'n35p3ESRtKzi8HqDoaA4jQYcJlxZKcvQsclY0On6'}})
    .then(res => {
      // console.log(res)
      // (res.data.data.token !== null && res.data.data.token !== "" && storageData('token', res.data.data.token))
      storageData('token', res.data.data.token)
      Api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token;
      return Api(originalRequest);
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  return Promise.reject(error);
});

// Add a request interceptor
ApiImage.interceptors.request.use(
  config => {
      const token = getData('token');
      if (token) {
       config.headers.Authorization = `Bearer ${getData('token')}`
      }
      // config.headers['Content-Type'] = 'application/json';
      return config;
  },
  error => {
      Promise.reject(error)
  });



//Add a response interceptor
ApiImage.interceptors.response.use((response) => {
 return response
}, function (error) {
 const originalRequest = error.config;
 // const token = localStorageService;
 if (error.response.status === 401 && !originalRequest._retry) {
   originalRequest._retry = true;
   return Api.post('/auth/api/v1/generateToken', {}, {auth:{username: 'codelabs-web', password: 'n35p3ESRtKzi8HqDoaA4jQYcJlxZKcvQsclY0On6'}})
   .then(res => {
     // console.log(res)
     // (res.data.data.token !== null && res.data.data.token !== "" && storageData('token', res.data.data.token))
     storageData('token', res.data.data.token)
     Api.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token;
     return Api(originalRequest);
   })
   .catch(function (error) {
     console.log(error);
   })
 }
 return Promise.reject(error);
});
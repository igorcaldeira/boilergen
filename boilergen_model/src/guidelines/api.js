import axios from 'axios';
import config from './config';

// Set config defaults when creating the api instance
var API = axios.create({
    baseURL: config.apiurl
});

API.defineRequestInterceptor = function(){
  API.interceptors.request.use(function (config) {

    let acesstoken = localStorage.getItem("data['at']");
    let client = localStorage.getItem("data['c']");
    let contenttype = localStorage.getItem("data['ct']");
    let resourcetype = localStorage.getItem("data['rt']");
    let uid = localStorage.getItem("data['uid']");
    let admin = localStorage.getItem("data['admin']");

    if(acesstoken && client && contenttype && resourcetype && uid && acesstoken && admin){
        config.headers.common['access-token']  = acesstoken;
        config.headers.common['client']  = client;
        config.headers.common['uid']  = uid;
        config.headers.common['resource-type']  = resourcetype;
        config.headers.common['provider']  = "email";
        config.headers.common['admin_id']  = admin;

        return config;
    }else
        return config;

  }, function (error) {
    return Promise.reject(error);
  });
}

API.defineResponseInterceptor = function(route){
    API.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
        if(error.response && error.response.status === 401) {
            if(route.location.pathname !== "/"){
                localStorage.clear();
                route.replace('/');
            }
        }
    
        return Promise.reject(error);
    });
}

export default API;
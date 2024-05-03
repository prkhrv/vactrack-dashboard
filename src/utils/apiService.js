import axios from 'axios';
import authStore from 'src/stores/authStore';
const hostURL = process.env.REACT_APP_HOST_URL;


const fetchData = async (url) => {
  try {
    const response = await axios.get(`${hostURL}${url}`);
    return response.data;
  } catch (error) {
    if(error.response.status === 401){
      return {"statusCode":401,"message":"You are not authorized to send this request"};
    }else if(error.response.status === 403){
      return {"statusCode":403,"message":"The credentials you have provided are invalid"};
    }
    else{
      return {"statusCode":400,"message":error.response.data.message};
    }
  }
};

const postData = async (url,postData) => {
  try {
    const response = await axios.post(`${hostURL}${url}`, postData);
    return response.data;
  } catch (error) {
    if(error.response.status === 401){
      return {"statusCode":401,"message":"You are not authorized to send this request"};
    }else if(error.response.status === 403){
      return {"statusCode":403,"message":"The credentials you have provided are invalid"};
    }
    else{
      return {"statusCode":400,"message":error.response.data.message};
    }
  }
};

const fetchDataAuthenticated = async (url) => {
  try {
    const token = authStore.getToken();
    const response = await axios.get(`${hostURL}${url}`,{
      headers: {
        "user-token": token,
      }
    });
    return response.data;
  } catch (error) {
    if(error.response.status === 401){
      return {"statusCode":401,"message":"You are not authorized to send this request"};
    }else if(error.response.status === 403){
      return {"statusCode":403,"message":"The credentials you have provided are invalid"};
    }
    else{
      return {"statusCode":400,"message":error.response.data.message};
    }
  }
};

const postDataAuthenticated = async (url, postData) => {
  try {
    const token = authStore.getToken();
    const response = await axios.post(`${hostURL}${url}`, postData,{
      headers: {
        "user-token": token,
      }
    });
    return response.data;
  } catch (error) {
    if(error.response.status === 401){
      return {"statusCode":401,"message":"You are not authorized to send this request"};
    }else if(error.response.status === 403){
      return {"statusCode":403,"message":"The credentials you have provided are invalid"};
    }
    else{
      return {"statusCode":400,"message":error.response.data.message};
    }
    
  }
};

export { fetchData, postData, postDataAuthenticated, fetchDataAuthenticated };
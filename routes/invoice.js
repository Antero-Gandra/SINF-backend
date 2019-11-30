const express = require("express");
const router = express.Router();
const axios = require('axios');
const formdata = require('form-data');

var url = "https://my.jasminsoftware.com";
var tenant = "224977";
var organization = "224977-0001";
var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzUxMTQyMzYsImV4cCI6MTU3NTEyODYzNiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiVEVDSFNJTkYiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.nSkiIy-AtghGJsVFItO9NTIZezGU8i-VyU0SkeWFK40SPl0WMK1fZgVzy_73wBMRe3te89-uuBS5tHbXwiw2JNKsX9xpXZwjPDUf9ywPWd4Nw_cLjQl3jWEZAzIm6gYncLwlvHDJrD_PSZ1k5PENZpCUyvEQjtI-NLs1uvHx26p1KQ-PAD9uaYZOJHdfh4VMNVYx2Ka30xOdbZv2mYMhavwpdeU7kDSKqH34xZ55fs0hlrIw2b8-MtyuGCYVMrj4OkSCHuI7fF_CPNrpJ1LS3-k24RqErwnWtiW_62vlSC759C3ek_RJg9C-oBs4nAnw6SKTMJMlNfbTG3mEA65nHw';

router.get('/sales', function (req, res, next) {
  let requestData = new formdata();

  createRequest('get', `${url}/api/${tenant}/${organization}/billing/invoices/`,requestData, true)
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
  });
});

function createRequest(method, url, requestData, authorization)
{
  let headers;
  
  if(authorization) {
    headers = Object.assign({
      'Authorization': token,
    }, requestData.getHeaders());
  }

  else 
    headers = requestData.getHeaders();

  return axios({
    url: url,
    method: method,
    data: requestData,
    headers: headers
  });
}

module.exports = router;

const express = require("express");
const router = express.Router();
const axios = require('axios');
const formdata = require('form-data');

var url = "https://my.jasminsoftware.com";
var tenant = "224977";
var organization = "224977-0001";
var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzUxMjg4NjksImV4cCI6MTU3NTE0MzI2OSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiVEVDSFNJTkYiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.EufMbLESGLE3gS07bT_pgQLJzKraehSKuKmFMQcvCIQS8WXfw9F08zOkHbPuoaPOCpUIOJuELzT-a2dH8CpEgSt_7cKRFVhFtCqdrVSKEvsgaV9mKKhkChR9vX4xdWoJPE4QuMIzLASqNKJYi2SaZwBc9Q2c_l7kffzm065A5arKhArKIEx4YjnIRHDX0RdFaW9Gg44RSt2_lWUCklQJPg5Glqd8AOYHjrOWyn1xMVH17H6gY6-nwcn__cpBbJJ8JECbCUUL0Fq2TJk1dq1fY92XMN-uA-4QUuCraeOyVXJyZAZGUBBQkrK1GOVPGW5801BtHqzI4ZZ85i6KPpDk4w';

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

const express = require("express");
const router = express.Router();
const axios = require('axios');
const formdata = require('form-data');

var url = "https://my.jasminsoftware.com";
var tenant = "224977";
var organization = "224977-0001";
var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzUwMTMzODUsImV4cCI6MTU3NTAyNzc4NSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiVEVDSFNJTkYiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.kFzbCxQjUoabvzX8p2OVWXyse4fqtS6Q8SXg3TGpQX7_XjZWO0j-XjdEHphu5W9F21aZxRL1omh6lph_5S2_0zLQ7qZdzQ-t52Ckgty-6kbyDwXL2AFomawUyQXga0z4CgIXHHFYpvICjjK0DaKksYJedVnDgmoGyKQ7IWofxkMd8PBsE6J-yQh0T3Rtfdw7cUvmG-p3vPSrR032xrVymwyo1Obhvu7yh8GTSL1BS_n5kNv9-NPVXkKEyBq6aLt9qxucQGoMPZ6Bcg147sCUAvQLRbqAEY6yciTi7g5d4aBu2-UPBYganvZHG6jO0wh1g8wHWUpRRFU8ZlN-UzHCxw';

router.get('/sales', function (req, res, next) {
  let requestData = new formdata();

  createRequest('get', url + '/api/' + tenant + '/' + organization + '/sales/orders',requestData, true)
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

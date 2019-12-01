const axios = require('axios');

var url = "https://my.jasminsoftware.com";
var tenant = "224977";
var organization = "224977-0001";


var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzUyMjU5MjQsImV4cCI6MTU3NTI0MDMyNCwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiVEVDSFNJTkYiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.Se7MHmIOmzGxRDGPR6pxvGrv62JOfYBhfp6FaneruQ-1Dt9CJLZdwvec61vKXEQbvJiqISxoQ9Zun7Ffdz5e1tCzmzDBPd7w6wrBMOzi5aE5ztKQ27GWCF5cJ5rBTCMYnQjSgwbGkzjUF3WypRyvVZCJVaEMHXkX7FbV3ZsFRqmlU63gL9YX7JP06sf81Q-AvDfm99LUpC1BFvell2Ooj-kGY00-O5tAcZxZ4U4IqatqZcMAyHLhVKXlsCHZwvwk1BRsXJbD-k3aoUNT9An5aQJJQdMvNSUxlIDHdeDoxuLvXM9Kq8KryanbuOWDlMP2R0z1MxazNrP0_DuCKoyQ4w';

module.exports =
{
    
    url, tenant, organization,

    createRequest: function (method, url, requestData, authorization)
    {
        let headers;
        
        if(authorization) {
            headers =       
            {
            'Authorization': token,
            'content-type': 'application/json'
            }
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
}
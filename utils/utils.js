const axios = require('axios');

var url = "https://my.jasminsoftware.com";
var tenant = "224977";
var organization = "224977-0001";


var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzU2MjUwODYsImV4cCI6MTU3NTYzOTQ4NiwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiVEVDSFNJTkYiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.pEVK75jdR4EhSVNHYwKkhfX36b4r2xTO59EyPcjk1bScrBcWhhcHzS4gxgD5cvtvvVVYUD3Sn-2hweTSQZqMpuuSMyUwc3tDuDUOBMgk3gaV5Tzl_uqPPIB_WbuW5aw9kTThs_MxB0C4F6mP2Y1KEaPghSWnQZAHe8VYX4YRj57niZa8XCIMeVOE0E28Wyt-4e9qohlBLLYcm0FNP0DSZDBzI9XDX977p7hhcMVofx7c7DUv9kadr8vdd3Fto5l-Rr-Hq20QBv00c4F4YF0HG2cVcSIfQh3PvVQMYOEACKyaf-Yt0lwXH2HXZa8E2atAaH4Mg_t8ZhnCjQk81N5jKw';

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
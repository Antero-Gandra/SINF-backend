const axios = require('axios');

var url = "https://my.jasminsoftware.com";
var tenant = "224977";
var organization = "224977-0001";


var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzU2MjMwODksImV4cCI6MTU3NTYzNzQ4OSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiVEVDSFNJTkYiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.KAG4tSrvPtyJ5RvHjHjdVTuklwOsf-xyKTT0Sq_-EdQ0TtCG528ATDP1PBIy1fPpxVGRakh_ikrJYKSATyzSOksa9oUJ_WGSF2TavZrg9QYiHzABuk1ZPIBenA5_crhD22kVo4dmUO8tPBYoWV6lBMJBXOLoIM0AOuhC4JKD7NzotRnS7LEaWAwWqaUbulvZEt8E9mj39kGkrtAZ_eoWShmK9xCokw0QnJJ3zNW3ef_tGYXtEH0y4408xEeCS9tzWfKpNP83y1Cly2sFmK2NSaP0bmFaZIFkmrfXaq4A5q0nmYjleIpXnhvKGllKqqgvwvh395qDeae6yK4B2BLGHg';

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
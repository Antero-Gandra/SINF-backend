const express = require("express");
const router = express.Router();
const axios = require('axios');
const formdata = require('form-data');

var url = "https://my.jasminsoftware.com";
var tenant = "224977";
var organization = "224977-0001";
var token = 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBCMjI3OTVEMzcyMzQ2NDIwOUE2MDIxQUQ4OUE1OTdFRjE0OTZEODAiLCJ0eXAiOiJKV1QiLCJ4NXQiOiJDeUo1WFRjalJrSUpwZ0lhMkpwWmZ2RkpiWUEifQ.eyJuYmYiOjE1NzUyMTE0MjEsImV4cCI6MTU3NTIyNTgyMSwiaXNzIjoiaHR0cHM6Ly9pZGVudGl0eS5wcmltYXZlcmFic3MuY29tIiwiYXVkIjpbImh0dHBzOi8vaWRlbnRpdHkucHJpbWF2ZXJhYnNzLmNvbS9yZXNvdXJjZXMiLCJqYXNtaW4iXSwiY2xpZW50X2lkIjoiVEVDSFNJTkYiLCJzY29wZSI6WyJhcHBsaWNhdGlvbiJdfQ.osIvzFO1x9sWa0skdGNxESMBqPmPpfFkphLLvmHSF-u96d32fpTo8FK3fVe-w7Cjhdc551qWfGnFf5PFuZLrWt1QEndC-ZK23h9txG3OB0nMRaJuFjXFBr1Tx1LoAa5Q4i8mHKEvyStxwKKPOuGFOztXwliSbTAq5hp9QJoTER4B4yWcly2XFj5cJLSZwIL2RswYnUhtjcq7ZtgYkOOM6YDg8PHN666qCEkEtglcR2ECR1Pl4Zy6ny8CYliS5jwnPptY_RlKWc--6SZixj-CKu2_5KY0uFb72mKEHvbaslNDCJCjLLN_Efegp1n2M2iJl4GbMPylsYwCG_bx9UaRSw';

router.get('/purchases', function (req, res, next) {
  let requestData = new formdata();

  createRequest('get', `${url}/api/${tenant}/${organization}/purchases/orders`,requestData, true)
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
  });
});

router.get('/sales', function (req, res, next) {
  let requestData = new formdata();

  let company = "EMPY";
  let buyer = "INDIF";
  let deliveryTerm =  "TRANSP";
  let documentLines = [
    {
      "salesItem": "ARTIGO"
    }
    ]

    requestData = 
    {
      "company": company,
      "buyerCustomerParty": buyer,
      "deliveryTerm": deliveryTerm,
      "documentLines": documentLines
    }

  createRequest('post',`${url}/api/${tenant}/${organization}/sales/orders`,requestData, true)
    .then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
  });
});

function createRequest(method, url, requestData, authorization)
{
  let headers;
  
  /*if(authorization) {
    headers = Object.assign(requestData.getHeaders(),{
      'Authorization': token,
      'content-type': 'application/json'
    });
  }

  else 
    headers = requestData.getHeaders();
*/
    return axios({
      url: url,
      method: method,
      data: requestData,
      headers: 
      {
        'Authorization': token,
        'content-type': 'application/json'
      }
    });
}

module.exports = router;

var express = require('express');
var router = express.Router();
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  web3 = new Web3(web3.currentProvider);
} else {
  // set the provider you want from Web3.providers
  web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var account = web3.personal.listAccounts[0];

router.post('/store', function(req, res, next) {  
  var Iotide = authorize();  
  var response = Iotide.storePerson.sendTransaction (req.body.name, req.body.personData, {
                  from: account,
                  gas:4000000 }, function (error, result){ 
                      //get callback from function which is your transaction key
                      if(!error){
                          // console.log(result);
                          var t = web3.eth.getTransaction(result);                          
                          res.send(t);
                      } else{
                          console.log(error);
                          res.send(error);
                      }
                  });
});

router.post('/getdata', function(req, res, next) {
  // console.log(req.body.name);
  var Iotide = authorize(); 
  var response = Iotide.getPerson(req.body.name, {
                  from: account,
                  gas:4000000 }, function (error, result){ 
                      //get callback from function which is your transaction key
                      if(!error){
                          // console.log(result);
                          res.send(result);
                      } else{
                          console.log(error);
                          res.send('error');
                      }
                  });      
});

function authorize(){
  web3.personal.unlockAccount(account,'123123123', 300);
  web3.eth.defaultAccount = account;
  return web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_person",
          "type": "string"
        }
      ],
      "name": "storePerson",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "getPerson",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ]).at('0x43a80e2fb4a9a4b7e395e0fdaab4364ea69acf91');
}

module.exports = router;

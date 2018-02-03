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

router.post('/store', function(req, res, next) {  
  var Iotide = authorize();  
  account1 = '0x491485040cFD7436AB2f9ae7ff9b475A9f14Deee';
  var response = Iotide.storePerson.sendTransaction (req.body.name , req.body.weight, req.body.height, req.body.age, {
                  from: account1,
                  gas:4000000 }, function (error, result){ 
                      //get callback from function which is your transaction key
                      if(!error){
                          // console.log(result);
                          var t = web3.eth.getTransaction(result);                          
                          res.send(JSON.stringify(t));
                      } else{
                          console.log(error);
                          res.send(error);
                      }
                  });
});

router.post('/getdata', function(req, res, next) {
  console.log(req.body.name);
  var Iotide = authorize();  
  account1 = '0x491485040cFD7436AB2f9ae7ff9b475A9f14Deee';
  var response = Iotide.getPerson(req.body.name, {
                  from: account1,
                  gas:4000000 }, function (error, result){ 
                      //get callback from function which is your transaction key
                      if(!error){
                          // console.log(result);
                          res.send(JSON.stringify(result));
                      } else{
                          console.log(error);
                          res.send('error');
                      }
                  });      
});

function authorize(){
  web3.personal.unlockAccount(web3.personal.listAccounts[0],'123123123', 300);
  web3.eth.defaultAccount = '0x491485040cFD7436AB2f9ae7ff9b475A9f14Deee';
  return web3.eth.contract([
    {
      "constant": false,
      "inputs": [
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_weight",
          "type": "string"
        },
        {
          "name": "_height",
          "type": "string"
        },
        {
          "name": "_age",
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
          "name": "_weight",
          "type": "string"
        },
        {
          "name": "_height",
          "type": "string"
        },
        {
          "name": "_age",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    }
  ]).at('0x2cf952127b952b7dde782dda2c54d13690956f23');
}

module.exports = router;

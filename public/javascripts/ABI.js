[
	{
		"constant": true,
		"inputs": [],
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
		"constant": false,
		"inputs": [
			{
				"name": "_patient",
				"type": "address"
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
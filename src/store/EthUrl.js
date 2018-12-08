export const EthUrl = [
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "url",
                        "type": "string"
                    }
                ],
                "name": "createNewLink",
                "outputs": [
                    {
                        "name": "",
                        "type": "uint256"
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
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "message",
                        "type": "string"
                    }
                ],
                "name": "Log",
                "type": "event"
            },
            {
                "anonymous": false,
                "inputs": [
                    {
                        "indexed": false,
                        "name": "linkId",
                        "type": "uint256"
                    },
                    {
                        "indexed": false,
                        "name": "url",
                        "type": "string"
                                }
                        ],
                        "name": "LinkAdded",
                        "type": "event"
                    },
                    {
                        "constant": true,
                        "inputs": [
                            {
                                "name": "linkId",
                                "type": "uint256"
                            }
                        ],
                        "name": "getLink",
                        "outputs": [
                            {
                                "name": "",
                                "type": "address"
                            },
                            {
                                "name": "",
                                "type": "string"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [],
                        "name": "lastLinkId",
                        "outputs": [
                            {
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    },
                    {
                        "constant": true,
                        "inputs": [
                            {
                                "name": "",
                                "type": "uint256"
                            }
                        ],
                        "name": "linkMapping",
                        "outputs": [
                            {
                                "name": "userAddress",
                                "type": "address"
                            },
                            {
                                "name": "url",
                                "type": "string"
                            }
                        ],
                        "payable": false,
                        "stateMutability": "view",
                        "type": "function"
                    }
            ]
export const contractAddress = "0xA111bcEC4280D6E7700bd40330A2ECcA5Dec93fB";

// Export only the ABI array expected by viem/wagmi
export const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "day",
        "type": "uint256"
      }
    ],
    "name": "getSubject",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "day",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "subject",
        "type": "string"
      }
    ],
    "name": "setSubject",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "timetable",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;
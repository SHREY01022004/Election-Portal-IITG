import os
import json
from web3 import Web3
from encryption.utils import decrypt
from datetime import datetime

publicKey = os.environ.get("CONTRACT_PUBLIC_KEY")
privateKey = os.environ.get("CONTRACT_PRIVATE_KEY")
contractAddress = os.environ.get("CONTRACT_ADDRESS")

infura_url = "https://rinkeby.infura.io/v3/8c6a3e46d78044648168f270509e1fdd"
web3 = Web3(Web3.HTTPProvider(infura_url))

web3.eth.default_account=publicKey


abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterId",
          "type": "string"
        }
      ],
      "name": "count",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "voterId",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "vote",
          "type": "string"
        }
      ],
      "name": "store",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "voterCount",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "name": "voterlist",
      "outputs": [
        {
          "internalType": "int256",
          "name": "",
          "type": "int256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
]

contract = web3.eth.contract(address=contractAddress, abi=abi)
 

def get_vote(voterId):
  start_time = datetime.now().timestamp()
  contract_vote = contract.functions.count(voterId).call()
  end_time = datetime.now().timestamp()
  time_diff = (end_time - start_time)/1000
  decrypted_vote = None
  if contract_vote:
    decrypted_vote = decrypt(contract_vote)
  return decrypted_vote or contract_vote



def count_votes(voter_ids):
  votes = {}
  for voter_id in voter_ids:
    vote = get_vote(voter_id)
    elected_candidates = vote.split(",")
    for candidate_id in elected_candidates:
      if candidate_id not in votes:
        votes[candidate_id] = 0
      votes[candidate_id]+=1
  return votes

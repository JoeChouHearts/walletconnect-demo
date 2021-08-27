import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import Web3ConnectProvider from '@walletconnect/web3-provider';
import Web3 from 'web3';
import { pow } from 'react-native-reanimated';
import { AbiItem } from 'web3-utils';
import { TextInput } from 'react-native-gesture-handler';
const contractAbi: AbiItem[] = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "who",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "getBack",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "give",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

const provider: any = new Web3ConnectProvider({
  infuraId: '5570fa4beac14a2e992a9d13204e7f1d',
});

export default function App() {
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState("0.01")

  const connect = async () => {
    try {

      await provider.enable();

    } catch (err) {

      console.error(err);

    }
  }

  const disconnect = async () => {
    if (!provider) return;
    try {

      await provider.disconnect();
      Alert.alert('Wallet Disconnected!');
      setAccount('');

    } catch (err) {

      console.error(err);

    }

  }

  const getAccount = async () => {
    if (!provider) return;

    try {

      const web3 = new Web3(provider);
      let accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setAccount(accounts[0]);

    } catch (error) {

      console.log(error)

    }
  }
  const sendToContract = async () => {
    if (!provider) return;

    try {

      const web3 = new Web3(provider);
      const contract = new web3.eth.Contract(contractAbi, '0xB06c23A49dF37078A416EF50b1931AE82d11e425')
      await contract.methods.give().send({
        from: account,
        value: web3.utils.toWei(amount, "ether"),
      })

    } catch (error) {

      console.log(error)

    }
  }

  return (
    <View style={styles.container}>
      <Button title="Connect" onPress={() => connect()} />
      <Button title="getAccount" onPress={() => getAccount()} />
      <Button title="Transfer To contract" onPress={() => sendToContract()} />

      <Button title="Kill Session" onPress={() => disconnect()} />
      <TextInput
        style={{ borderWidth: 1, backgroundColor: "#fff", color: '#000', textAlign: 'center' }}
        placeholder={"Input Amount"}
        value={amount}
        onChangeText={(value) => { setAmount(value) }}
      />
      <Text >Account {account}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5a1a1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

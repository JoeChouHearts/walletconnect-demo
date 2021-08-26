import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Platform, Linking } from 'react-native';
// import WalletConnect from "@walletconnect/client";
import WalletConnectProvider, { useWalletConnect, withWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnect from '@walletconnect/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCodeModal from "@walletconnect/qrcode-modal";


export default function App() {


  // const connect = async () => {
  //   // bridge url
  //   const bridge = "https://bridge.walletconnect.org";

  //   // create new connector
  //   const connector = new WalletConnect({ bridge: bridge });
  //   console.log('connector', connector.uri);
  //   setConnector(connector);
  //   // check if already connected
  //   if (!connector.connected) {
  //     // create new session
  //     await connector.createSession();
  //   }

  //   // subscribe to events
  //   // subscribeToEvents();
  // }

  const Con = () => {
    const connector = useWalletConnect();
    console.log('uri', connector.uri);
    console.log('accounts ', connector.accounts)

    return (
      <>
        <Text>Account:  {connector.accounts}  </Text>

        {!connector.connected ?
          <Button title="Connect con" onPress={() => connector.connect()} /> :
          <Button title="Kill Session" onPress={() => connector.killSession()} />}
      </>)
  }

  return (
    <View style={styles.container}>
      <WalletConnectProvider
        bridge='https://bridge.walletconnect.org'
        redirectUrl={Platform.OS === 'web' ? window.location.origin : 'wcdemo://'}>
        < Con />
      </WalletConnectProvider>
      {/* <Button title='connect' onPress={() => { connect() }} /> */}

    </View >
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

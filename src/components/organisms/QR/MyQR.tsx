import React, {useState, useEffect} from "react";
import {Text, View} from "react-native";
import QRCode from "react-native-qrcode-svg";
import {Colors} from "../../../constants/colors";
import {useToken} from "../../../hooks/useToken";

const MyQR = () => {
  const token = useToken();

  return (
    <View
      style={{
        alignItems: "center",
        marginVertical: "50%",
      }}>
      {token ? (
        <>
          <QRCode
            value={token}
            size={250}
            color="black"
            backgroundColor="white"
          />
          <Text style={{paddingVertical: 10, color: Colors.cyan500}}>
            My QR
          </Text>
        </>
      ) : (
        <Text style={{fontSize: 24}}>Loading...</Text>
      )}
    </View>
  );
};

export default MyQR;

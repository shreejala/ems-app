import React, {useState} from "react";
import {View} from "react-native";
import {CameraScreen} from "react-native-camera-kit";

const QRScan = ({onReadQrCode}) => {
  const [doScanBarcode, setDoScanBarcode] = useState(true);
  const handleBottomButtonPressed = () => {
    // Implement your logic for bottom button press here
    console.log("Bottom button pressed");
  };

  const handleReadQr = event => {
    // throw new Error("Function not implemented.");
    setDoScanBarcode(false);

    //gets the value from the qr
    const value = event.nativeEvent.codeStringValue;
    onReadQrCode(value);
  };

  return (
    <View style={{zIndex: 100, flex: 1, height: "100%"}}>
      <CameraScreen
        onBottomButtonPressed={handleBottomButtonPressed}
        captureButtonImageStyle={{padding: 5, backgroundColor: "blue"}}
        cameraFlipImage={undefined}
        cameraFlipImageStyle={{padding: 5, backgroundColor: "yellow"}}
        hideControls={true}
        showFrame={true}
        laserColor={undefined}
        frameColor="black"
        torchOnImage={require("../../../assets/logo.png")}
        torchOffImage={require("../../../assets/logo.png")}
        torchImageStyle={{padding: 5, backgroundColor: "red", width: 50}}
        scanBarcode={doScanBarcode}
        onReadCode={handleReadQr}
        cameraRatioOverlay={false}
        captureButtonImage={false}
      />
    </View>
  );
};

export default QRScan;

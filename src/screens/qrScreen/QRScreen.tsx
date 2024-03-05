import React from "react";
import {Text, useWindowDimensions} from "react-native";
import QRScan from "../../components/organisms/QR/QRScan";
import {TabBar, TabView} from "react-native-tab-view";
import MyQR from "../../components/organisms/QR/MyQR";
import {AppRoutes} from "../../routes/types";
import {Colors} from "../../constants/colors";
import tabStyles from "../../styles/tabStyles";

const QrScreen = ({navigation}) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: "qrScanner", title: "QR Scan"},
    {key: "qr", title: "My QR"},
  ]);

  const handleQRCode = value => {
    navigation.navigate(AppRoutes.EmployeeDetails, {employee: value});
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case "qrScanner":
        return <QRScan onReadQrCode={handleQRCode} />;
      case "qr":
        return <MyQR />;
    }
  };

  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        renderLabel={({focused, route}) => {
          return (
            <Text style={{color: focused ? Colors.cyan500 : "black"}}>
              {route.title}
            </Text>
          );
        }}
        indicatorStyle={tabStyles.indicatorStyle}
        style={tabStyles.tabBar}
      />
    );
  };

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
};

export default QrScreen;

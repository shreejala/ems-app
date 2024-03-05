import React from "react";
import {View} from "react-native";

import HomeStyles from "./style";
import HomeContent from "../../components/organisms/HomeContent/HomeContent";
import {AppTabRoutes, StackTabScreenProps} from "../../routes/types";

const Home = ({navigation}: StackTabScreenProps<AppTabRoutes.Home>) => {
  return (
    <View style={HomeStyles.containerStyle}>
      <HomeContent navigation={navigation} />
    </View>
  );
};

export default Home;

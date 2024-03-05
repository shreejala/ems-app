import {BottomSheet, ListItem} from "@rneui/themed";
import React from "react";
import {handleImageOptionLists} from "../organisms/EditProfileDetails/helper";
import styles from "./styles";
import {View} from "react-native";

type ProfileBottomSheet = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ProfileBottomSheet = ({
  isVisible,
  setIsVisible,
  setImage,
}: ProfileBottomSheet) => {
  return (
    <BottomSheet isVisible={isVisible}>
      <View style={styles.bottomSheetContainer}>
        {handleImageOptionLists(setIsVisible, setImage).map((item, i) => (
          <ListItem
            key={i}
            containerStyle={styles.bottomSheetContentStyle}
            onPress={item.onPress}>
            <ListItem.Content>
              <ListItem.Title style={styles.titleStyle}>
                {item.title}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </BottomSheet>
  );
};

export default ProfileBottomSheet;

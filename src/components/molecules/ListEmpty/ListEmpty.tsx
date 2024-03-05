import React from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

interface ListEmptyProps {
  isLoading: boolean;
  emptyMessage: string;
}

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const ListEmpty = ({isLoading = false, emptyMessage = ""}: ListEmptyProps) => {
  return (
    <View style={style.mainContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <Text style={{color: "black"}}>{emptyMessage}</Text>
      )}
    </View>
  );
};

export default ListEmpty;

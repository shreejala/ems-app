import React from "react";
import {
  Actions,
  Bubble,
  InputToolbar,
  LoadEarlier,
  MessageImage,
} from "react-native-gifted-chat";

import styles from "../styles";
import {Colors} from "../../../constants/colors";
import {ScrollView, View} from "react-native";
import {ImageWithCancel} from "../../../components/molecules";

const renderCustomInputToolBar = props => (
  <InputToolbar {...props} containerStyle={styles.customInputToolBar} />
);

const renderCustomMessageBubble = props => {
  const currentMessage = props?.currentMessage;
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: styles.customRightBubbleStyle,
        left: styles.customLeftBubbleStyle,
      }}
      renderMessageImage={imgProps => (
        <>
          {currentMessage?.image?.map((img, index) => {
            return (
              <MessageImage
                key={index}
                {...imgProps}
                currentMessage={{...currentMessage, image: img}}
              />
            );
          })}
        </>
      )}
    />
  );
};

const renderCustomEarlier = props => (
  <LoadEarlier {...props} wrapperStyle={{backgroundColor: Colors.cyan500}} />
);

const renderCustomActions = (props, options) => (
  <Actions {...props} onSend={_ => {}} {...{options}} />
);

const handleOnDeleteImage = (idx: number, file, setFile) => {
  const imageFile = [...file];
  imageFile.splice(idx, 1);
  setFile(imageFile);
};

const renderChatFooter = (file, setFile) =>
  file?.length ? (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{padding: 15}}>
        {file?.map((uri, index: number) => (
          <ImageWithCancel
            key={index}
            uri={uri}
            onDelete={() => handleOnDeleteImage(index, file, setFile)}
          />
        ))}
      </ScrollView>
    </View>
  ) : null;

export {
  renderCustomInputToolBar,
  renderCustomMessageBubble,
  renderCustomEarlier,
  renderCustomActions,
  renderChatFooter,
};

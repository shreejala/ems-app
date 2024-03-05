import React from "react";
import {Dialog} from "@rneui/themed";

type DialogBoxProps = {
  showDialog: boolean;
  title: string;
  primaryActionTitle: string;
  secondaryActionTitle: string;
  onPressPrimaryAction: () => void;
  onPressSecondaryAction: () => void;
  children?: React.ReactNode;
};

const DialogBox = ({
  showDialog,
  title,
  primaryActionTitle,
  secondaryActionTitle,
  onPressPrimaryAction,
  onPressSecondaryAction,
  children,
}: DialogBoxProps) => {
  return (
    <Dialog
      isVisible={showDialog}
      overlayStyle={{borderRadius: 10}}
      animationType="fade">
      <Dialog.Title title={title} titleStyle={{color: "black"}} />
      {children && children}
      <Dialog.Actions>
        <Dialog.Button
          title={secondaryActionTitle}
          titleStyle={{color: "red"}}
          onPress={onPressSecondaryAction}
        />
        <Dialog.Button
          title={primaryActionTitle}
          onPress={onPressPrimaryAction}
        />
      </Dialog.Actions>
    </Dialog>
  );
};

export default DialogBox;

import React, {useState} from "react";
import {Text} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import leaveStyles from "../organisms/LeaveApply/style";

type Obj = {
  [key: string]: any;
};

interface DropDownInputProps extends Obj {
  label: string;
  placeholder: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  value: string;
  items: (
    | {label: string; value: string}
    | {label: string; value?: undefined}
  )[];
  zIndex?: number;
  zIndexInverse?: number;
}

const DropDownInput = ({
  label,
  placeholder,
  items,
  setValue,
  value,
  zIndex,
  ...props
}: DropDownInputProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Text style={leaveStyles.leaveLabel}>{label}</Text>

      <DropDownPicker
        style={leaveStyles.dropDown}
        placeholder={placeholder}
        placeholderStyle={leaveStyles.dropDownPlaceholder}
        open={open}
        setOpen={setOpen}
        setValue={setValue}
        value={value}
        items={items}
        containerStyle={leaveStyles.dropdownContainerStyle}
        dropDownContainerStyle={leaveStyles.dropdownListContainerStyle}
        zIndex={zIndex}
        {...props}
      />
    </>
  );
};

export default DropDownInput;

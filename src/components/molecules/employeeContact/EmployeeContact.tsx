import React from "react";
import {TouchableOpacity, TouchableOpacityProps} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

import {EmployeeContactStyle} from "./style";
import {Colors} from "../../../constants/colors";

interface EmployeeContactProps extends TouchableOpacityProps {
  icon: string;
  size: number;
}

const EmployeeContact = ({icon, size, ...props}: EmployeeContactProps) => {
  return (
    <TouchableOpacity style={EmployeeContactStyle.containerStyle} {...props}>
      <Icon name={icon} solid size={size} color={Colors.black} />
    </TouchableOpacity>
  );
};

export default EmployeeContact;

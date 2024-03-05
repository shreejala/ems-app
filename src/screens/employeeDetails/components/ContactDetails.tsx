import React from "react";
import {Linking, Platform, View} from "react-native";

import EmployeeContact from "../../../components/molecules/employeeContact/EmployeeContact";
import contactSource from "../../../utils/contactSource";
import EmployeeDetailStyle from "../style";

interface ContactDetailsProps {
  contactData: string[];
}

const ContactDetails = ({contactData}: ContactDetailsProps) => {
  if (!contactData || contactData.length === 0) {
    // If no project data is provided, you may choose to return null or display a message
    return null;
  }
  const openDialScreen = tel => {
    let number = "";
    if (Platform.OS === "ios") {
      number = `telprompt:${tel}`;
    } else {
      number = `tel:${tel}`;
    }
    Linking.openURL(number);
  };

  const openLinkedInProfile = value => {
    value !== "" &&
      Linking.openURL(value).catch(err =>
        console.error("An error occurred", err),
      );
  };

  const openEmailClient = async (value: string) => {
    const mailtoUrl = `mailto:${value}`;
    // const supported = await Linking.canOpenURL(mailtoUrl);
    // if (supported) {
    await Linking.openURL(mailtoUrl).catch(err => {
      console.log("err", err);
    });
    // }
  };

  return (
    <View style={EmployeeDetailStyle.contactContainer}>
      {contactSource.map((contact, i) => (
        <EmployeeContact
          key={i}
          icon={contact.icon}
          size={contact.size}
          onPress={() => {
            switch (contact.title.toLowerCase()) {
              case "contact":
                return openDialScreen(contactData[0]);
              case "email":
                return openEmailClient(contactData[1]);
              case "linkedin":
                return openLinkedInProfile(contactData[2]);
            }
          }}
        />
      ))}
    </View>
  );
};

export default ContactDetails;

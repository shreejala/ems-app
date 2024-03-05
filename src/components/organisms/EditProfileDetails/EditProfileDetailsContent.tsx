import {Input, Text} from "@rneui/themed";
import React, {useEffect, useState} from "react";
import {TouchableOpacity, View} from "react-native";
import styles from "./style";
import ProfileImage from "../../atoms/ProfileImage";
import {FirebaseFirestoreTypes} from "@react-native-firebase/firestore";
import ButtonBlue from "../../atoms/ButtonBlue";
import useBiometrics from "../../../hooks/useBiometrics";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  handleEditProfileDetailsPress,
  handleFormPopulate,
  removeFingerprintBiometric,
} from "./helper";
import ProfileBottomSheet from "../../atoms/ProfileBottomSheet";
import useAuthenticate from "../../../hooks/useAuthenticate";
import {ScrollView} from "react-native";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ObjectSchema} from "yup";
import ProfileDetailsSchema from "../../../schema/profileDetailsSchema";
import {ProfileDetailsPayload} from "../../../configs/types";
import ProfileContentTextInput from "../../molecules/EditProfile/ProfileContentTextInput";

type editProfileDetailsContentType = {
  profileData: FirebaseFirestoreTypes.DocumentData | undefined;
  navigation?: any;
};

const EditProfileDetailsContent = ({
  profileData,
  navigation,
}: editProfileDetailsContentType) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    setValue,
  } = useForm<ProfileDetailsPayload>({
    defaultValues: {
      username: "",
      subtitle: "",
      tel: "",
      linkedIn: "",
    },
    mode: "onBlur",
    resolver: yupResolver(
      ProfileDetailsSchema as ObjectSchema<ProfileDetailsPayload>,
    ),
  });
  const [isProfileDetailsUpdateLoading, setIsProfileDetailsUpdateLoading] =
    useState(false);

  const {biometricEnabled, removeBiometric, bioEmail} = useBiometrics();
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState("");

  const user = useAuthenticate();

  useEffect(() => {
    handleFormPopulate(
      profileData?.username,
      profileData?.subtitle,
      profileData?.profileImage,
      profileData?.tel,
      profileData?.linkedIn,
      setValue,
      setImage,
    );
  }, [
    profileData?.username,
    profileData?.profileImage,
    profileData?.tel,
    profileData?.linkedIn,
    profileData?.subtitle,
    setValue,
  ]);

  return (
    <View style={styles.editProfileDetailsContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
        }}
        style={styles.editProfileDetailsForm}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <ProfileImage profileImage={image} />
        </TouchableOpacity>
        <View style={styles.editProfileDetailsInputContent}>
          <ProfileContentTextInput
            control={control}
            labelText="Edit your username"
            name="username"
            placeholder="Enter your username"
            error={errors.username?.message}
          />

          <ProfileContentTextInput
            control={control}
            labelText="Edit your position"
            name="subtitle"
            placeholder="Enter your role eg. Frontend Developer"
            error={errors.subtitle?.message}
          />

          <ProfileContentTextInput
            control={control}
            labelText="Edit your Phone Number"
            name="tel"
            placeholder="Enter your phone number"
            error={errors.tel?.message}
          />

          <ProfileContentTextInput
            control={control}
            labelText="Edit your LinkedIn Profile"
            name="linkedIn"
            placeholder="Enter your LinkedIn Url"
            error={errors.linkedIn?.message}
            multiline={true}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomContentStyle}>
        {biometricEnabled && user?.email === bioEmail && (
          <TouchableOpacity
            style={styles.fingerprintContainer}
            onPress={() => removeFingerprintBiometric(removeBiometric)}>
            <Icon name="fingerprint" size={25} />
            <Text style={styles.fingerprintText}>Remove Fingerprint</Text>
          </TouchableOpacity>
        )}
        <ButtonBlue
          title="Submit"
          loading={isProfileDetailsUpdateLoading}
          onPress={handleSubmit(
            data =>
              user?.uid &&
              handleEditProfileDetailsPress(
                user?.uid,
                image,
                data.username,
                data.subtitle,
                data.tel,
                data.linkedIn,
                profileData?.profileImage,
                navigation,
                setError,
                setIsProfileDetailsUpdateLoading,
              ),
          )}
        />
      </View>
      <ProfileBottomSheet
        isVisible={visible}
        setIsVisible={setVisible}
        setImage={setImage}
      />
    </View>
  );
};

export default EditProfileDetailsContent;

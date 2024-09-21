import { yupResolver } from "@hookform/resolvers/yup";
import Header from "components/common/Header";
import Loading from "components/common/Loading";
import { Button, DateInput, Text, TextInput } from "components/ui";
import FormHelperText from "components/ui/form/FormHelperText";
import { useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "types";
import useProfileViewModel from "viewmodel/ProfileViewModel";
import * as yup from "yup";

type FormData = User;

const schema = yup.object().shape({
  name: yup.string().required().label("Name"),
  dob: yup.string().required().label("DOB"),
  email: yup.string().email().required().label("Email")
});

export default function UpdateProfileView() {
  const {
    saveProfileUpdates,
    user,
    savingProfile,
    loading,
    errorMessage,
    successMessage
  } = useProfileViewModel();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const updateProfile: SubmitHandler<FormData> = ({ name, dob }) => {
    saveProfileUpdates(name, dob);
  };

  useEffect(() => {
    if (user) {
      setValue("name", user?.name);
      setValue("dob", user?.dob);
      setValue("email", user?.email);
    }
  }, [setValue, user]);

  if (loading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 bg-white">
      <ScrollView
        keyboardDismissMode="interactive"
        contentContainerClassName="p-6 justify-center flex-grow"
        showsVerticalScrollIndicator={false}>
        <Header className="my-6">Enter your details</Header>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors?.name}
              helperText={errors?.name?.message}
              placeholder="Name"
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="dob"
          render={({ field: { onChange, value } }) => (
            <DateInput
              value={value}
              onChange={onChange}
              error={!!errors?.dob}
              helperText={errors?.dob?.message}
              containerClassName="mt-4"
              placeholder="Date of Birth"
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
              editable={false}
              containerClassName="mt-4"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={!!errors?.email}
              helperText={errors?.email?.message}
              placeholder="Email"
            />
          )}
        />

        <FormHelperText error className="my-3">
          {errorMessage}
        </FormHelperText>

        <FormHelperText className="my-3 !text-green-700">
          {successMessage}
        </FormHelperText>

        <Button
          loading={savingProfile}
          onPress={handleSubmit(updateProfile)}
          className="my-6">
          UPDATE PROFILE
        </Button>
        <Text className="text-red-800 mt-5 text-center font-Poppins700 text-base">
          Delete Account?
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

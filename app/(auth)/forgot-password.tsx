import { yupResolver } from "@hookform/resolvers/yup";
import Header from "components/common/Header";
import { Button, Text, TextInput } from "components/ui";
import FormHelperText from "components/ui/form/FormHelperText";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useForgotPasswordViewModel from "viewmodel/ForgotPasswordViewModel";
import * as yup from "yup";
type FormData = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Email is required").label("Email")
});

export default function ForgotPasswordView() {
  const { loading, resetUserPassword, errorMessage, successMessage } =
    useForgotPasswordViewModel();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const resetPassword: SubmitHandler<FormData> = ({ email }) => {
    resetUserPassword(email);
  };

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      className="flex-1 bg-white">
      <ScrollView contentContainerClassName="px-6 justify-center flex-grow">
        <Header>Forgot Password</Header>
        <Text className="my-6">
          Enter your email address to reset your password
        </Text>
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              autoCapitalize="none"
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
          loading={loading}
          onPress={handleSubmit(resetPassword)}
          className="my-6">
          RESET PASSWORD
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

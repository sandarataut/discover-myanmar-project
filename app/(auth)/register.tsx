import { yupResolver } from "@hookform/resolvers/yup";
import Header from "components/common/Header";
import { Button, DateInput, TextInput } from "components/ui";
import FormHelperText from "components/ui/form/FormHelperText";
import getCharacterValidationError from "components/ui/form/getCharacterValidationError";
import specialChar from "components/ui/form/specialChar";
import { Link } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "types";
import useRegisterViewModel from "viewmodel/RegisterViewModel";
import * as yup from "yup";

type FormData = User & {
  password: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter your name").label("Name"),
  dob: yup.string().required("Please enter your date of birth").label("DOB"),
  email: yup
    .string()
    .email()
    .required("Please enter your email address")
    .label("Email"),
  password: yup
    .string()
    .label("Password")
    .min(8)
    .required("Password is required")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(specialChar, getCharacterValidationError("special"))
});

export default function RegisterView() {
  const { registerUser, loading, errorMessage } = useRegisterViewModel();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const register: SubmitHandler<FormData> = ({
    name,
    dob,
    email,
    password
  }) => {
    registerUser(name, dob, email, password);
  };

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
              // label="Email Address"
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
        <Controller
          control={control}
          rules={{
            required: true
          }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              value={value}
              secureTextEntry
              containerClassName="mt-4"
              onChangeText={onChange}
              error={!!errors?.password}
              helperText={errors?.password?.message}
              onBlur={onBlur}
              placeholder="Password"
            />
          )}
        />

        <FormHelperText error className="my-3">
          {errorMessage}
        </FormHelperText>

        <Button
          loading={loading}
          onPress={handleSubmit(register)}
          className="my-6">
          CREATE PROFILE
        </Button>

        <Link
          href="/(auth)/login"
          className="text-primary mb-4 text-base text-center font-Poppins500 ">
          Already have an account?
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

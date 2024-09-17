import { yupResolver } from "@hookform/resolvers/yup";
import Header from "components/common/Header";
import { Button, TextInput } from "components/ui";
import FormHelperText from "components/ui/form/FormHelperText";
import getCharacterValidationError from "components/ui/form/getCharacterValidationError";
import specialChar from "components/ui/form/specialChar";
import { Link } from "expo-router";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useLoginViewModel from "viewmodel/LoginViewModel";
import * as yup from "yup";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup
    .string()
    .label("Password")
    .min(8)
    .required()
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase"))
    .matches(specialChar, getCharacterValidationError("special"))
});

export default function LoginView() {
  const { loginUser, loading, errorMessage } = useLoginViewModel();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema)
  });

  const login: SubmitHandler<FormData> = ({ email, password }) => {
    loginUser(email, password);
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
          onPress={handleSubmit(login)}
          className="my-6">
          SIGN IN
        </Button>

        <Link
          href="/(auth)/forgot-password"
          className="text-primary mb-4 text-base text-center font-Poppins500 ">
          Forgot password?
        </Link>
        <Link
          href="/(auth)/register"
          className="text-default text-base font-Poppins400 text-center mt-3">
          Don’t have an account? Register Now
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}

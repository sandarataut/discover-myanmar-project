import { ReactNode } from "react";

import { TextInputProps } from "react-native";
import FormControl from "../form/FormControl";
import FormHelperText from "../form/FormHelperText";
import RNTextInput from "./RNTextInput";

interface ITextInput extends TextInputProps {
  containerClassName?: string;
  endIcon?: ReactNode;
  error?: boolean;
  helperText?: string;
}

const TextInput = ({
  containerClassName,
  helperText,
  error = false,
  className,
  ...props
}: ITextInput) => {
  // const [showPassword, setShowPassword] = useState<boolean>(
  //   props.secureTextEntry
  // );

  // const toggleShowPassword = useCallback(() => {
  //   setShowPassword((s) => !s);
  // }, []);

  return (
    <FormControl className={containerClassName}>
      <RNTextInput
        textAlignVertical={props?.multiline ? "top" : "auto"}
        {...props}
        className={className}
        // secureTextEntry={showPassword}
      />
      {helperText && (
        <FormHelperText className="mt-0.5" error={error}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default TextInput;

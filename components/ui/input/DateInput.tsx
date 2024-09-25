import DateTimePicker, {
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import TextInput from "../input/TextInput";
import dayjs from "dayjs";
import React, { useCallback, useState } from "react";
import { Platform, Pressable, View, ViewProps } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { colors, fonts } from "styles";

type Props = {
  placeholder: string;
  label?: string;
  value: string;
  onChange: (value: Date) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  containerClassName?: string;
} & ViewProps;
const DateInput = ({
  placeholder,
  value,
  onChange,
  disabled = false,
  error = false,
  helperText,
  containerClassName = ""
}: Props) => {
  const [show, setShow] = useState(false);

  const onPressIn = useCallback(() => {
    setShow(true);
  }, []);

  const onChangeDate = (e: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(false);
    if (e.type !== "dismissed") {
      onChange && onChange(selectedDate as Date);
      console.log(selectedDate);
    }
  };

  const onConfirmIOS = (date: Date) => {
    setShow(false);
    onChange(date);
  };

  return (
    <>
      <Pressable
        className={containerClassName}
        onPress={onPressIn}
        disabled={disabled}>
        <View pointerEvents="none">
          <TextInput
            className="flex-grow"
            style={{
              flexGrow: 1,
              fontFamily: fonts.Poppins400,
              fontSize: 14
            }}
            pointerEvents="none"
            caretHidden
            focusable={false}
            placeholder={placeholder}
            value={value ? dayjs(value).format("D/MM/YYYY") : ""}
            onPressIn={onPressIn}
            helperText={helperText}
            error={error}
          />
        </View>
      </Pressable>
      {show && (
        <>
          {Platform.OS === "ios" ? (
            <DateTimePickerModal
              disabled={disabled}
              isVisible={show}
              date={
                value
                  ? dayjs(value).toDate()
                  : dayjs().set("years", 2000).toDate()
              }
              mode="date"
              display="inline"
              onConfirm={onConfirmIOS}
              onCancel={() => setShow(false)}
            />
          ) : (
            <DateTimePicker
              disabled={disabled}
              themeVariant="light"
              value={
                value
                  ? dayjs(value).toDate()
                  : dayjs().set("years", 2000).toDate()
              }
              mode="date"
              display="spinner"
              accentColor={colors.primary}
              onChange={onChangeDate}
            />
          )}
        </>
      )}
    </>
  );
};

export default DateInput;

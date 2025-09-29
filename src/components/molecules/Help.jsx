"use client";

import { sendMailForContactSupport } from "@/src/api/help";
import palette from "@/src/utils/theme/palette";
import { Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import { CommonSnackBar, CustomLink, SnackState } from "../atoms";
import { FormBoxStyle, FormHelperTextStyle } from "../style";

const Help = props => {
  const t = useTranslations();
  const blobUrl = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
  const [snack, closeSnack, showSnackbar] = SnackState();
  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Assembly: null || "",
      Multiselect: null || [],
      TextField: null || "",
    },
  });

  const validateWhitespace = value => {
    if (value.trim() === "") {
      return `${t("help.emptyMessageValidation", {
        label: t("help.message"),
      })}`;
    }
    return true;
  };
  const onSubmit = async res => {
    const formData = {
      Name: res.name,
      Email: res.email,
      Message: res.messageDescription,
    };
    const response = await sendMailForContactSupport(formData);
    if (response) {
      setValue("name", "");
      setValue("email", "");
      setValue("messageDescription", "");
      setValue("checkBox", false);
      showSnackbar(t("help.savedResponseHelp"), "success");
    } else {
      showSnackbar(t("help.failedResponseHelp"), "error");
    }
  };

  return (
    <FormBoxStyle>
      <form name="userForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body2" mb={1} color={palette.text.primary}>
          {t("help.name")}
        </Typography>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          rules={{
            required: `${t("isRequired", {
              label: t("help.name"),
            })}`,
            validate: value => {
              if (value.trim() === "") {
                return `${t("help.emptyMessageValidation", {
                  label: t("help.name"),
                })}`;
              }
              return true;
            },
          }}
          render={({ field: { ref, value, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              placeholder={t("help.nameDescription")}
              value={value}
              error={!!errors.name}
              helperText={errors.name?.message}
              InputLabelProps={{ shrink: true }}
              {...register("name", {
                maxLength: {
                  value: 50,
                  message: `${t("maxLetterValidation", {
                    label: "50",
                  })}`,
                },
              })}
              className="textFieldWidth"
            />
          )}
        />
        <Typography variant="body2" mb={1} color={palette.text.primary}>
          {t("help.email")}
        </Typography>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: `${t("isRequired", {
              label: t("help.email"),
            })}`,
            validate: value => {
              if (value.trim() === "") {
                return `${t("help.emptyMessageValidation", {
                  label: t("help.email"),
                })}`;
              }
              return true;
            },
          }}
          render={({ field: { ref, value, ...field } }) => (
            <TextField
              {...field}
              inputRef={ref}
              value={value}
              placeholder={t("help.emailDescription")}
              error={!!errors.email}
              helperText={errors.email?.message}
              InputLabelProps={{ shrink: true }}
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: t("help.emailValidation"),
                },
                maxLength: {
                  value: 100,
                  message: `${t("maxLetterValidation", {
                    label: "100",
                  })}`,
                },
              })}
              className="textFieldWidth"
            />
          )}
        />
        <Typography variant="body2" mb={1} color={palette.text.primary}>
          {t("help.message")}
        </Typography>
        <Controller
          name="messageDescription"
          control={control}
          rules={{
            required: `${t("isRequired", {
              label: t("help.message"),
            })}`,
            maxLength: {
              value: 4000,
              message: `${t("maxLetterValidation", {
                label: "4000",
              })}`,
            },
            validate: validateWhitespace,
          }}
          render={({ field: { ref, value, ...field } }) => {
            return (
              <TextField
                {...field}
                inputRef={ref}
                multiline
                rows={4}
                placeholder={t("help.messageDescription")}
                size="small"
                type="text"
                variant="outlined"
                value={value}
                InputLabelProps={{ shrink: true }}
                error={!!errors.messageDescription}
                helperText={errors.messageDescription?.message}
                className="textFieldWidth"
              />
            );
          }}
        />
        <Controller
          name="checkBox"
          control={control}
          defaultValue={false}
          rules={{ required: t("help.privacyRequired") }}
          render={({ field: { onChange, value } }) => (
            <FormControlLabel
              className="mx-auto"
              control={<Checkbox checked={value} onChange={e => onChange(e.target.checked)} color="primary" />}
              label={
                <Typography variant="body1" fontSize={{ xs: "0.875rem", sm: "1rem" }} lineHeight={1.125}>
                  {t("help.checkBoxHeading")}
                </Typography>
              }
            />
          )}
        />
        <Typography variant="body2" mt={1}>
          {t("help.checkBoxDescription")}&nbsp;
          <CustomLink
            href={`${blobUrl}${t("footer.redirectPrivacy")}`}
            disc={t("help.privacyPolicy")}
            target="_blank"
          />
        </Typography>
        {errors.checkBox && <FormHelperTextStyle>{errors.checkBox.message}</FormHelperTextStyle>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="helpSubmitButton"
          fullWidth
          sx={{ marginTop: 4 }}
        >
          {t("help.submit")}
        </Button>
      </form>
      <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
    </FormBoxStyle>
  );
};

export default Help;

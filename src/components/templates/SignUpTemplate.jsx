"use client";

import { 
  CommonSnackBar, 
  CustomPhoneInput, 
  SnackState, 
  Spinner 
} from "@/src/components";
import { 
  LogoImgStyle, 
  SignUpContainerStyle 
} from "@/src/components/style";
import palette from "@/src/utils/theme/palette";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";

function SignUpTemplate(props) {
  const { apiCalling } = props;
  const blobUrl = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
  const locale = useLocale();
  const t = useTranslations();
  const route = useRouter();

  // State Management
  const [phoneError, setPhoneError] = useState("");
  const [phoneValidate, setPhoneValidate] = useState(false);
  const [isPhoneError, setIsPhoneError] = useState(false);
  const [phoneInput, setPhoneInput] = useState(false);
  const [phoneValue, setPhoneValue] = useState("+91");
  const [dialCode, setDialCode] = useState("");
  const [successFullRegistration, setSuccessFullRegistration] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snack, closeSnack, showSnackbar] = SnackState();

  // Form Setup
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      checkbox: false,
    },
  });

  const watchPassword = watch("password");

  // Event Handlers
  const handlePhoneChange = (value, country) => {
    setPhoneInput(true);
    setPhoneValue(value);
    setDialCode(country?.dialCode || "");
    setValue("phone", value);

    // Remove all non-digit characters except the plus sign
    const cleanPhone = value.replace(/[^\d]/g, "");
    
    // Remove country dial code if present for validation
    const normalizedDial = (country?.dialCode || "").toString();
    const localPart = cleanPhone.startsWith(normalizedDial)
      ? cleanPhone.slice(normalizedDial.length)
      : cleanPhone;

    // Validate at least 10 digits in the local part
    if (localPart.length < 10) {
      setPhoneError("Please enter a valid phone number");
      setIsPhoneError(true);
      setPhoneValidate(false);
    } else {
      setPhoneError("");
      setIsPhoneError(false);
      setPhoneValidate(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const redirectToSignIn = () => {
    route.push(`/signin`);
  };

  // API Call Handler
  const promiseResponse = async (formData) => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiCalling(formData);
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  };

  // Form Submit Handler
  const onSubmit = async (data) => {
    // Clean phone number - remove everything except digits
    const cleanPhoneNumber = phoneValue.replace(/[^\d]/g, "");
    // Remove exact selected country dial code only
    const normalizedDial = (dialCode || "").toString();
    const phoneWithoutCountryCode = cleanPhoneNumber.startsWith(normalizedDial)
      ? cleanPhoneNumber.slice(normalizedDial.length)
      : cleanPhoneNumber;

    // Phone Validation
    if (!phoneInput || !phoneValidate || phoneWithoutCountryCode.length < 10) {
      setPhoneError("Please enter a valid phone number");
      setIsPhoneError(true);
      showSnackbar("Please enter a valid phone number", "error");
      return;
    }

    // Prepare Payload
    const payload = {
      username: data.username.trim(),
      firstname: data.firstname.trim(),
      lastname: data.lastname.trim(),
      email: data.email.trim(),
      phone: phoneWithoutCountryCode, // Phone without country code
      password: data.password,
    };

    console.log("Payload being sent:", payload);
    console.log("Phone details:", {
      original: phoneValue,
      cleaned: cleanPhoneNumber,
      withoutCountryCode: phoneWithoutCountryCode,
    });

    // API Call
    trackPromise(
      promiseResponse(payload)
        .then((response) => {
          console.log("API Response:", response);
          if (response?.success) {
            setSuccessFullRegistration(true);
          } else {
            showSnackbar(
              response?.message || "Registration failed",
              "error"
            );
          }
        })
        .catch((error) => {
          console.error("Registration error:", error);
          const errorMessage =
            error?.response?.data?.message ||
            error?.message ||
            "An error occurred during registration";
          showSnackbar(errorMessage, "error");
        })
    );
  };

  return (
    <>
      <Spinner />
      <SignUpContainerStyle phoneError={isPhoneError}>
        <LogoImgStyle 
          src={`${blobUrl}/Holistikah/Logo/Logo-Holistika.svg`} 
        />
        
        <Typography variant="h5">
          {t("signUp.signUp")}
        </Typography>
        
        <Typography
          variant="body1"
          color={palette.text.secondary}
          sx={{ display: "flex", alignItems: "center" }}
        >
          {t("signUp.alreadyAccount")}
          <Button
            onClick={redirectToSignIn}
            sx={{ color: palette.text.tabSelected }}
          >
            {t("signIn")}
          </Button>
        </Typography>

        {successFullRegistration ? (
          <>
            <Typography
              maxWidth={{ xs: "100%", sm: "70vw", lg: "50vw", xl: "32vw" }}
              textAlign="center"
            >
              {t("signUp.successResponse")}
            </Typography>
            <Button variant="contained" onClick={redirectToSignIn}>
              {t("signUp.clickHereToLogin")}
            </Button>
          </>
        ) : (
          <>
            <form
              name="userForm"
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Grid container spacing={3}>
                {/* Username Field */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: t("isRequired", { label: "Username" }),
                      minLength: {
                        value: 3,
                        message: "Username must be at least 3 characters long",
                      },
                      maxLength: {
                        value: 50,
                        message: t("maxLetterValidation", { label: "50" }),
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9_]+$/,
                        message:
                          "Username can only contain letters, numbers, and underscores",
                      },
                      validate: (value) => {
                        if (value.trim() === "") {
                          return t("emptyMessageValidation", {
                            label: "Username",
                          });
                        }
                        return true;
                      },
                    }}
                    render={({ field: { ref, value, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        value={value}
                        id="username"
                        label="Username"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        className="textFieldWidth"
                      />
                    )}
                  />
                </Grid>

                {/* First Name Field */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="firstname"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: t("isRequired", {
                        label: t("signUp.firstName"),
                      }),
                      maxLength: {
                        value: 50,
                        message: t("maxLetterValidation", { label: "50" }),
                      },
                      validate: (value) => {
                        if (value.trim() === "") {
                          return t("emptyMessageValidation", {
                            label: t("signUp.firstName"),
                          });
                        }
                        return true;
                      },
                    }}
                    render={({ field: { ref, value, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        value={value}
                        id="firstname"
                        label={t("signUp.firstName")}
                        error={!!errors.firstname}
                        helperText={errors.firstname?.message}
                        className="textFieldWidth"
                      />
                    )}
                  />
                </Grid>

                {/* Last Name Field */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="lastname"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: t("isRequired", {
                        label: t("signUp.lastName"),
                      }),
                      maxLength: {
                        value: 50,
                        message: t("maxLetterValidation", { label: "50" }),
                      },
                      validate: (value) => {
                        if (value.trim() === "") {
                          return t("emptyMessageValidation", {
                            label: t("signUp.lastName"),
                          });
                        }
                        return true;
                      },
                    }}
                    render={({ field: { ref, value, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        value={value}
                        id="lastname"
                        label={t("signUp.lastName")}
                        error={!!errors.lastname}
                        helperText={errors.lastname?.message}
                        className="textFieldWidth"
                      />
                    )}
                  />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: t("isRequired", {
                        label: t("signUp.email"),
                      }),
                      validate: (value) => {
                        if (value.trim() === "") {
                          return t("emptyMessageValidation", {
                            label: t("signUp.email"),
                          });
                        }
                        return true;
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                        message: t("signUp.emailValidation"),
                      },
                      maxLength: {
                        value: 100,
                        message: t("maxLetterValidation", { label: "100" }),
                      },
                    }}
                    render={({ field: { ref, value, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        id="email"
                        value={value}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        label={t("signUp.email")}
                        className="textFieldWidth"
                      />
                    )}
                  />
                </Grid>

                {/* Phone Field */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <CustomPhoneInput
                        value={phoneValue}
                        onChange={(value, country) => {
                          handlePhoneChange(value, country);
                          field.onChange(value);
                        }}
                        label={t("signUp.phoneNumber")}
                      />
                    )}
                  />
                  {phoneError && (
                    <FormHelperText error id="PhoneError">
                      {phoneError}
                    </FormHelperText>
                  )}
                </Grid>

                {/* Password Field */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: t("isRequired", { label: "Password" }),
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                      validate: (value) => {
                        if (value.trim() === "") {
                          return t("emptyMessageValidation", {
                            label: "Password",
                          });
                        }
                        return true;
                      },
                    }}
                    render={({ field: { ref, value, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        value={value}
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        className="textFieldWidth"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Confirm Password Field */}
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="confirmPassword"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Please confirm your password",
                      validate: (value) => {
                        if (value !== watchPassword) {
                          return "Passwords do not match";
                        }
                        return true;
                      },
                    }}
                    render={({ field: { ref, value, ...field } }) => (
                      <TextField
                        {...field}
                        inputRef={ref}
                        value={value}
                        id="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        className="textFieldWidth"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle confirm password visibility"
                                onClick={toggleConfirmPasswordVisibility}
                                edge="end"
                              >
                                {showConfirmPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  />
                </Grid>

                {/* Privacy Policy Checkbox */}
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="checkbox"
                    control={control}
                    defaultValue={false}
                    rules={{
                      required: t("isRequired", {
                        label: t("signUp.privacyPolicy"),
                      }),
                    }}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        className="mx-auto"
                        label={
                          <>
                            {t("signUp.privacyDescription")} (
                            <a
                              href={`${blobUrl}/Holistikah/LegalDocuments/SV%20-%20Integritetspolicy%20-%20Information%20om%20hantering%20av%20personuppgifter%20(GDPR).pdf`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: palette.text.tabSelected,
                                textDecoration: "none",
                              }}
                            >
                              Swedish
                            </a>
                            &nbsp;/&nbsp;
                            <a
                              href={`${blobUrl}/Holistikah/LegalDocuments/EN%20-%20Privacy%20Policy%20-%20Information%20on%20the%20Processing%20of%20Personal%20Data%20(GDPR).pdf`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: palette.text.tabSelected,
                                textDecoration: "none",
                              }}
                            >
                              English
                            </a>
                            ) {t("signUp.policyDescription")} &amp;{" "}
                            {t("signUp.conditions")} (
                            <a
                              href={`${blobUrl}/Holistikah/LegalDocuments/SV%20-%20Allma%CC%88nna%20villkor%20fo%CC%88r%20affa%CC%88rssystemet.pdf`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: palette.text.tabSelected,
                                textDecoration: "none",
                              }}
                            >
                              Swedish
                            </a>
                            &nbsp;/&nbsp;
                            <a
                              href={`${blobUrl}/Holistikah/LegalDocuments/EN%20-%20GENERAL%20TERMS%20AND%20CONDITIONS%20FOR%20THE%20BUSINESS%20SYSTEM.pdf`}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                color: palette.text.tabSelected,
                                textDecoration: "none",
                              }}
                            >
                              English
                            </a>
                            ).
                          </>
                        }
                        control={
                          <Checkbox
                            id="checkbox"
                            checked={value}
                            onChange={(e) => onChange(e.target.checked)}
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText className="checkbox-error">
                      {errors.checkbox.message}
                    </FormHelperText>
                  )}
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} sm={12} textAlign={{ xs: "left", sm: "right" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    className="helpSubmitButton"
                  >
                    {t("signUp.getStarted")}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </>
        )}

        <CommonSnackBar
          snackObj={snack}
          closeSnack={closeSnack}
          buttonProp
          duration={5000}
        />
      </SignUpContainerStyle>
    </>
  );
}

export default SignUpTemplate;
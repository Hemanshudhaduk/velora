"use client";
import { updateUserAccountDetails } from "@/src/api/settings";
import FuseSplashScreen from "@/src/app/[locale]/auth/fuseSplashScreen";
import { Languages } from "@/src/constants";
import { selectUser, selectUserDetail, userDetail } from "@/src/lib/slice/userSlice";
import palette from "@/src/utils/theme/palette";
import { Autocomplete, Button, FormHelperText, Grid, Skeleton, TextField, Typography } from "@mui/material";
import moment from "moment";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";
import { useDispatch, useSelector } from "react-redux";
import { CommonSnackBar, CustomGoogleMap, CustomPhoneInput, CustomText, SnackState } from "../atoms";
import Spinner from "../atoms/Spinner";
import { SettingPageSkeleton } from "../skeletons";
import { SettingsContainerStyle } from "../style";

function SettingForm(props) {
  const { userDetailData, loading } = props;
  const getUseDetails = useSelector(selectUserDetail);
  const getUser = useSelector(selectUser);
  const t = useTranslations();
  const [phoneError, setPhoneError] = useState();
  const [isPhoneError, setIsPhoneError] = useState(false);
  const locale = useLocale();
  const [snack, closeSnack, showSnackbar] = SnackState();
  const route = useRouter();
  const dispatch = useDispatch();
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      googleTimeZoneName: null,
      languageCode: "",
      addressLat: "",
      addressLong: "",
      fullAddress: "",
      phone: "",
    },
  });

  const handlePhoneChange = (value, country) => {
    setValue("phone", value);
    if (value.length <= country.dialCode.length + 1) {
      setPhoneError(
        t("isRequired", {
          label: t("signUp.phoneNumber"),
        })
      );
      setIsPhoneError(true);
    } else {
      setPhoneError("");
      setIsPhoneError("");
    }
  };

  const promiseResponse = async formData => {
    return new Promise(async (resolve, reject) => {
      const response = await updateUserAccountDetails(formData);
      resolve(response);
    });
  };

  const setFormValues = () => {
    if (userDetailData[0]?.languageCode) {
      const userLanguageObject = Languages.find(
        option => option.value === userDetailData[0]?.languageCode.toLowerCase()
      );
      setValue("languageCode", userLanguageObject);
    } else {
      const defaultLanguageObject = Languages.find(option => option.value === locale);
      setValue("languageCode", defaultLanguageObject);
    }
    setValue("firstName", userDetailData[0]?.firstName);
    setValue("lastName", userDetailData[0]?.lastName);
    setValue("email", userDetailData[0]?.email);
    setValue("googleTimeZoneName", userDetailData[0]?.googleTimeZoneName);
    setValue("fullAddress", userDetailData[0]?.fullAddress);
    setValue("phone", userDetailData[0]?.phone);
    setValue("googleTimeZoneName", userDetailData[0]?.googleTimeZoneName);
    setValue("fullAddress", userDetailData[0]?.fullAddress);
    setValue("addressLat", userDetailData[0]?.addressLat);
    setValue("addressLong", userDetailData[0]?.addressLong);
  };

  useEffect(() => {
    setFormValues();
  }, [userDetailData]);

  const onSubmit = async data => {
    if (!isPhoneError) {
      const formData = new FormData();
      formData.append("unqGUID", getUseDetails?.userUnqGuid);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("languageCode", data.languageCode.value);
      formData.append("googleTimeZoneName", data.googleTimeZoneName);
      formData.append("phone", data.phone);
      formData.append("fullAddress", data.fullAddress);
      formData.append("addressLong", data.addressLong);
      formData.append("addressLat", data.addressLat);

      trackPromise(
        promiseResponse(formData).then(response => {
          if (response?.status === "Success") {
            const userData = _.cloneDeep(getUseDetails);
            userData.firstName = data.firstName;
            userData.lastName = data.lastName;
            dispatch(userDetail({ userDetail: userData }));
            showSnackbar(t("settings.successMessage"), "success");
            setTimeout(() => {
              route.push("/");
            }, 1000);
          } else {
            showSnackbar(t(response?.message), "error");
          }
        })
      );
    }
  };

  return (
    <>
      {getUser?.data?.email !== "" ? (
        <>
          <Spinner />
          <SettingsContainerStyle customPhoneError={isPhoneError}>
            <form name="userForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              {loading ? (
                <Skeleton variant="text" />
              ) : (
                <CustomText variant="h5" mb={{ xs: 3, md: 8 }} mt={6} disc={t("settings.settingsLabel")} />
              )}
              <Grid container spacing={2}>
                {loading ? (
                  <SettingPageSkeleton />
                ) : (
                  <>
                    <Grid item xs={12} sm={6}>
                      <>
                        <Typography color={palette.text.primary} variant="body2" mb={1} htmlFor="firstName">
                          {t("signUp.firstName")}
                        </Typography>
                        <Controller
                          name="firstName"
                          control={control}
                          rules={{
                            required: `${t("isRequired", {
                              label: t("signUp.firstName"),
                            })}`,
                            maxLength: {
                              value: 50,
                              message: `${t("maxLetterValidation", {
                                label: "50",
                              })}`,
                            },
                            validate: value => {
                              if (value.trim() === "") {
                                return `${t("emptyMessageValidation", {
                                  label: t("signUp.firstName"),
                                })}`;
                              }
                              return true;
                            },
                          }}
                          render={({ field: { ref, value, ...field } }) => (
                            <TextField
                              {...field}
                              inputRef={ref}
                              value={value || ""}
                              id="firstName"
                              error={!!errors.firstName}
                              helperText={errors.firstName?.message}
                              className="textFieldWidth"
                              placeholder={t("settings.firstNamePlaceholder")}
                            />
                          )}
                        />
                      </>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography color={palette.text.primary} variant="body2" mb={1} htmlFor="firstName">
                        {t("signUp.lastName")}
                      </Typography>
                      <Controller
                        name="lastName"
                        control={control}
                        rules={{
                          required: `${t("isRequired", {
                            label: t("signUp.lastName"),
                          })}`,
                          maxLength: {
                            value: 50,
                            message: `${t("maxLetterValidation", {
                              label: "50",
                            })}`,
                          },
                          validate: value => {
                            if (value.trim() === "") {
                              return `${t("emptyMessageValidation", {
                                label: t("signUp.lastName"),
                              })}`;
                            }
                            return true;
                          },
                        }}
                        render={({ field: { ref, value, ...field } }) => (
                          <TextField
                            {...field}
                            inputRef={ref}
                            value={value || ""}
                            id="lastName"
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            className="textFieldWidth"
                            placeholder={t("settings.lastNamePlaceholder")}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography color={palette.text.primary} variant="body2" mb={1} htmlFor="email">
                        {t("signUp.email")}
                      </Typography>
                      <Controller
                        name="email"
                        control={control}
                        disabled
                        rules={{
                          required: `${t("isRequired", {
                            label: t("signUp.email"),
                          })}`,
                          validate: value => {
                            if (value.trim() === "") {
                              return `${t("emptyMessageValidation", {
                                label: t("signUp.email"),
                              })}`;
                            }
                            return true;
                          },
                          pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                            message: t("signUp.emailValidation"),
                          },
                          maxLength: {
                            value: 100,
                            message: `${t("maxLetterValidation", {
                              label: "100",
                            })}`,
                          },
                        }}
                        render={({ field: { ref, value, ...field } }) => (
                          <TextField
                            {...field}
                            inputRef={ref}
                            id="email"
                            value={value || ""}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            className="textFieldWidth"
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography color={palette.text.primary} variant="body2" mb={1} htmlFor="phone">
                        {t("settings.phoneLabel")}
                      </Typography>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <CustomPhoneInput isLabel={false} value={field.value} onChange={handlePhoneChange} />
                        )}
                      />
                      {phoneError ? (
                        <FormHelperText className="mt-8" style={{ color: "red" }}>
                          {phoneError}
                        </FormHelperText>
                      ) : (
                        ""
                      )}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography color={palette.text.primary} variant="body2" mb={1} htmlFor="language">
                        {t("settings.languageLabel")}
                      </Typography>
                      <Controller
                        control={control}
                        name="languageCode"
                        rules={{
                          required: `${t("isRequired", {
                            label: t("language"),
                          })}`,
                        }}
                        render={({ field: { onChange, value, ...field } }) => (
                          <Autocomplete
                            value={value || null}
                            ListboxProps={{
                              style: { maxHeight: 200, overflow: "auto" },
                            }}
                            id="languageCode"
                            onChange={(e, n) => onChange(n)}
                            filterSelectedOptions
                            options={Languages}
                            renderOption={(props, option) => {
                              return (
                                <li {...props} key={option.id}>
                                  {option.flagName}
                                </li>
                              );
                            }}
                            isOptionEqualToValue={(option, change) => option.value === change.value}
                            getOptionLabel={option => option.flagName}
                            renderInput={params => (
                              <TextField
                                {...params}
                                InputLabelProps={{ shrink: true }}
                                inputRef={field.ref}
                                error={!!errors.languageCode}
                                helperText={errors.languageCode?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography color={palette.text.primary} variant="body2" mb={1} htmlFor="googleTimeZoneName">
                        {t("signUp.timezone")}
                      </Typography>
                      <Controller
                        control={control}
                        name="googleTimeZoneName"
                        rules={{
                          required: `${t("isRequired", {
                            label: t("signUp.timezone"),
                          })}`,
                        }}
                        render={({ field: { onChange, value, ...field } }) => (
                          <Autocomplete
                            value={value || null}
                            ListboxProps={{
                              style: { maxHeight: 200, overflow: "auto" },
                            }}
                            id="googleTimeZoneName"
                            onChange={(e, n) => onChange(n)}
                            filterSelectedOptions
                            options={moment.tz.names()}
                            renderOption={(props, option) => {
                              return (
                                <li {...props} key={option}>
                                  {option}
                                </li>
                              );
                            }}
                            isOptionEqualToValue={(option, key) => option === key}
                            renderInput={params => (
                              <TextField
                                {...params}
                                inputRef={field.ref}
                                error={!!errors.googleTimeZoneName}
                                helperText={errors.googleTimeZoneName?.message}
                              />
                            )}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography color={palette.text.primary} variant="body2" mb={1} htmlFor="fullAddress">
                        {t("settings.fullAddressLabel")}
                      </Typography>
                      <FormProvider {...{ control, setValue, getValues, errors }}>
                        <CustomGoogleMap
                          name="fullAddress"
                          isRequired={true}
                          requiredMessage={t("isRequired", {
                            label: t("signUp.location"),
                          })}
                          setting={true}
                          customAddress={t("location")}
                        />
                      </FormProvider>
                    </Grid>
                    <Grid item xs={12} sm={12} textAlign={{ xs: "left", sm: "left" }}>
                      <Button variant="contained" color="primary" type="submit" className="helpSubmitButton">
                        {t("settings.saveButton")}
                      </Button>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
            <CommonSnackBar snackObj={snack} closeSnack={closeSnack} buttonProp />
          </SettingsContainerStyle>
        </>
      ) : (
        <FuseSplashScreen />
      )}
    </>
  );
}

export default SettingForm;

"use client";

import { LogoImgStyle, SignUpContainerStyle } from "@/src/components/style";
import { Button, Checkbox, FormControlLabel, Grid, Link as MuiLink, TextField, Typography, Box } from "@mui/material";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { trackPromise } from "react-promise-tracker";

function SignInTemplate(props) {
  const { apiCalling } = props;
  const blobUrl = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
  const t = useTranslations();
  const locale = useLocale();
  const route = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { email: "", password: "", remember: false },
  });

  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = data => {
    setErrorMsg("");
    const payload = { email: data.email.trim(), password: data.password };
    trackPromise(
      apiCalling(payload).then(res => {
        if (res?.success) {
          // Try a few common token field names
          const token = res?.data?.token || res?.token || res?.data?.accessToken || res?.accessToken;
          if (token) {
            // 7 days expiry
            const maxAge = 7 * 24 * 60 * 60;
            document.cookie = `authToken=${token}; path=/; max-age=${maxAge}`;
          }
          route.push("/");
        } else {
          setErrorMsg(res?.message || "Invalid credentials");
        }
      }).catch(() => setErrorMsg("Login failed"))
    );
  };

  return (
    <SignUpContainerStyle sx={{ maxWidth: { xs: "90vw", sm: 500 }, width: "100%" }}>
      <LogoImgStyle
        src="/images/logos/image-1.svg"
        sx={{ maxWidth: { xs: "180px", sm: "240px", md: "320px", lg: "420px", xl: "500px" }, width: "100%" }}
      />
      <Typography variant="h5" sx={{ mb: 2 }}>{t("signIn")}</Typography>
      {errorMsg && (
        <Typography variant="body2" color="error" sx={{ my: 1 }}>{errorMsg}</Typography>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              rules={{ required: t("isRequired", { label: t("signUp.email") }) }}
              render={({ field }) => (
                <TextField {...field} label={t("signUp.email")} error={!!errors.email} helperText={errors.email?.message} className="textFieldWidth" fullWidth size="medium" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              rules={{ required: t("isRequired", { label: "Password" }) }}
              render={({ field }) => (
                <TextField {...field} type="password" label="Password" error={!!errors.password} helperText={errors.password?.message} className="textFieldWidth" fullWidth size="medium" />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="remember"
              control={control}
              render={({ field: { value, onChange } }) => (
                <FormControlLabel control={<Checkbox checked={value} onChange={e => onChange(e.target.checked)} />} label={"Remember me"} />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth sx={{ height: 48, borderRadius: 1.5, fontWeight: 600 }}>{t("signIn")}</Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              {"Don't have an account? "}
              <MuiLink component={Link} href={`/${locale}/signup`} underline="hover">{t("signUp.signUp")}</MuiLink>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </SignUpContainerStyle>
  );
}

export default SignInTemplate;



"use client";
import palette from "@/src/utils/theme/palette";
import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ActivityProviderMapLoad } from "../atoms";

const StaffCard = dynamic(() => import("../molecules/StaffCard"));
const CompanyRating = dynamic(() => import("../atoms/CompanyRating"));
const ActivityProviderMap = props => {
  const {
    isLocation,
    companyUnqGUID,
    companyDescription,
    companyName,
    fullAddress,
    latitude = null,
    longitude = null,
    placeId,
  } = props;
  const {
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressLat: "",
      addressLong: "",
      fullAddress: "",
    },
  });
  const t = useTranslations();
  const [isCompanyRating, setIsCompanyRating] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    if (isLocation && latitude !== null) {
      setValue("addressLat", latitude);
      setValue("addressLong", longitude);
      setValue("fullAddress", fullAddress);
      setIsMapLoaded(true);
    }
  }, [latitude]);

  return (
    <>
      {isLocation && getValues("addressLat") && isMapLoaded && (
        <Box mt={3} pb={3}>
          <Typography variant="h6" mb={2}>
            {t("location")}
          </Typography>
          <form name="userForm" autoComplete="off">
            <FormProvider {...{ control, setValue, getValues, errors }}>
              <ActivityProviderMapLoad name="fullAddress" isMapLoad={setIsCompanyRating} />
            </FormProvider>
          </form>
          <Typography
            variant="body1"
            display="flex"
            alignItems="center"
            gap={0.5}
            mt={2}
            color={palette.text.secondary}
          >
            <LocationOnOutlined />
            {fullAddress}
          </Typography>
        </Box>
      )}
      <StaffCard
        isCompanyDescription={true}
        staffName={companyName}
        companyGuid={companyUnqGUID}
        aboutDescription={companyDescription}
      />
      {!isLocation ? (
        <CompanyRating placeId={placeId} isLocation={isLocation} mt={3} mb={3} />
      ) : (
        isCompanyRating && <CompanyRating placeId={placeId} isLocation={isLocation} mt={3} mb={3} />
      )}
    </>
  );
};

export default ActivityProviderMap;

"use client";
import { locationChanged, selectGeoLocation, selectLocationChanged } from "@/src/lib/slice/userSlice";
import CloseIcon from "@mui/icons-material/Close";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  IconButton,
  Typography as MuiTypography,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { CustomGoogleMap } from "../atoms";

const LocationDropDown = props => {
  const router = useRouter();
  const [showDrawer, setShowDrawer] = useState(false);
  const dispatch = useDispatch();
  const getLocationChanged = useSelector(selectLocationChanged);
  const [locationError, setLocationError] = useState(false);
  const getGeoLocation = useSelector(selectGeoLocation);
  const handleDrawerClose = () => {
    if (getValues("fullAddress") === "") {
      return;
    } else {
      setShowDrawer(false);
    }
    dispatch(locationChanged({ locationChanged: !getLocationChanged }));
    router.refresh();
  };
  const t = useTranslations();
  const { userLocation } = props;
  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      addressLat: "",
      addressLong: "",
      fullAddress: "",
    },
  });

  const onSubmit = async () => {
    handleDrawerClose();
  };

  const getLocalStorage = () => {
    if (typeof window !== "undefined" && localStorage.getItem("longitude") && localStorage.getItem("city")) {
      return {
        lat: localStorage.getItem("latitude"),
        lon: localStorage.getItem("longitude"),
        city: localStorage.getItem("city"),
      };
    } else {
      localStorage.setItem("latitude", userLocation?.lat);
      localStorage.setItem("longitude", userLocation?.lon);
      localStorage.setItem("city", userLocation?.city);
      return {
        lat: userLocation?.lat,
        lon: userLocation?.lon,
        city: userLocation?.city,
      };
    }
  };

  useEffect(() => {
    localStorage.setItem("IpUserDetails", JSON.stringify(userLocation));
    const localStorageData = getLocalStorage();
    localStorage.setItem("defaultCountry", userLocation?.country);
    if (localStorageData?.city && localStorageData?.city !== "undefined") {
      setValue("addressLat", localStorageData.lat);
      setValue("addressLong", localStorageData.lon);
      setValue(
        "fullAddress",
        localStorage.getItem("fullAddress") ? localStorage.getItem("fullAddress") : localStorageData.city
      );
    }
  }, [userLocation, getGeoLocation]);

  const handleCustomError = (e = false) => {
    setLocationError(e);
  };

  return (
    <>
      <Button variant="text" disableRipple={true} onClick={() => setShowDrawer(true)}>
        {
          <>
            {typeof window !== "undefined" && localStorage.getItem("city") ? (
              <>
                <LocationOnOutlinedIcon />
                <MuiTypography>
                  {localStorage.getItem("city")?.length > 10
                    ? localStorage.getItem("city")?.substring(0, 10) + "..."
                    : localStorage.getItem("city")}
                </MuiTypography>
              </>
            ) : (
              <>
                <LocationOnOutlinedIcon />
                <MuiTypography>{userLocation?.city}</MuiTypography>
              </>
            )}
          </>
        }
      </Button>
      <Dialog
        open={showDrawer}
        onClose={handleDrawerClose}
        fullWidth
        maxWidth={"sm"}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ sx: { position: "fixed", top: 30, m: 0 } }}
      >
        <DialogTitle>{t("location")}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleDrawerClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="testdialog">
          <form name="userForm" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <FormProvider {...{ control, setValue, getValues, errors }}>
              <CustomGoogleMap
                name="fullAddress"
                labelRequired={false}
                handleCustomError={handleCustomError}
                className="w-full"
              />
            </FormProvider>
            {locationError && <FormHelperText error={true}>{t("isRequired", { label: t("location") })}</FormHelperText>}
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LocationDropDown;

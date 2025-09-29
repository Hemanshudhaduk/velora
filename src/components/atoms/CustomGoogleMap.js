"use client";
import { Autocomplete, TextField, Typography } from "@mui/material";
import { debounce } from "@mui/material/utils";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const autocompleteService = { current: null };
const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
const geocoder = { current: null };
let addressComponents;

const getLatLng = placeId => {
  return new Promise((resolve, reject) => {
    if (!geocoder.current && window.google) {
      geocoder.current = new window.google.maps.Geocoder();
    }
    if (!geocoder.current) {
      reject(new Error("Geocoder not available"));
    }

    geocoder.current.geocode({ placeId }, (results, status) => {
      if (status !== "OK" || !results[0]) {
        reject(new Error("Geocode failed"));
      }

      const { lat, lng } = results[0].geometry.location;
      addressComponents = results[0].address_components;
      resolve({ lat: lat(), lng: lng() });
    });
  });
};

const CustomGoogleMap = ({
  name = "fullAddress",
  isRequired = true,
  requiredMessage,
  addressVisible = true,
  showAddressAsLabel = false,
  customAddress,
  labelRequired = true,
  handleCustomError,
  setting = false,
}) => {
  const t = useTranslations();
  const [mapValue, setMapValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const loaded = useRef(false);
  const form = useFormContext();

  const initMap = async () => {
    // Create a new map instance
    if (form.getValues("addressLat")) {
      if (window.google?.maps) {
      }
    }
  };
  const fetch = useMemo(
    () =>
      debounce((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 400),
    []
  );

  useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService() ?? {};
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(mapValue ? [mapValue] : []);
      return undefined;
    }

    fetch({ input: inputValue }, results => {
      if (active) {
        let newOptions = [];

        if (mapValue) {
          newOptions = [mapValue];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [mapValue, inputValue, fetch]);

  const handleSelect = async placeId => {
    try {
      if (!placeId) return;
      const { lat, lng } = await getLatLng(placeId);
      if (!labelRequired) {
        localStorage.setItem(
          "city",
          addressComponents.find(x => x.types[0] === "locality")?.long_name ||
            addressComponents.find(x => x.types[0] === "route")?.long_name ||
            addressComponents.find(x => x.types[0] === "postal_town")?.long_name ||
            addressComponents.find(x => x.types[0] === "administrative_area_level_1")?.long_name ||
            addressComponents.find(x => x.types[0] === "country")?.long_name
        );
        localStorage.setItem("latitude", lat);
        localStorage.setItem("longitude", lng);
      }
      form.setValue("zipCode", addressComponents.find(x => x.types[0] === "postal_code")?.long_name || "");
      form.setValue("countryName", addressComponents.find(x => x.types[0] === "country")?.long_name || "");
      form.setValue(
        "stateName",
        addressComponents.find(x => x.types[0] === "administrative_area_level_1")?.long_name || ""
      );
      form.setValue("city", addressComponents.find(x => x.types[0] === "locality")?.long_name || "");
      form.setValue("addressLat", lat);
      form.setValue("addressLong", lng);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadScript = (src, position, id) => {
      if (!position) {
        return;
      }
      const googleMapScript = document.getElementById("google-maps");
      if (googleMapScript) {
        initMap();
      } else {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", id);
        script.src = src;
        script.onload = initMap;
        position.appendChild(script);
      }
    };

    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&loading=async&libraries=places&callback=initMap`,
      document.querySelector("head"),
      "google-maps"
    );
    window.initMap = initMap;
    loaded.current = true;
  }, [form.getValues("addressLat")]);

  return (
    <>
      {showAddressAsLabel ? (
        <>
          <Typography>{form.getValues(name)}</Typography>
        </>
      ) : (
        <Controller
          name={name}
          control={form.control}
          rules={{
            required: isRequired ? requiredMessage : false,
          }}
          render={({ field: { onChange, value, onBlur, ref, ...field } }) => (
            <Autocomplete
              id="google-map-demo"
              className="pt-12"
              getOptionLabel={option => (typeof option === "string" ? option : option.description)}
              filterOptions={x => x}
              options={options}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={value || null}
              noOptionsText={t("noLocations")}
              onChange={async (event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setMapValue(newValue);
                if (!labelRequired) {
                  if (newValue === null) handleCustomError(true);
                  else {
                    handleCustomError();
                    localStorage.setItem("fullAddress", newValue?.description);
                  }
                }
                onChange(newValue === null ? "" : newValue?.description);
                await handleSelect(newValue?.place_id);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              isOptionEqualToValue={(options, value) => options?.description === value}
              renderInput={params =>
                addressVisible && (
                  <>
                    <TextField
                      {...field}
                      inputRef={ref}
                      label={labelRequired && !setting ? (customAddress ? customAddress : t("address")) : ""}
                      onBlur={onBlur}
                      {...params}
                      variant="outlined"
                      error={!!form.errors[name]}
                      helperText={form.errors[name]?.message}
                      onKeyDown={e => {
                        e.stopPropagation();
                      }}
                    />
                  </>
                )
              }
            />
          )}
        />
      )}
    </>
  );
};

export default CustomGoogleMap;

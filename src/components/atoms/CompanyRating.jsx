"use client";
import { Box, Button, Typography, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { CustomImgStyle } from "../style";

export const CompanyRatingStyle = styled(Box)({
  "& img[alt='google']": {
    maxWidth: "1.5rem",
    maxHeight: "1.5rem",
  },
});

const geocoder = { current: null };
let addressComponents;
const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
const BLOB_DOMAIN = process.env.NEXT_PUBLIC_BLOB_IMAGE_MEDIA_URL;
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

      const { lat, lng } = results[0]?.geometry.location;
      addressComponents = results[0]?.address_components;
      resolve({ lat: lat(), lng: lng() });
    });
  });
};

const CompanyRating = props => {
  const { placeId, isLocation, mt, mb } = props;
  const loaded = useRef(false);
  const [rating, setRating] = useState(null);
  const [numberOfRaters, setNumberOfRaters] = useState(null);
  const t = useTranslations();

  useEffect(() => {
    if (placeId !== null) {
      if (isLocation === true && window?.google?.maps) {
        GetCompanyRating();
      } else if (isLocation === false) {
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
          `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&libraries=places&callback=initMap`,
          document.querySelector("head"),
          "google-maps"
        );
        window.initMap = initMap;
        loaded.current = true;
      }
    }
  }, [placeId]);

  const initMap = async () => {
    if (window.google?.maps) {
      GetCompanyRating();
    }
  };

  const GetCompanyRating = async () => {
    const { lat, lng } = await getLatLng(placeId);

    const mapRating = new google.maps.Map(document.getElementById("mapRating"), {
      center: { lat: lat, lng: lng },
      zoom: 15,
    });
    const service = new google.maps.places.PlacesService(mapRating);
    service.getDetails(
      {
        placeId,
      },
      (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          {
            place?.user_ratings_total && setNumberOfRaters(place.user_ratings_total);
          }
          {
            place?.rating && setRating(place.rating);
          }
        }
      }
    );
  };
  return (
    <>
      <CompanyRatingStyle mt={mt} mb={mb}>
        {rating !== null && (
          <>
            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
              <CustomImgStyle src={`${BLOB_DOMAIN}/Holistikah/Logo/google.svg`} alt="google" />
              <Typography variant="h6">
                {rating} ({numberOfRaters})
              </Typography>
            </Box>
            <Button href={`https://www.google.com/maps/place/?q=place_id:${placeId}`} variant="text" disableRipple>
              {t("activityDetail.viewReviewsOnGoogle")}
            </Button>
          </>
        )}
      </CompanyRatingStyle>
      <div id="mapRating"></div>
    </>
  );
};

export default CompanyRating;

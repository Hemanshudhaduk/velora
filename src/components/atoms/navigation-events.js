"use client";

import { geoLocation, locationChanged, selectGeoLocation, selectLocationChanged } from "@/src/lib/slice/userSlice";
import { getCountryName } from "@/src/utils";
import { ModalState, CommonModal } from "@/src/components/atoms";
import { useRouter } from "next-intl/client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function NavigationEvents(props) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const getGeoLocation = useSelector(selectGeoLocation);
  const router = useRouter();
  const { userLocation } = props;
  const getLocationChanged = useSelector(selectLocationChanged);
  const [IframeModal, openIframeModal, closeIframeModal] = ModalState();

  const showCity = async position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const countryDetails = await getCountryName({ latitude, longitude });
    if (
      !localStorage.getItem("setGeolocation") ||
      (userLocation !== "Failed to fetch data" && userLocation.city !== localStorage.getItem("city"))
    ) {
      localStorage.setItem("latitude", latitude);
      localStorage.setItem("longitude", longitude);
      localStorage.setItem("city", countryDetails.long_name);
      localStorage.setItem("fullAddress", countryDetails.long_name);
      dispatch(geoLocation({ geoLocation: !getGeoLocation }));
      localStorage.setItem("setGeolocation", true);
    }
  };

  useEffect(() => {
    if ("isLatLonRequired" in localStorage && localStorage.getItem("isLatLonRequired") === "true") {
      localStorage.setItem("latitude", userLocation?.lat);
      localStorage.setItem("longitude", userLocation?.lon);
      dispatch(locationChanged({ locationChanged: !getLocationChanged }));
      localStorage.removeItem("isLatLonRequired");
    }
  }, [pathname, router]);

  useEffect(() => {
    if (localStorage.getItem("cnt") !== "true") {
      localStorage.setItem("cnt", "true");
      openIframeModal();
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showCity);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <CommonModal
      open={IframeModal}
      closeModal={closeIframeModal}
      details={<iframe src="https://link.apisystem.tech/widget/form/0fNd5XT0ZYIFuLljhnGG"></iframe>}
      closeIcon
      className="cm-iframe-modal"
    />
  );
}

export default NavigationEvents;

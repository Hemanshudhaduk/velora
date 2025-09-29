"use client";
import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";

const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;
const ActivityProviderMapLoad = ({ name = "fullAddress", mapVisible = true, isMapLoad, providerPage = false }) => {
  const loaded = useRef(false);
  const form = useFormContext();
  let mapActivityProvider;
  const initMap = async () => {
    // Create a new map instance
    if (form.getValues("addressLat")) {
      if (window.google?.maps) {
        mapActivityProvider = new google.maps.Map(document.getElementById("mapActivityProvider"), {
          center: { lat: parseFloat(form.getValues("addressLat")), lng: parseFloat(form.getValues("addressLong")) },
          zoom: 15,
        });

        const marker = new window.google.maps.Marker({
          position: {
            lat: parseFloat(form.getValues("addressLat")),
            lng: parseFloat(form.getValues("addressLong")),
          },
        });
        marker.setMap(mapActivityProvider);
        isMapLoad(true);
      }
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
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}&libraries=places&callback=initMap`,
      document.querySelector("head"),
      "google-maps"
    );
    window.initMap = initMap;
    loaded.current = true;
  }, [form.getValues("addressLat")]);

  return (
    <>
      {!mapVisible && (
        <Controller
          name={name}
          control={form.control}
          render={({ field }) => {
            return <input {...field} />;
          }}
        />
      )}

      {mapVisible && (
        <div id="mapActivityProvider" style={{ width: "100%", height: "277px", borderRadius: "0.5rem" }}></div>
      )}
    </>
  );
};

export default ActivityProviderMapLoad;

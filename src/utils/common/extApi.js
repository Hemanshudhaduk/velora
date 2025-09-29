import axios from "axios";

const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_MAP_KEY;

export const getCountryName = async ({ latitude, longitude }) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_KEY}`;
    const {
      data: { results },
    } = await axios.get(url);
    const getArea =
      results[0].address_components.find(x => x.types[0] === "locality") ||
      results[0].address_components.find(x => x.types[0] === "route") ||
      results[0].address_components.find(x => x.types[0] === "postal_town") ||
      results[0].address_components.find(x => x.types[0] === "administrative_area_level_1") ||
      results[0].address_components.find(x => x.types[0] === "country");
    return getArea;
  } catch (err) {
    return err.message;
  }
};

export const getUserDetailsByIp = async _ip => {
  try {
    const res = await axios.get(`http://ip-api.com/json/${_ip}`);
    if (res.data?.status !== "success") {
      throw new Error("Failed to fetch data");
    }
    return res.data;
  } catch (err) {
    return err.message;
  }
};

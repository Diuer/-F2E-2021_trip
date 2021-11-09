import jsSHA from "jssha";
import qs from "querystring";

const apiRoot = "https://ptx.transportdata.tw/MOTC/";
const VERSION = "/v2";

const getAuthorizationHeader = () => {
  let AppID = "e28b58a56e754b039fa7f8e5d5e08d0d";
  let AppKey = "PxDDf1UhKahsFBy2hzOQD312tRk";
  let GMTString = new Date().toGMTString();
  let ShaObj = new jsSHA("SHA-1", "TEXT");
  ShaObj.setHMACKey(AppKey, "TEXT");
  ShaObj.update("x-date: " + GMTString);
  let HMAC = ShaObj.getHMAC("B64");
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"';
  return { Authorization: Authorization, "X-Date": GMTString };
};

const requestAPI = (path = "", param = {}) => {
  return fetch(`${apiRoot}${VERSION}${path}?${qs.stringify(param)}`, {
    method: "GET",
    headers: getAuthorizationHeader(),
  })
    .then(async (response) => {
      if (!response.ok) {
        const errorMsg = await response.json().then((msg) => msg.Message);
        // alert
        throw errorMsg;
      }
      return response.json();
    })
    .then((data) => data);
};

export default requestAPI;

export const requesRestaurant = (city, param) => {
  const restaurantPath = "/Tourism/Restaurant";

  if (!city) {
    return requestAPI(restaurantPath, param);
  }
  return requestAPI(`${restaurantPath}/${city}`, param);
};

const BASE_URL = 'http://localhost:5000/api/v1';

export const FOODS_URL = BASE_URL + "/foods";
export const FOODS_TAGS_URL = FOODS_URL + "/tags";
export const FOODS_BY_SEARCH_URL = FOODS_URL + "/search/";
export const FOODS_BY_TAG_URL = FOODS_TAGS_URL + "/";
export const FOODS_BY_ID_URL = FOODS_URL + "/";

export const USER_LOGIN_URL = BASE_URL + "/user/login"
export const USER_REGISTER_URL = BASE_URL + "/user/register"
export const ORDERS_URL = BASE_URL + "/orders"
export const ORDER_CREATE_URL = ORDERS_URL + "/create"
export const ORDER_GET_URL = ORDERS_URL + "/newOrderForCurrentUser"
export const ORDER_PAY_URL = ORDERS_URL + "/pay"
export const ORDER_TRACK_URL = ORDERS_URL + "/track/"

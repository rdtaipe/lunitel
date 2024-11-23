import axios from "axios";
import {SET_STATE,} from "./types";
import { setter } from "./actions";
import { utils } from "./utils";

export var initialState = {
  products: [],
  refresh: false,
  details: [
    { score: 0 },
  ],
  productsFiltered: [],
  brandFilteredMemory: [],
  filtersElect: [],
  openDetail: "",
  searchName: "",
  categories: [],
  brands: [],
  color: [],
  selectedBrands: [],
  viewChat: {
    value: false,
  },

  openFilter: false,
  //use useSelector to get this functions
  actions: { setter },
  state: {
    refresh: false,
    setter: setter,
    utils: utils,
    pagination: {
      page: 1,
      pageLimit: 10,
      limit: 10,
      skip: 0,
    },
    server: {
      refresh: false,
      setter: setter,
      url: "http://localhost:5000",
      dashboardUrl: "http://localhost:3001",
      clientUrl: "http://localhost:3000",
      //routes action 
      get: (url) => axios.get(url),
      post: (url, data) => axios.post(url, data),
      put: (url, data) => axios.put(url, data),
      delete: (url) => axios.delete(url),
      find: (url, query) => axios.get(url + query),

      auth: {
        get: (url) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.get(url, { headers: headers, })
        },
        post: (url, send) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.post(url, { data: send ? send : {}, headers: headers })
        },
        put: (url, send) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.put(url, { data: send ? send : {}, headers: headers })
        },
        delete: (url, send) => {
          var token = utils.getCookie("token")
          var headers = { Authorization: `Bearer ${token}` }// for every request
          return axios.delete(url, { data: send ? send : {}, headers: headers })
        },

      }
    },
    user: {
      refresh: false,
      cart: [],
      setStatus: (status) => { utils.saveLocal("userStatus", status) },
      status: () => !utils.getLocal("userStatus") ? { error: true, message: "waiting_authorization" } : utils.getLocal("userStatus"),
      token: () => !utils.getCookie("token") ? null : utils.getCookie("token"),
      isAutorized: () => !utils.getLocal("autorized") ? false : utils.getLocal("autorized"),
      data: () => !utils.getLocal("userData") ? {} : utils.getLocal("userData"),
      authorize: async (token, user, url) => {
        console.log(user, url)
          const domain = url + "/users/authorize"
          const headers = { authorization: `Bearer ${token}`, user: user }// for every request
          const getUserMetadataResponse = await axios.get(domain, {
            headers: headers,
          });
          const data = getUserMetadataResponse.data.user
          utils.saveLocal("userStatus", { error: false, message: "Authorized" })
          utils.saveLocal("autorized", true)
          utils.saveLocal("userData", data)
          utils.saveCookie("token", token)
          return data
       
      },
      unauthorize: ({ message }) => {
        console.log(message)
        var newMessage = message ? message : "Unauthorized"
        utils.saveLocal("userStatus", { error: true, message: newMessage })
        utils.saveLocal("autorized", false)
        utils.saveLocal("userData", {})
        utils.saveCookie("token", "")
      },
    },
    sidebar: {
      open: false,
      top: 80,
      left: 0,
      width: 280,
    },
    test: {
      obj: {
        a: 1,
        value: true,
        b: [
          { id: "asd", a: 1 },
          { id: "abd", a: 1 },
        ]
      }
    }

  },
};

export const reducer = (state = initialState, action) => {

  switch (action.type) {
    case "REFRESH": {
      return {
        ...state,
        refresh: action.payload,
      }
    }
    case SET_STATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state;
  }

};


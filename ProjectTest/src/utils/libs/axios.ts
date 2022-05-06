import axios from "axios";

const appAxios = axios.create({
  baseURL: "/"
})

export default appAxios
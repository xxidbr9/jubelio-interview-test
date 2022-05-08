import apiConfig from "@configs/api.config";
import axios from "axios";

const appAxios = axios.create({
  baseURL: apiConfig.URL
})

export default appAxios
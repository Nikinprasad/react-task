import axios from "axios";
import config from "../config.json"

export default axios.create({
  baseURL: config.base_url,
  headers: {
    "Content-type": "application/json",
  },
});

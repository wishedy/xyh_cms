import Cookies from 'js-cookie'
import {setHttpAuth} from "@/resource/create-api";

const TokenKey = 'Admin-Token'

export function getToken() {
  const token = Cookies.get(TokenKey)
  token&&setHttpAuth(token)
  return token
}

export function setToken(token) {
  setHttpAuth(token)
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

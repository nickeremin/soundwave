import { cookies } from "next/headers"
import axios, { AxiosError } from "axios"

import { env } from "@/shared/components/env.mjs"

import { getSpotifyAccessToken } from "../_actions/track"

export const spotifyApiAxios = axios.create({
  baseURL: "https://api.spotify.com/v1",
  withCredentials: true,
})

spotifyApiAxios.interceptors.request.use(
  function (config) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get(env.SPOTIFY_ACCESS_TOKEN_KEY)
    config.headers.set("Authorization", `Bearer ${accessToken?.value}`)
    return config
  },
  function (error) {
    console.log(error)
  }
)

spotifyApiAxios.interceptors.response.use(
  function (res) {
    return res
  },
  async function (error: AxiosError) {
    if (error.response?.status === 401) {
      await getSpotifyAccessToken()
    }
  }
)

import { cookies } from "next/headers"
import axios, { type AxiosError, type AxiosRequestConfig } from "axios"

import { env } from "@/shared/components/env.mjs"

export async function getSpotifyAccessToken() {
  const options: AxiosRequestConfig = {
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(
          env.SPOTIFY_CLIENT_ID + ":" + env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
    },
    data: {
      grant_type: "client_credentials",
    },
  }

  try {
    const { data } = await axios.request(options)
    const token = data.access_token

    if (token !== null) {
      const cookieStore = cookies()
      cookieStore.set(env.SPOTIFY_ACCESS_TOKEN_KEY, token)
    }
  } catch (error) {
    console.log("getSpotifyAccessToken error")
  }
}

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

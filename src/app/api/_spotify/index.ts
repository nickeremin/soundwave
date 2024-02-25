import { cookies } from "next/headers"
import Axios, { type AxiosError, type AxiosRequestConfig } from "axios"

import { env } from "@/shared/components/env.mjs"
import { catchAxiosError } from "@/shared/lib/utils"

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
    const { data } = await Axios.request(options)
    const token = data.access_token

    if (token !== null) {
      const cookieStore = cookies()
      cookieStore.set(env.SPOTIFY_ACCESS_TOKEN_KEY, token)
    }
  } catch (error) {
    catchAxiosError(error)
  }
}

export const spotifyApi = Axios.create({
  baseURL: env.SPOTIFY_API_BASE_URL,
  withCredentials: true,
})

//export const spotifyApi = setupCache(axios)

spotifyApi.interceptors.request.use(
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

spotifyApi.interceptors.response.use(
  function (config) {
    return config
  },
  async function (error: AxiosError) {
    const originalRequest = error.config
    if (error.response?.status === 401) {
      await getSpotifyAccessToken()
      if (originalRequest) return spotifyApi.request(originalRequest)
    }
  }
)

"use server"

import { request } from "https"
import { cookies } from "next/headers"
import axios, { AxiosRequestConfig } from "axios"

import { env } from "@/shared/components/env.mjs"
import { trackSchema } from "@/shared/lib/validations/track"

const spotifyApiAxios = axios.create({
  baseURL: "https://api.spotify.com/v1",
  withCredentials: true,
})

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

export async function getArtist({
  token,
  artistId,
}: {
  token?: string
  artistId: string
}) {
  const options: AxiosRequestConfig = {
    method: "get",
    url: `https://api.spotify.com/v1/artists/${artistId}`,
    headers: {
      //"Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token}`,
    },
  }

  try {
    const { data } = await axios.request(options)
    return data
  } catch (error) {
    console.log("artist error")
  }
}

export async function getTrack(trackId: string) {
  const cookieStore = cookies()
  const token = cookieStore.get(env.SPOTIFY_ACCESS_TOKEN_KEY)

  const options: AxiosRequestConfig = {
    method: "get",
    url: `https://api.spotify.com/v1/tracks/${trackId}`,
    headers: {
      //"Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${token?.value}`,
    },
  }

  try {
    const { data } = await axios.request(options)

    return data
  } catch (error) {
    console.log("getTrack error")
  }
}

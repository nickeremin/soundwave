"use client"

import React from "react"
import { getCookie, setCookie } from "cookies-next"

import { Button } from "@/shared/components/ui/button"
import { addTimerAction } from "@/app/_actions/track"

interface TimerProps {
  value: number
}

function Timer({ value }: TimerProps) {
  const [seconds, setSeconds] = React.useState(value)
  const [isPlaying, setIsPlaying] = React.useState(false)

  React.useEffect(() => {
    const onUnload = () => {
      document.cookie = `seconds=${seconds}`
      localStorage.setItem("seconds", seconds.toString())
      addTimerAction({ time: value, remainTime: seconds })
    }

    window.addEventListener("unload", onUnload)

    return () => {
      window.removeEventListener("unload", onUnload)
    }
  }, [seconds])

  React.useEffect(() => {
    if (isPlaying) {
      const tick = () => {
        setSeconds((s) => s - 1)
      }
      const intervalId = setInterval(tick, 1000)

      return () => {
        clearInterval(intervalId)
      }
    }
  }, [isPlaying])

  return (
    <div className="flex h-[300px] w-full max-w-md flex-col justify-between rounded-xl border p-6">
      <p className="text-xl font-bold">Time: {seconds}</p>
      <div className="flex items-center gap-3">
        <Button onClick={() => setIsPlaying(true)}>Play</Button>
        <Button onClick={() => setIsPlaying(false)}>Stop</Button>
      </div>
    </div>
  )
}

export default Timer

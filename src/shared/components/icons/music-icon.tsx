import { HeartIcon, PlayIcon, SpeakerLoudIcon } from "@radix-ui/react-icons"

import { cn } from "@/shared/lib/utils"

const MusicIcons = {
  Play: PlayIcon,
  SpeakerLoud: SpeakerLoudIcon,
  Heart: HeartIcon,
}

interface MucisIconProps extends React.RefAttributes<SVGSVGElement> {
  name: keyof typeof MusicIcons
  className?: string
}

function MusicIcon({ name, className, ...props }: MucisIconProps) {
  const Icon = MusicIcons[name]

  return (
    <Icon className={cn("size-5", className)} {...props} aria-hidden="true" />
  )
}

export default MusicIcon

import { icons } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof icons
  description?: string
}

export interface NavItemWithChildren extends Omit<NavItem, "href"> {
  href?: string
  items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends Omit<NavItem, "href"> {
  href?: string
  items?: NavItemWithChildren[]
}

/* eslint-disable */
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

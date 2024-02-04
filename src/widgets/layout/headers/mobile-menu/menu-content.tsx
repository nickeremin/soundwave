"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useClerk, useUser } from "@clerk/nextjs"
import { motion, type Variants } from "framer-motion"

import { ThemeSelectMobile } from "@/entities/theme"
import { LucideIcon } from "@/shared/components/icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"
import { Avatar, AvatarImage } from "@/shared/components/ui/avatar"
import { Button, buttonVariants } from "@/shared/components/ui/button"
import { mobileNavLinks } from "@/shared/config/site"
import { cn } from "@/shared/lib/utils"

import { MenuContext } from "./mobile-menu-header-wrapper"

const liVariants: Variants = {
  closed: (index) => ({
    translateY: "-16px",
    opacity: 0,
    transition: {
      translateY: {
        duration: 0.48 - 0.02 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
      opacity: {
        duration: 0.32 - 0.02 * index,
        delay: 0.21 - 0.02 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
    },
  }),
  open: (index) => ({
    translateY: "0px",
    opacity: 1,
    transition: {
      translateY: {
        duration: 0.36 + 0.02 * index,
        ease: [0.32, 0.08, 0.24, 1],
      },
      opacity: {
        duration: 0.3 + 0.02 * index,
        delay: 0.03 + 0.03 * index,
        ease: [0.52, 0.16, 0.52, 0.84],
      },
    },
  }),
}

function UnauthorizedMenuContent() {
  const router = useRouter()
  const pathname = usePathname()

  const { isOpen, toggleOpen } = React.useContext(MenuContext)

  return (
    <>
      <ul className="flex flex-col gap-4 py-4">
        <motion.li
          variants={liVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          custom={0}
        >
          <Button
            disabled={pathname === "/signin"}
            variant="outline"
            className="h-10 w-full"
            onClick={() => {
              router.push("/signin")
              toggleOpen()
            }}
          >
            Войти
          </Button>
        </motion.li>
        <motion.li
          variants={liVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          custom={1}
        >
          <Button
            disabled={pathname === "/signup"}
            className="h-10 w-full"
            onClick={() => {
              router.push("/signup")
              toggleOpen()
            }}
          >
            Создать Аккаунт
          </Button>
        </motion.li>
      </ul>
      <ul className="flex flex-col">
        {mobileNavLinks.map((item, i) => {
          if (item.items) {
            return (
              <motion.li
                key={i}
                variants={liVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                custom={i + 2}
              >
                <Accordion type="multiple">
                  <AccordionItem value={item.title}>
                    <AccordionTrigger className="h-12 text-base font-normal">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="flex flex-col">
                        {item.items.map((item, j) => (
                          <Link key={j} href={item.href!} onClick={toggleOpen}>
                            <li className="flex h-12 items-center gap-2 text-base text-secondary transition-colors hover:bg-accent">
                              <LucideIcon name={item.icon!} />
                              {item.title}
                            </li>
                          </Link>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.li>
            )
          } else {
            return (
              <Link key={i} href={item.href!} onClick={toggleOpen}>
                <MenuListItem custom={i + 2}>{item.title}</MenuListItem>
              </Link>
            )
          }
        })}
      </ul>
    </>
  )
}

function AuthorizedMenuContent() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()

  const { isOpen, toggleOpen } = React.useContext(MenuContext)

  return (
    <>
      <ul className="flex flex-col py-4">
        <motion.li
          variants={liVariants}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          custom={0}
          onClick={toggleOpen}
        >
          <Link
            data-shadcnui-button
            href="/contact"
            className={cn(
              buttonVariants({
                variant: "outline",
                className: "h-10 w-full",
              })
            )}
          >
            Связаться с нами
          </Link>
        </motion.li>
      </ul>
      <ul className="flex flex-col">
        <MenuListItem custom={1} className="h-[72px] justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-sm font-medium text-tertiary">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
          <Avatar className="size-8">
            <AvatarImage src={user?.imageUrl} alt="" />
          </Avatar>
        </MenuListItem>
        <Link href="/tables" onClick={toggleOpen}>
          <MenuListItem custom={2}>Таблицы</MenuListItem>
        </Link>
        <Link href="/settings" onClick={toggleOpen}>
          <MenuListItem custom={3}>Настройки</MenuListItem>
        </Link>
        <Link href="/settings" onClick={toggleOpen}>
          <MenuListItem custom={4} className="justify-between">
            Создать Команду
            <LucideIcon name="Plus" className="size-6 text-secondary" />
          </MenuListItem>
        </Link>
        <MenuListItem custom={5} className="justify-between">
          Тема
          <ThemeSelectMobile />
        </MenuListItem>
        <MenuListItem custom={6}>
          <button
            data-shadcnui-button
            disabled={isPending}
            className="flex size-full items-center justify-between outline-none disabled:text-tertiary"
            onClick={() => {
              startTransition(async () => {
                await signOut(() => {
                  router.push("/signin")
                })
                toggleOpen()
              })
            }}
          >
            {isPending ? "Выход..." : "Выйти"}
            <LucideIcon name="LogOut" className="text-secondary" />
          </button>
        </MenuListItem>
      </ul>
      <motion.p
        variants={liVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        custom={7}
        className="mb-3 mt-10 text-xl font-semibold"
      >
        Ресурсы
      </motion.p>
      <ul className="flex flex-col">
        <Link href="/docs" onClick={toggleOpen}>
          <MenuListItem custom={8}>Документация</MenuListItem>
        </Link>
        <Link href="/" onClick={toggleOpen}>
          <MenuListItem custom={9} className="justify-between">
            Главная Tablebuilder
            <LucideIcon name="ExternalLink" className="text-secondary" />
          </MenuListItem>
        </Link>
      </ul>
    </>
  )
}

interface MenuListItemProps extends React.HTMLAttributes<HTMLLIElement> {
  custom: number
}

function MenuListItem({ custom, className, children }: MenuListItemProps) {
  const { isOpen } = React.useContext(MenuContext)

  return (
    <motion.li
      variants={liVariants}
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      custom={custom}
      className={cn(
        "flex h-12 select-none items-center border-b transition-colors hover:bg-accent",
        className
      )}
    >
      {children}
    </motion.li>
  )
}

export { UnauthorizedMenuContent, AuthorizedMenuContent }

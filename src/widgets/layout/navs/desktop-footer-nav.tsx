import React from "react"
import Link from "next/link"

import { ThemeToggle } from "@/entities/theme"
import CustomIcon from "@/shared/components/icons/custom-icon"
import { buttonVariants } from "@/shared/components/ui/button"
import { footerLinks } from "@/shared/config/site"
import { cn } from "@/shared/lib/utils"

function DesktopFooterNav() {
  return (
    <div className="hidden w-full grid-cols-[.9fr_repeat(3,1fr)_100px] gap-6 lg:grid">
      <div className="flex flex-1 flex-col justify-between gap-[10px] pt-[10px]">
        <div className="flex items-center gap-3">
          <Link href="/" className="m-[-3px] p-[3px]">
            <CustomIcon name="Logo" className="size-6" />
          </Link>
          <p className="whitespace-nowrap text-sm font-medium text-tertiary">
            &copy; 2023
          </p>
        </div>

        {/* System status that shows site problems */}
        <div className="-ml-2 flex h-9 max-w-[300px] cursor-default items-center gap-[6px] whitespace-nowrap rounded-md p-2 text-sm text-blue transition-colors hover:bg-accent">
          <span className="inline-block size-[10px] rounded-full bg-blue" />
          <small className="inline-block overflow-hidden text-ellipsis text-sm font-medium">
            Все системы в норме.
          </small>
        </div>

        <div className="mt-auto whitespace-nowrap text-sm/9 text-tertiary">
          Создано{" "}
          <Link
            aria-label="Перейти на страницу разработчика на GitHub"
            href="/"
            className="font-semibold transition-colors hover:text-secondary"
          >
            nickeremin
          </Link>
          .
        </div>
      </div>

      {footerLinks.map((group) => (
        <div key={group.title} className="mb-6 flex flex-col">
          <label className="cursor-default">
            <h2 className="my-3 text-sm font-medium leading-5">
              {group.title}
            </h2>
          </label>
          <ul className="flex list-none flex-col">
            {group.items?.map((item) => (
              <li key={item.title} className="py-[6px]">
                <Link
                  href={item.href ?? "/"}
                  className="whitespace-nowrap text-sm text-tertiary transition-colors hover:text-primary"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex flex-col items-end justify-end">
        <div className="flex items-center gap-1">
          <Link
            data-shadcnui-button
            aria-label="Перейти на страницу проекта на GitHub"
            href="/"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              })
            )}
          >
            <CustomIcon name="GitHub" className="size-6" />
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default DesktopFooterNav

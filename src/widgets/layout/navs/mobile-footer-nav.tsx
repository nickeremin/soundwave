import React from "react"
import Link from "next/link"

import { ThemeToggle } from "@/entities/theme"
import CustomIcon from "@/shared/components/icons/custom-icon"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion"
import { buttonVariants } from "@/shared/components/ui/button"
import { footerLinks } from "@/shared/config/site"
import { cn } from "@/shared/lib/utils"

function MobileFooterNav() {
  return (
    <div className="flex flex-col lg:hidden">
      <div className="flex items-center justify-between pb-5">
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
          <small className="inline-block overflow-hidden text-ellipsis text-sm font-medium">
            Все системы в норме.
          </small>
          <span className="inline-block size-[10px] rounded-full bg-blue" />
        </div>
      </div>

      <Accordion type="multiple" className="w-full">
        {footerLinks.map((group) => (
          <AccordionItem value={group.title} key={group.title}>
            <AccordionTrigger className="text-sm">
              {group.title}
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-2 pl-3">
                {group.items?.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href ?? "/"}
                    className="whitespace-nowrap text-tertiary"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 flex items-center justify-between">
        <div className="mt-auto whitespace-nowrap text-sm/9 text-tertiary">
          Создано{" "}
          <Link
            aria-label="Перейти на страницу разработчика на GitHub"
            href="/"
            className="font-semibold transition-colors hover:text-primary"
          >
            nickeremin
          </Link>
          .
        </div>

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

export default MobileFooterNav

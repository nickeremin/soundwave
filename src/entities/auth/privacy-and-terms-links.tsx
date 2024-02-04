import React from "react"
import Link from "next/link"

import { LucideIcon } from "@/shared/components/icons"

function PrivacyAndTermsLinks() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-fit flex-col items-center gap-8 py-8">
        <p className="text-center text-sm text-tertiary">
          Присоединяясь, вы соглашаетесь с{" "}
          <span className="link-hover text-primary">
            <Link
              href="/legal/terms"
              target="_blank"
              className="inline-flex items-center gap-0.5 font-medium"
            >
              Условиями Использования
              <LucideIcon
                name="ExternalLink"
                strokeWidth={2}
                className="size-[14px]"
              />
            </Link>
          </span>{" "}
          и{" "}
          <span className="link-hover text-primary">
            <Link
              href="/legal/privacy-policy"
              target="_blank"
              className="inline-flex items-center gap-0.5 font-medium"
            >
              Политикой Конфиденциальности
              <LucideIcon
                name="ExternalLink"
                strokeWidth={2}
                className="size-[14px]"
              />
            </Link>
          </span>
        </p>
        <div className="w-[90%] border-b" />
        <p className="text-center text-sm text-tertiary">
          У вас сложныe требования в компании?{" "}
          <span className="link-hover text-primary">
            <Link
              href="/contact/sales"
              className="inline-flex items-center gap-0.5 font-medium"
            >
              Получите помощь корпоративного уровня
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default PrivacyAndTermsLinks

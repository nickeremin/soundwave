import React from "react"
import Link from "next/link"

import { LucideIcon } from "@/shared/components/icons"

function PrivacyAndTermsLinks() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-fit flex-col items-center gap-8 py-8">
        <p className="text-center text-sm text-tertiary">
          By joining, you agree to our{" "}
          <span className="link-hover text-primary">
            <Link
              href="/legal/terms"
              target="_blank"
              className="inline-flex items-center gap-0.5 font-medium"
            >
              Terms of Service
              <LucideIcon
                name="ExternalLink"
                strokeWidth={2}
                className="size-[14px]"
              />
            </Link>
          </span>{" "}
          and{" "}
          <span className="link-hover text-primary">
            <Link
              href="/legal/privacy-policy"
              target="_blank"
              className="inline-flex items-center gap-0.5 font-medium"
            >
              Privacy Policy
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
          Have a complex use case?{" "}
          <span className="link-hover text-primary">
            <Link
              href="/contact"
              className="inline-flex items-center gap-0.5 font-medium"
            >
              Get assistance
            </Link>
          </span>
        </p>
      </div>
    </div>
  )
}

export default PrivacyAndTermsLinks

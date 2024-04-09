import React from "react"

import { PageHeading } from "@/shared/components/ui/page-heading"

interface VerificationCompletePageProps {
  searchParams: {
    email: string
    mode: string
  }
}

function VerificationCompletePage({
  searchParams: { email, mode },
}: VerificationCompletePageProps) {
  if (mode === "signup") {
    return <SignUpComplete email={email} />
  }

  if (mode === "signin") {
    return <SignInComplete />
  }

  return (
    <div className="max-w-[50rem] p-6 text-center">
      <div className="flex flex-col gap-4">
        <PageHeading
          size="sm"
          variant="gradient"
          className="text-center font-bold"
        >
          Подтверждение Успешно
        </PageHeading>
        <p className="text-secondary">Вы можете закрыть это окно.</p>
      </div>
    </div>
  )
}

function SignUpComplete({ email }: { email: string }) {
  return (
    <div className="max-w-[50rem] p-6 text-center">
      <div className="flex flex-col gap-4">
        <PageHeading
          size="sm"
          variant="gradient"
          className="text-center font-bold"
        >
          Регистрация Успешна
        </PageHeading>
        <p className="text-secondary">
          <span className="font-semibold text-primary">{email}</span> был
          подтвержден. Вы можете закрыть это окно.
        </p>
      </div>
    </div>
  )
}

function SignInComplete() {
  return (
    <div className="max-w-[50rem] p-6 text-center">
      <div className="flex flex-col gap-4">
        <PageHeading
          size="sm"
          variant="gradient"
          className="text-center font-bold"
        >
          Аутентификация Успешна
        </PageHeading>
        <p className="text-secondary">
          Ваш адрес электронной почты был успешно подтвержден. Вы можете закрыть
          это окно.
        </p>
      </div>
    </div>
  )
}

export default VerificationCompletePage

import React from "react"
import Link from "next/link"

type FooterSection = {
  title: string
  items: {
    title: string
    href: string
  }[]
}

const footerLinks: FooterSection[] = [
  {
    title: "Company",
    items: [
      { title: "About", href: "/" },
      { title: "Contact", href: "/" },
      { title: "Privacy Policy", href: "/" },
      { title: "Terms of Use", href: "/" },
    ],
  },
  {
    title: "Useful Links",
    items: [
      { title: "First Link", href: "/" },
      { title: "Second", href: "/" },
      { title: "Another Link", href: "/" },
      { title: "One More", href: "/" },
    ],
  },
]

function MainFooter() {
  return (
    <footer className="flex p-8 pt-20">
      <nav className="flex w-full flex-col">
        <div className="flex">
          {footerLinks.map((section, i) => (
            <ul key={i} className="flex w-[320px] flex-col">
              <li className="font-medium">{section.title}</li>
              {section.items.map((link, j) => (
                <Link key={j} href={link.href} className="w-fit">
                  <li className="py-1 text-tertiary transition hover:text-primary">
                    {link.title}
                  </li>
                </Link>
              ))}
            </ul>
          ))}
        </div>

        <div className="my-10 w-full border-t" />

        <div className="flex h-full w-[400px] flex-col justify-between text-sm font-medium">
          <p className="text-secondary">&copy; 2024 SoundWave</p>

          <p className="text-tertiary">
            Created by{" "}
            <Link
              href="/"
              className="font-bold text-secondary transition hover:text-primary hover:underline"
            >
              nickeremin
            </Link>
            .
          </p>
        </div>
      </nav>
    </footer>
  )
}

export default MainFooter

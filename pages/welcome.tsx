import Image from "next/image";
import Link from "next/link";

import { SquareDot } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

export default function Welcome() {
  return (
    <div className="flex flex-col gap-2 min-h-screen">
      <header className="py-10">
        <div className="container px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SquareDot className="w-6 h-6" />
              <span className="font-bold">hoxe</span>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Held Today</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Bring your day completed, manage your tasks as a dummie.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/" className={buttonVariants()}>
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 justify-center">
        <a href="https://www.producthunt.com/posts/hoxe?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hoxe" target="_blank">
          <Image
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=448716&theme=neutral"
            alt="Hoxe - Bring&#0032;your&#0032;day&#0032;completed&#0044;&#0032;manage&#0032;your&#0032;tasks&#0032;as&#0032;a&#0032;dummie&#0046; | Product Hunt"
            width={200}
            height={43.19}
          />
        </a>
      </footer>
      {/* 
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Inc. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
       */}
    </div>
  )
}
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-900 mb-12">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-40" />
      <div className="relative px-6 py-24 sm:px-12 sm:py-32 lg:py-40 lg:px-16">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Professional Tools for Every Project
          </h1>
          <p className="mt-6 text-lg text-gray-300">
            FORTALY provides high-quality hardware and tools for professionals and DIY enthusiasts. Find everything you
            need for your next project, from power tools to fasteners.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


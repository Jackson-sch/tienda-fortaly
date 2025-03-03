import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PromoSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
      <div className="relative overflow-hidden rounded-lg bg-primary text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
        <div className="relative p-8">
          <h3 className="text-xl font-bold mb-2">Summer Sale</h3>
          <p className="mb-4">Up to 30% off on selected power tools</p>
          <Button variant="secondary" asChild>
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-800 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20" />
        <div className="relative p-8">
          <h3 className="text-xl font-bold mb-2">New Arrivals</h3>
          <p className="mb-4">Check out our latest professional-grade tools</p>
          <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20" asChild>
            <Link href="/products?sort=newest">Explore</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}


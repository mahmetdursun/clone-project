"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface HeroSlide {
  src: string
  alt: string
  href: string
}

const SLIDES: HeroSlide[] = [
  {
    src: "/sites/sonparca-com-32cbe5a4/root-8a5edab2/images/hero-slide-1.webp",
    alt: "Hero slide 1",
    href: "/sase-numarasi-ile-parca-sorgulama",
  },
  {
    src: "/sites/sonparca-com-32cbe5a4/root-8a5edab2/images/hero-slide-2.webp",
    alt: "Hero slide 2",
    href: "/bakim-robotu",
  },
]

const AUTOPLAY_INTERVAL_MS = 5000

export function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const startTimer = useCallback(() => {
    clearTimer()
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length)
    }, AUTOPLAY_INTERVAL_MS)
  }, [clearTimer])

  useEffect(() => {
    startTimer()
    return () => clearTimer()
  }, [startTimer, clearTimer])

  const goToSlide = useCallback(
    (index: number) => {
      setActiveIndex(index)
      startTimer()
    },
    [startTimer]
  )

  const goToPrevious = useCallback(() => {
    goToSlide((activeIndex - 1 + SLIDES.length) % SLIDES.length)
  }, [activeIndex, goToSlide])

  const goToNext = useCallback(() => {
    goToSlide((activeIndex + 1) % SLIDES.length)
  }, [activeIndex, goToSlide])

  return (
    <div className="relative aspect-[1600/450] overflow-hidden rounded-lg">
      {SLIDES.map((slide, index) => (
        <Link
          key={slide.src}
          href={slide.href}
          className={cn(
            "absolute inset-0 block transition-opacity duration-500",
            index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
          )}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="absolute inset-0 h-full w-full object-cover object-center"
            priority={index === 0}
          />
        </Link>
      ))}

      <button
        type="button"
        onClick={goToPrevious}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors duration-200 hover:bg-black/50 sm:size-10"
      >
        <ChevronLeft className="size-5" />
      </button>

      <button
        type="button"
        onClick={goToNext}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white transition-colors duration-200 hover:bg-black/50 sm:size-10"
      >
        <ChevronRight className="size-5" />
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={cn(
              "size-2 rounded-full transition-colors duration-200",
              index === activeIndex ? "bg-sp-accent" : "bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect, useMemo } from 'react'

export default function Hero() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)

  const heroTexts = useMemo(
    () => [
      'Digital Transformation',
      'Cybersecurity',
      'Cloud Modernization',
      'Data & AI',
      'Managed Services',
    ],
    []
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % heroTexts.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [heroTexts.length])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.05]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.06'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-[2rem] sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Accelerate Your Digital
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
              Transformation Journey
            </span>
          </h1>

          {/* Odometer-style Subheading */}
          <div className="mt-4 h-12 sm:h-14 lg:h-16 flex items-center justify-center">
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-gray-700 font-semibold flex items-center gap-2">
              <span>Delivering</span>
              <span className="relative overflow-hidden inline-flex h-[1.15em] align-baseline">
                <span
                  className="odometer-column will-change-transform"
                  style={{ transform: `translateY(-${currentTextIndex * 100}%)` }}
                >
                  {heroTexts.map((t) => (
                    <span key={t} className="block text-primary-600">
                      {t}
                    </span>
                  ))}
                </span>
              </span>
            </h2>
          </div>

          {/* Description */}
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Strategic IT consulting from roadmap to run. We align technology with business outcomes,
            modernize platforms, strengthen security, and enable teams with measurable impact.
          </p>

          {/* Primary CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/contact"
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Talk to an Expert
            </a>
            <a
              href="/services"
              className="border-2 border-primary-600 text-primary-700 hover:bg-primary-600 hover:text-white px-8 py-4 rounded-lg text-base sm:text-lg font-semibold transition-all duration-300"
            >
              View Services
            </a>
          </div>

          {/* Consulting pillars */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">Strategy</div>
              <div className="text-gray-600">Advisory & Roadmaps</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">Delivery</div>
              <div className="text-gray-600">Implementation & Integration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-primary-600 mb-2">Enablement</div>
              <div className="text-gray-600">Support & Optimization</div>
            </div>
          </div>
        </div>
      </div>

      {/* Component-scoped styles for odometer effect */}
      <style jsx>{`
        .odometer-column {
          display: inline-block;
          line-height: 1.15;
          transition: transform 700ms cubic-bezier(0.22, 0.61, 0.36, 1);
        }
        .odometer-column > span {
          line-height: 1.15;
        }
      `}</style>
    </section>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-white text-xl font-bold flex items-center gap-2 md:ml-0 ml-1">
            <Image
              src="/logo.png"
              alt="Deepsri Logo"
              width={150}
              height={150}
              className="object-contain opacity-90"
            />
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative">
              <button
                onClick={() => {
                  setIsServicesOpen(!isServicesOpen)
                  setIsProductsOpen(false)
                }}
                className="text-white hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                What We Do
                <ChevronDown className="w-4 h-4" />
              </button>

              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-black/90 backdrop-blur-sm rounded-lg py-2 z-50">
                  {/* Products */}
                  <div className="relative">
                    <button
                      onClick={() => setIsProductsOpen(!isProductsOpen)}
                      className="flex items-center justify-between w-full px-4 py-2 text-white hover:bg-blue-500/20"
                    >
                      Products <ChevronRight className="w-4 h-4 ml-2" />
                    </button>
                    {isProductsOpen && (
                      <div className="absolute top-0 left-full ml-2 w-48 bg-black/90 backdrop-blur-sm rounded-lg py-2 z-50">
                        <button
                          onClick={() => {
                            scrollToSection('DataSphere')
                            setIsServicesOpen(false)
                            setIsProductsOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-white hover:bg-blue-500/20"
                        >
                          DataSphere
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Services */}
                  <button
                    onClick={() => {
                      scrollToSection('services')
                      setIsServicesOpen(false)
                      setIsProductsOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-white hover:bg-blue-500/20"
                  >
                    Services
                  </button>
                </div>
              )}
            </div>

            <button onClick={() => scrollToSection('why-choose')} className="text-white hover:text-blue-400">
              Why Choose Us
            </button>
            <button onClick={() => scrollToSection('about')} className="text-white hover:text-blue-400">
              About
            </button>
            <button onClick={() => scrollToSection('core-values')} className="text-white hover:text-blue-400">
              Core Values
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-white hover:text-blue-400">
              Contact
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-sm px-6 py-4 text-white space-y-4">
          {/* What We Do */}
          <div>
            <button
              onClick={() => {
                setIsServicesOpen(!isServicesOpen)
                setIsProductsOpen(false)
              }}
              className="w-full text-left flex items-center justify-between"
            >
              What We Do <ChevronDown className="w-4 h-4" />
            </button>

            {isServicesOpen && (
              <div className="pl-4 space-y-2 mt-2">
                {/* Products (Expandable) */}
                <div>
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="w-full text-left flex items-center justify-between"
                  >
                    Products <ChevronRight className="w-4 h-4" />
                  </button>
                  {isProductsOpen && (
                    <div className="pl-4 mt-1">
                      <button
                        onClick={() => {
                          scrollToSection('DataSphere')
                          setIsMobileMenuOpen(false)
                          setIsProductsOpen(false)
                          setIsServicesOpen(false)
                        }}
                        className="block w-full text-left"
                      >
                        DataSphere
                      </button>
                    </div>
                  )}
                </div>

                {/* Services */}
                <button
                  onClick={() => {
                    scrollToSection('services')
                    setIsMobileMenuOpen(false)
                    setIsProductsOpen(false)
                    setIsServicesOpen(false)
                  }}
                  className="block w-full text-left"
                >
                  Services
                </button>
              </div>
            )}
          </div>

          {/* Other nav links */}
          <button onClick={() => { scrollToSection('why-choose'); setIsMobileMenuOpen(false) }} className="w-full text-left">
            Why Choose Us
          </button>
          <button onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false) }} className="w-full text-left">
            About
          </button>
          <button onClick={() => { scrollToSection('core-values'); setIsMobileMenuOpen(false) }} className="w-full text-left">
            Core Values
          </button>
          <button onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false) }} className="w-full text-left">
            Contact
          </button>
        </div>
      )}
    </nav>
  )
}

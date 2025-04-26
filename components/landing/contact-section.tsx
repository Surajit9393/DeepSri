'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function ContactSection() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrorMessage(null)

    const form = e.currentTarget

    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement)?.value

    const formBody = new URLSearchParams()
    formBody.append('name', name)
    formBody.append('email', email)
    formBody.append('message', message)
    formBody.append('_captcha', 'false') // optional
    formBody.append('_template', 'table') // optional: cleaner email layout
    formBody.append('_autoresponse', 'Thank you for contacting DeepSri Solutions. We’ll get back to you shortly.')

    try {
      const response = await fetch('https://formsubmit.co/support@deepsri.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: formBody.toString(),
      })

      if (response.ok) {
        setShowSuccess(true)
        form.reset()
      } else {
        const errorText = await response.text()
        console.error("Server error:", errorText)
        setErrorMessage("Sorry, there was an issue sending your message. Please try again later.")
        setShowSuccess(false)
      }

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }, 1000)

      setTimeout(() => {
        setShowSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Network error:", error)
      setErrorMessage("There was a network issue. Please check your connection and try again.")
      setShowSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="relative py-24 overflow-hidden">
      <img
        src="/images/contact-bg.png"
        alt="Contact background"
        className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.2] animate-fade-in z-[-1]"
        loading="eager"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-center">
          <div className="flex-1 w-full md:max-w-xl">
            <h2 className="text-5xl font-bold mb-4 text-white">
              Get In Touch with Us Anytime!
            </h2>
            <p className="text-xl text-blue-200 mb-8">
              Better yet, see us in person!
            </p>
            <p className="text-gray-300">
              We love our customers, so feel free to visit during normal business hours.
            </p>
          </div>

          <div className="flex-1 w-full md:max-w-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500 rounded-md"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500 rounded-md"
              />
              <Textarea
                name="message"
                placeholder="Message"
                required
                className="bg-white border-gray-200 text-gray-900 placeholder:text-gray-500 focus-visible:ring-blue-500 rounded-md"
              />
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            {showSuccess && (
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg shadow" aria-live="polite">
                Your message was sent successfully!
              </div>
            )}

            {errorMessage && (
              <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg shadow" aria-live="polite">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

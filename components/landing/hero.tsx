'use client'

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    {
      subtitle: "Empowering Your Digital Future",
      title: "OPTIMIZE YOUR\nIT OPERATIONS\nFOR EFFICIENCY",
      description:
        "Efficient and cost-effective Product Development and IT services for businesses of all sizes.",
      image: "/images/hero-illustration.png",
      textSize: {
        subtitle: "text-lg md:text-xl lg:text-2xl",
        title: "text-4xl md:text-5xl lg:text-6xl",
        description: "text-sm md:text-base lg:text-lg",
      },
    },
    {
      subtitle: "Innovative Solutions, Lasting Impact",
      title: "TRANSFORMING\nIDEAS INTO\nREALITY",
      description:
        "With expertise in Big Data & AI along with digital transformation, we help businesses navigate the evolving landscape.",
      image: "/images/hero-illustration2.png",
      textSize: {
        subtitle: "text-lg md:text-xl lg:text-2xl",
        title: "text-4xl md:text-5xl lg:text-6xl",
        description: "text-sm md:text-base lg:text-lg",
      },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative bg-[#1a1a2e] text-white min-h-screen overflow-hidden">
      <div className="relative">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full min-h-screen relative">
              <div className="absolute inset-0 z-0">
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover object-center absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              </div>

              <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 min-h-screen flex items-center">
                <div className="w-full lg:w-3/5 space-y-4 sm:space-y-6 backdrop-blur-sm bg-black/20 p-6 sm:p-8 lg:p-10 rounded-2xl">
                  <div
                    className={`${slide.textSize?.subtitle || "text-lg sm:text-xl md:text-2xl"} text-white font-medium`}
                    style={{ textAlign: "left", marginLeft: 0, marginRight: "auto", maxWidth: "none" }}
                  >
                    {slide.subtitle}
                  </div>

                  <h1
                    className={`${slide.textSize?.title || "text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"} font-bold leading-tight tracking-tight whitespace-pre-line`}
                    style={{ textAlign: "left", marginLeft: 0, marginRight: "auto", maxWidth: "none" }}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className={`${slide.textSize?.description || "text-sm md:text-base lg:text-lg"} text-gray-300 pt-4 pb-4`}
                    style={{ textAlign: "left", margin: 0, marginLeft: 0, marginRight: "auto", maxWidth: "none" }}
                  >
                    {slide.description}
                  </p>

                  <div
                    style={{
                      textAlign: "left",
                      margin: 0,
                      marginLeft: 0,
                      marginRight: "auto",
                      paddingTop: "10px"
                    }}
                  >
                    <Button
                      variant="default"
                      onClick={() => {
                        const contactSection = document.getElementById("contact");
                        contactSection?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="
                        rounded-full
                        bg-gradient-to-r from-indigo-600 to-purple-600
                        text-white
                        hover:brightness-110
                        text-base sm:text-lg
                        px-[22px]  // Increase horizontal padding
                        py-[22px]  // Increase vertical padding
                        transition-all duration-300
                        transform hover:scale-105
                        relative overflow-hidden
                        shadow-lg hover:shadow-purple-500/50
                        font-medium
                        before:absolute before:inset-0 before:w-full before:h-full
                        before:bg-white/20 before:translate-x-full before:skew-x-12
                        hover:before:animate-shine
                      "
                    >
                      <span className="relative z-10 group-hover:text-white">Contact Us</span>
                      <style jsx>{`
                        @keyframes shine {
                          0% {
                            transform: translateX(-100%) skewX(-12deg);
                          }
                          100% {
                            transform: translateX(200%) skewX(-12deg);
                          }
                        }
                        .hover\:before\:animate-shine:hover::before {
                          animation: shine 1.5s ease-in-out;
                        }
                      `}</style>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <Button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeSlide === index ? "bg-white w-8" : "bg-white/50"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

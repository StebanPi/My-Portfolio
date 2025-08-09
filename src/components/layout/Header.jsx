import React, { useRef, useEffect, useState, useContext } from "react";
import Aurora from "../utils/BackgroundAurora";
import SplitText from "../utils/AnimatedText";
import { Button } from "@/components/ui/button";
import { IconArrowDown } from "@tabler/icons-react";
import { Navbar } from ".";
import ThemeProviderContext from "@/context/ThemeContext";

export const Header = () => {
  const theme = useContext(ThemeProviderContext);

  const [isMainVisible, setIsMainVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  const mainRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.0,
      rootMargin: "0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === mainRef.current) {
            setIsMainVisible(true);
          } else if (entry.target === bottomRef.current) {
            setIsBottomVisible(true);
          }
        } else {
          const rect = entry.boundingClientRect;
          const completelyAbove = rect.bottom <= 0;
          const completelyBelow = rect.top >= window.innerHeight;

          if (completelyAbove || completelyBelow) {
            if (entry.target === mainRef.current) {
              setIsMainVisible(false);
            } else if (entry.target === bottomRef.current) {
              setIsBottomVisible(false);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (mainRef.current) observer.observe(mainRef.current);
    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => {
      if (mainRef.current) observer.unobserve(mainRef.current);
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-bounce-delayed {
          animation: bounceDelayed 2s ease-in-out infinite;
          animation-delay: 0.8s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounceDelayed {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>

      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center backdrop-blur-md">
        <Navbar></Navbar>
      </div>

      <header id="inicio" className="h-dvh w-dvw flex flex-col pt-16 relative">
        {theme.theme === "dark" && (
          <div className="w-full h-full -z-10 absolute top-0 left-0">
            <Aurora
              colorStops={["#7CFF67", "#B19EFF", "#5227FF"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
            />
          </div>
        )}

        <section
          ref={mainRef}
          className={`flex flex-col text-center justify-center items-center flex-1 ${
            isMainVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center">
            <SplitText
              text="Hola, soy "
              text2="Steban Pineda"
              className="text-6xl font-semibold text-center"
              delay={100}
              duration={0.6}
              ease="power3.out"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />

            <p className="mt-8 text-xl">
              Creo experiencias web excepcionales con tecnologías modernas.
              Especializado en <br />
              desarrollo web Full-Stack, construyendo interfaces atractivas y
              funcionales.
            </p>

            <Button
              variant="outline"
              className="hover:cursor-pointer mt-8 bg-background/30 backdrop-blur-md transition-all duration-200 hover:scale-105 hover:bg-background/50"
            >
              <a href="#proyectos">Ver Mis Proyectos</a>
            </Button>
          </div>
        </section>

        <div
          ref={bottomRef}
          className={`flex flex-col gap-2 items-center pb-17 z-10 ${
            isBottomVisible
              ? "animate-fadeInUp animate-bounce-delayed"
              : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm opacity-80">Ver Más</p>
          <IconArrowDown className="w-5 h-5" />
        </div>
      </header>
    </>
  );
};

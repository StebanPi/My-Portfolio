import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";

export const Contact = () => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.0,
      rootMargin: "0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === leftRef.current) {
            setIsLeftVisible(true);
          } else if (entry.target === rightRef.current) {
            setIsRightVisible(true);
          }
        } else {
          const rect = entry.boundingClientRect;
          const completelyAbove = rect.bottom <= 0;
          const completelyBelow = rect.top >= window.innerHeight;

          if (completelyAbove || completelyBelow) {
            if (entry.target === leftRef.current) {
              setIsLeftVisible(false);
            } else if (entry.target === rightRef.current) {
              setIsRightVisible(false);
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => {
      if (leftRef.current) observer.unobserve(leftRef.current);
      if (rightRef.current) observer.unobserve(rightRef.current);
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .animate-fadeInLeft {
          animation: fadeInLeft 0.8s ease-out forwards;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      <Card id="contacto" className="w-full mx-auto max-w-5xl grid grid-cols-2">
        <div
          ref={leftRef}
          className={`flex flex-col justify-center ${
            isLeftVisible ? "animate-fadeInLeft" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="px-8 flex flex-col gap-8">
            <h3 className="text-4xl font-bold">
              Hablemos<span className="text-primary">!</span>
            </h3>
            <p>
              Actualmente estoy disponible para nuevos proyectos, así que no
              dudes en enviarme un mensaje sobre cualquier proyecto en el que
              quieras que trabaje. Puedes contactarme cuando quieras.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3 hover:translate-x-1 transition-transform duration-200">
                <IconMail className="text-primary"></IconMail>
                <span>pinedasteban13@gmail.com</span>
              </div>
              <div className="flex gap-3 hover:translate-x-1 transition-transform duration-200">
                <IconPhone className="text-primary"></IconPhone>
                <span>+57 320 7172972</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={rightRef}
          className={`flex flex-col gap-6 ${
            isRightVisible ? "animate-fadeInRight" : "opacity-0 translate-x-8"
          }`}
        >
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Escribe tu nombre"
                    required
                    className="transition-all duration-200 focus:scale-105"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Escribe tu correo"
                    required
                    className="transition-all duration-200 focus:scale-105"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="mensaje">Mensaje</Label>
                  <Textarea
                    placeholder="Escribe tu mensaje!"
                    className="h-[150px] resize-none transition-all duration-200 focus:scale-105"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full hover:cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Enviar
            </Button>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

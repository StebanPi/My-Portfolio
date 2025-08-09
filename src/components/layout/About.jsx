import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Code, User, Briefcase } from "lucide-react";

export const About = () => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.0, // Se activa cuando cualquier pixel es visible
      rootMargin: "0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // ✅ Se activa cuando es visible (cualquier pixel)
          if (entry.target === leftRef.current) {
            setIsLeftVisible(true);
          } else if (entry.target === rightRef.current) {
            setIsRightVisible(true);
          }
        } else {
          // ✅ Solo resetea cuando está COMPLETAMENTE fuera (0% visible)
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
      <section
        id="acerca-de"
        className="pt-26 py-24 max-w-5xl mx-auto flex flex-col gap-25 px-4 sm:px-6 lg:px-8"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Acerca de <span className="text-primary">Mi</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 text-center gap-8 lg:gap-8">
          <div
            ref={leftRef}
            className={`flex flex-col gap-6 sm:gap-8 items-center order-1 ${
              isLeftVisible ? "animate-fadeInLeft" : "opacity-0 -translate-x-8"
            }`}
          >
            <h3 className="font-semibold text-xl sm:text-2xl text-center lg:text-left">
              Desarrollador web apasionado y creador de tecnología
            </h3>
            <p className="text-sm sm:text-base text-center lg:text-left">
              Con más de 2 años de experiencia en desarrollo web, me especializo
              en crear aplicaciones web responsivas, accesibles y de alto
              rendimiento utilizando tecnologías modernas.
            </p>
            <p className="text-sm sm:text-base text-center lg:text-left">
              Me apasiona crear soluciones elegantes a problemas complejos y
              constantemente aprendo nuevas tecnologías y técnicas para
              mantenerme a la vanguardia del panorama web en constante
              evolución.
            </p>
            <Button variant="outline" className="hover:cursor-pointer w-fit">
              Contactame
            </Button>
          </div>

          <div
            ref={rightRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-rows-3 lg:grid-cols-1 gap-4 sm:gap-5 order-2 ${
              isRightVisible ? "animate-fadeInRight" : "opacity-0 translate-x-8"
            }`}
          >
            <Card className="flex flex-col sm:flex-row gap-3 justify-center items-center sm:items-start px-4 py-4">
              <div className="bg-black/20 w-fit h-fit p-2.5 rounded-full">
                <Code className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-center sm:text-start">
                <h4 className="font-semibold text-sm sm:text-base">
                  Desarrollo Web
                </h4>
                <p className="text-xs sm:text-sm">
                  Creación de sitios web y aplicaciones web responsivas con
                  estilos modernos.
                </p>
              </div>
            </Card>

            <Card className="flex flex-col sm:flex-row gap-3 justify-center items-center sm:items-start px-4 py-4">
              <div className="bg-black/20 w-fit h-fit p-2.5 rounded-full">
                <User className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-center sm:text-start">
                <h4 className="font-semibold text-sm sm:text-base">
                  Diseño UI/UX
                </h4>
                <p className="text-xs sm:text-sm">
                  Diseño de interfaces de usuario intuitivas y experiencias de
                  usuario fluidas.
                </p>
              </div>
            </Card>

            <Card className="flex flex-col sm:flex-row gap-3 justify-center items-center sm:items-start px-4 py-4">
              <div className="bg-black/20 w-fit h-fit p-2.5 rounded-full">
                <Briefcase className="text-primary w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="text-center sm:text-start">
                <h4 className="font-semibold text-sm sm:text-base">
                  Gestión de proyectos
                </h4>
                <p className="text-xs sm:text-sm">
                  Liderando proyectos desde su concepción hasta su finalización
                  con metodologías ágiles.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

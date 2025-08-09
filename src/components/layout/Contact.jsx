import React, { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconMail, IconPhone } from "@tabler/icons-react";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  let fechaActual = new Date();
  fechaActual = fechaActual.toLocaleDateString("es-ES");

  const leftRef = useRef(null);
  const rightRef = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Configuración de EmailJS - reemplaza con tus propios IDs
      const serviceId = "service_j8leu8t";
      const templateId = "template_ckpduoi";
      const publicKey = "nLDwNAphb81zEL9GI";

      // Parámetros del template que se enviarán al email
      const templateParams = {
        name: data.nombre,
        time: fechaActual,
        email: data.correo,
        message: data.mensaje,
      };

      // Enviar email con EmailJS
      const result = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("Email enviado:", result);
      setSubmitStatus({
        type: "success",
        message: "¡Mensaje enviado exitosamente! Te contactaré pronto.",
      });
      reset(); // Limpiar el formulario
    } catch (error) {
      console.error("Error al enviar email:", error);
      setSubmitStatus({
        type: "error",
        message: "Error al enviar el mensaje. Por favor, intenta de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000); // Ocultar mensaje después de 5 segundos

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  return (
    <>
      <Card
        id="contacto"
        className="w-[90%] lg:w-full mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2"
      >
        <div
          ref={leftRef}
          className={`flex flex-col justify-center ${
            isLeftVisible ? "animate-fadeInLeft" : "opacity-0 -translate-x-8"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-0 flex flex-col gap-4 sm:gap-6 lg:gap-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Hablemos<span className="text-primary">!</span>
            </h3>
            <p className="text-sm sm:text-base">
              Actualmente estoy disponible para nuevos proyectos, así que no
              dudes en enviarme un mensaje sobre cualquier proyecto en el que
              quieras que trabaje. Puedes contactarme cuando quieras.
            </p>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex gap-3 hover:translate-x-1 transition-transform duration-200">
                <IconMail className="text-primary flex-shrink-0"></IconMail>
                <span className="text-sm sm:text-base break-all">
                  pinedasteban13@gmail.com
                </span>
              </div>
              <div className="flex gap-3 hover:translate-x-1 transition-transform duration-200">
                <IconPhone className="text-primary flex-shrink-0"></IconPhone>
                <span className="text-sm sm:text-base">+57 320 7172972</span>
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
          <CardContent className="p-4 sm:p-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4 sm:gap-6">
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="nombre" className="text-sm sm:text-base">
                      Nombre
                    </Label>
                    <span className="text-xs text-red-400">
                      {errors.nombre && errors.nombre.message}
                    </span>
                  </div>

                  <Input
                    id="nombre"
                    type="text"
                    placeholder="Escribe tu nombre"
                    className="transition-all duration-200 focus:scale-105 text-sm sm:text-base"
                    disabled={isSubmitting}
                    {...register("nombre", {
                      required: {
                        value: true,
                        message: "Este campo es requerido",
                      },
                      minLength: {
                        value: 2,
                        message: "Debe tener al menos 2 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message: "Debe tener como maximo 20 caracteres",
                      },
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="email" className="text-sm sm:text-base">
                      Email
                    </Label>
                    <span className="text-xs text-red-400">
                      {errors.correo && errors.correo.message}
                    </span>
                  </div>

                  <Input
                    id="email"
                    type="email"
                    placeholder="Escribe tu correo"
                    className="transition-all duration-200 focus:scale-105 text-sm sm:text-base"
                    disabled={isSubmitting}
                    {...register("correo", {
                      required: {
                        value: true,
                        message: "Este campo es requerido",
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Correo no valido",
                      },
                    })}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <Label htmlFor="mensaje" className="text-sm sm:text-base">
                      Mensaje
                    </Label>
                    <span className="text-xs text-red-400">
                      {errors.mensaje?.type === "required" &&
                        "Este campo es requerido"}
                      {errors.mensaje?.type === "minLength" &&
                        "Debe tener al menos 5 caracteres"}
                    </span>
                  </div>

                  <Textarea
                    placeholder="Escribe tu mensaje!"
                    className="h-[120px] sm:h-[150px] resize-none transition-all duration-200 focus:scale-105 text-sm sm:text-base"
                    disabled={isSubmitting}
                    {...register("mensaje", {
                      required: {
                        value: true,
                        message: "Este campo es requerido",
                      },
                      minLength: {
                        value: 5,
                        message: "Debe tener al menos 5 caracteres",
                      },
                    })}
                  />
                </div>
              </div>

              {/* Mensaje de estado */}
              {submitStatus && (
                <div
                  className={`mt-4 p-3 rounded-md text-xs sm:text-sm font-medium transition-all duration-300 ${
                    submitStatus.type === "success"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-red-100 text-red-800 border border-red-200"
                  }`}
                >
                  {submitStatus.message}
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full transition-all mt-4 sm:mt-5 duration-200 text-sm sm:text-base ${
                  isSubmitting
                    ? "cursor-not-allowed opacity-70"
                    : "hover:cursor-pointer hover:scale-105 active:scale-95"
                }`}
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </Button>
            </form>
          </CardContent>
        </div>
      </Card>
    </>
  );
};

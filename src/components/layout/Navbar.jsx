import { Card } from "@/components/ui/card";
import { ThemeToggle } from "../utils/ThemeToggle";

export const Navbar = () => {
  return (
    <Card className="flex flex-row fixed font-bold justify-between items-center bg-background/70 gap-40 mt-5 backdrop-blur-md py-3.5 px-8 w-fit">
      <h1 className="text-[19px]">
        StebanPi <span className="text-primary">Portfolio</span>
      </h1>
      <div className="hidden md:flex space-x-8">
        <a
          href="#inicio"
          className="hover:text-primary hover:cursor-pointer transition-colors"
        >
          Inicio
        </a>
        <a
          href="#acerca-de"
          className="hover:text-primary hover:cursor-pointer transition-colors"
        >
          Acerca de
        </a>
        <a
          href="#habilidades"
          className="hover:text-primary hover:cursor-pointer transition-colors"
        >
          Habilidades
        </a>
        <a
          href="#proyectos"
          className="hover:text-primary hover:cursor-pointer transition-colors"
        >
          Proyectos
        </a>
        <a
          href="#contacto"
          className="hover:text-primary hover:cursor-pointer transition-colors"
        >
          Contacto
        </a>
      </div>
      <ThemeToggle></ThemeToggle>
    </Card>
  );
};

import React, { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Palette,
  Server,
  Smartphone,
} from "lucide-react";

const Portfolio = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Plataforma completa de comercio electrónico con React, Redux y Stripe",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
      tech: ["React", "Redux", "Node.js", "MongoDB"],
      github: "#",
      demo: "#",
    },
    {
      title: "Task Manager App",
      description:
        "Aplicación de gestión de tareas con drag & drop y colaboración en tiempo real",
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=250&fit=crop",
      tech: ["React", "TypeScript", "Socket.io", "PostgreSQL"],
      github: "#",
      demo: "#",
    },
    {
      title: "Weather Dashboard",
      description:
        "Dashboard meteorológico con geolocalización y gráficos interactivos",
      image:
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=400&h=250&fit=crop",
      tech: ["React", "Chart.js", "OpenWeather API", "Tailwind"],
      github: "#",
      demo: "#",
    },
  ];

  const skills = [
    {
      name: "Frontend",
      icon: <Code className="w-8 h-8" />,
      techs: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      name: "Backend",
      icon: <Server className="w-8 h-8" />,
      techs: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
    },
    {
      name: "Design",
      icon: <Palette className="w-8 h-8" />,
      techs: ["Figma", "Adobe XD", "UI/UX", "Responsive Design"],
    },
    {
      name: "Mobile",
      icon: <Smartphone className="w-8 h-8" />,
      techs: ["React Native", "Flutter", "PWA"],
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="bg-background text-foreground">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Portfolio
              </div>
              <div className="hidden md:flex space-x-8">
                <a
                  href="#inicio"
                  className="hover:text-primary transition-colors"
                >
                  Inicio
                </a>
                <a
                  href="#proyectos"
                  className="hover:text-primary transition-colors"
                >
                  Proyectos
                </a>
                <a
                  href="#habilidades"
                  className="hover:text-primary transition-colors"
                >
                  Habilidades
                </a>
                <a
                  href="#contacto"
                  className="hover:text-primary transition-colors"
                >
                  Contacto
                </a>
              </div>
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          id="inicio"
          className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
            <div className="mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-8 flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                JD
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Juan Developer
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Desarrollador Full Stack React especializado en crear experiencias
              web modernas y funcionales
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors">
                Ver Proyectos
              </button>
              <button className="border border-border hover:bg-accent text-foreground px-8 py-3 rounded-lg font-medium transition-colors">
                Descargar CV
              </button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="proyectos" className="py-20 bg-muted/30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Mis <span className="text-primary">Proyectos</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Código
                      </a>
                      <a
                        href={project.demo}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Demo
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="habilidades" className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              Mis <span className="text-primary">Habilidades</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-card rounded-xl border p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-4 text-primary">
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{skill.name}</h3>
                  <div className="space-y-2">
                    {skill.techs.map((tech, techIndex) => (
                      <div
                        key={techIndex}
                        className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contacto" className="py-20 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">
              ¿Trabajamos <span className="text-primary">Juntos</span>?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Estoy disponible para proyectos freelance y oportunidades de
              trabajo. ¡Contáctame!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="mailto:juan@example.com"
                className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <Mail className="w-5 h-5" />
                Enviar Email
              </a>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="p-3 border border-border hover:bg-accent rounded-lg transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="p-3 border border-border hover:bg-accent rounded-lg transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t bg-background">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
            <p>&copy; 2025 Juan Developer. Todos los derechos reservados.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;

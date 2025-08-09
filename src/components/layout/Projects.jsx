import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useRef, useEffect, useState } from "react";

const projects = [
  {
    title: "Movies App",
    img: "./thumbs/movies.png",
    github: "https://github.com/StebanPi/Movies-App",
    preview: "https://stebanpi.github.io/Movies-App/",
  },
  {
    title: "Modern Page Template",
    img: "./thumbs/modern.png",
    github: "https://github.com/StebanPi/Modern-Page-React",
    preview: "https://stebanpi.github.io/Modern-Page-React/",
  },
  {
    title: "To-Do App",
    img: "./thumbs/to-do.png",
    github: "https://github.com/StebanPi/To-Do-App",
    preview: "https://stebanpi.github.io/To-Do-App/",
  },
];

export const Projects = () => {
  const [isTitleVisible, setIsTitleVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  const titleRef = useRef(null);
  const cardsRefs = useRef([]);

  // Observer para el título
  useEffect(() => {
    const observerOptions = {
      threshold: 0.0,
      rootMargin: "50px 0px 0px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsTitleVisible(true);
        } else {
          const rect = entry.boundingClientRect;
          const completelyAbove = rect.bottom <= 0;
          const completelyBelow = rect.top >= window.innerHeight;

          if (completelyAbove || completelyBelow) {
            setIsTitleVisible(false);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  // Observer para las cards individuales
  useEffect(() => {
    const observerOptions = {
      threshold: 0.0,
      rootMargin: "50px 0px 0px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = cardsRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setVisibleCards((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index];
              }
              return prev;
            });
          }
        } else {
          const rect = entry.boundingClientRect;
          const completelyAbove = rect.bottom <= 0;
          const completelyBelow = rect.top >= window.innerHeight;

          if (completelyAbove || completelyBelow) {
            const index = cardsRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setVisibleCards((prev) => prev.filter((i) => i !== index));
            }
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    cardsRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      cardsRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <>
      <style jsx>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animate-fadeInScale {
          animation: fadeInScale 0.6s ease-out forwards;
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

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>

      <section id="proyectos" className="max-w-5xl mx-auto mb-28 pt-28">
        <h2
          ref={titleRef}
          className={`text-3xl font-bold text-center ${
            isTitleVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
        >
          Mis <span className="text-primary">Proyectos</span>
        </h2>

        <div className="grid grid-cols-3 gap-6 mt-16">
          {projects.map((project, index) => {
            return (
              <Card
                key={project.title}
                ref={(el) => (cardsRefs.current[index] = el)}
                className={`flex flex-col items-center p-5 text-center ${
                  visibleCards.includes(index)
                    ? "animate-fadeInScale"
                    : "opacity-0 translate-y-6 scale-95"
                }`}
                style={{
                  animationDelay: visibleCards.includes(index)
                    ? `${index * 150}ms`
                    : "0ms",
                }}
              >
                <Card className="p-2">
                  <img
                    src={project.img}
                    className="rounded-lg aspect-video object-cover"
                    alt={`${project.title} preview`}
                  />
                </Card>
                <h4 className="hover:text-primary hover:cursor-default w-fit">
                  {project.title}
                </h4>
                <div className="flex justify-center gap-5">
                  <Button variant="outline" asChild>
                    <a href={project.github} target="_blank">
                      Github
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href={project.preview} target="_blank">
                      Vista Previa
                    </a>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};

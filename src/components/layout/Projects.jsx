import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
      <section
        id="proyectos"
        className="max-w-5xl mx-auto mb-28 pt-28 px-4 sm:px-6 lg:px-8"
      >
        <h2
          ref={titleRef}
          className={`text-2xl sm:text-3xl font-bold text-center ${
            isTitleVisible ? "animate-fadeInUp" : "opacity-0 translate-y-8"
          }`}
        >
          Mis <span className="text-primary">Proyectos</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {projects.map((project, index) => {
            return (
              <Card
                key={project.title}
                ref={(el) => (cardsRefs.current[index] = el)}
                className={`flex flex-col items-center p-4 sm:p-5 text-center ${
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
                <Card className="p-2 w-full mb-4">
                  <img
                    src={project.img}
                    className="rounded-lg aspect-video object-cover w-full"
                    alt={`${project.title} preview`}
                  />
                </Card>
                <h4 className="hover:text-primary hover:cursor-default w-fit mb-4 text-base sm:text-lg font-semibold">
                  {project.title}
                </h4>
                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 w-full">
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 sm:flex-none"
                  >
                    <a href={project.github} target="_blank">
                      Github
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="flex-1 sm:flex-none"
                  >
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

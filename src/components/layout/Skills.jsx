import { Card } from "@/components/ui/card";
import { useRef, useEffect, useState } from "react";

const skills = [
  {
    title: "HTML",
    img: "./icons/html.png",
  },
  {
    title: "CSS",
    img: "./icons/css.png",
  },
  {
    title: "Javascript",
    img: "./icons/js.png",
  },
  {
    title: "React",
    img: "./icons/react.png",
  },
  {
    title: "Tailwind",
    img: "./icons/tailwind.png",
  },
];

export const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  const sectionRef = useRef(null);
  const cardsRefs = useRef([]);

  // Observer para el título
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: "0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          // ✅ REMOVIDO: setVisibleCards([]) - Dejamos que las cards se manejen independientemente
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Observer para las cards individuales
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px",
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
          const index = cardsRefs.current.indexOf(entry.target);
          if (index !== -1) {
            setVisibleCards((prev) => prev.filter((i) => i !== index));
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
    <section
      id="habilidades"
      className="max-w-5xl mx-auto mb-28 pt-28 px-4 sm:px-6 lg:px-8"
    >
      <h2
        ref={sectionRef}
        className={`text-2xl sm:text-3xl font-bold text-center transition-all duration-800 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        Mis <span className="text-primary">Habilidades</span>
      </h2>

      <div className="mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 text-center">
        {skills.map((skill, index) => {
          return (
            <Card
              key={skill.title}
              ref={(el) => (cardsRefs.current[index] = el)}
              className={`p-6 sm:p-8 lg:p-13 transition-all duration-600 ease-out flex flex-col items-center justify-center ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-8 scale-95"
              }`}
              style={{
                transitionDelay: visibleCards.includes(index)
                  ? `${index * 100}ms`
                  : "0ms",
              }}
            >
              <img
                src={skill.img}
                alt={`${skill.title} icon`}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-auto lg:h-auto mb-2 sm:mb-3 lg:mb-4 object-contain"
              />
              <p className="text-sm sm:text-base font-medium">{skill.title}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

import { Card } from "../ui/card";
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
    <section id="habilidades" className="w-5xl mx-auto mb-28 pt-28">
      <h2
        ref={sectionRef}
        className={`text-3xl font-bold text-center transition-all duration-800 ease-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
        }`}
      >
        Mis <span className="text-primary">Habilidades</span>
      </h2>

      <div className="mt-16 grid grid-cols-5 gap-5 text-center">
        {skills.map((skill, index) => {
          return (
            <Card
              key={skill.title}
              ref={(el) => (cardsRefs.current[index] = el)}
              className={`p-13 transition-all duration-600 ease-out ${
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
              <img src={skill.img} alt={`${skill.title} icon`} />
              <p>{skill.title}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

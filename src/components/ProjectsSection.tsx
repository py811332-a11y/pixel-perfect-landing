import { useEffect, useRef, useState } from "react";
import projectSony from "@/assets/project-sony.jpg";
import projectGoogle from "@/assets/project-google.jpg";
import projectHp from "@/assets/project-hp.jpg";
import projectFujifilm from "@/assets/project-fujifilm.jpg";
import projectBrooks from "@/assets/project-brooks.jpg";

const projects = [
  { title: "Sony", subtitle: "A More Conscious Future", image: projectSony },
  { title: "Google", subtitle: "Bringing Joy", image: projectGoogle },
  { title: "HP", subtitle: "A Sense Of Community", image: projectHp },
  { title: "Fujifilm Instax", subtitle: "Capturing Moments", image: projectFujifilm },
  { title: "Brooks Running", subtitle: "Omnichannel Experiences", image: projectBrooks },
];

const ProjectsSection = () => {
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15 }
    );

    cardsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" className="px-6 md:px-16 py-24 md:py-36">
      <div className="flex items-start justify-between mb-12">
        <div>
          <h2 className="text-sm font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-4">
            Shaping the future of retail
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg">
            Discover how ISI Global leverages insights and trends to redefine brands in retail
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => { cardsRef.current[index] = el; }}
            data-index={index}
            className="group cursor-pointer transition-all duration-700"
            style={{
              opacity: visibleCards.has(index) ? 1 : 0,
              transform: visibleCards.has(index) ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative overflow-hidden aspect-[4/3] mb-4">
              <img
                src={project.image}
                alt={`${project.title} - ${project.subtitle}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-normal">
              {project.title} - {project.subtitle}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

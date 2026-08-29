import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Programming Languages',
    desc: 'Strong foundation in programming and problem solving using Python, Java, C, and C++, with a focus on writing clean and efficient solutions.',
    tag: 'PROGRAMMING',
    skills: ['Python', 'Java', 'C', 'C++', 'JavaScript']
  },
  {
    title: 'Web Development',
    desc: 'Building responsive and interactive web applications using modern frontend technologies and backend frameworks.',
    tag: 'WEB DEVELOPMENT',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js', 'Express.js']
  },
  {
    title: 'Database Management',
    desc: 'Working with relational and NoSQL databases to design, manage, query, and integrate data into applications.',
    tag: 'DATABASES',
    skills: ['MySQL', 'MongoDB', 'SQL', 'MongoDB Compass', 'Database Design']
  },
  {
    title: 'AI & Machine Learning',
    desc: 'Exploring artificial intelligence and machine learning through Python-based data analysis, predictive models, computer vision, and intelligent applications.',
    tag: 'AI / MACHINE LEARNING',
    skills: ['Python', 'Machine Learning', 'Data Analysis', 'Computer Vision', 'NLP']
  },
  {
    title: 'Development Tools',
    desc: 'Using modern development tools and platforms for coding, version control, debugging, project management, and application development.',
    tag: 'DEVELOPMENT TOOLS',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Streamlit']
  },
  {
    title: 'Frameworks & Technologies',
    desc: 'Hands-on experience with frameworks and technologies used to develop full-stack applications, APIs, and data-driven projects.',
    tag: 'TECHNOLOGY',
    skills: ['React', 'Node.js', 'Express.js', 'Flask', 'Tailwind CSS', 'REST API']
  }
];

const Skills = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const bgRefs = useRef([]);
  const textRefs = useRef([]);

  const handleScroll = (e) => {
    if (window.innerWidth >= 769) return;

    const container = e.target;
    const center = container.scrollLeft + container.offsetWidth / 2;

    let activeIdx = 0;
    let minDiff = Infinity;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardCenter =
        card.offsetLeft + card.offsetWidth / 2;

      const diff = Math.abs(cardCenter - center);

      if (diff < minDiff) {
        minDiff = diff;
        activeIdx = i;
      }
    });

    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.to(card, {
          scale: i === activeIdx ? 1 : 0.9,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      }
    });

    bgRefs.current.forEach((bg, i) => {
      if (bg) {
        gsap.to(bg, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: 'auto'
        });
      }
    });

    textRefs.current.forEach((txt, i) => {
      if (txt) {
        gsap.to(txt, {
          opacity: i === activeIdx ? 1 : 0,
          duration: 0.4,
          overwrite: 'auto'
        });
      }
    });
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==============================
      // DESKTOP EXPERIENCE
      // ==============================
      mm.add('(min-width: 769px)', () => {
        const updateCards = (progress) => {
          cardsRef.current.forEach((card, i) => {
            if (!card) return;

            const offset = i - progress;

            const radius = 1800;
            const angleSpread = 18;

            const angle = offset * angleSpread;
            const rad = (angle * Math.PI) / 180;

            const x = Math.sin(rad) * radius;

            const y =
              radius -
              Math.cos(rad) * radius;

            const z =
              -Math.abs(offset) * 50;

            const scale = Math.max(
              0.4,
              1 - Math.abs(offset) * 0.15
            );

            const rotateZ = angle;

            const opacity = Math.max(
              0.1,
              1 - Math.abs(offset) * 0.3
            );

            const zIndex = Math.round(
              100 - Math.abs(offset) * 10
            );

            gsap.set(card, {
              x,
              y,
              z,
              scale,
              rotationZ: rotateZ,
              rotationY: 0,
              opacity,
              zIndex
            });
          });

          bgRefs.current.forEach((bg, i) => {
            if (!bg) return;

            const itemOpacity = Math.max(
              0,
              1 - Math.abs(i - progress)
            );

            gsap.set(bg, {
              opacity: itemOpacity
            });

            if (textRefs.current[i]) {
              gsap.set(textRefs.current[i], {
                opacity: itemOpacity
              });
            }
          });
        };

        updateCards(0);

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=500%',
          pin: true,
          scrub: 1,

          onUpdate: (self) => {
            const progress =
              self.progress *
              (skillCategories.length - 1);

            updateCards(progress);
          }
        });
      });

      // ==============================
      // MOBILE EXPERIENCE
      // ==============================
      mm.add('(max-width: 768px)', () => {
        cardsRef.current.forEach((card, i) => {
          if (!card) return;

          gsap.set(card, {
            clearProps:
              'x,y,z,rotation,scale,opacity,position'
          });

          gsap.set(card, {
            scale: i === 0 ? 1 : 0.9
          });
        });

        bgRefs.current.forEach((bg, i) => {
          if (!bg) return;

          gsap.set(bg, {
            clearProps: 'all',
            opacity: i === 0 ? 1 : 0
          });
        });

        textRefs.current.forEach((txt, i) => {
          if (!txt) return;

          gsap.set(txt, {
            clearProps: 'all',
            opacity: i === 0 ? 1 : 0
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#0b0b0b] text-white overflow-hidden flex items-center justify-center md:[perspective:1000px] select-none"
    >
      {/* =================================
          DYNAMIC BACKGROUND
      ================================= */}
      {skillCategories.map((_, i) => (
        <div
          key={i}
          ref={(el) => (bgRefs.current[i] = el)}
          className="absolute inset-0 z-0 pointer-events-none opacity-0 bg-gradient-to-tr from-black via-[#140203] to-black"
        />
      ))}

      {/* =================================
          BACKGROUND TYPOGRAPHY
      ================================= */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        {skillCategories.map((_, i) => (
          <h1
            key={`text-${i}`}
            ref={(el) => (textRefs.current[i] = el)}
            className="absolute text-[22vw] md:text-[18vw] font-black uppercase text-transparent leading-none tracking-tighter mix-blend-overlay"
            style={{
              WebkitTextStroke:
                i % 2 === 0
                  ? '2px rgba(229,9,20,0.3)'
                  : '2px rgba(255,255,255,0.15)',
              opacity: 0
            }}
          >
            SKILLS
          </h1>
        ))}
      </div>

      {/* =================================
          SKILLS CAROUSEL
      ================================= */}
      <div
        className="relative w-full h-full flex md:items-center md:justify-center z-10 md:[transform-style:preserve-3d] overflow-x-auto overflow-y-hidden md:overflow-visible snap-x snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] items-center px-[10vw] md:px-0 gap-4 md:gap-0 touch-pan-x"
        onScroll={handleScroll}
      >
        {skillCategories.map((category, i) => (
          <div
            key={i}
            ref={(el) => (cardsRef.current[i] = el)}
            className="md:absolute relative shrink-0 snap-center w-[82vw] sm:w-[360px] md:w-[440px] h-[460px] md:h-[540px] rounded-[32px] p-8 md:p-10 bg-[#141414]/95 backdrop-blur-2xl border border-white/15 flex flex-col justify-between overflow-hidden group shadow-[0_30px_60px_rgba(0,0,0,0.9)] hover:border-red-600/80 transition-colors duration-500"
          >
            {/* Inner Red Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

            {/* Top Metadata */}
            <div className="flex items-center justify-between relative z-10">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-red-500 bg-red-600/10 px-3 py-1 rounded border border-red-600/20">
                {category.tag}
              </span>

              <span className="text-xs font-mono text-white/40">
                [ 0{i + 1} / 06 ]
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-4 relative z-10 my-auto">
              <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight group-hover:text-red-500 transition-colors duration-300">
                {category.title}
              </h3>

              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {category.desc}
              </p>
            </div>

            {/* Skill Badges */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="text-xs font-mono text-white/80 bg-white/5 border border-white/10 px-3 py-1 rounded group-hover:border-red-600/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-red-600 group-hover:shadow-[0_0_15px_#E50914] transition-all" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
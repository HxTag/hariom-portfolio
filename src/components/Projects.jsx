import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Project Data
const projectsData = [
  {
    title: "Global Currency Exchange Rate Prediction",
    category: "Machine Learning & Data Science",
    description:
      "A machine learning project for predicting global currency exchange rates using historical financial data.",
    tags: ["Python", "Machine Learning", "Pandas", "Scikit-learn"],
    episode: "S01 E01",
    url: "https://github.com/HxTag/global-currency-exchange-rate-prediction"
  },
  {
    title: "Virtual Study Group",
    category: "Full-Stack Web Development",
    description:
      "A collaborative platform for students to form virtual study groups, share resources, and learn together online.",
    tags: ["PHP", "MySQL", "WebSocket", "JavaScript"],
    episode: "S01 E02",
    url: "https://github.com/HxTag/Virtual-Study-Group"
  },
  {
    title: "Netflix Developer Portfolio",
    category: "Frontend Development",
    description:
      "Cinematic developer portfolio inspired by Netflix, featuring interactive animations, responsive layouts, custom cursor effects, and GSAP-powered interactions.",
    tags: ["React", "GSAP", "Tailwind CSS", "JavaScript"],
    episode: "S01 E03",
    url: "https://github.com/HxTag/hariom-portfolio"
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const folderBackRef = useRef(null);
  const folderFrontRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // --------------------------------
      // INITIAL FOLDER SETUP
      // --------------------------------
      gsap.set(
        [folderBackRef.current, folderFrontRef.current],
        {
          xPercent: -50,
          yPercent: -50
        }
      );

      gsap.set(folderFrontRef.current, {
        transformOrigin: "bottom center"
      });

      // --------------------------------
      // DESKTOP GRID POSITION
      // --------------------------------
      const getGridPos = (index) => {
        let row;
        let col;

        if (index < 3) {
          row = 0;
          col = index;
        } else if (index === 3) {
          row = 1;
          col = 0;
        } else if (index === 4) {
          row = 1;
          col = 2;
        } else {
          row = 2;
          col = index - 5;
        }

        return { row, col };
      };

      // --------------------------------
      // DESKTOP CARD INITIAL STATE
      // --------------------------------
      cardsRef.current.forEach((card) => {
        if (!card) return;

        gsap.set(card, {
          xPercent: -50,
          yPercent: -50,
          rotation: gsap.utils.random(-6, 6),
          scale: 0.85,
          x: 0,
          y: 0,
          opacity: 1
        });
      });

      // --------------------------------
      // RESPONSIVE GSAP
      // --------------------------------
      const mm = gsap.matchMedia();

      // =================================
      // DESKTOP
      // =================================
      mm.add("(min-width: 768px)", () => {
        let floatTween;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 50%",
            end: "bottom 50%",
            toggleActions: "play reverse play reverse",

            onEnter: () => {
              if (floatTween) floatTween.kill();
            },

            onEnterBack: () => {
              if (floatTween) floatTween.kill();
            },

            onLeave: () => {
              if (floatTween) floatTween.kill();
            },

            onLeaveBack: () => {
              if (floatTween) floatTween.kill();
            }
          },

          onComplete: () => {
            floatTween = gsap.to(cardsRef.current, {
              y: "+=12",
              rotation: "+=1",
              duration: 3.5,
              yoyo: true,
              repeat: -1,
              ease: "sine.inOut",
              stagger: {
                amount: 1.5,
                from: "random"
              }
            });
          }
        });

        // Folder opens
        timeline.to(folderFrontRef.current, {
          rotationX: -130,
          duration: 1.2,
          ease: "power3.inOut"
        });

        // Cards rise
        timeline.to(
          cardsRef.current,
          {
            y: -140,
            scale: 0.9,
            zIndex: 70,
            duration: 0.6,
            stagger: 0.04,
            ease: "back.out(1.2)"
          },
          "-=0.6"
        );

        // Cards spread
        timeline.to(
          cardsRef.current,
          {
            x: (i) => {
              const width =
                Math.max(
                  ...cardsRef.current.map(
                    (card) => card?.offsetWidth || 0
                  )
                ) || 360;

              const gap = 40;
              const { col } = getGridPos(i);

              return (col - 1) * (width + gap);
            },

            y: (i) => {
              const height =
                Math.max(
                  ...cardsRef.current.map(
                    (card) => card?.offsetHeight || 0
                  )
                ) || 240;

              const gap = 40;
              const { row } = getGridPos(i);

              return (row - 1) * (height + gap);
            },

            rotation: () => gsap.utils.random(-3, 3),
            scale: 1,
            opacity: 1,

            duration: 1.4,

            stagger: {
              amount: 0.4,
              from: "center"
            },

            ease: "expo.out"
          },
          "-=0.2"
        );
      });

      // =================================
      // MOBILE
      // =================================
      mm.add("(max-width: 767px)", () => {
        /*
         * IMPORTANT:
         * Do NOT animate opacity on mobile.
         *
         * Previously cards after the first one were
         * intentionally set to opacity: 0.5, which made
         * them appear transparent.
         */

        mobileCardsRef.current.forEach((card) => {
          if (!card) return;

          gsap.set(card, {
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            opacity: 1,
            clearProps: "transform"
          });
        });

        /*
         * Keep mobile carousel completely independent
         * from ScrollTrigger.
         *
         * This prevents ScrollTrigger from interfering
         * with normal finger scrolling.
         */

        gsap.fromTo(
          folderFrontRef.current,
          {
            rotationX: 0
          },
          {
            rotationX: -130,
            duration: 0.8,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true
            }
          }
        );

        // Simple entrance animation.
        gsap.fromTo(
          mobileCardsRef.current,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.06,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true
            }
          }
        );
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="
        bg-[#0b0b0b]
        min-h-[100svh]
        md:min-h-[170vh]
        relative
        font-sans
        overflow-x-clip
        text-white
        w-full
        flex
        items-center
        justify-center
        py-24
        md:py-40
        select-none
      "
    >

      {/* =================================
          BACKGROUND TITLE
      ================================= */}
      <div className="
        absolute
        top-10
        left-0
        w-full
        flex
        items-start
        justify-center
        pointer-events-none
        z-0
      ">
        <h1 className="
          text-[14vw]
          sm:text-[17vw]
          md:text-[20vw]
          font-black
          text-white/[0.03]
          tracking-tighter
          leading-none
          whitespace-nowrap
          uppercase
        ">
          PROJECTS
        </h1>
      </div>

      {/* =================================
          AMBIENT RED GLOW
      ================================= */}
      <div className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[55vw]
        h-[55vw]
        bg-red-600/15
        rounded-full
        blur-[160px]
        pointer-events-none
        z-0
      " />

      {/* =================================
          MAIN FOLDER / DESKTOP AREA
      ================================= */}
      <div className="
        mt-12
        relative
        w-full
        max-w-7xl
        h-full
        flex
        items-center
        justify-center
        perspective-[2000px]
        z-10
      ">

        <div className="
          relative
          w-0
          h-0
          transform-style-3d
        ">

          {/* =================================
              FOLDER BACK
          ================================= */}
          <div
            ref={folderBackRef}
            className="
              absolute
              w-[85vw]
              md:w-[32vw]
              max-w-[380px]
              aspect-video
              bg-[#141414]
              rounded-[24px]
              border
              border-red-600/40
              shadow-[0_20px_50px_rgba(229,9,20,0.25)]
              flex
              items-center
              justify-center
            "
            style={{
              zIndex: 5
            }}
          >
            <div className="
              absolute
              -top-6
              left-6
              w-32
              h-8
              bg-[#1f1f1f]
              rounded-t-xl
              border-t
              border-red-600/30
            " />

            <div className="
              relative
              z-10
              text-red-600
              font-mono
              font-black
              text-2xl
              tracking-widest
              uppercase
              opacity-60
            ">
              PROJECT_ARCHIVE
            </div>
          </div>

          {/* =================================
              DESKTOP PROJECT CARDS
          ================================= */}
          {projectsData.map((project, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              className="
                hidden
                md:block
                absolute
                w-[80vw]
                md:w-[33vw]
                max-w-[380px]
                aspect-[16/10]
                will-change-transform
              "
              style={{
                zIndex: 10 + i
              }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} on GitHub`}
                className="
                w-full
                h-full
                rounded-[24px]
                overflow-hidden
                border
                border-white/15
                bg-[#141414]/95
                backdrop-blur-2xl
                shadow-[0_25px_50px_rgba(0,0,0,0.9)]
                transition-all
                duration-500
                group
                hover:scale-[1.04]
                hover:border-red-600
                hover:shadow-[0_35px_80px_rgba(229,9,20,0.35)]
                hover:-translate-y-2
                cursor-pointer
                relative
                z-10
                p-7
                flex
                flex-col
                justify-between
                no-underline
              ">

                {/* Header */}
                <div className="
                  flex
                  items-center
                  justify-between
                ">
                  <span className="
                    text-[10px]
                    font-mono
                    font-bold
                    tracking-widest
                    uppercase
                    text-red-500
                    bg-red-600/10
                    px-2.5
                    py-1
                    rounded
                    border
                    border-red-600/20
                  ">
                    {project.episode}
                  </span>

                  <div className="
                    flex
                    items-center
                    gap-2
                  ">
                    <span className="
                      text-xs
                      font-mono
                      text-red-400
                      font-bold
                    ">
                      GITHUB ↗
                    </span>

                    <span className="
                      text-[10px]
                      font-mono
                      border
                      border-white/30
                      px-1
                      text-white/70
                    ">
                      HD
                    </span>
                  </div>
                </div>

                {/* Main Content */}
                <div className="
                  space-y-2
                  my-auto
                ">
                  <div className="
                    text-[11px]
                    font-mono
                    uppercase
                    tracking-widest
                    text-white/40
                  ">
                    {project.category}
                  </div>

                  <h3 className="
                    text-2xl
                    font-black
                    text-white
                    tracking-tight
                    group-hover:text-red-500
                    transition-colors
                    duration-300
                  ">
                    {project.title}
                  </h3>

                  <p className="
                    text-xs
                    text-white/70
                    font-light
                    leading-relaxed
                    line-clamp-2
                  ">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="
                  flex
                  flex-wrap
                  gap-1.5
                  pt-3
                  border-t
                  border-white/10
                ">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="
                        text-[10px]
                        font-mono
                        text-white/70
                        bg-white/5
                        px-2
                        py-0.5
                        rounded
                      "
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Glow */}
                <div className="
                  absolute
                  bottom-4
                  right-4
                  w-2
                  h-2
                  rounded-full
                  bg-red-600
                  group-hover:shadow-[0_0_15px_#E50914]
                  transition-all
                " />

              </a>
            </div>
          ))}

          {/* =================================
              FOLDER FRONT
          ================================= */}
          <div
            ref={folderFrontRef}
            className="
              absolute
              w-[85vw]
              md:w-[32vw]
              max-w-[380px]
              aspect-video
              pointer-events-none
              will-change-transform
            "
            style={{
              zIndex: 60
            }}
          >
            <div className="
              absolute
              bottom-0
              w-full
              h-[85%]
              bg-[#1c1c1c]
              rounded-b-[24px]
              rounded-t-md
              shadow-[0_-5px_20px_rgba(0,0,0,0.8)]
              flex
              flex-col
              justify-end
              p-6
              border-t
              border-red-600/40
            ">
              <div className="
                w-20
                h-1.5
                bg-white/20
                rounded-full
                mx-auto
                mb-2
              " />
            </div>
          </div>

        </div>
      </div>

      {/* =================================
          MOBILE CAROUSEL
      ================================= */}
      <div
        className="
          md:hidden
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-screen
          h-auto
          py-12
          flex
          items-center
          gap-6
          px-[11vw]
          z-[100]

          /*
           * IMPORTANT MOBILE FIX
           */
          overflow-x-auto
          overflow-y-hidden

          snap-x
          snap-mandatory

          touch-pan-x
          overscroll-x-contain

          hide-scrollbar
        "
        style={{
          WebkitOverflowScrolling: "touch",
          scrollbarWidth: "none"
        }}
      >

        <style>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }

          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {projectsData.map((project, i) => (
          <div
            key={`mob-${i}`}
            ref={(el) => {
              mobileCardsRef.current[i] = el;
            }}
            className="
              shrink-0
              w-[78vw]
              aspect-[16/11]
              snap-center
              relative
              z-10
              opacity-100
            "
          >

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} on GitHub`}
              className="
              w-full
              h-full
              rounded-[24px]
              overflow-hidden
              border
              border-white/15
              bg-[#141414]
              p-6
              flex
              flex-col
              justify-between
              shadow-[0_20px_40px_rgba(0,0,0,0.9)]
              no-underline
            ">

              {/* Header */}
              <div className="
                flex
                items-center
                justify-between
              ">
                <span className="
                  text-[10px]
                  font-mono
                  font-bold
                  tracking-widest
                  text-red-500
                  bg-red-600/10
                  px-2
                  py-0.5
                  rounded
                ">
                  {project.episode}
                </span>

                <span className="
                  text-xs
                  font-mono
                  text-red-400
                  font-bold
                ">
                  GITHUB ↗
                </span>
              </div>

              {/* Content */}
              <div className="
                space-y-2
              ">
                <h3 className="
                  text-xl
                  font-black
                  text-white
                ">
                  {project.title}
                </h3>

                <p className="
                  text-xs
                  text-white/70
                  font-light
                  line-clamp-2
                ">
                  {project.description}
                </p>
              </div>

              {/* Tags */}
              <div className="
                flex
                flex-wrap
                gap-1
                pt-2
                border-t
                border-white/10
              ">
                {project.tags.slice(0, 3).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="
                      text-[10px]
                      font-mono
                      text-white/60
                      bg-white/5
                      px-2
                      py-0.5
                      rounded
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </a>
          </div>
        ))}

      </div>

    </section>
  );
};

export default Projects;

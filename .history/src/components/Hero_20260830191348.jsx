import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';

const Hero = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);

  const developerRoles = [
    'ORIGINAL SERIES // AI & ML DEVELOPER',
    'FEATURED // FULL-STACK DEVELOPER',
    'BLOCKBUSTER // PYTHON & JAVA DEVELOPER',
    'ACCLAIMED // PROBLEM SOLVER'
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;

    if (!section || !card || !content) return;

    // --------------------------------------------------
    // GSAP CINEMATIC ENTRANCE ANIMATION
    // --------------------------------------------------

    const tl = gsap.timeline({
      defaults: {
        ease: 'power4.out'
      }
    });

    tl.fromTo(
      section.querySelector('header'),
      {
        y: -60,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 1
      }
    )
      .fromTo(
        content.querySelectorAll('.hero-anim-item'),
        {
          y: 50,
          opacity: 0,
          filter: 'blur(10px)'
        },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.12
        },
        '-=0.7'
      )
      .fromTo(
        card,
        {
          scale: 0.75,
          opacity: 0,
          rotationY: 35,
          rotationX: -15
        },
        {
          scale: 1,
          opacity: 1,
          rotationY: 0,
          rotationX: 0,
          duration: 1.4,
          ease: 'back.out(1.2)'
        },
        '-=0.9'
      );

    // --------------------------------------------------
    // CUSTOM CURSOR INITIAL STATE
    // Desktop only behavior
    // --------------------------------------------------

    if (cursorDotRef.current && cursorRingRef.current) {
      gsap.set(
        [cursorDotRef.current, cursorRingRef.current],
        {
          scale: 0.5,
          opacity: 0,
          transformOrigin: '50% 50%'
        }
      );
    }

    // --------------------------------------------------
    // MOUSE PHYSICS
    // --------------------------------------------------

    const xToDot = gsap.quickTo(
      cursorDotRef.current,
      'x',
      {
        duration: 0.05,
        ease: 'power2.out'
      }
    );

    const yToDot = gsap.quickTo(
      cursorDotRef.current,
      'y',
      {
        duration: 0.05,
        ease: 'power2.out'
      }
    );

    const xToRing = gsap.quickTo(
      cursorRingRef.current,
      'x',
      {
        duration: 0.15,
        ease: 'power3.out'
      }
    );

    const yToRing = gsap.quickTo(
      cursorRingRef.current,
      'y',
      {
        duration: 0.15,
        ease: 'power3.out'
      }
    );

    const xTilt = gsap.quickTo(
      card,
      'rotationY',
      {
        duration: 0.4,
        ease: 'power3.out'
      }
    );

    const yTilt = gsap.quickTo(
      card,
      'rotationX',
      {
        duration: 0.4,
        ease: 'power3.out'
      }
    );

    const glareX = gsap.quickTo(
      glareRef.current,
      'x',
      {
        duration: 0.3,
        ease: 'power2.out'
      }
    );

    const glareY = gsap.quickTo(
      glareRef.current,
      'y',
      {
        duration: 0.3,
        ease: 'power2.out'
      }
    );

    // --------------------------------------------------
    // MOUSE MOVE
    // --------------------------------------------------

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `
          translate3d(
            ${x - 300}px,
            ${y - 300}px,
            0
          )
        `;
      }

      // Custom cursor
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);

      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // --------------------------------------------------
      // 3D CARD TILT
      // --------------------------------------------------

      const cardRect = card.getBoundingClientRect();

      const cardCenterX =
        cardRect.left +
        cardRect.width / 2 -
        rect.left;

      const cardCenterY =
        cardRect.top +
        cardRect.height / 2 -
        rect.top;

      const rotateX =
        -((y - cardCenterY) /
          (cardRect.height / 2)) *
        16;

      const rotateY =
        ((x - cardCenterX) /
          (cardRect.width / 2)) *
        16;

      xTilt(rotateY);
      yTilt(rotateX);

      // --------------------------------------------------
      // HOLOGRAPHIC GLARE
      // --------------------------------------------------

      glareX(
        (x - cardRect.left) -
          cardRect.width / 2
      );

      glareY(
        (y - cardRect.top) -
          cardRect.height / 2
      );
    };

    // --------------------------------------------------
    // MOUSE ENTER
    // --------------------------------------------------

    const handleMouseEnter = () => {
      gsap.to(
        [
          cursorDotRef.current,
          cursorRingRef.current
        ],
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out'
        }
      );

      if (spotlightRef.current) {
        gsap.to(
          spotlightRef.current,
          {
            opacity: 1,
            duration: 0.3
          }
        );
      }
    };

    // --------------------------------------------------
    // MOUSE LEAVE
    // --------------------------------------------------

    const handleMouseLeave = () => {
      gsap.to(
        [
          cursorDotRef.current,
          cursorRingRef.current
        ],
        {
          opacity: 0,
          scale: 0.5,
          duration: 0.3,
          ease: 'power2.inOut'
        }
      );

      if (spotlightRef.current) {
        gsap.to(
          spotlightRef.current,
          {
            opacity: 0,
            duration: 0.3
          }
        );
      }

      xTilt(0);
      yTilt(0);
    };

    // --------------------------------------------------
    // EVENT LISTENERS
    // --------------------------------------------------

    section.addEventListener(
      'mousemove',
      handleMouseMove
    );

    section.addEventListener(
      'mouseenter',
      handleMouseEnter
    );

    section.addEventListener(
      'mouseleave',
      handleMouseLeave
    );

    // --------------------------------------------------
    // CLEANUP
    // --------------------------------------------------

    return () => {
      section.removeEventListener(
        'mousemove',
        handleMouseMove
      );

      section.removeEventListener(
        'mouseenter',
        handleMouseEnter
      );

      section.removeEventListener(
        'mouseleave',
        handleMouseLeave
      );

      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        min-h-screen
        bg-[#050505]
        overflow-x-hidden
        overflow-y-visible
        flex
        flex-col
        select-none
        md:cursor-none
      "
    >

      {/* ==================================================
          CUSTOM CSS
      ================================================== */}

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }

          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        @media (max-width: 767px) {
          .animate-marquee {
            animation-duration: 45s;
          }
        }
      `}</style>


      {/* ==================================================
          1. CINEMATIC BACKGROUND
      ================================================== */}

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#050505]
          via-black/90
          to-[#050505]
          z-0
          pointer-events-none
        "
      >

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            pointer-events-none
            select-none
            overflow-hidden
            opacity-10
          "
        >

          <div className="flex whitespace-nowrap animate-marquee">

            {[...developerRoles, ...developerRoles].map(
              (role, idx) => (
                <span
                  key={idx}
                  className="
                    text-[14vw]
                    font-black
                    text-red-600
                    mx-8
                    uppercase
                    tracking-tighter
                  "
                >
                  {role} &bull;
                </span>
              )
            )}

          </div>

        </div>

      </div>


      {/* ==================================================
          2. MOUSE SPOTLIGHT
      ================================================== */}

      <div
        ref={spotlightRef}
        className="
          absolute
          top-0
          left-0
          w-[600px]
          h-[600px]
          rounded-full
          pointer-events-none
          z-10
          opacity-0
          blur-[90px]
          transition-opacity
          duration-300
          hidden
          md:block
        "
        style={{
          background:
            'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)'
        }}
      />


      {/* ==================================================
          3. MAIN CONTENT
      ================================================== */}

      <div
        ref={contentRef}
        className="
          relative
          z-20
          w-full
          max-w-7xl
          mx-auto
          px-6
          md:px-12
          min-h-screen
          flex
          flex-col
          justify-between
          pt-24
          pb-12
        "
      >

        {/* ==================================================
            TOP BADGE
        ================================================== */}

        <div
          className="
            hero-anim-item
            flex
            items-center
            justify-between
            w-full
          "
        >

          <div
            className="
              inline-flex
              items-center
              gap-2.5
              px-4
              py-1.5
              rounded
              bg-black/80
              backdrop-blur-2xl
              border
              border-red-600/40
              text-xs
              font-mono
              uppercase
              tracking-widest
              text-white
              shadow-2xl
            "
          >

            <span
              className="
                w-2
                h-2
                rounded-full
                bg-red-600
                animate-ping
              "
            />

            <span
              className="
                text-red-500
                font-bold
                tracking-wider
              "
            >
              DEVELOPER SERIES
            </span>

            <span className="text-white/40">
              |
            </span>

            <span className="text-white/80">
              SEASON 2026
            </span>

          </div>


          {/* Desktop Stack Labels */}

          <div
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-xs
              font-mono
              text-white/50
              tracking-wider
            "
          >

            <span
              className="
                px-2
                py-0.5
                border
                border-white/20
                rounded
                bg-black/40
              "
            >
              FULL-STACK
            </span>

            <span
              className="
                px-2
                py-0.5
                border
                border-white/20
                rounded
                bg-black/40
              "
            >
              AI / ML
            </span>

          </div>

        </div>


        {/* ==================================================
            MAIN STAGE
        ================================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-12
            items-center
            gap-10
            lg:gap-8
            my-8
            lg:my-auto
          "
        >

          {/* ==================================================
              LEFT SIDE - INTRO
          ================================================== */}

          <div
            className="
              lg:col-span-5
              flex
              flex-col
              items-start
              space-y-5
              text-left
            "
          >

            {/* MCA BADGE */}

            <div
              className="
                hero-anim-item
                flex
                items-center
                gap-3
              "
            >

              <span
                className="
                  px-2.5
                  py-0.5
                  bg-red-600
                  text-white
                  font-black
                  text-xs
                  rounded
                  tracking-widest
                  shadow-[0_0_20px_rgba(229,9,20,0.8)]
                  animate-pulse
                "
              >
                MCA
              </span>

              <span
                className="
                  text-white/80
                  text-xs
                  font-mono
                  tracking-widest
                  uppercase
                "
              >
                AI & ML • Software Developer
              </span>

            </div>


            {/* NAME */}

            <h1
              className="
                hero-anim-item
                text-5xl
                sm:text-6xl
                md:text-7xl
                font-black
                tracking-tighter
                text-white
                leading-[0.95]
                drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]
              "
            >
              HARIOM
              <br />

              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-red-500
                  via-rose-600
                  to-red-700
                  drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]
                "
              >
                PANDEY.
              </span>

            </h1>


            {/* TECHNOLOGIES */}

            <div
              className="
                hero-anim-item
                flex
                items-center
                gap-3
                text-xs
                font-mono
                text-red-400
                font-bold
                flex-wrap
              "
            >

              <span
                className="
                  px-2
                  py-0.5
                  bg-red-500/10
                  border
                  border-red-500/30
                  rounded
                  text-red-500
                "
              >
                PYTHON
              </span>

              <span className="text-white/40">
                •
              </span>

              <span>
                JAVA • REACT • JAVASCRIPT
              </span>

              <span className="text-white/40">
                •
              </span>

              <span className="text-white/70">
                AI / ML
              </span>

            </div>


            {/* DESCRIPTION */}

            <p
              className="
                hero-anim-item
                text-sm
                md:text-base
                text-white/80
                font-light
                leading-relaxed
                max-w-md
                drop-shadow
              "
            >
              MCA student focused on Artificial
              Intelligence and Machine Learning,
              building practical software solutions
              through programming, web development,
              data, and intelligent systems.
            </p>


            {/* ==================================================
                ACTION BUTTONS
            ================================================== */}

            <div
              className="
                hero-anim-item
                flex
                items-center
                gap-4
                pt-2
                flex-wrap
              "
            >

              {/* VIEW PROJECTS */}

              <a
                href="#projects"
                className="
                  px-6
                  sm:px-8
                  py-3.5
                  bg-white
                  text-black
                  font-bold
                  text-xs
                  uppercase
                  tracking-widest
                  rounded
                  hover:bg-red-600
                  hover:text-white
                  transition-all
                  duration-300
                  shadow-[0_10px_35px_rgba(255,255,255,0.3)]
                  flex
                  items-center
                  gap-2
                  hover:scale-105
                  active:scale-95
                "
              >

                <svg
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>

                View Projects

              </a>


              {/* CONTACT */}

              <a
                href="#contact"
                className="
                  px-6
                  sm:px-8
                  py-3.5
                  bg-neutral-900/80
                  text-white
                  border
                  border-white/20
                  font-bold
                  text-xs
                  uppercase
                  tracking-widest
                  rounded
                  hover:bg-neutral-800
                  transition-all
                  duration-300
                  shadow-xl
                  backdrop-blur-md
                  flex
                  items-center
                  gap-2
                  hover:scale-105
                  active:scale-95
                "
              >

                <svg
                  className="
                    w-4
                    h-4
                    fill-none
                    stroke-current
                    stroke-2
                  "
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                  />

                  <line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                  />

                  <line
                    x1="12"
                    y1="16"
                    x2="12.01"
                    y2="16"
                  />
                </svg>

                Contact Me

              </a>

            </div>

          </div>


          {/* ==================================================
              CENTER - PHOTO CARD
          ================================================== */}

          <div
            className="
              lg:col-span-4
              flex
              justify-center
              perspective-[1200px]
              w-full
            "
          >

            <div
              ref={cardRef}
              className="
                relative
                group
                transform-gpu
                transition-transform
                duration-100
                will-change-transform
              "
            >

              {/* RED NEON GLOW */}

              <div
                className="
                  absolute
                  -inset-3
                  bg-gradient-to-r
                  from-red-600/70
                  via-rose-600/40
                  to-purple-600/20
                  rounded-3xl
                  blur-3xl
                  opacity-90
                  group-hover:opacity-100
                  animate-pulse
                "
              />


              {/* ==================================================
                  PHOTO CARD
              ================================================== */}

              <div
                className="
                  relative
                  w-[250px]
                  sm:w-[280px]
                  md:w-[320px]
                  p-3.5
                  bg-[#141414]/90
                  backdrop-blur-2xl
                  rounded-2xl
                  border
                  border-red-600/40
                  shadow-[0_40px_80px_rgba(0,0,0,0.95)]
                  overflow-hidden
                "
              >

                {/* HOLOGRAPHIC GLARE */}

                <div
                  ref={glareRef}
                  className="
                    absolute
                    inset-[-50%]
                    w-[200%]
                    h-[200%]
                    bg-gradient-to-tr
                    from-transparent
                    via-white/10
                    to-transparent
                    pointer-events-none
                    transform-gpu
                    z-40
                  "
                />


                {/* FEATURED DEV */}

                <div
                  className="
                    absolute
                    top-6
                    left-6
                    z-30
                    px-3
                    py-1
                    bg-red-600
                    text-white
                    font-mono
                    text-[10px]
                    font-bold
                    tracking-widest
                    rounded
                    shadow-xl
                  "
                >
                  FEATURED DEV
                </div>


                {/* ==================================================
                    DEVELOPER IMAGE
                ================================================== */}

                <img
                  src={pictureImg}
                  alt="Hariom Pandey"
                  className="
                    w-full
                    h-[300px]
                    sm:h-[340px]
                    md:h-[390px]
                    object-cover
                    object-top
                    rounded-xl
                    filter
                    contrast-125
                    brightness-105
                    group-hover:scale-[1.02]
                    transition-transform
                    duration-500
                  "
                />

              </div>

            </div>

          </div>


          {/* ==================================================
              RIGHT SIDE - TECHNICAL SPECS
          ================================================== */}

          <div
            className="
              hero-anim-item
              lg:col-span-3
              flex
              flex-col
              items-start
              lg:items-end
              space-y-4
              text-left
              lg:text-right
            "
          >

            <div
              className="
                p-5
                bg-black/80
                backdrop-blur-2xl
                border
                border-white/15
                rounded-xl
                shadow-2xl
                max-w-xs
              "
            >

              <h3
                className="
                  text-xs
                  font-mono
                  uppercase
                  tracking-widest
                  text-red-500
                  font-bold
                  mb-2
                "
              >
                Core Stack
              </h3>

              <p
                className="
                  text-xs
                  text-white/80
                  leading-relaxed
                  font-light
                "
              >
                Python, Java, C, C++, React,
                JavaScript, HTML, CSS, MongoDB,
                MySQL, Git & GitHub.
              </p>

            </div>

          </div>

        </div>


        {/* ==================================================
            BOTTOM TICKER
        ================================================== */}

        <div
          className="
            hero-anim-item
            flex
            items-center
            justify-between
            gap-4
            text-xs
            font-mono
            text-white/50
            tracking-widest
            uppercase
            flex-wrap
          "
        >

          <span>
            ENGINEERED WITH CODE & CURIOSITY
          </span>

          <span>
            [ PORTFOLIO RELEASE v2.6 ]
          </span>

        </div>

      </div>


      {/* ==================================================
          4. CUSTOM CURSOR - DESKTOP
      ================================================== */}

      <div
        ref={cursorDotRef}
        className="
          absolute
          top-0
          left-0
          z-50
          pointer-events-none
          w-3
          h-3
          bg-red-600
          rounded-full
          shadow-[0_0_15px_#E50914]
          hidden
          md:block
        "
      />

      <div
        ref={cursorRingRef}
        className="
          absolute
          top-0
          left-0
          z-50
          pointer-events-none
          w-12
          h-12
          border
          border-red-600/60
          rounded-full
          flex
          items-center
          justify-center
          backdrop-blur-[1px]
          hidden
          md:flex
        "
      />


      {/* ==================================================
          NAVBAR
      ================================================== */}

      <header
        className="
          absolute
          top-0
          left-0
          z-50
          w-full
          max-w-7xl
          mx-auto
          px-6
          md:px-12
          py-6
          flex
          items-center
          justify-between
          pointer-events-auto
        "
      >

        {/* LOGO */}

        <div
          className="
            text-2xl
            font-black
            text-red-600
            tracking-tighter
            flex
            items-center
            gap-2
            drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]
          "
        >
          HARIOM

          <span
            className="
              w-1.5
              h-1.5
              rounded-full
              bg-white
              inline-block
            "
          />

        </div>


        {/* DESKTOP NAV */}

        <nav
          className="
            hidden
            md:flex
            items-center
            gap-8
            text-xs
            font-mono
            uppercase
            tracking-widest
            text-white/80
          "
        >

          <a
            href="#home"
            className="
              hover:text-red-500
              transition-colors
            "
          >
            Home
          </a>

          <a
            href="#about"
            className="
              hover:text-red-500
              transition-colors
            "
          >
            About
          </a>

          <a
            href="#expertise"
            className="
              hover:text-red-500
              transition-colors
            "
          >
            Expertise
          </a>

          <a
            href="#skills"
            className="
              hover:text-red-500
              transition-colors
            "
          >
            Skills
          </a>

          <a
            href="#projects"
            className="
              hover:text-red-500
              transition-colors
            "
          >
            Projects
          </a>

          <a
            href="#contact"
            className="
              hover:text-red-500
              transition-colors
            "
          >
            Contact
          </a>

        </nav>


        {/* HIRE ME */}

        <a
          href="#contact"
          className="
            px-5
            py-2
            rounded
            bg-red-600
            hover:bg-red-700
            text-white
            font-bold
            text-xs
            uppercase
            tracking-widest
            transition-all
            duration-300
            shadow-[0_0_20px_rgba(229,9,20,0.6)]
            hover:scale-105
            active:scale-95
          "
        >
          Hire Me
        </a>

      </header>

    </section>
  );
};

export default Hero;
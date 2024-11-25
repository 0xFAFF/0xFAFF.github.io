import { useRef } from "react";
import "./scroll.css";
import alex from "./images/alex.jpg";
import splash from "./images/splash.jpg";
import { motion, useScroll } from "framer-motion";

function BGSplash({ scrollYProgress, img }) {
  return (
    <motion.div class="bg-image" style={{ opacity: scrollYProgress }}>
      <div className="bg-image-inner">
        <img class="photo" src={img} />
      </div>
    </motion.div>
  );
}

function Page({ img }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [".5 end", ".50001 end"],
  });
  return (
    <div ref={ref} class="page">
      <div class="headline">
        <div class="logo">
          <div>Team</div>
        </div>
      </div>
      <BGSplash scrollYProgress={scrollYProgress} img={img} />
      <div class="team-member pull-right">
        <div class="info-container">
          <div class="info">
            <h1>Alex Sherman &nbsp;&middot;&nbsp; Founder</h1>
            <p>
              I've been making games in my spare time (and sometimes professionally) for the better
              part of two decades. I deeply enjoy the breadth of interesting, technical problems
              that video game development brings. Game development is what got me, and keeps me,
              interested in programming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Xurb() {
  return (
    <>
      <Page img={alex} />
      <Page img={splash} />
      <Page img={alex} />
      <footer class="footer">
        <div class="footer-content">
          <div class="copyright">&copy; 2023 FAFF Games</div>
        </div>
      </footer>
    </>
  );
}

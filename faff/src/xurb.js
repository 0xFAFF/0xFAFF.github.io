import React, { Children, useEffect, useRef, useState } from "react";
import "./scroll.css";
import alex from "./images/alex.jpg";
import splash from "./images/splash.jpg";
import suburbs from "./xurb/video/suburbs.mp4";
import inventory from "./xurb/images/inventory.png";
import lafayetteman from "./xurb/images/lafayetteman.png";
import militaryman from "./xurb/images/militaryman.png";
import lonepineump from "./xurb/images/lonepineump.png";
import countryhills from "./xurb/images/countryhills.png";
import { motion, useScroll } from "framer-motion";

function Video(props) {
  return <video muted autoPlay loop {...props} />;
}

function BGSplash({ scrollYProgress, img, video, children }) {
  return (
    <motion.div class="bg-image" style={{ opacity: scrollYProgress }}>
      <div className="bg-image-inner">
        {children}
        {img && <img src={img} />}
        {video && <Video src={video} />}
      </div>
    </motion.div>
  );
}

function SlideShow({ children }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => (seconds + 1) % children.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          style: { transition: "opacity 1s", opacity: i == seconds ? 1 : 0 },
        })
      )}
    </>
  );
}

function Card({ top, children }) {
  return (
    <div style={{ top, width: "100%", position: "absolute" }}>
      <div class="card">
        <div class="info">{children}</div>
      </div>
    </div>
  );
}

function Banner({ children, className = "heading" }) {
  return (
      <h1 className={className}>{children}</h1>
  );
}

function Page({ children, container }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: container,
    offset: [".5 end", ".500001 end"],
  });
  return (
    <section ref={ref}>
      {React.Children.map(children, (child) => React.cloneElement(child, { scrollYProgress }))}
    </section>
  );
}

export default function Xurb() {
  const ref = useRef(null);
  return (
    <>
      <div className="scroll-snap" ref={ref}>
        <Page container={ref}>
          <Banner className="title">XURB</Banner>
          <BGSplash>
            <SlideShow>
              <img src={countryhills} />
              <img src={inventory} />
              <img src={militaryman} />
              <img src={lafayetteman} />
              <img src={lonepineump} />
            </SlideShow>
          </BGSplash>
        </Page>
        <Page container={ref}>
          <Card top="50vh">
            <p>
              You find yourself stranded in a deserted suburban neighborhood: doors are haphazardly
              thrown open and burning cars block the streets. Any few remaining civilians are thrown
              into a panic, with the more fortunate survivors quickly converging into hostile
              factions.
            </p>
          </Card>
          <BGSplash>
            <Video src={suburbs} />
          </BGSplash>
        </Page>

        <Page container={ref}>
          <BGSplash>
            <img src={splash} />
          </BGSplash>
          <Banner>XURB</Banner>
        </Page>
      </div>
      <footer class="footer">
        <div class="footer-content">
          <div class="copyright">&copy; 2023 FAFF Games</div>
        </div>
      </footer>
    </>
  );
}

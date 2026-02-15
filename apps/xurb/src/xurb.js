import React, { useEffect, useRef, useState } from "react";
import "@faff/common/scroll.css";
import environment from "./video/environment.mp4";
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
        }),
      )}
    </>
  );
}

function Card({ top, children }) {
  return (
    <div style={{ top, width: "100%", position: "absolute", height: "0" }}>
      <div class="card">
        <div class="info">{children}</div>
      </div>
    </div>
  );
}

function Banner({ children, className = "heading" }) {
  return <h1 className={className}>{children}</h1>;
}

function Page({ children, container }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    layoutEffect: false,
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
          <Card top="70vh">
            <iframe
              src="https://store.steampowered.com/widget/2314350/?t=Request%20access%20to%20the%20closed%20alpha%20on%20the%20Steam%20store%20page!"
              frameborder="0"
              width="400"
              height="190"
            ></iframe>
          </Card>
          <BGSplash>
            <Video src={environment} />
          </BGSplash>
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

import React, { Children, useEffect, useRef, useState } from "react";
import "./scroll.css";
import splash from "./images/splash.jpg";
import environment from "./xurb/video/environment.mp4";
import houses from "./xurb/images/houses.jpg";
import houses2 from "./xurb/images/houses2.jpg";
import houses3 from "./xurb/images/houses3.jpg";
import countryhills from "./xurb/images/countryhills.jpg";
import healthbars from "./xurb/images/healthbars.png";
import food from "./xurb/images/food.png";
import loot from "./xurb/images/loot.jpg";
import stash from "./xurb/images/stash.jpg";
import medical from "./xurb/images/medical.png";
import inventory from "./xurb/images/inventory.jpg";
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

function Card({ top, bottom, children }) {
  return (
    <div style={{ top, bottom, width: "100%", position: "absolute" }}>
      <div class="card">{children}</div>
    </div>
  );
}

function Banner({ children, className = "heading" }) {
  return <h1 className={className}>{children}</h1>;
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

export default function Pitch() {
  const ref = useRef(null);
  useEffect(() => {
    ref.current.focus();
  }, []);
  return (
    <>
      <div className="scroll-snap" ref={ref} tabIndex="0">
        <Page container={ref}>
          <Banner className="title">XURB</Banner>
          <BGSplash>
            <Video src={environment} />
          </BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Elevator Pitch</Banner>
          <Card top="50vh">
            <ul>
              <li>
                <b>DayZ</b> meets <b>Tarkov</b>, with an <b>idle game</b> progression
              </li>
              <li>Extraction looter-shooter</li>
              <li>
                Adrenaline inducing inner game loop
                <ul>
                  <li>Low time-to-kill</li>
                  <li>High-stakes, permadeath</li>
                </ul>
              </li>
              <li>
                Deep, relaxing outer game loop
                <ul>
                  <li>Bank items in a stash</li>
                  <li>Building and idle progression is friends-only</li>
                </ul>
              </li>
            </ul>
          </Card>
        </Page>
        <Page container={ref}>
          <BGSplash>
            <img src={houses3} />
          </BGSplash>
          <Card bottom="0vh">
            <p>
              You wake up in a patch of woods at the end of a cul-de-sac. In your pockets are: a
              chapstick, your ID, some earbuds, and a house key. You have no recollection of
              anything from the past three days.
            </p>
          </Card>
        </Page>
        <Page container={ref}>
          <Banner>The Suburbs</Banner>
          <Card bottom="0vh">
            <p>
              Everyone left in a hurry. Doors are haphazardly thrown open. An occasional burning car
              blocks the street.
            </p>
          </Card>
          <BGSplash>
            <img src={houses} />
          </BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Survive</Banner>
          <Card bottom="0vh">
            <p>
              You are hungry, and it's getting late. If you want to survive, you will need to be
              able to find food, water, and a safe place to sleep.
            </p>
          </Card>
          <Card top="50vh">
            <img src={healthbars} />
            <img src={food} />
            <img src={medical} />
          </Card>
          <BGSplash></BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Loot</Banner>
          <Card bottom="0vh">
            <p>
              Some houses may have a bit of food in the pantry, and clean water seems to flow from
              the tap. It's unclear how long these resources will last, though.
            </p>
          </Card>
          <BGSplash>
            <img src={loot} />
          </BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Manage</Banner>
          <Card bottom="0vh">
            <p>
              You can carry a couple things in your pockets, but a backpack might be handy. If
              you're clever enough to hotwire a car, you can take away a heavier load.
            </p>
          </Card>
          <BGSplash>
            <img style={{ objectFit: "contain" }} src={inventory} />
          </BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Extract</Banner>
          <Card bottom="0vh">
            <p>
              Staying in the neighborhoods doesn't seem safe, but you know a secret place where you
              can hide out. Gather as much as you can carry and make a run for your stash.
            </p>
          </Card>
          <BGSplash>
            <img style={{"objectPosition": "left"}} src={stash} />
          </BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Fight</Banner>
          <Card bottom="0vh">
            <p>
              You are not the only one left behind. Some others remain, and hostile factions form.
              When you die it's over, so the stakes for your survival are high. If you are going to
              make it, you need to get yours before someone gets you.
            </p>
          </Card>
          <BGSplash></BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Build</Banner>
          <Card bottom="0vh">
            <p>
              Use the resources you gather in the raid to build your camp. A better shelter gives
              you a more reliable place to hide, and you will be safer if you can establish a
              reliable food source. Maybe you can even recruit some friendly survivors to join your
              camp.
            </p>
          </Card>
          <BGSplash></BGSplash>
        </Page>
        <Page container={ref}>
          <Banner>Together</Banner>
          <Card bottom="0vh">
            <p>
              Together you're stronger, survival is easier with a group. You can heal and revive
              each other, lowering the stakes of combat. Be careful though, since not everyone will
              be friendly.
            </p>
          </Card>
          <BGSplash></BGSplash>
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

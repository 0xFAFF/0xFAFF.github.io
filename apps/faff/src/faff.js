import alex from "./images/alex.jpg";
import "./faff.css";

export default function Faff() {
  return (
    <div className="background">
      <div class="content-wrap">
        <div class="overlay">
          <section>
            <div class="headline">
              <div class="logo">
                <div>FAFF Games</div>
              </div>
              <div class="text">
                <div>Indie game studio. Building games for ourselves, when we find time.</div>
              </div>
            </div>
          </section>
          <section>
            <div class="headline">
              <div class="logo">
                <div>Team</div>
              </div>
            </div>
            <div class="team-member pull-right">
              <div class="photo-container">
                <img class="photo" src={alex} />
              </div>
              <div class="info-container">
                <div class="info">
                  <h1>Alex Sherman &nbsp;&middot;&nbsp; Founder</h1>
                  <p>
                    I've been making games in my spare time (and sometimes professionally) for the
                    better part of two decades. I deeply enjoy the breadth of interesting, technical
                    problems that video game development brings. Game development is what got me,
                    and keeps me, interested in programming.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div class="contact-container">
          <div class="footer-splash"></div>
          <div class="contact">
            Reach out! &#9993; <a href="mailto:info@faff.games">info@faff.games</a>
          </div>
        </div>
      </div>
      <footer class="footer">
        <div class="footer-content">
          <div class="copyright">&copy; 2023 FAFF Games</div>
        </div>
      </footer>
    </div>
  );
}

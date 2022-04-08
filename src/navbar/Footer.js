import gitHubLogo from "../assets/GitHub-Mark-Light-32px.png";
import mailLogo from "../assets/Mail-Icon-White-on-Black.png";
import linkedInLogo from "../assets/linkedin-icon-white.png";

export const Footer = () => (
  <nav className="navbar is-dark is-fixed-bottom">
    <div className="navbar-brand">
      <a
        className="navbar-item"
        href="https://github.com/carlosbermejo-oup"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={gitHubLogo}
          width="32"
          height="32"
          alt="https://github.com/carlosbermejo-oup"
        />
      </a>
      <a
        className="navbar-item"
        href="https://www.linkedin.com/in/carlos-bermejo-p%C3%A9rez-82442437/"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={linkedInLogo}
          width="32"
          alt="https://www.linkedin.com/in/carlos-bermejo-p%C3%A9rez-82442437/"
        />
      </a>
      <a
        className="navbar-item"
        href="mailto:carlos.bermejo@oup.com"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img
          src={mailLogo}
          width="34"
          height="37"
          alt="carlos.bermejo@oup.com"
        />
      </a>
      <a className="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/made-with-bulma.png"
          target="_blank"
          rel="noreferrer noopener"
          alt="Made with Bulma"
          width="128"
          height="24"
        />
      </a>
    </div>
  </nav>
);

import { socialFacebookImage, socialInstagramImage } from "@/assets";
import {
  container,
  shell,
  socialIcon,
  socialLink,
  socials,
  subtitle,
  title,
} from "./Footer.styles";

const Footer = () => {
  return (
    <footer className={shell()}>
      <div className={container()}>
        <h2 className={title()}>RetailMax</h2>
        <p className={subtitle()}>
          Curated products, secure checkout, and a cleaner shopping workflow.
        </p>
        <div className={socials()}>
          <a
            aria-label="Visit RetailMax on Facebook"
            className={socialLink()}
            href="https://facebook.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Facebook"
              className={socialIcon()}
              src={socialFacebookImage}
            />
          </a>
          <a
            aria-label="Visit RetailMax on Instagram"
            className={socialLink()}
            href="https://instagram.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Instagram"
              className={socialIcon()}
              src={socialInstagramImage}
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

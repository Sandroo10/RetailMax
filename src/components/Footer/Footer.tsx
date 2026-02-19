import { socialFacebookImage, socialInstagramImage } from "@/assets";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    <footer className={shell()}>
      <div className={container()}>
        <h2 className={title()}>RetailMax</h2>
        <p className={subtitle()}>{t("footer.tagline")}</p>
        <div className={socials()}>
          <a
            aria-label={t("footer.facebookAria")}
            className={socialLink()}
            href="https://facebook.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={t("footer.facebook")}
              className={socialIcon()}
              src={socialFacebookImage}
            />
          </a>
          <a
            aria-label={t("footer.instagramAria")}
            className={socialLink()}
            href="https://instagram.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt={t("footer.instagram")}
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

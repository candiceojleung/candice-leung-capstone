import "./Footer.scss";
import SocialMedia from "../SocialMedia/SocialMedia";

function Footer() {

    const socialInfo = [
      {
        href: "http://facebook.com",
        icon: "./src/assets/icons/facebook.svg",
        alt: "facebook",
      },
      {
        href: "http://x.com",
        icon: "./src/assets/icons/twitter.svg",
        alt: "twitter",
      },
      {
        href: "http://instagram.com",
        icon: "./src/assets/icons/instagram.svg",
        alt: "instagram",
      },
    ];
  
    const footerInfo = ["© 2025 periodic.ally", "contact us"];
  
    return (
      <section className="footer">
        <div className="footer__desktop-container">
          <div className="footer__tablet-container">
                <p className="footer__title">periodic.ally</p>
          </div>
          <div className="footer__social">
            {socialInfo.map((info, index) => (
              <SocialMedia key={index} {...info} />
            ))}
          </div>
        </div>

          <div className="footer__copyright">
            {footerInfo.map((text, index) => (
              <p key={index} className="footer__info">
                {text}
              </p>
            ))}
          </div>
      </section>
    );
  }
  
  export default Footer;
  
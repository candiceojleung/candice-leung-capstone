import "./Footer.scss";
import SocialMedia from "../SocialMedia/SocialMedia";
import { Link } from "react-router-dom";

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

  const contactInfo = [
    { label: "Email", value: "support@periodic.ally.com" },
    { label: "Phone", value: "+1 (555) 123-4567" },
    { label: "Address", value: "123 Menstrual Ave, Cycle City, PC 12345" },
  ];

  const footerLinks = [
    { label: "About Us", path: "/about" },
    { label: "FAQs", path: "/faqs" },
  ];
  return (
    <section className="footer">
      <div className="footer__desktop-container">
        <div className="footer__tablet-container">
          <p className="footer__title">periodic.ally</p>
        </div>
      </div>

      <div className="footer__links">
        <h3 className="footer__links-title">Quick Links</h3>
        <ul className="footer__links-list">
          {footerLinks.map((link, index) => (
            <li key={index} className="footer__links-item">
              <Link to={link.path}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__contact">
        <h3 className="footer__contact-title">Contact Us</h3>
        <ul className="footer__contact-list">
          {contactInfo.map((info, index) => (
            <li key={index} className="footer__contact-item">
              <strong>{info.label}:</strong> {info.value}
            </li>
          ))}
        </ul>
      </div>

      <div className="footer__social">
        {socialInfo.map((info, index) => (
          <SocialMedia key={index} {...info} />
        ))}
      </div>

      <div className="footer__copyright">
        <p className="footer__info">© 2025 periodic.ally</p>
      </div>
    </section>
  );
}

export default Footer;

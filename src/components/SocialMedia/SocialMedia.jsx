import "./SocialMedia.scss";

const SocialMedia = ({ href, icon, alt }) => (
  <a className="social__platform" href={href}>
    <img className="social__icon" src={icon} alt={alt} />
  </a>
);

export default SocialMedia;

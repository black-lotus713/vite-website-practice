import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaAirbnb, FaLinkedin, FaHome } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import './Footer.css';
import { propertyData } from '../../data/propertyData';
import type { SocialMediaLink } from '../../types';

const iconMap: Record<SocialMediaLink['platform'], IconType> = {
  facebook: FaFacebook,
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  airbnb: FaAirbnb,
  vrbo: FaHome,
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { propertyInfo, host } = propertyData;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/amenities">Amenities</Link></li>
            <li><Link to="/location">Location</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Booking</h3>
          <ul className="footer-links">
            <li><Link to="/book">Reserve Now</Link></li>
            <li><Link to="/reviews">Guest Reviews</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect</h3>
          <div className="social-links">
            {host.socialLinks?.map((link) => {
              const Icon = iconMap[link.platform];
              if (!Icon) {
                return null;
              }
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} {propertyInfo.subtitle || propertyInfo.title}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

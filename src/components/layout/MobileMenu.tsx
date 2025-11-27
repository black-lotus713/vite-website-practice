import { NavLink } from 'react-router-dom';
import './MobileMenu.css';

interface NavLinkItem {
  path: string;
  label: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLinkItem[];
}

const MobileMenu = ({ isOpen, onClose, navLinks }: MobileMenuProps) => {
  return (
    <>
      <div
        className={`mobile-menu-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        <nav className="mobile-nav">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive ? 'mobile-nav-link active' : 'mobile-nav-link'
                  }
                  onClick={onClose}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;

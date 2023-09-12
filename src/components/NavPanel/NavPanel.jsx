import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';

import './NavPanel.scss';

export const NavPanel = ({ toggleModal }) => {
    return (
        <div className="navigation">
            <div className="nav-icon">
                <NavLink to="/explore"> Crabble </NavLink>
            </div>
            <ul className="nav-tabs">
                <li>
                    <NavLink to="/about"> How it works? </NavLink>
                </li>
                <li>
                    <NavLink to="/explore"> Explore </NavLink>
                </li>
                <li>
                    <NavLink to="/contact"> Contact Us </NavLink>
                </li>
            </ul>
            <div className="nav-controls">
                <button onClick={toggleModal}>Rent Your NFT</button>
                <button>My Wallet</button>
                <AccountCircleIcon />
            </div>
        </div>
    );
};

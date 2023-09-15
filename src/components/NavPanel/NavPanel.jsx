import './NavPanel.scss';

import { AccountCircle as AccountCircleIcon, ArrowBackIos as BackIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';

export const NavPanel = ({ toggleModal, toggleBag, bagOpen }) => {
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
                {bagOpen ? (
                    <button onClick={toggleBag} className="account-btn">
                        <BackIcon fontSize="small" />
                        Catalog
                    </button>
                ) : (
                    <>
                        <button onClick={toggleModal}>Rent Your NFT</button>
                        <button className="account-btn" onClick={toggleBag}>
                            <AccountCircleIcon />
                            My Bag
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

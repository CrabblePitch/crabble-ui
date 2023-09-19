import './NavPanel.scss';

import { AccountCircle as AccountCircleIcon, ArrowBackIos as BackIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const NavPanel = ({ toggleModal, toggleBag, bagOpen }) => {
    return (
        <AppBar position={"sticky"} color={'surface'}>
            <Toolbar sx={{justifyContent: 'space-between', boxShadow: 'line'}}>
                <Box sx={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    display:'inline-flex'
                }}>
                    <Button variant={'text'} >
                        <AccountCircleIcon sx={{color: "primary.contrastText", mr: 1}}  />
                        <NavLink to="/explore">
                            <Typography variant='h6' color='primary.contrastText' sx={{ textTransform: 'none'}}>
                                CRABBLE
                            </Typography>
                        </NavLink>
                    </Button>

                    <Button variant={'text'} >
                        <NavLink to="/about">
                            <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                                How it works?
                            </Typography>
                        </NavLink>
                    </Button>
                    <Button variant='text'>
                        <NavLink to="/explore">
                            <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                                Explore
                            </Typography>
                        </NavLink>
                    </Button>
                    <Button variant='text'>
                        <NavLink to="/contact">
                            <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                                Contact Us
                            </Typography>
                        </NavLink>
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                    {bagOpen ? (
                        <>
                            <Button variant='contained' onClick={toggleBag}>
                                <BackIcon />
                                <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                                    Catalog
                                </Typography>
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button variant='contained' sx={{
                                flexGrox: 1, mr: 2
                            }} onClick={toggleModal}>
                                <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                                Rent Your NFT
                            </Typography>
                            </Button>
                            <Button variant='contained' onClick={toggleBag} sx={{ flexGrox: 1, backgroundColor: 'primary' }}>
                                <AccountCircleIcon />
                                <Typography color='primary.contrastText' sx={{ textTransform: 'none', ml: 1}}>
                                    My Bag
                                </Typography>
                            </Button>
                        </>
                    )
                    }

                </Box>
            </Toolbar>
        </AppBar>
    );
};

/**
 * {bagOpen ? (
 *                     <button onClick={toggleBag} className="account-btn">
 *                         <BackIcon fontSize="small" />
 *                         Catalog
 *                     </button>
 *                 ) : (
 *                     <>
 *                         <button onClick={toggleModal}>Rent Your NFT</button>
 *                         <button className="account-btn" onClick={toggleBag}>
 *                             <AccountCircleIcon />
 *                             My Bag
 *                         </button>
 *                     </>
 *                 )}
 */
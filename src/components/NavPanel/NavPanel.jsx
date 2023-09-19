import './NavPanel.scss';

import { AccountCircle as AccountCircleIcon, ArrowBackIos as BackIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, SvgIcon, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import CrabbleIcon from "../CrabbleIcon.jsx";

export const NavPanel = ({ toggleModal, toggleBag, bagOpen }) => {
    return (
        <AppBar position={"sticky"} color={'surface'}>
            <Toolbar sx={{justifyContent: 'space-between', boxShadow: 'line', p: 0}}>
                <Box sx={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    display:'inline-flex'
                }}>
                    <Button variant={'text'} sx={{p: 0, m: 0}}>
                        <NavLink to="/explore">
                            <CrabbleIcon/>
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
                            <Button variant='contained' color={'secondary'} onClick={toggleBag}>
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
                            }} color={'secondary'} onClick={toggleModal}>
                                <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                                Rent Your NFT
                            </Typography>
                            </Button>
                            <Button variant='contained' color={'secondary'} onClick={toggleBag} sx={{ flexGrox: 1, backgroundColor: 'primary' }}>
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

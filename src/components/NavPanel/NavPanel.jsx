import './NavPanel.scss';

import { AccountBoxOutlined as AccountBoxOutlined, ArrowBackIos as BackIcon } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, IconButton, SvgIcon, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import CrabbleIcon from "../CrabbleIcon.jsx";
import useStore from "../../store/store.js";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet.jsx";

export const NavPanel = ({ toggleModal, toggleBag, bagOpen }) => {
    const wallet = useStore(state => state.wallet);

    const getNavBtnsWhenConnected = () => {
      return (
          <>
              {bagOpen ? (
                  <>
                      <Button variant='contained' color={'secondary'} onClick={toggleBag}>
                          <BackIcon />
                          <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                              <b>catalog</b>
                          </Typography>
                      </Button>
                  </>
              ) : (
                  <>
                      <Button variant='contained' sx={{
                          flexGrox: 1, mr: 2
                      }} color={'secondary'} onClick={toggleModal}>
                          <Typography color='primary.contrastText' sx={{ textTransform: 'none'}}>
                              <b>rent yours</b>
                          </Typography>
                      </Button>
                      <Button variant='contained' color={'secondary'} onClick={toggleBag} sx={{ flexGrox: 1, backgroundColor: 'primary' }}>
                          <AccountBoxOutlined />
                          <Typography color='primary.contrastText' sx={{ textTransform: 'none', ml: 1}}>
                              <b>on rent</b>
                          </Typography>
                      </Button>
                  </>
              )
              }
          </>
      )
    };

    return (
        <AppBar position={"sticky"} color={'surface'}>
            <Toolbar sx={{justifyContent: 'space-between', boxShadow: 'line', p: 0}}>
                <Box sx={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    display:'inline-flex'
                }}>
                    <Button variant={'text'} sx={{p: 0, m: 0, ml: 2}}>
                        <NavLink to="/explore">
                            <CrabbleIcon/>
                        </NavLink>
                    </Button>

                    <Button variant='text'>
                        <NavLink to="/explore">
                            <Typography color='primary.contrastText' variant='h6' sx={{ textTransform: 'none', ml:1}}>
                                inventory
                            </Typography>
                        </NavLink>
                    </Button>
                    <Button variant={'text'} >
                        <NavLink to="/about">
                            <Typography color='primary.contrastText' variant='h6' sx={{ textTransform: 'none', ml:1}}>
                                concept
                            </Typography>
                        </NavLink>

                    </Button>
                    <Button variant='text'>
                        <NavLink to="/contact">
                            <Typography color='primary.contrastText' variant='h6' sx={{ textTransform: 'none', ml:1}}>
                                contacts
                            </Typography>
                        </NavLink>
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                    {wallet ? getNavBtnsWhenConnected() : <ConnectWallet/>}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

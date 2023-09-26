import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import CrabbleIcon from "./CrabbleIcon.jsx";
import Typography from "@mui/material/Typography";
// import { ConnectWallet } from "../../../src/components/ConnectWallet/ConnectWallet.jsx";

const Navbar = (props) => {
  return (
      <AppBar position={"sticky"} color={'surface'}>
          <Toolbar sx={{justifyContent: 'space-between', boxShadow: 'line', p: 0}}>
              <Box sx={{
                  flexGrow: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  display:'inline-flex'
              }}>
                  <Button variant={'text'} sx={{p: 0, m: 0, pointerEvents: 'none'}}>
                      <CrabbleIcon/>
                  </Button>

                  <Button variant={'text'} >
                      <NavLink to="/greatMonkeys">
                          <Typography variant={'subtitle1'} color='primary.contrastText' sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                              Great Monkeys
                          </Typography>
                      </NavLink>
                  </Button>
                  <Button variant='text'>
                      <NavLink to="/awesomeCollection">
                          <Typography color='primary.contrastText' sx={{ textTransform: 'none', fontWeight: 'bold'}}>
                              Awesome Collection
                          </Typography>
                      </NavLink>
                  </Button>
                  <Button variant='text'>
                      <NavLink to="/chainboardTicket">
                          <Typography color='primary.contrastText' sx={{ textTransform: 'none', fontWeight: 'bold'}}>
                              Chainboard Ticket
                          </Typography>
                      </NavLink>
                  </Button>
                  <Button variant='text'>
                      <NavLink to="/crabbleIst">
                          <Typography color='primary.contrastText' sx={{ textTransform: 'none', fontWeight: 'bold'}}>
                              CrabbleIST
                          </Typography>
                      </NavLink>
                  </Button>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
                  <Button variant={"contained"} color={"secondary"}>Connect Wallet</Button>
              </Box>
          </Toolbar>
      </AppBar>
  )
};

export default Navbar;


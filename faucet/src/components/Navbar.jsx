import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import CrabbleIcon from "./CrabbleIcon.jsx";
import Typography from "@mui/material/Typography";
import ConnectWallet from "./ConnectWallet.jsx";
import useStore from "../store.js";
import DoneIcon from '@mui/icons-material/Done';

const Navbar = (props) => {
    const wallet = useStore(state => state.wallet);

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
                  {wallet ? (
                          <Button variant={'contained'} color={'secondary'} startIcon={<DoneIcon/>} sx={{ pointerEvents: 'none'}}>
                              Wallet Connected
                          </Button>) :
                      (<ConnectWallet/>)
                  }
              </Box>
          </Toolbar>
      </AppBar>
  )
};

export default Navbar;


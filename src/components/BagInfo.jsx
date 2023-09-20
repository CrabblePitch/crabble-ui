import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { AccountCircle } from "@mui/icons-material";

const testData = {
    address: 'agoric1cjua9sp5adzyee38nnj77gft3e3yprryeusu4w',
    renting: 2,
    borrowing: 0,
    rentalFeeBalance: {
        IST: { brand: {}, value: 100n},
        USDC_axl: { brand: {}, value: 90n},
        USDT_grv: { brand: {}, value: 90n},
    },
    collateralAmount: {
        IST: { brand: {}, value: 100n},
        USDC_axl: { brand: {}, value: 90n},
        USDT_grv: { brand: {}, value: 90n},
    }
}

const BagInfo = () => {
  return (
      <Box sx={{width: '100%' }}>
          <Grid container>
              <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', pl: 2, pt: 1}}>
                      <AccountCircle color='altText' />
                      <Typography variant='h6' ml={1} sx={{ color: 'altText.main'}}>
                          {testData.address}
                      </Typography>
                  </Box>
              </Grid>
              <Grid item xs={2} mt={2}>
                  <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2}}>
                      Renting
                  </Typography>
                  <Divider sx={{ color: 'line' }}/>
                  <Typography variant='subtitle2' ml={1} sx={{ color: (theme) => theme.palette.line.main, ml: 2}}>
                      {testData.renting}
                  </Typography>
              </Grid>
              <Grid item xs={2} mt={2}>
                  <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2}}>
                      Borrowing
                  </Typography>
                  <Divider sx={{ color: 'line' }}/>
                  <Typography variant='subtitle2' ml={1} sx={{ color: (theme) => theme.palette.line.main, ml: 2}}>
                      {testData.borrowing}
                  </Typography>
              </Grid>
              <Grid item xs={4} mt={2}>
                  <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2}}>
                      Rental Fee Balance
                  </Typography>
                  <Divider sx={{ color: 'line' }}/>
                  <Box sx={{ maxHeight: 100, overflow: 'auto'}}>
                      {[...Object.entries(testData.rentalFeeBalance)].map(([key, value]) => (
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                              <Typography variant='subtitle1' ml={1} sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2}}>
                                  {Number(value.value)}
                              </Typography>
                              <Typography variant='subtitle2' ml={1} sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2}}>
                                  {key}
                              </Typography>
                          </Box>
                      ))}
                  </Box>
              </Grid>
              <Grid item xs={4} mt={2}>
                  <Typography variant='subtitle1' ml={1} sx={{ color: 'altText.main', ml: 2}}>
                      Collateral Balance
                  </Typography>
                  <Divider sx={{ color: 'line' }}/>
                  <Box sx={{ maxHeight: 100, overflow: 'auto'}}>
                      {[...Object.entries(testData.collateralAmount)].map(([key, value]) => (
                          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                              <Typography variant='subtitle1' ml={1} sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2}}>
                                  {Number(value.value)}
                              </Typography>
                              <Typography variant='subtitle2' ml={1} sx={{ color: (theme) => theme.palette.onSurfaceTextDark.main, ml: 2}}>
                                  {key}
                              </Typography>
                          </Box>
                      ))}
                  </Box>
              </Grid>
          </Grid>
      </Box>
  )
};

export default BagInfo;
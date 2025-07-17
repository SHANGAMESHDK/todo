import AxiosInstance from './AxiosInstance';
import { Box } from '@mui/material'
import Button from '@mui/material/Button';


function Home() {
  window.location.href = '/todo';

  const logoutUser = async () => {
    
      const response = await AxiosInstance.post('logoutall/');
      console.log('Logout response:', response.data);
      window.location.href = 'https://todo000.netlify.app/';
  };

  return (
    <div className={"myBackground"}> 
      <Box className={"whiteBox"}>
    
                    
        <Box className={"title"} fontSize={40} justifyContent={'center'} textAlign={'center'}  >Successfully Loged In </Box>
        <Box className={"logout_item"} padding={13}>
        
          <Button type="submit" variant="contained" className={"aButton"} onClick={logoutUser}>Logout</Button>
        </Box>
      </Box>
    </div>
    
  )
}

export default Home;

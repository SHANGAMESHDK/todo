import '../App.css'
import {useState} from 'react'
import { Box } from '@mui/material'
import MyTextField from './forms/MyTextField'
import MyPassField from './forms/MyPassField'
import {Link} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import AxiosInstance from './AxiosInstance'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

const MyMessage = ({text, color}) =>{
    return(
        <Box sx={{
            backgroundColor: color, 
            color:'#FFFFFF', 
            width: '90%', 
            height: '40px',
            position:'absolute', 
            top:'20px', 
            display:'flex', 
            justifyContent:'center', 
            alignItems:'center'
            }}>
            {text}
        </Box>
    )
}

const Login = () =>{
    const navigate = useNavigate()
    const {handleSubmit, control} = useForm()
    const [ShowMessage, setShowMessage] = useState(false)

    const submission = (data) => {
        AxiosInstance.post(`login/`,{
            email: data.email, 
            password: data.password,
        })

        .then((response) => {
            console.log(response)
            localStorage.setItem('Token', response.data.token)
            navigate(`/home`)
        })
        .catch((error) => {
            setShowMessage(true)
            console.error('Error during login', error)
        })
    }
    

    return(
        <div className={"myBackground"}> 
            {ShowMessage ? <MyMessage text={"Login has failed, please try again, or reset your password"} color={'#EC5A76'}/> : null}
            <form onSubmit={handleSubmit(submission)}>
            <Box className={"whiteBox"}>

                <Box className={"itemBox"}>
                    <Box className={"title"} fontSize={40}> Login </Box>
                </Box>

                <Box className={"itemBox"}>
                    <MyTextField
                    label={"Email"}
                    name ={"email"}
                    control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <MyPassField
                    label={"Password"}
                    name ={"password"}
                    control={control}
                    />
                </Box>

                <Box className={"itemBox"}>
                    <Button type="submit" variant="contained" className={"myButton"}>Login</Button>
                </Box>    

                <Box className={"itemBox"} sx={{flexDirection:'column'}}>
                    <Link to="/register"> Register Here ! </Link>
                    
                </Box>


            </Box>

        </form>
            
        </div>
    )

}

export default Login
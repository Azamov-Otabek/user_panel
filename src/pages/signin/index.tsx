import "./style.scss"
import {Section} from '@containers'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";


const index = () => {
   const navigate = useNavigate()

   async function formSubmit(e: any) {
      e.preventDefault();
      const user = {
         username: e.target[0].value,
         password: e.target[2].value
      }
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      axios.post('http://45.138.158.252:3000/auth/login', user).then((response) => {
         if(response.status === 201){
            localStorage.setItem('token', response.data.accessToken)
            toast.success("Login successfuly", { autoClose: 1200})
            setTimeout(() => {
               navigate('/mainlayout')
            }, 1600);
         }
      })
   }

    return (
       <>
       <ToastContainer/>
          <Section>
                <div className="w-[600px] mx-auto mt-[200px] border p-[40px]">
                     <form onSubmit={(e) => formSubmit(e)}>
                        <label className="block w-full mb-[30px]">
                           <TextField  autoComplete="off" id="outlined-basic" label="Enter your username" variant="outlined" className="w-full"/>
                        </label>
                        <label className="block w-full mb-[30px]">
                           <TextField  autoComplete="off" id="outlined-basic" label="Enter your password" variant="outlined" className="w-full"/>
                        </label>
                        <div className="flex flex-col gap-[20px]">
                           <Button variant="contained" type="submit" className="w-full">Sign In</Button>
                           <Link  to="/singup"> <Button variant="outlined" className="w-full">Sign Up</Button></Link>
                        </div>
                     </form>
                </div>
          </Section>
       </>
    );
};

export default index;
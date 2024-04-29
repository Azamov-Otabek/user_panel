import "./style.scss"
import {Section} from '@containers'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import {login} from '@plugins/auth.js'
import * as yup from 'yup'
import { useState } from "react";
import crudFactory from "../../store";

const index = () => {
   const navigate = useNavigate()
   const {login} = crudFactory()
   const [error, setError] = useState({
      username: '',
      password: '',
   })
   const userValidate = yup.object().shape({
      username: yup.string().required('Username is required'),
      password: yup.string().required('Password is required')
   })
   async function formSubmit(e: any) {
      e.preventDefault();
      const user = {
         username: e.target[0].value,
         password: e.target[2].value
      }
   
      try{
         let validateError = { username: '', password: '',}
         setError(validateError);
         await userValidate.validate(user, {abortEarly: false})
         const response = await login(user)
         if(response.status === 201){
            toast.success("Login successfuly", { autoClose: 1200})
            setTimeout(() => {
               navigate('/mainlayout')
            }, 1600);
         }
      }catch(err){
         console.log(1);
         let validateError = { username: '', password: '',}
         setError(validateError);
         err.inner.forEach(errorr => {
            validateError[errorr.path] = errorr.message
         })
         setError(validateError)
      }
   }

    return (
       <>
       <ToastContainer/>
          <Section>
                <div className="w-[600px] mx-auto mt-[200px] border p-[40px]">
                     <form onSubmit={(e) => formSubmit(e)}>
                        <label className="block w-full mb-[30px]">
                           <TextField  autoComplete="off" id="outlined-basic" label="Enter your username" variant="outlined" className="w-full"/>
                           {error && <p className="text-[red] font-medium">{error.username}</p>}
                        </label>
                        <label className="block w-full mb-[30px]">
                           <TextField  autoComplete="off" id="outlined-basic" label="Enter your password" type="password" variant="outlined" className="w-full"/>
                           {error && <p className="text-[red] font-medium">{error.password}</p>}
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
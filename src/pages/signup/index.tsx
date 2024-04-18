import { Link, useNavigate } from "react-router-dom";
import "./style.scss"
import {Section} from '@containers'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import axios from "axios";
import { useState , useEffect} from "react";


const index = () => {

   let navigate = useNavigate()
   const [data, setData]:any = useState([])
   function getData(){
      axios.get('http://localhost:3000/users').then(response => setData(response.data));
   }
   

   function formSubmit(e:any) {
       e.preventDefault();
       const user = {
          name: e.target[0].value,
          email: e.target[2].value,
          password: e.target[4].value
       }
       let son = 0
       if(user.password.trim().length && user.name.trim().length && user.email.trim().length) {
         data.forEach((e:any) => {
            if(e.email === user.email || e.username === user.name) {
               son+=1
               alert("this email or username is already")
            }
         });

         if(son == 0){
               axios.post('http://localhost:3000/users', user)
               navigate('/')
               window.location.reload()
         }
       }else{
          alert("Please fill all the fields")
       }
   }
   useEffect(() => {
      getData()
   }, [])

    return (
        <Section>
                <div className="w-[600px] mx-auto mt-[200px] border p-[40px]">
                     <form onSubmit={(e) => formSubmit(e)}>
                        <label className="block w-full mb-[30px]">
                           <TextField autoComplete="off" id="outlined-basic" label="Enter your username" variant="outlined" className="w-full"/>
                        </label>
                        <label className="block w-full mb-[30px]">
                            <TextField autoComplete="off" id="outlined-basic" label="Enter your email" variant="outlined" className="w-full" />
                        </label>
                        <label className="block w-full mb-[30px]">
                           <TextField autoComplete="off" id="outlined-basic" label="Enter your password" variant="outlined" className="w-full"/>
                        </label>
                        <div className="flex flex-col gap-[20px]">
                           <Button variant="contained" type="submit" className="w-full">Sign Up</Button>
                           <Link to="/"><Button variant="outlined" className="w-full">Sign In</Button></Link>
                        </div>
                      
                     </form>
                </div>
          </Section>
    );
};

export default index;
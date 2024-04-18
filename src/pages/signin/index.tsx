import "./style.scss"
import {Section} from '@containers'
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState} from "react";


const index = () => {
   const url = 'http://localhost:3000'
   const [data, setData]:any = useState([])
   const navigate = useNavigate()
   function getData(){
      axios.get(url + '/users').then(response => setData(response.data));
   }

   function formSubmit(e: any) {
      e.preventDefault();
      let username = e.target[0].value
      let password = e.target[2].value
      if(username.trim().length && password.trim().length){
           data.forEach((element:any) => {
               if(username == element.name && password == element.password){
                  localStorage.setItem('token', "token" + Math.trunc(Math.random() * 2000))
                  navigate('/mainlayout')
               }
           });
      }else{
         alert("Please fill all the fields")
      }
   }

   useEffect(() => {
      getData()
   }, [])

   if(localStorage.getItem('token')){
      navigate('/mainlayout')
   }

    return (
       <>
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
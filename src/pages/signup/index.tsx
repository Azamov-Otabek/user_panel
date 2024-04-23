import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "@containers";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import * as yup from 'yup';
import {register} from "@plugins/auth.js"

const index = () => {
  let navigate = useNavigate();
  const [error, setError] = useState({
    username: "" ,
    password: "",
    phone: "",
  })

  const userValidate = yup.object().shape({
    username: yup.string().min(6, "User need min 6 characters").required('Username is required'),
    password: yup.string().min(6, "Password need min 6 characters").required('Password is required'),
    phone: yup.string().matches(/^\+998\d{9}$/, 'Nomer togri kelmayapti !').required('Phone number is required')
})

  async function formSubmit(e: any) {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      password: e.target[2].value,
      phone: e.target[4].value,
    };

    try{
      await userValidate.validate(user, {abortEarly: false});
      let errormessage = {username: "" , password: "", phone: ""}
      setError(errormessage)
      const response = await register('/auth/register', user)
      if(response.status == 201){
        toast.success("Successfully registered", { autoClose: 1200 });
        setTimeout(() => {
          navigate("/");
        }, 1600);
      }
    }catch(err:any){
      toast.error("Something went wrong", { autoClose: 1200 });  
      let validateError = {}
      err.inner.forEach(errorr => {
        validateError[errorr.path] = errorr.message
      })
      setError(validateError)
    }
  }

  return (
    <>
      <ToastContainer />
      <Section>
        <div className="w-[600px] mx-auto mt-[200px] border p-[40px]">
          <form onSubmit={(e) => formSubmit(e)}>
            <label className="block w-full mb-[30px]">
              <TextField
                autoComplete="off"
                id="outlined-basic"
                label="Enter your username"
                variant="outlined"
                className="w-full"
              />
              {error && <p className="text-[red] font-medium">{error.username}</p>}
            </label>
            <label className="block w-full mb-[30px]">
              <TextField
                autoComplete="off"
                id="outlined-basic"
                type="password"
                label="Enter your passowrd"
                variant="outlined"
                className="w-full"
              />
              {error && <p className="text-[red] font-medium">{error.password}</p>}
            </label>
            <label className="block w-full mb-[30px]">
              <TextField
                autoComplete="off"
                id="outlined-basic"
                label="Enter your phone number"
                variant="outlined"
                className="w-full"
              />
              {error && <p className="text-[red] font-medium">{error.phone}</p>}
            </label>
            <div className="flex flex-col gap-[20px]">
              <Button variant="contained" type="submit" className="w-full">
                Sign Up
              </Button>
              <Link to="/">
                <Button variant="outlined" className="w-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </Section>
    </>
  );
};

export default index;

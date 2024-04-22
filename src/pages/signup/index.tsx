import { Link, useNavigate } from "react-router-dom";
import "./style.scss";
import { Section } from "@containers";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";

const index = () => {
  let navigate = useNavigate();
  const [error, setError] = useState({})

  async function formSubmit(e: any) {
    e.preventDefault();
    const user = {
      username: e.target[0].value,
      password: e.target[2].value,
      phone: e.target[4].value,
    };

    let errormessage = {
      username: "",
      password: "",
      phone: "",
    }
    setError(errormessage)

    if(user.username.trim().length < 1) {
      errormessage.username = "Username is required"
    }else if(user.username.trim().length < 6 ) {
      errormessage.username = "Username minumim 6 characters"
    }

    if(user.password.trim().length == 0) {
      errormessage.password = "Password is required"
    }else if(user.password.trim().length < 6){
      errormessage.password = "Password minumim 6 characters"
    }

    if(user.phone.trim().length == 0) {
      errormessage.phone = "Phone is required"
    }else if(user.phone.trim().length < 6){
      errormessage.phone = "Phone minumim 6 characters"
    }
    
    setError(errormessage)

    if(errormessage.username == "" && errormessage.password == "" && errormessage.phone == ""){
      axios
      .post("http://45.138.158.252:3000/auth/register", user)
      .then((response) => {
        if (response.status == 201) {
          toast.success("Successfully registered", { autoClose: 1200 });
          setTimeout(() => {
            navigate("/");
          }, 1600);
        }
      }).catch(error=>{
        if(error.response.status != 201) {
          toast.error("Something went wrong", { autoClose: 1200 });
        }
      });
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

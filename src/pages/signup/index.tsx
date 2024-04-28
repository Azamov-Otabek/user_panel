import "./style.scss";
import { Link, useNavigate } from "react-router-dom";
import { Section } from "@containers";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import * as yup from 'yup';
import {register} from "@plugins/auth.js"
import { Formik, Form, Field, ErrorMessage } from "formik";

const index = () => {
  let navigate = useNavigate();
  const userValidate = yup.object().shape({
    username: yup.string().min(6, "User need min 6 characters").required('Username is required'),
    password: yup.string().min(6, "Password need min 6 characters").required('Password is required'),
    phone: yup.string().matches(/^\+998\d{9}$/, 'Nomer togri kelmayapti !').required('Phone number is required')
})

    let initialValues = {
      username: '',
      password: '',
      phone: '',
    };

  async function formSubmit(value:any) {
      try{
        const response = await register('/auth/register', value )
          if(response.status == 201){
            toast.success("Successfully registered", { autoClose: 1200 });
            setTimeout(() => {
              navigate("/");
            }, 1600);
          }else{
            toast.error("Something went wrong", { autoClose: 1200 });  
          }
      }catch(err){
          toast.error("Something went wrong", { autoClose: 1200 });  
      }
  }

  return (
    <>
      <ToastContainer />
      <Section>
        <div className="w-[600px] mx-auto mt-[200px] border p-[40px]">
           <Formik initialValues={initialValues} validationSchema={userValidate} onSubmit={formSubmit}>
           <Form>
              <label className="block w-full mb-[30px]">
                <Field
                  autoComplete="off"
                  id="outlined-basic"
                  label="Enter your username"
                  variant="outlined"
                  className="w-full"
                  name="username"
                  as={TextField}
                />
                <ErrorMessage name="username" component={'p'} className="text-[red]"/>
              </label>
              <label className="block w-full mb-[30px]">
                <Field
                  autoComplete="off"
                  id="outlined-basic"
                  type="password"
                  label="Enter your passowrd"
                  variant="outlined"
                  className="w-full"
                  as={TextField}
                  name="password"
                />
                <ErrorMessage name="password" component={'p'} className="text-[red]"/>
              </label>
              <label className="block w-full mb-[30px]">
                <Field
                  autoComplete="off"
                  id="outlined-basic"
                  label="Enter your phone number"
                  variant="outlined"
                  className="w-full"
                  as={TextField}
                  name="phone"
                />
                <ErrorMessage name="phone" component={'p'} className="text-[red]"/>
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
              </Form>
           </Formik>
        </div>
      </Section>
    </>
  );
};

export default index;

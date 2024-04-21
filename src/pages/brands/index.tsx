import axios from "axios"
import { ReactNode, useEffect, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import { ToastContainer, toast } from "react-toastify";

export default function index() {
  let token = localStorage.getItem('token')
  let [brands, setBrands] = useState([])
  function getBrands(){
     axios.get('http://45.138.158.252:3000/brands', {
        headers:{
          'Authorization' : 'Bearer ' + token
        }
     }).then(response => setBrands(response.data));
  }


  function renderBrands(e:any){
      e.preventDefault();
      let new_brand = e.target[0].value
      
      // axios.post('http://45.138.158.252:3000/brands', new_brand, {
      //   headers:{
      //     'Authorization' : 'Bearer ' + token
      //   }
      // }).then(response => console.log(response));
      
  }

  useEffect(() =>{
    getBrands()
  }, [])
  return (
    <>
    <ToastContainer/>
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            className="font-bold"
          >
            Add Brands
          </AccordionSummary>
          <AccordionDetails>
              <form id="brand_form" onSubmit={(e) => renderBrands(e)}>
                <TextField autoComplete="off" className="w-full " id="standard-basic" label="Enter your Brands" variant="standard" />
                <AccordionActions>
                  <Button id="brand_form" type="submit">Agree</Button>
                </AccordionActions>
              </form>
          </AccordionDetails>
        </Accordion>
  </div>  
    </>
  )
}

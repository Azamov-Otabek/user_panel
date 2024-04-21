import axios from "axios"
import { useEffect, useState } from "react"
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
     axios.get('http://45.138.158.252:3000/products', {
        headers:{
          'Authorization' : 'Bearer ' + token
        }
     }).then(response => setBrands(response.data));
    }


  function postBrands(e:any){
      e.preventDefault();
      let new_brand = {
        name: e.target[0].value,
        price: +e.target[1].value,
        imageUr: e.target[2].value,
        modelId: +e.target[3].value,
        brandId: +e.target[4].value
      }
      
      axios.post('http://45.138.158.252:3000/products', new_brand, {
        headers:{
          'Authorization' : 'Bearer ' + token
        }
      });

      getBrands()
      
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
            Add Products
          </AccordionSummary>
          <AccordionDetails>
              <form id="brand_form" onSubmit={(e) => postBrands(e)}>
                <TextField autoComplete="off" className="w-full " id="standard-basic" label="Enter your Producs name" variant="standard" />
                <TextField autoComplete="off" className="w-full " id="standard-basic" label="Enter your Producs price" variant="standard" />
                <TextField autoComplete="off" className="w-full " id="standard-basic" label="Enter your Producs imageURL" variant="standard" />
                <TextField autoComplete="off" className="w-full " id="standard-basic" label="Enter your Producs modelId" variant="standard" />
                <TextField autoComplete="off" className="w-full " id="standard-basic" label="Enter your Producs brandId" variant="standard" />
                <AccordionActions>
                  <Button id="brand_form" type="submit">Agree</Button>
                </AccordionActions>
              </form>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="mt-[100px]">
        <h1 className="font-bold text-[40px] mb-[30px] text-center">PRODUCTS LIST</h1>
          {
            brands.map((data):any => {
              {
                return (
                  
                  <div key={data.id} className="p-[10px] mb-[10px] bg-[#14224e]">
                    <h1 className="font-bold text-white">{data.name}</h1>
                    <p className="text-white font-medium">Price: {data.price}$</p>
                  </div>
                )
              }
           })
          }
      </div>  
    </>
  )
}

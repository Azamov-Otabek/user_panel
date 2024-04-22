import { useEffect, useState } from "react"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccordionActions from '@mui/material/AccordionActions';
import { ToastContainer} from "react-toastify";
import https from '@plugins/axios.js'

export default function index() {
  let [image, setImage] = useState('')
  let [modelbrand, setmodelbrand] = useState([])
  let [brandId, setbrandId] = useState([])
  let [brands, setBrands] = useState([])
  let [selectedbrand, setSelectedbrand] = useState('');
  let [selectedmodel, setSelectedmodel] = useState('');




  function getBrands(){
        https.get('/products').then(response => setBrands(response.data))
        https.get('/models').then(response => setmodelbrand(response.data))
        https.get('/brands').then(response => setbrandId(response.data))
  }



  function postBrands(e:any){
      e.preventDefault();
      let new_brand = {
        name: e.target[0].value,
        price: +e.target[1].value,
        imageUrl: image,
        modelId: +e.target[2].value,
        brandId: +e.target[3].value
      }
      console.log(new_brand);
      if(new_brand.name.trim().length && new_brand.price && new_brand.modelId && new_brand.brandId && new_brand.imageUrl.length){
        https.post('/products', new_brand)
      }
      console.log(new_brand);
  }

 function imagePost(e:any){
    e.preventDefault();
    let imageURL = new FormData()
    imageURL.append('file', e.target.files[0])
    https.post('/images/upload', imageURL).then(response => setImage(response.data.path));
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
                <div className="flex gap-10">
                  <select className=" w-[218px] p-[10px] outline-none bg-[#20205f] mt-[20px] rounded-lg text-white font-bold">
                    <option disabled selected>Enter your models</option>
                      {modelbrand.map(product => {
                        return (
                          <option value={product.id}>{product.name}</option>
                        )
                      })}
                  </select>
                  <select className="w-[218px] p-[10px] outline-none bg-[#20205f] mt-[20px] rounded-lg text-white font-bold">
                    <option disabled selected>Enter your brands</option>
                      {brandId.map(product => {
                        return (
                          <option value={product.id}>{product.name}</option>
                        )
                      })}
                  </select>
                </div>

                <div className="mt-[20px] mb-[10px] relative">
                  <input onChange={imagePost} className="opacity-0 w-[215px] relative z-10 p-[10px] " type="file" placeholder="Enter your Photo products"/>
                  <button className="bg-[#20205f] absolute left-0 p-[10px] rounded-lg text-white font-bold">Enter your Photo products</button>
                </div>
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

import { Outlet, useNavigate } from "react-router-dom"
import {Header, Sidebar} from "@components"
import { useEffect } from "react";
import {Flex} from "@containers"


export default function index() {

  let navigate = useNavigate()

  function token(){
    if(!localStorage.getItem('token')){
      navigate("/")
    }
  }


  useEffect(() => {
    token()
  }, [])


  return (
    <Flex>
       <Sidebar/>
       <div className="w-full">
          <Header />
          <div className="p-[30px]">
          <Outlet />
          </div>
       </div>
    </Flex>
  )
}
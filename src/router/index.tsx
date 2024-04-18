import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router-dom"
import App from "../App"
import {Singin, Singup, Brands, Models, Products} from "@pages"
import Layout from "@layout"


export default function Router() {
    const root = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<App/>}>
                <Route path="/" element={<Singin/>}/>
                <Route path="/singup" element={<Singup/>}/>
                <Route path="/mainlayout/*" element={<Layout/>}>
                    <Route path="brands" element={<Brands/>}/>
                    <Route path="models" element={<Models/>}/>
                    <Route path="products" element={<Products/>}/>
                </Route>
            </Route>
        )
    )

  return <RouterProvider router={root}/> 
}

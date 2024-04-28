import {Brands, Models, Products} from "@pages"

export const roots = [
    {
        name: "Products",
        path: 'products',
        element: <Products/>
    },
    {
        name: "Brands",
        path: 'brands',
        element: <Brands/>
    },
    {
        name: "Models",
        path:'models',
        element: <Models/>
    }
]
import { getProductApi } from "@/services/product";
import { IProductResponse } from "@/services/product/type";
import { useEffect, useState } from "react";
import Catalog from "./Catalog";
import { Link } from "react-router-dom";
import { PATH } from "@/constant/Route.constant";





export default function HomeComponents() {

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await getProductApi();
            setProducts(response.data);
        }
        fetchProducts();
    }, [])

    const [products, setProducts] = useState<IProductResponse[]>([])
    return (
        <Catalog products={products} />
    );
}


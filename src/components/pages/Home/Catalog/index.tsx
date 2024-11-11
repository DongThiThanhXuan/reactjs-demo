import { IProductResponse } from "@/services/product/type";

interface CatalogProps {
    products: IProductResponse[];
}
export default function Catalog({ products }: { products: IProductResponse[] }) {
    return (
        < >
            <ul>{products.map((product) => (
                <li key={product.id}>{product.name}- price {product.unitPrice} - </li>
            ))}</ul>
        </>

    )
}
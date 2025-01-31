import { useLocation } from "react-router";

const ProductList = () => {
    const location = useLocation();

    return (
        <>
            <h1>This is the {location.pathname} route</h1>
        </>
    )
};

export default ProductList;
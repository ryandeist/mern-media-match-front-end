// imports
import { useLocation } from "react-router"

// component
const ProductList = () => {
    // hooks
    const location = useLocation()

    // return
    return (
        <>
            <h1>This is the {location.pathname} route</h1>
        </>
    )
}

// export
export default ProductList
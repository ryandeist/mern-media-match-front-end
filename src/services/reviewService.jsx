// env variables
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`

// service functions and exports
export const createReview = async (productId, text) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                productId
            }),
        })
        return res.json()
    } catch (err) {
        console.log(err)        
    }
}
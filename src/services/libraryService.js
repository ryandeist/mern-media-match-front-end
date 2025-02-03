const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`

export const purchase = async (userId, product) => {
    try {
        console.log(userId)
        console.log(product)
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cart: product,
                userId: userId,
            })
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}
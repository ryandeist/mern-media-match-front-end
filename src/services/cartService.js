// env variables
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/carts`

// service functions and exports
export const addToCart = async (userId, gameData) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cart: gameData,
                userId: userId,
            })
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}

export const getUserCart = async (userId) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                userid: userId,
            },
        })
        const entireCart = await res.json()

        return entireCart
    } catch (err) {
        console.log(err)
    }
}

export const removeFromCart = async (userId, cartItemId) => {
    try {
        const res = await fetch(`${BASE_URL}/${cartItemId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                userid: userId,
            }
        })
        return res.json()
    } catch (err) {
        console.log(err)
    }
}
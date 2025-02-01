

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`


export const addToCart = async (userId, gameData) => {
    try {
        const res = await fetch(`${BASE_URL}/${userId}/shoppingCart`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(gameData)
    })
    return res.json()
    } catch (error) {
        console.log(error)
    }
}
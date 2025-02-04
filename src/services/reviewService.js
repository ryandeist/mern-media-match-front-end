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

export const findReviews = async (productId) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                productid: productId,
            },
        })
        return res.json()
    } catch (err) {
        console.log(err)        
    }
}

export const updateReview = async (productId, text) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'PUT',
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

export const deleteReview = async (productId) => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
                productid: productId,
            },
        })
        return res.json()
    } catch (err) {
        console.log(err)        
    }
}
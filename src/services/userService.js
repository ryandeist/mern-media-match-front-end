const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`
const API_KEY = import.meta.env.VITE_API_KEY
const API_URL = import.meta.env.API_URL
const CLIENT_ID = import.meta.env.CLIENT_ID

export const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    const data = await res.json()

    if (data.err) {
      throw new Error(data.err)
    }

    return data
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const showGame = async (genres) => {
    try {
        const headers = {
            'Client-ID': `${CLIENT_ID}`,
            'Authorization': `Bearer ${API_KEY}`,
        }

        const gameDataRes = await fetch(`${API_URL}/?genres=${genres.join(',')}`, {
            method: 'POST',
            headers: headers
        })
        const data = await gameDataRes.json()
        return data
    } catch (err) {
        console.log(err)
    }
}
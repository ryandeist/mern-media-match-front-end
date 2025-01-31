const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users/`

export const showSettings = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/${userId}/settings`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
    
    const savedSettings = await res.json()

    if (savedSettings.err) {
        throw new Error(savedSettings.err)
    }
  
    return savedSettings
    
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}


export const updateSettings = async () => {
  try {
    const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
// return res.json()    
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}

export const createSettings = async () => {
  try {
    const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
// return res.json()    
  } catch (err) {
    console.log(err)
    throw new Error(err)
  }
}
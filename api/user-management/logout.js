require('dotenv').config()


import axios from 'axios'

const supabaseUrl = process.env.TB_SUPABASE_URL
const supabaseKey = process.env.TB_SUPABASE_KEY

export default async function handler(req, res) {

    try {
        const response = await axios.post(`${supabaseUrl}/auth/v1/logout`, {},
            {
                headers: {
                    apiKey: supabaseKey,
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${req.body.token}`
                }
            })
        return res.status(200).json({ data: response.data })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
    }


}
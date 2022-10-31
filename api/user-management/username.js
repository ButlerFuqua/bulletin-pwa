require('dotenv').config()

import axios from 'axios'

const supabaseUrl = process.env.TB_SUPABASE_URL
const supabaseKey = process.env.TB_SUPABASE_KEY

export default async function handler(req, res) {
    try {
        const response = await axios.get(`${supabaseUrl}/rest/v1/profile?user_id=eq.${req.body.userId}&select=username`, {
            headers: {
                apiKey: supabaseKey,
                "Content-Type": "application/json",
                Authorization: `Bearer ${req.body.token}`
            }
        })
        return res.status(200).json({ username: response.data[0].username })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error })
    }
}
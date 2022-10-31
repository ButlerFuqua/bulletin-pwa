require('dotenv').config()


import { createClient } from '@supabase/supabase-js'

import axios from 'axios'

const supabaseUrl = process.env.TB_SUPABASE_URL
const supabaseKey = process.env.TB_SUPABASE_KEY

export default async function handler(req, res) {

    try {
        const response = await axios.get(`${supabaseUrl}/auth/v1/user`, {
            headers: {
                apiKey: supabaseKey,
                Authorization: `Bearer ${req.body.token}`
            }
        })
        return res.status(200).json({ user: response.data })
    } catch (error) {
        return res.status(500).json({ error })
    }
}
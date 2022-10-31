require('dotenv').config()


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.TB_SUPABASE_URL
const supabaseKey = process.env.TB_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {

    const { email, password } = req.body

    const { user, error, data: { access_token } } = await supabase.auth.signIn({
        email,
        password
    })

    if (error)
        throw error

    res.status(200).json({ access_token, user })


}
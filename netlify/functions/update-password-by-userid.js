
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { accessToken, userId, password } = JSON.parse(body)

    try {
        const { data } = await axios.put(
            `${url}/auth/v1/user`,
            {
                password
            },
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${accessToken}`,
                    ['Content-Type']: 'application/json'
                },
            }
        );
        console.log(data)
        return {
            statusCode: 204
        }
    } catch (error) {
        console.error(`Error #update-profile-by-userid`, error)
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.msg || error.message || `Error updating password`
        return {
            statusCode,
            body: JSON.stringify({ error: message }),
        }
    }

}

const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url } = process.env;

export const handler = async (event) => {
    const { body } = event;
    const { accessToken, userId } = JSON.parse(body)
    try {
        await axios.patch(
            `${url}/rest/v1/profiles?id=eq.${userId}`,
            {
                delete: true
            },
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${accessToken}`,
                    ['Content-Type']: 'application/json'
                },
            }
        );
        return {
            statusCode: 204,
        }
    } catch (error) {
        console.error(`Error #delete-account-by-userid`, error)
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.error_description || error.message || `Error updating password`
        return {
            statusCode,
            body: JSON.stringify({ error: message }),
        }
    }
}
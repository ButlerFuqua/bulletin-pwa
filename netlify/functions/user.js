
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { accessToken } = JSON.parse(body)

    try {

        const { data } = await axios.get(
            `${url}/auth/v1/user`,
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${accessToken}`,
                    ['Content-Type']: 'application/json'
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (error) {
        console.error(`Error #user`, error)
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify(error),
        }
    }

}
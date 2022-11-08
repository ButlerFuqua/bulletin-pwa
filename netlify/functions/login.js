
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { email, password } = JSON.parse(body)

    try {

        const { data: testimonies } = await axios.post(
            `${url}/auth/v1/token?grant_type=password`,
            {
                email,
                password,
            },
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${serviceRole}`,
                    ['Content-Type']: 'application/json'
                },
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(testimonies),
        }
    } catch (error) {
        console.error(`Error #login`, error)
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify(error),
        }
    }

}
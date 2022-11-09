
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { email, password } = JSON.parse(body)

    try {

        const { data: userData } = await axios.post(
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

        try {
            axios.patch(
                `${url}/rest/v1/profiles?id=eq.${userData.user.id}`,
                {
                    delete: false
                },
                {
                    headers: {
                        apiKey,
                        Authorization: `Bearer ${userData.access_token}`,
                        ['Content-Type']: 'application/json'
                    },
                }
            )
        } catch (error) {
            console.error(error)
        }

        return {
            statusCode: 200,
            body: JSON.stringify(userData),
        }
    } catch (error) {
        console.error(`Error #login`, error)
        const statusCode = error.response?.status || 500;
        const message = error.response?.data?.error_description || error.message || `Error updating password`
        return {
            statusCode,
            body: JSON.stringify({ error: message }),
        }
    }

}
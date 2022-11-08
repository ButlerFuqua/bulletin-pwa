
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { email, password, orgSlug, orgLocation, username } = JSON.parse(body)

    try {

        const { data } = await axios.post(
            `${url}/auth/v1/signup`,
            {
                email,
                password,
                data: {
                    username,
                    org_slug: orgSlug,
                    org_location: orgLocation,
                    avatar_url: "https://picsum.photos/200",
                }
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
            body: JSON.stringify(data),
        }
    } catch (error) {
        console.error(`Error #signup`, error)
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify({
                error,
                message: error.response.data.msg
            }),
        }
    }

}
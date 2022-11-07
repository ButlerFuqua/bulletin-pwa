
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url, TB_SERVICE_ROLE: serviceRole } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { userId } = JSON.parse(body)

    try {

        const { data: profiles } = await axios.get(
            `${url}/rest/v1/profiles?id=eq.${userId}`,
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
            body: JSON.stringify(profiles[0]),
        }
    } catch (error) {
        console.error(`Error #get-profile-by-userid`, error)
        return {
            statusCode: 200,
            body: JSON.stringify(error),
        }
    }

}

const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { accessToken, organization, orgLocation } = JSON.parse(body)

    try {
        const { data: testimonies } = await axios.get(
            `${url}/rest/v1/testimonies`,
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${accessToken}`
                },
            }
        );
        return {
            statusCode: 200,
            body: JSON.stringify(testimonies),
        }
    } catch (error) {
        console.error(`Error #get-testimonies`, error)
        throw error
    }

}

const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { accessToken, body: testimonyBody, user, testimonyId } = JSON.parse(body)

    try {

        await axios.patch(
            `${url}/rest/v1/testimonies?id=eq.${testimonyId}`,
            {
                body: testimonyBody,
                author_id: user.id,
                org_slug: user.org_slug,
                org_location: user.org_location,
                author_username: user.username,
                author_avatar_url: user.avatar_url
            },
            {
                headers: {
                    apiKey,
                    Authorization: `Bearer ${accessToken}`,
                    ['Content-Type']: 'application/json'
                },
            }
        )


        return {
            statusCode: 204
        }
    } catch (error) {
        console.error(`Error #create-testimony`, error)
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify(error),
        }
    }

}
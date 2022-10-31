require('dotenv');

const axios = require('axios');

const { HEY_BUDDY_PODCAST_API_TOKEN: apiToken, HEY_BUDDY_PODCAST_ID: podcastId } = process.env;

export const handler = async () => {

    try {
        const { data: episodes } = await axios.get(
            `https://www.buzzsprout.com/api/${podcastId}/episodes.json`,
            {
                headers: {
                    Authorization: `Token token=${apiToken}`,
                },
            }
        );
        return {
            statusCode: 200,
            body: JSON.stringify(episodes),
        }
    } catch (error) {
        console.error(`Error #all-episodes`, error)
        throw error
    }

}
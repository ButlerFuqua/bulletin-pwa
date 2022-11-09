
const axios = require('axios');

const { TB_SUPABASE_KEY: apiKey, TB_SUPABASE_URL: url } = process.env;

export const handler = async (event) => {

    const { body } = event;
    const { accessToken, username, userId, password, email } = JSON.parse(body)

    const updateUserData = { username };
    if (password) {
        updateUserData.password = password;
    }
    if (email) {
        updateUserData.email = email;
    }

    try {

        await Promise.all([
            axios.put(
                `${url}/auth/v1/user`,
                {
                    data: updateUserData
                },
                {
                    headers: {
                        apiKey,
                        Authorization: `Bearer ${accessToken}`,
                        ['Content-Type']: 'application/json'
                    },
                }
            ),
            axios.patch(
                `${url}/rest/v1/profiles?id=eq.${userId}`,
                {
                    username
                },
                {
                    headers: {
                        apiKey,
                        Authorization: `Bearer ${accessToken}`,
                        ['Content-Type']: 'application/json'
                    },
                }
            )
        ]);

        return {
            statusCode: 204
        }
    } catch (error) {
        console.error(`Error #update-profile-by-userid`, error)
        return {
            statusCode: error.response?.status || 500,
            body: JSON.stringify(error),
        }
    }

}
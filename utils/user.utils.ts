
import { UserDTO, UserResponse } from '~/types/user';
import { returnStoragePrefix } from './string.utils'

const storagePrefix = returnStoragePrefix();
export const userTokenKey = `-user`

export const getLocalUser = (date: string): string => {
    return `${storagePrefix}${userTokenKey}`
}

export const getUserDTOFromUserResponse = (userResponse: UserResponse): UserDTO => ({
    id: userResponse.id,
    username: userResponse.user_metadata.username,
    org_slug: userResponse.user_metadata.org_slug,
    org_location: userResponse.user_metadata.org_location,
    avatar_url: userResponse.user_metadata.avatar_url,
})
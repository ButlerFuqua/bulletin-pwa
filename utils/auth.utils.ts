
import { UserDTO } from '~/types/user';
import { returnStoragePrefix } from './string.utils'
import { userTokenKey } from './user.utils';

const storagePrefix = returnStoragePrefix();
export const accessTokenKey = `-access-token`

export const getAccessToken = (): string | null => {
    return localStorage.getItem(`${storagePrefix}${accessTokenKey}`)
}

export const clearLocalUserData = (): void => {
    localStorage.removeItem(`${storagePrefix}${accessTokenKey}`);
    localStorage.removeItem(`${storagePrefix}${userTokenKey}`);
}

export const setLocalUserData = (accessToken: string, user: UserDTO): void => {
    localStorage.setItem(`${storagePrefix}${accessTokenKey}`, accessToken);
    localStorage.setItem(`${storagePrefix}${userTokenKey}`, JSON.stringify(user));
}

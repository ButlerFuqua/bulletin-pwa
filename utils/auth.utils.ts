
import { returnStoragePrefix } from './string.utils'

const storagePrefix = returnStoragePrefix();
export const accessTokenKey = `-access-token`

export const getAccessToken = (): string | null => {
    return localStorage.getItem(`${storagePrefix}${accessTokenKey}`)
}

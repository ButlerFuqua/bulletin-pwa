
import { returnStoragePrefix } from './string.utils'

const storagePrefix = returnStoragePrefix();
export const userTokenKey = `-user`

export const getLocalUser = (date: string): string => {
    return `${storagePrefix}${userTokenKey}`
}

export type UserMetaData = {
    username: string
    org_slug: string
    org_location: string
    avatar_url: string
}

export type UserResponse = {
    id: string
    email: string
    user_metadata: UserMetaData
}

export type UserLoginResponse = {
    access_token: string
    user: UserResponse
}
export type UserMetaData = {
    username: string
    org_slug: string
    org_location: string
    avatar_url: string
}
export type UserDTO = UserMetaData & {
    id: string
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

export type ProfileResponse = {
    id: string
    updated_at: Date,
    username: string,
    avatar_url: string,
    created_at: Date,
    org_slug: string,
    org_location: string
    metadata: any,
}
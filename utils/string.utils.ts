export const returnFriendlyDate = (date: string): string => {
    return (new Date(date)).toLocaleDateString()
}

export const slugifyString = (titleString: string) => {
    return titleString.toLowerCase().replace(/[^A-Za-z0-9]+/g, '-')
}
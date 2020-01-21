// User Actions ===========================================
export const InsertUsername = username => {
    return {
        type: 'INSERT_USERNAME',
        payload: username
    }
}

export const ResetUsername = () => {
    return {
        type: 'RESET_USERNAME'
    }
}

export const InsertAvatar = avatar => {
    return {
        type: 'INSERT_AVATAR',
        payload: avatar
    }
}

export const ResetAvatar = () => {
    return {
        type: 'RESET_AVATAR'
    }
}

export const InsertScoreFormat = (format) => {
    return {
        type: 'INSERT_SCORE_FORMAT',
        payload: format
    }
}

export const ResetScoreFormat = () => {
    return {
        type: 'RESET_SCORE_FORMAT'
    }
}
// END OF USER ACTIONS =====================================



// ANIME ACTIONS ===========================================

export const InsertAnimeID = id => {
    return {
        type: 'INSERT_ANIME_ID',
        payload: id
    }
}

export const ResetAnimeID = () => {
    return {
        type: 'RESET_ANIME_ID'
    }
}
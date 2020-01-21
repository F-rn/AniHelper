const animeID = (state = null, action) => {
    switch(action.type) {
        case 'INSERT_ANIME_ID':
            return action.payload
        case 'RESET_ANIME_ID':
            return state = null
        default: return state
    }
}

export default animeID
const UserScoreFormat = (state = null, action) => {
    switch(action.type) {
        case 'INSERT_SCORE_FORMAT':
            return action.payload
        case 'RESET_SCORE_FORMAT':
            return state = null
        default: return state
    }
}

export default UserScoreFormat
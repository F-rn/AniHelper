const userAvatar = (state = null, action) => {
    switch(action.type) {
        case 'INSERT_AVATAR':
            return action.payload
        case 'RESET_AVATAR':
            return state = null
        default: return state
    }
}

export default userAvatar
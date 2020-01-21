const userName = (state = null, action) => {
    switch(action.type) {
        case 'INSERT_USERNAME':
            return action.payload
        case 'RESET_USERNAME':
            return state = null
        default: return state
    }
}

export default userName
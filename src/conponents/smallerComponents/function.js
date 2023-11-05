export function getSecondUserInChat(users,loggedUser){
    return users[0]._id===loggedUser.id?users[1].name:users[0].name

}
export function getSecondUserInChat2(users,loggedUser){
    return users[0]._id===loggedUser.id?users[1]:users[0]

}
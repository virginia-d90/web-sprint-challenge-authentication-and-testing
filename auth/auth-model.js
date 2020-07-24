const db = require("../database/dbConfig")

module.exports = {
    find,
    findById,
    addUser,
    findBy
}

function find(){
    return db("users")
}

function findById(id){
    return db("users").where({ id }).first()
}

function addUser(user){
    return db("users")
    .insert(user, "id")
    .then(([id]) => {
        return findById(id);
    })
    .catch(err => {
        console.log(err)
    })
}

function findBy(obj){
    return db('users')
        .where(obj)
        .first()
}

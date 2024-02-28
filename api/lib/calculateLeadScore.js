module.exports = async function calculateLeadScore(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve((Math.random() * 998) + 1)
        })
    })
}
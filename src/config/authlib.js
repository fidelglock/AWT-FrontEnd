const getUserObj = () => {
    var user = {};
    //check the logged in user and render the menu accordingly
    var userObj = JSON.parse(sessionStorage.getItem('userAuth'));
    if (userObj && userObj.token) {
        user = userObj;
        user.accessToken = userObj.token;
    }
    return user;
}

const getFetchOptions = (requesttype) => {
    
    if(!requesttype) requesttype='GET'; //default is GET

    var user = getUserObj();
    const options = {
        method: requesttype,
        headers:{
            'x-access-token':user.accessToken
        }
    };

    return options;
}

const isLoggedIn = () =>{
    
    var userObj = JSON.parse(sessionStorage.getItem('userAuth'));
    if(userObj && userObj.token) return true;
    else return false;
}

module.exports = { getUserObj, getFetchOptions, isLoggedIn }
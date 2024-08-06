var UserSession = (function() {
    let session = false;
    let auth = '';

    let getSession = function() {
        return session;
    };
    let setSession = function(what) {
        session = what;
    };
    let getAuth = function() {
        return auth;
    };
    let setAuth = function(authvalue) {
        auth = authvalue;
    };
    let resetSession = function() {
        session = false;
        auth = '';
    };

    return {
        getSession: getSession,
        setSession: setSession,
        getAuth: getAuth,
        setAuth: setAuth,
        resetSession: resetSession
    };
})();

export default UserSession;

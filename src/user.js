import Cookies from 'js-cookie';

const UserSession = (function() {
    let session = Cookies.get('session') === 'true' || false;
    let auth = Cookies.get('auth') || '';

    let getSession = function() {
        return session;
    };

    let setSession = function(what) {
        session = what;
        Cookies.set('session', what);
    };

    let getAuth = function() {
        return auth;
    };

    let setAuth = function(authvalue) {
        auth = authvalue;
        Cookies.set('auth', authvalue);
    };

    let resetSession = function() {
        session = false;
        auth = '';
        Cookies.remove('session');
        Cookies.remove('auth');
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

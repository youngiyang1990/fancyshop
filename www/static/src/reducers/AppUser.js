import { EXPECT_LOGOUT, LOGOUT_SUCCESS, EXPECT_LOGIN_SMS_CODE, 
    GET_LOGIN_SMS_CODE_SUCCESS, GET_LOGIN_SMS_CODE_FAIL, 
    LOGIN_SMS_CODE_FEED_BACK, EXPECT_LOGIN, EXPECT_LOGIN_FINISHED, 
    LOGIN_SUCCESS, LOGIN_FAIL, LOAD_UNLOGINED_USER_INFO,
    LOAD_USER_INFO_SUCCESS, 
    MEMORY_PATH_BEFORE_LOGINED} from "../actions/users";

export default function AppUser(state={
    id: '',
    username: "",
    stampedToken: "",
    pathBeforeLogined: "/",    
    loginStatus: "notWoken",
    loginFailReason: "",
    status: 'offline',
    loginSMSCode: '',
    validSMSCode: "",
    roleName: 'nobody',
    loginSMSCodeFeedBackTimes: 0,
    orders: [],
    balance: {
        incomes: [],
        charges: [],
    },
    products: [],
  }, action){
    switch (action.type) {
        case LOAD_UNLOGINED_USER_INFO:
            return state;
        case LOAD_USER_INFO_SUCCESS:
            return Object.assign({}, state, {
                stampedToken: action.stampedToken,
                expiredLoginTime: action.expiredLoginTime,
                id: action.userId,
                loginStatus: "logined",
                status: "online",
                username: action.user.username,
            })
        case MEMORY_PATH_BEFORE_LOGINED:
            return Object.assign({}, state, {
                pathBeforeLogined: action.path,
            })
        case EXPECT_LOGIN:
            return Object.assign({}, state, {
                loginStatus: "logining",
            })
        case EXPECT_LOGIN_FINISHED:
            return Object.assign({}, state, {
                loginStatus: "notWoken",
            })
        case LOGIN_SUCCESS: 
            return Object.assign({}, state, {
                stampedToken: action.stampedToken,
                expiredLoginTime: action.expiredLoginTime,
                id: action.userId,
                loginStatus: "logined",
                status: "online",
            })
        case LOGIN_FAIL:
            return Object.assign({}, state, {
                loginFailReason: action.reason,
            });
        case EXPECT_LOGOUT:
            return Object.assign({}, state, {
                status: 'logouting'
            });
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                stampedToken: "",
                expiredLoginTime: "",
                id: "",
                loginStatus: "",
                status: 'offline'
            });
        case EXPECT_LOGIN_SMS_CODE:
            return Object.assign({}, state, {
                loginSMSCode: "loading",
            });
        case GET_LOGIN_SMS_CODE_SUCCESS:
            return Object.assign({}, state, {
                    loginSMSCode: action.code,
            })
        case GET_LOGIN_SMS_CODE_FAIL:
            return  Object.assign({}, state, {
                loginSMSCode: "error",
            })    
        case LOGIN_SMS_CODE_FEED_BACK:  
            return  Object.assign({}, state, {
                loginSMSCodeFeedBackTimes: action.feedBackTimes,
            })
        default:
            return state;
    }
  }
export const BASE_URL = "https://rue.tcomad.tk";
export const AUTH_BASE_URL = BASE_URL + '/auth';
export const RUN_CODE_URL = BASE_URL + "/run";
export const SEND_CODE_URL = BASE_URL + "/sendCode";
export const OAUTH2_REDIRECT_URI = 'https://coderunner.tcomad.tk/login';
export const FACEBOOK_AUTH_URL = BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const VERIFY_EMAIL_URL = 'https://api.trumail.io/v2/lookups/json?email=';

export const SOURCECODE_KEY = "sourceCode";

export const ACCESS_TOKEN = 'accessToken';
export const CURRENT_ROLE = 'currentRole';
export const CURRENT_USERNAME = 'currentUsername';
export const CURRENT_PROVIDER = 'currentProvider';

export const FACEBOOK_APP_ID = '848358615623604';

export const FACEBOOK_PROVIDER = "facebook";
export const LOCAL_PROVIDER = "local";

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

export const TOOLTIP_TEXT = "On clicking this button code will be sent to your email";

export const INITIAL_CLASS_NAME = "HelloWorld";
export const INITIAL_CODE ="public class HelloWorld {\n" +
    "    public static void main(String[] args) {\n" +
    "        System.out.println(\"Hello world!\");\n" +
    "    }\n" +
    "}";
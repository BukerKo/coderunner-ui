export const BASE_URL = "https://rue.tcomad.tk";
export const AUTH_BASE_URL = BASE_URL + '/auth';
export const RUN_CODE_URL = BASE_URL + "/run";
export const OAUTH2_REDIRECT_URI = 'https://coderunner.tcomad.tk/login';
export const FACEBOOK_AUTH_URL = BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;


export const ACCESS_TOKEN = 'accessToken';
export const CURRENT_ROLE = 'currentRole';
export const CURRENT_USERNAME = 'currentUsername';

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

export const INITIAL_CLASS_NAME = "HelloWorld";
export const INITIAL_CODE ="public class HelloWorld {\n" +
    "    public static void main(String[] args) {\n" +
    "        System.out.println(\"Hello world!\");\n" +
    "    }\n" +
    "}";
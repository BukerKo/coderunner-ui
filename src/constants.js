export const BASE_URL = "https://rue.tcomad.tk";
export const OAUTH2_REDIRECT_URI = 'https://coderunner.tcomad.tk/login';
export const FACEBOOK_APP_ID = '848358615623604';
export const CAPTCHA_KEY = '6LdaKOsZAAAAAKW3Eh2__CTG0ULYECzun0US_PhN';

export const AUTH_BASE_URL = BASE_URL + '/auth';
export const RUN_CODE_URL = BASE_URL + "/run";
export const SEND_CODE_URL = BASE_URL + "/sendCode";
export const FEATURES_URL = BASE_URL + "/features";
export const ADMIN_URL = BASE_URL + "/admin";
export const RUNINFO_URL = BASE_URL + "/runInfo";
export const FACEBOOK_AUTH_URL = BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GOOGLE_AUTH_URL = BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;


export const SOURCECODE_KEY = "sourceCode";

export const ACCESS_TOKEN = 'accessToken';
export const CURRENT_ROLE = 'currentRole';
export const CURRENT_USERNAME = 'currentUsername';
export const CURRENT_PROVIDER = 'currentProvider';

export const FACEBOOK_PROVIDER = "facebook";

export const ROLE_ADMIN = 'ROLE_ADMIN';
export const ROLE_USER = 'ROLE_USER';

export const TOOLTIP_TEXT = "On clicking this button code will be sent to your email";

export const ITEMS_PER_PAGE = 7;

export const INITIAL_CODE ="public class HelloWorld {\n" +
    "    public static void main(String[] args) {\n" +
    "        System.out.println(\"Hello world!\");\n" +
    "    }\n" +
    "}";

export const lightTheme = [
  '--text: #000',
  '--button: royalblue',
  '--background: white',
  '--navbar-color: #ececec',
  '--shadow-color: rgba(0, 0, 0, 0.27)',
];
export const darkTheme = [
  '--text: rgb(255, 255, 255)',
  '--button: #327886',
  '--background: #2D2D2D',
  '--navbar-color: rgb(30,30,30)',
  '--shadow-color: rgba(0, 0, 0, 0.8)',
];
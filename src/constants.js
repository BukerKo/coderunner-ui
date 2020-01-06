export const BASE_URL = "http://localhost:8080";
export const AUTH_BASE_URL = BASE_URL + '/api/auth';
export const RUN_CODE_URL = BASE_URL + "/run";


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
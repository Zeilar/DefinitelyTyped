// Type definitions for Auth0.js 9.14
// Project: https://github.com/auth0/auth0.js
// Definitions by: Adrian Chia <https://github.com/adrianchia>
//                 Matt Durrant <https://github.com/mdurrant>
//                 Peter Blazejewicz <https://github.com/peterblazejewicz>
//                 Bartosz Kotrys <https://github.com/bkotrys>
//                 Mark Nelissen <https://github.com/marknelissen>
//                 Tyler Lindell <https://github.com/tylerlindell>
//                 Henri Kinnunen <https://github.com/hequ>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
/// <reference lib="dom" />
export as namespace auth0;

export class Authentication {
    constructor(options: AuthOptions);

    passwordless: PasswordlessAuthentication;
    dbConnection: DBConnection;

    /**
     * Builds and returns the `/authorize` url in order to initialize a new authN/authZ transaction
     *
     * @param options: https://auth0.github.io/auth0.js/global.html#buildAuthorizeUrl
     * @see {@link https://auth0.com/docs/api/authentication#authorize-client}
     * @see {@link https://auth0.com/docs/api/authentication#social}
     */
    buildAuthorizeUrl(options: AuthorizeUrlOptions): string;

    /**
     * Builds and returns the Logout url in order to initialize a new authN/authZ transaction
     *
     * @param options: https://auth0.com/docs/api/authentication#!#get--v2-logout
     */
    buildLogoutUrl(options?: LogoutOptions): string;

    /**
     * Makes a call to the `oauth/token` endpoint with `password` grant type
     *
     * @param options: https://auth0.com/docs/api-auth/grant/password
     */
    loginWithDefaultDirectory(options: DefaultDirectoryLoginOptions, callback: Auth0Callback<any>): void;

    /**
     * Makes a call to the `/ro` endpoint
     * @deprecated `loginWithResourceOwner` will be soon deprecated, user `login` instead.
     */
    loginWithResourceOwner(options: ResourceOwnerLoginOptions, callback: Auth0Callback<any>): void;

    /**
     * Makes a call to the `oauth/token` endpoint with `password-realm` grant type
     */
    login(options: DefaultLoginOptions, callback: Auth0Callback<any>): void;

    /**
     * Makes a call to the `oauth/token` endpoint
     */
    oauthToken(options: any, callback: Auth0Callback<any>): void;

    /**
     * Makes a call to the `/ssodata` endpoint
     *
     */
    getSSOData(callback?: Auth0Callback<SsoDataResult | undefined>): void;

    /**
     * Makes a call to the `/ssodata` endpoint
     *
     */
    getSSOData(withActiveDirectories: boolean, callback?: Auth0Callback<SsoDataResult | undefined>): void;

    /**
     * Makes a call to the `/userinfo` endpoint and returns the user profile
     *
     */
    userInfo(accessToken: string, callback: Auth0Callback<Auth0UserProfile>): void;

    /**
     * Makes a call to the `/delegation` endpoint
     *
     * @param options: https://auth0.com/docs/api/authentication#!#post--delegation
     */
    delegation(options: DelegationOptions, callback: Auth0Callback<Auth0DelegationToken>): any;

    /**
     * Fetches the user country based on the ip.
     *
     */
    getUserCountry(callback: Auth0Callback<{ countryCode: string }>): void;
}

export class PasswordlessAuthentication {
    constructor(request: any, option: any);

    /**
     * Builds and returns the passwordless TOTP verify url in order to initialize a new authN/authZ transaction
     *
     */
    buildVerifyUrl(options: PasswordlessVerifyOptions): string;

    /**
     * Initializes a new passwordless authN/authZ transaction
     *
     * @param options: https://auth0.com/docs/api/authentication#passwordless
     */
    start(options: PasswordlessStartOptions, callback: Auth0Callback<any>): void;

    /**
     * Verifies the passwordless TOTP and returns an error if any.
     *
     */
    verify(options: PasswordlessVerifyOptions, callback: Auth0Callback<any>): void;
}

export class DBConnection {
    constructor(request: any, option: any);

    /**
     * Creates a new user in a Auth0 Database connection
     * @param options https://auth0.com/docs/api/authentication#signup
     */
    signup(options: DbSignUpOptions, callback: Auth0Callback<DbSignUpResults>): void;

    /**
     * Initializes the change password flow
     *
     * @param options: https://auth0.com/docs/api/authentication#!#post--dbconnections-change_password
     */
    changePassword(options: ChangePasswordOptions, callback: Auth0Callback<any>): void;
}

export class Management {
    /**
     * Initialize your client class, by using a Non Interactive Client to fetch an access_token via the Client Credentials Grant.
     */
    constructor(options: ManagementOptions);

    /**
     * Returns the user profile. https://auth0.com/docs/api/management/v2#!/Users/get_users_by_id
     *
     */
    getUser(userId: string, callback: Auth0Callback<Auth0UserProfile>): void;

    /**
     * Updates the user metadata. It will patch the user metadata with the attributes sent.
     * https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id
     *
     */
    patchUserMetadata(userId: string, userMetadata: any, callback: Auth0Callback<Auth0UserProfile>): void;
    /**
     * Updates the user attributes.
     * It will patch the root attributes that the server allows it.
     * {@link https://auth0.com/docs/api/management/v2#!/Users/patch_users_by_id}
     */
    patchUserAttributes(userId: string, user: Auth0UserProfile, callback: Auth0Callback<Auth0UserProfile>): void;
    /**
     * Link two users. https://auth0.com/docs/api/management/v2#!/Users/post_identities
     *
     */
    linkUser(userId: string, secondaryUserToken: string, callback: Auth0Callback<any>): void;
}

export class WebAuth {
    constructor(options: AuthOptions);
    client: Authentication;
    popup: Popup;
    redirect: Redirect;
    crossOriginAuthentication: CrossOriginAuthentication;

    /**
     * Redirects to the hosted login page (`/authorize`) in order to initialize a new authN/authZ transaction
     *
     * @param options: https://auth0.com/docs/api/authentication#!#get--authorize_db
     */
    authorize(options?: AuthorizeOptions): void;

    /**
     * Parse the url hash and extract the returned tokens depending on the transaction.
     *
     * Only validates id_tokens signed by Auth0 using the RS256 algorithm using the public key exposed
     * by the `/.well-known/jwks.json` endpoint. Id tokens signed with other algorithms will not be
     * accepted.
     *
     * @param callback: any(err, token_payload)
     */
    parseHash(callback: Auth0Callback<Auth0DecodedHash | null, Auth0ParseHashError>): void;

    /**
     * Parse the url hash and extract the returned tokens depending on the transaction.
     *
     * Only validates id_tokens signed by Auth0 using the RS256 algorithm using the public key exposed
     * by the `/.well-known/jwks.json` endpoint. Id tokens signed with other algorithms will not be
     * accepted.
     *
     * @param callback: any(err, token_payload)
     */
    parseHash(options: ParseHashOptions, callback: Auth0Callback<Auth0DecodedHash | null, Auth0ParseHashError>): void;

    /**
     * Decodes the id_token and verifies  the nonce.
     *
     * @param callback: function(err, {payload, transaction})
     */
    validateToken(token: string, nonce: string, callback: Auth0Callback<any>): void;

    /**
     * Executes a silent authentication transaction under the hood in order to fetch a new tokens for the current session.
     * This method requires that all Auth is performed with {@link authorize}
     * Watch out! If you're not using the hosted login page to do social logins, you have to use your own [social connection keys](https://manage.auth0.com/#/connections/social).
     * If you use Auth0's dev keys, you'll always get `login_required` as an error when calling this method.
     *
     * @param options: any valid oauth2 parameter to be sent to the `/authorize` endpoint
     */
    renewAuth(options: RenewAuthOptions, callback: Auth0Callback<any>): void;

    /**
     * Initialices a change password transaction
     *
     * @param options: https://auth0.com/docs/api/authentication#!#post--dbconnections-change_password
     */
    changePassword(options: ChangePasswordOptions, callback: Auth0Callback<any>): void;

    /**
     * Signs up a new user
     *
     * @param options: https://auth0.com/docs/api/authentication#!#post--dbconnections-signup
     */
    signup(options: DbSignUpOptions, callback: Auth0Callback<any>): void;

    /**
     * Signs up a new user, automatically logs the user in after the signup and returns the user token.
     * The login will be done using /oauth/token with password-realm grant type.
     *
     * @param options: https://auth0.com/docs/api/authentication#!#post--dbconnections-signup
     */
    signupAndAuthorize(options: DbSignUpOptions, callback: Auth0Callback<any>): void;

    /**
     * Logs in the user with username and password using the cross origin authentication (/co/authenticate) flow.
     * You can use either `username` or `email` to identify the user, but `username` will take precedence over `email`.
     *
     * This only works when 3rd party cookies are enabled in the browser.
     * After the /co/authenticate call, you'll have to use the {@link parseHash} function at the `redirectUri` specified in the constructor.
     *
     * @param options options used in the {@link authorize} call after the login_ticket is acquired
     * @param cb Callback function called only when an authentication error, like invalid username or password, occurs.
     * For other types of errors, there will be a redirect to the `redirectUri`.
     */
    login(options: CrossOriginLoginOptions, callback: Auth0Callback<any>): void;

    /**
     * Runs the callback code for the cross origin authentication call.
     * This method is meant to be called by the cross origin authentication callback url.
     * @deprecated Use {@link crossOriginVerification} instead.
     */
    crossOriginAuthenticationCallback(): void;

    /**
     * Runs the callback code for the cross origin authentication call.
     * This method is meant to be called by the cross origin authentication callback url.
     */
    crossOriginVerification(): void;

    /**
     * Redirects to the auth0 logout endpoint
     *
     * If you want to navigate the user to a specific URL after the logout, set that URL at the returnTo parameter. The URL should be included in any the appropriate Allowed Logout URLs list:
     *
     * - If the client_id parameter is included, the returnTo URL must be listed in the Allowed Logout URLs set at the client level (see Setting Allowed Logout URLs at the App Level).
     * - If the client_id parameter is NOT included, the returnTo URL must be listed in the Allowed Logout URLs set at the account level (see Setting Allowed Logout URLs at the Account Level).
     *
     * @see {@link https://auth0.com/docs/api/authentication#logout}
     */
    logout(options: LogoutOptions): void;

    /**
     * Initialices a passwordless authentication transaction
     *
     * @param options: https://auth0.com/docs/api/authentication#passwordless
     */
    passwordlessStart(options: PasswordlessStartOptions, callback: Auth0Callback<any>): void;

    /**
     * Verifies the passwordless TOTP and redirects to finish the passwordless transaction
     *
     * @param options:
     */
    passwordlessVerify(options: PasswordlessVerifyOptions, callback: Auth0Callback<any>): void;

    /**
     * Logs in a user with the verification code sent to the user
     * @param options
     * @param callback
     */
    passwordlessLogin(options: PasswordlessLoginOptions, callback: Auth0Callback<any>): void;

    /**
     * Renews an existing session on Auth0's servers using `response_mode=web_message` (i.e. Auth0's hosted login page)
     *
     * @param options options used in {@link authorize} call
     * @param cb
     * @see {@link https://auth0.com/docs/libraries/auth0js/v9#using-checksession-to-acquire-new-tokens}
     */
    checkSession(options: CheckSessionOptions, cb: Auth0Callback<any>): void;

    /**
     * Renders the captcha challenge in the provided element.
     * This function can only be used in the context of a Classic Universal Login Page.
     * @param element The element where the captcha needs to be rendered
     * @param [options] The configuration options for the captcha
     * @param [callback] An optional completion callback
     *
     * @see {@link https://auth0.github.io/auth0.js/WebAuth.html#renderCaptcha}
     */
    renderCaptcha(element: HTMLElement, options?: CatpchaConfiguration, callback?: Auth0Callback<any>): Captcha;
}

export class Redirect {
    constructor(client: any, options: any);

    /**
     * Performs authentication with username/email and password with a database connection
     *
     * This method is not compatible with API Auth so if you need to fetch API tokens with audience
     * you should use {@link authorize} or {@link login}.
     */
    loginWithCredentials(
        options: {
            /** url that the Auth0 will redirect after Auth with the Authorization Response */
            redirectUri?: string | undefined;
            /** type of the response used. It can be any of the values `code` and `token` */
            responseType?: string | undefined;
            /** how the AuthN response is encoded and redirected back to the client. */
            responseMode?: "query" | "fragment" | undefined;
            /** scopes to be requested during AuthN. e.g. `openid email` */
            scope: string;
        },
        callback: Auth0Callback<any>,
    ): void;

    /**
     * Signs up a new user and automatically logs the user in after the signup.
     */
    signupAndLogin(
        options: {
            /** user email address */
            email: string;
            /** user password */
            password: string;
            /** name of the connection where the user will be created */
            connection: string;
            /** allow userMetadata to be passed to signUp */
            userMetadata?: unknown | undefined;
        } & CrossOriginLoginOptions,
        callback: Auth0Callback<any>,
    ): void;
}

export class Popup {
    constructor(client: any, options: any);

    /**
     * Returns a new instance of the popup handler
     */
    private buildPopupHandler(): any;

    /**
     * Initializes the popup window and returns the instance to be used later in order to avoid being blocked by the browser.
     *
     * @param options: receives the window height and width and any other window feature to be sent to window.open
     */
    preload(options: any): any;

    /**
     * Handles the popup logic for the callback page.
     * @see {@link parseHash}
     */
    callback(options: {
        /**
         * the url hash.
         * @default window.location.hash
         */
        hash: string;
        /** value originally sent in `state` parameter to {@link authorize} to mitigate XSRF */
        state?: string | undefined;
        /** value originally sent in `nonce` parameter to {@link authorize} to prevent replay attacks */
        nonce?: string | undefined;
        /**
         * makes parseHash perform or skip `id_token` verification.
         * We **strongly** recommend validating the `id_token` yourself if you disable the verification.
         */
        _idTokenVerification?: string | undefined;
    }): void;

    /**
     * Shows inside a new window the hosted login page (`/authorize`) in order to start a new authN/authZ transaction and post its result using `postMessage`.
     * @see {@link https://auth0.com/docs/api/authentication#authorize-client}
     */
    authorize(
        options: {
            /** your Auth0 domain */
            domain: string;
            /** your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard */
            clientId?: string | undefined;
            /**
             * identity provider whose login page will be displayed in the popup.
             * If omitted the hosted login page is used.
             * {@link https://auth0.com/docs/identityproviders}
             */
            connection?: string | undefined;
            /** url that the Auth0 will redirect after Auth with the Authorization Response */
            redirectUri: string;
            /**
             * type of the response used by OAuth 2.0 flow.
             * It can be any space separated list of the values `code`, `token`, `id_token`.
             * {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
             */
            responseType: string;
            /**
             * how the Auth response is encoded and redirected back to the client.
             * {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
             */
            responseMode?: "query" | "fragment" | "form_post" | undefined;
            /**
             * value used to mitigate XSRF attacks.
             * {@link https://auth0.com/docs/protocols/oauth2/oauth-state}
             */
            state?: string | undefined;
            /**
             * value used to mitigate replay attacks when using Implicit Grant.
             * {@link https://auth0.com/docs/api-auth/tutorials/nonce}
             */
            nonce?: string | undefined;
            /** scopes to be requested during Auth. e.g. `openid email` */
            scope?: string | undefined;
            /** identifier of the resource server who will consume the access token issued after Auth */
            audience?: string | undefined;
            /** determines if Auth0 should render the relay page or not and the caller is responsible of handling the response. */
            owp?: boolean | undefined;
        },
        callback: Auth0Callback<Auth0Result>,
    ): void;

    /**
     * Performs authentication with username/email and password with a database connection inside a new window
     *
     * This method is not compatible with API Auth so if you need to fetch API tokens with audience
     * you should use {@link authorize} or {@link login}.
     */
    loginWithCredentials(
        options: {
            /** url that the Auth0 will redirect after Auth with the Authorization Response */
            redirectUri?: string | undefined;
            /** type of the response used. */
            responseType?: "code" | "token" | undefined;
            /** how the AuthN response is encoded and redirected back to the client. */
            responseMode?: "query" | "fragment" | undefined;
            /** scopes to be requested during AuthN. e.g. `openid email` */
            scope?: string | undefined;
        },
        callback: Auth0Callback<any>,
    ): void;

    /**
     * Verifies the passwordless TOTP and returns the requested token
     */
    passwordlessVerify(
        options: {
            type: "sms" | "email";
            /**  only if type = sms */
            phoneNumber?: string | undefined;
            /** only if type = email */
            email?: string | undefined;
            /** the connection name */
            connection: string;
            /** the TOTP code */
            verificationCode: string;
        },
        callback: Auth0Callback<any>,
    ): void;

    /**
     * Signs up a new user and automatically logs the user in after the signup.
     *
     * This method is not compatible with API Auth so if you need to fetch API tokens with audience
     * you should use {@link authorize} or {@link signupAndAuthorize}.
     */
    signupAndLogin(
        options: {
            /** user email address */
            email: string;
            /** user password */
            password: string;
            /** name of the connection where the user will be created */
            connection: string;
            /** allow userMetadata to be passed to signUp */
            userMetadata?: unknown | undefined;
        },
        callback: Auth0Callback<any>,
    ): void;
}

export class CrossOriginAuthentication {
    constructor(webAuth: any, options: any);

    /**
     * Logs in the user with username and password using the cross origin authentication (/co/authenticate) flow.
     * You can use either `username` or `email` to identify the user, but `username` will take precedence over `email`.
     * This only works when 3rd party cookies are enabled in the browser.
     * After the /co/authenticate call, you'll have to use the {@link parseHash} function at the `redirectUri` specified in the constructor.
     *
     * @param options options used in the {@link authorize} call after the login_ticket is acquired
     * @param cb Callback function called only when an authentication error, like invalid username or password, occurs.
     * For other types of errors, there will be a redirect to the `redirectUri`.
     */
    login(options: CrossOriginLoginOptions, callback: Auth0Callback<any>): void;

    /**
     * Runs the callback code for the cross origin authentication call. This method is meant to be called by the cross origin authentication callback url.
     *
     */
    callback(): void;
}

export type Auth0Callback<T, E = Auth0Error> = (error: null | E, result: T) => void;

export interface TokenProvider {
    enableCache?: boolean | undefined;
    cacheTTLInSeconds?: number | undefined;
}

export interface ManagementOptions {
    domain: string;
    token?: string | undefined;
    clientId?: string | undefined;
    clientSecret?: string | undefined;
    audience?: string | undefined;
    scope?: string | undefined;
    tokenProvider?: TokenProvider | undefined;
    telemetry?: boolean | undefined;
}

export interface AuthOptions {
    domain: string;
    clientID: string;
    responseType?: string | undefined;
    responseMode?: string | undefined;
    redirectUri?: string | undefined;
    scope?: string | undefined;
    audience?: string | undefined;
    /**
     * maximum elapsed time in seconds since the last time the user
     * was actively authenticated by the authorization server.
     */
    maxAge?: number | undefined;
    leeway?: number | undefined;
    jwksURI?: string | undefined;
    overrides?: {
        __tenant?: string | undefined;
        __token_issuer?: string | undefined;
        __jwks_uri?: string | undefined;
    } | undefined;
    plugins?: any;
    popupOrigin?: string | undefined;
    protocol?: string | undefined;
    response_type?: string | undefined;
    state?: string | undefined;
    tenant?: string | undefined;
    universalLoginPage?: boolean | undefined;
    _csrf?: string | undefined;
    _intstate?: string | undefined;
    _timesToRetryFailedRequests?: number | undefined;
    _disableDeprecationWarnings?: boolean | undefined;
    _sendTelemetry?: boolean | undefined;
    _telemetryInfo?: any;
    __tryLocalStorageFirst?: boolean | undefined;
}

export type DoneCallback = (err?: Auth0Error) => void;

export interface Captcha {
    reload: (done: DoneCallback) => void;
    getValue: () => string;
}

export interface CatpchaConfiguration {
    /**
     *  An object containaing templates for each captcha provider
     */
    templates?: CaptchaTemplates | undefined;

    /**
     * The ISO code of the language for recaptcha
     * @default 'en'
     */
    lang?: string | undefined;
}

/**
 * An object containing templates for a captcha provider
 */
export interface CaptchaTemplates {
    /**
     * Template function receiving the challenge and returning an string
     */
    auth0?: ((challenge: Auth0Challenge) => string) | undefined;

    /**
     * Template function receiving the challenge and returning an string
     */
    recaptcha_v2?: ((challenge: Auth0Challenge) => string) | undefined;

    error: (error: Error) => string;
}

export interface Auth0Challenge {
    type: "code";
    image: string;
    required: boolean;
    provider: "auth0" | "recaptcha_v2";
    [other: string]: unknown;
}

export interface PasswordlessAuthOptions {
    connection: string;
    verificationCode: string;
    phoneNumber: string;
    email: string;
}

/**
 * These are error codes defined by the auth0-js lib.
 */
export type LibErrorCodes = "timeout" | "request_error" | "invalid_token";

/**
 * The user was not logged in at Auth0, so silent authentication is not possible.
 */
export type LoginRequiredErrorCode = "login_required";

/**
 * The user was logged in at Auth0 and has authorized the application, but needs to
 * be redirected elsewhere before authentication can be completed; for example, when
 * using a redirect rule.
 */
export type InteractionRequiredErrorCode = "interaction_required";

/**
 * The user was logged in at Auth0, but needs to give consent to authorize the application.
 */
export type ConsentRequiredErrorCode = "consent_required";

/**
 * These are error codes defined by the OpenID Connect specification.
 */
export type SpecErrorCodes =
    | LoginRequiredErrorCode
    | InteractionRequiredErrorCode
    | ConsentRequiredErrorCode
    | "account_selection_required"
    | "invalid_request_uri"
    | "invalid_request_object"
    | "request_not_supported"
    | "request_uri_not_supported"
    | "registration_not_supported";

export interface Auth0Error {
    error: LibErrorCodes | SpecErrorCodes | string;
    errorDescription?: string | undefined;
    // Auth0 is not consistent in the naming of the error description field
    error_description?: string | undefined;
    // Need to include non-intuitive error fields that Auth0 uses
    code?: string | undefined;
    description?: string | undefined;
    name?: string | undefined;
    policy?: string | undefined;
    original?: any;
    statusCode?: number | undefined;
    statusText?: string | undefined;
}

/**
 * result of the Auth request.
 * If there is no token available, this value will be null.
 */
export interface Auth0Result {
    /**
     * token that allows access to the specified resource server (identified by the audience parameter
     * or by default Auth0's /userinfo endpoint)
     */
    accessToken?: string | undefined;
    /** number of seconds until the access token expires */
    expiresIn?: number | undefined;
    /** token that identifies the user */
    idToken?: string | undefined;
    /**
     * token that can be used to get new access tokens from Auth0.
     * Note that not all Auth0 Applications can request them
     * or the resource server might not allow them.
     */
    refreshToken?: string | undefined;
    /** values that you receive back on the authentication response */
    appState?: any;
}

export type Auth0ParseHashError = Auth0Error & {
    state?: string | undefined;
};

/**
 * The contents of the authResult object returned by {@link WebAuth#parseHash }
 */
export interface Auth0DecodedHash {
    accessToken?: string | undefined;
    idToken?: string | undefined;
    idTokenPayload?: any;
    appState?: any;
    refreshToken?: string | undefined;
    state?: string | undefined;
    expiresIn?: number | undefined;
    tokenType?: string | undefined;
    scope?: string | undefined;
}

/** Represents the response from an API Token Delegation request. */
export interface Auth0DelegationToken {
    /** The length of time in seconds the token is valid for. */
    expiresIn: number;
    /** The JWT for delegated access.  */
    idToken: string;
    /** The type of token being returned. Possible values: "Bearer"  */
    tokenType: string;
}

export interface ChangePasswordOptions {
    connection: string;
    email: string;
}

export interface BaseAuthOptions {
    clientID?: string | undefined;
    responseType?: string | undefined;
    redirectUri?: string | undefined;
    scope?: string | undefined;
    audience?: string | undefined;
    state?: string | undefined;
    nonce?: string | undefined;
    _csrf?: string | undefined;
    __instate?: string | undefined;
}

export interface PasswordlessStartAuthParams extends BaseAuthOptions {
    responseMode?: string | undefined;
}

export interface PasswordlessStartOptions {
    connection: string;
    send: string;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    authParams?: PasswordlessStartAuthParams | undefined;
}

export interface PasswordlessVerifyOptions extends BaseAuthOptions {
    connection: string;
    verificationCode: string;
    phoneNumber?: string | undefined;
    email?: string | undefined;
    send?: string | undefined;
    responseMode?: string | undefined;
}

export interface PasswordlessLoginOptions extends BaseAuthOptions {
    connection: string;
    verificationCode: string;
    phoneNumber?: string | undefined;
    email?: string | undefined;
}

export interface Auth0UserProfile {
    name: string;
    nickname: string;
    picture: string;
    user_id: string;
    username?: string | undefined;
    given_name?: string | undefined;
    family_name?: string | undefined;
    email?: string | undefined;
    email_verified?: boolean | undefined;
    clientID: string;
    gender?: string | undefined;
    locale?: string | undefined;
    identities: Auth0Identity[];
    created_at: string;
    updated_at: string;
    sub: string;
    user_metadata?: any;
    app_metadata?: any;
}

export interface MicrosoftUserProfile extends Auth0UserProfile {
    emails?: string[] | undefined; // optional depending on whether email addresses permission is granted
}

export interface Office365UserProfile extends Auth0UserProfile {
    tenantid: string;
    upn: string;
}

export interface AdfsUserProfile extends Auth0UserProfile {
    issuer?: string | undefined;
}

export interface AuthorizeUrlOptions {
    /**
     * your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
     */
    clientID?: string | undefined;
    /**
     * url that the Auth0 will redirect after Auth with the Authorization Response
     */
    redirectUri: string;
    /**
     * type of the response used by OAuth 2.0 flow. It can be any space separated
     * list of the values `code`, `token`, `id_token`.
     * {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0}
     */
    responseType: string;
    /**
     * how the Auth response is encoded and redirected back to the client.
     * Supported values are `query`, `fragment` and `form_post`
     * {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
     */
    responseMode?: "query" | "fragment" | "form_post" | undefined;
    /**
     * value used to mitigate XSRF attacks.
     * {@link https://auth0.com/docs/protocols/oauth2/oauth-state}
     */
    state?: string | undefined;
    /**
     * value used to mitigate replay attacks when using Implicit Grant.
     * {@link https://auth0.com/docs/api-auth/tutorials/nonce}
     */
    nonce?: string | undefined;
    /**
     * scopes to be requested during Auth. e.g. `openid email`
     */
    scope?: string | undefined;
    /**
     * identifier of the resource server who will consume the access token issued after Auth
     */
    audience?: string | undefined;
}

export interface Auth0Identity {
    connection: string;
    isSocial: boolean;
    provider: string;
    user_id: string;
}

export interface LoginOptions {
    username: string;
    password: string;
    scope?: string | undefined;
}

export interface DefaultLoginOptions extends LoginOptions {
    audience?: string | undefined;
    realm: string;
}

export interface DefaultDirectoryLoginOptions extends LoginOptions {
    audience?: string | undefined;
}

export interface ResourceOwnerLoginOptions extends LoginOptions {
    connection: string;
    device?: string | undefined;
}

export interface CrossOriginLoginOptions {
    username?: string | undefined;
    email?: string | undefined;
    password: string;
    realm?: string | undefined;
    domain?: string | undefined;
    clientID?: string | undefined;
    redirectUri?: string | undefined;
    responseType?: string | undefined;
    responseMode?: string | undefined;
    state?: string | undefined;
    nonce?: string | undefined;
    scope?: string | undefined;
    audience?: string | undefined;
    onRedirecting?: (done: () => void) => void | undefined;
}

export interface LogoutOptions {
    clientID?: string | undefined;
    returnTo?: string | undefined;
    federated?: boolean | undefined;
}

export interface DelegationOptions {
    client_id?: string | undefined;
    grant_type: string;
    id_token?: string | undefined;
    refresh_token?: string | undefined;
    target?: string | undefined;
    scope?: string | undefined;
    api_type?: string | undefined;
}

export interface DbSignUpOptions {
    /** user email address */
    email: string;
    /** user password */
    password: string;
    /** name of the connection where the user will be created */
    connection: string;
    /** User desired username. Required if you use a database connection and you have enabled `Requires Username` */
    username?: string | undefined;
    scope?: string | undefined;
    /** additional signup attributes used for creating the user. Will be stored in `user_metadata` */
    userMetadata?: unknown | undefined;
}

/** result of the signup request */
export interface DbSignUpResults {
    /** user's email */
    email: string;
    /** if the user's email was verified */
    emailVerified: boolean;
}

export interface ParseHashOptions {
    hash?: string | undefined;
    state?: string | undefined;
    nonce?: string | undefined;
    _idTokenVerification?: boolean | undefined;
    /** indicates that you want to allow IdP-Initiated flows. See {@link https://auth0.com/docs/protocols/saml/idp-initiated-sso#lock-auth0-js} */
    __enableIdPInitiatedLogin?: boolean | undefined;
}

export interface RenewAuthOptions {
    /**
     * your Auth0 domain
     */
    domain?: string | undefined;
    /**
     * your Auth0 client identifier obtained when creating the client in the Auth0 Dashboard
     */
    clientID?: string | undefined;
    /**
     * url that the Auth0 will redirect after Auth with the Authorization Response
     */
    redirectUri?: string | undefined;
    /**
     * type of the response used by OAuth 2.0 flow. It can be any space separated
     * list of the values `code`, `token`, `id_token`.
     * {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html}
     */
    responseType?: string | undefined;
    /**
     * how the Auth response is encoded and redirected back to the client.
     * Supported values are `query`, `fragment` and `form_post`.
     * The `query` value is only supported when `responseType` is `code`.
     * {@link https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes}
     */
    responseMode?: string | undefined;
    /**
     * value used to mitigate XSRF attacks.
     * {@link https://auth0.com/docs/protocols/oauth2/oauth-state}
     */
    state?: string | undefined;
    /**
     * value used to mitigate replay attacks when using Implicit Grant.
     * {@link https://auth0.com/docs/api-auth/tutorials/nonce}
     */
    nonce?: string | undefined;
    /**
     * scopes to be requested during Auth. e.g. `openid email`
     */
    scope?: string | undefined;
    /**
     * identifier of the resource server who will consume the access token issued after Auth
     */
    audience?: string | undefined;
    /**
     * identifier data type to look for in postMessage event data, where events are initiated
     * from silent callback urls, before accepting a message event is the event expected.
     * A value of false means any postMessage event will trigger a callback.
     */
    postMessageDataType?: string | undefined;
    /**
     * origin of redirectUri to expect postMessage response from.
     * Defaults to the origin of the receiving window. Only used if usePostMessage is truthy.
     */
    postMessageOrigin?: string | undefined;
    /**
     * value in milliseconds used to timeout when the `/authorize` call is failing
     * as part of the silent authentication with postmessage enabled due to a configuration.
     */
    timeout?: number | undefined;
    /**
     * use postMessage to communicate between the silent callback and the SPA.
     * When false the SDK will attempt to parse the url hash should ignore the url hash
     * and no extra behaviour is needed
     * @default false
     */
    usePostMessage?: boolean | undefined;
}

export interface AuthorizeOptions {
    domain?: string | undefined;
    clientID?: string | undefined;
    connection?: string | undefined;
    redirectUri?: string | undefined;
    responseType?: string | undefined;
    responseMode?: string | undefined;
    state?: string | undefined;
    nonce?: string | undefined;
    scope?: string | undefined;
    audience?: string | undefined;
    language?: string | undefined;
    login_hint?: string | undefined;
    prompt?: string | undefined;
    mode?: "login" | "signUp" | undefined;
    screen_hint?: "signup" | undefined;
    accessType?: string | undefined;
    approvalPrompt?: string | undefined;
    appState?: any;
    connection_scope?: string | string[] | undefined;
}

export type SsoDataResult = SsoSessionFoundResult | SsoSessionNotFoundResult;

export interface SsoSessionFoundResult {
    lastUsedClientID: string;
    lastUsedConnection: {
        name: string;
        strategy?: string | undefined;
    };
    lastUsedUserID: string;
    lastUsedUsername: string;
    sessionClients: string[];
    sso: true;
}

export interface SsoSessionNotFoundResult {
    sso: false;
}

export interface CheckSessionOptions extends AuthorizeOptions {
    /**
     * optional parameter for auth0 to use postMessage to communicate between the silent callback and the SPA.
     */
    usePostMessage?: boolean | undefined;
}

export const version: {
    raw: string;
};

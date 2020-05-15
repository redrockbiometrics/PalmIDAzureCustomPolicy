# Tutorial for configuring PalmID OIDC login and verification for Azure Active Directory B2C

In this tutorial, you will learn how to integrate Azure AD B2C authentication with PalmID. With PalmID your users can Sign In with their palm and use their palm as part of multi-factor authentication.


## Pre requisites
1. Complete the [Azure AD B2C Get Started with Custom Policies](https://aka.ms/ief)
1. Be familiar with the `id_token_hint` usage, which is demonstrated in this [sample](https://github.com/azure-ad-b2c/samples/tree/master/policies/invite)
1. Obtain a [demo](https://idp.palmid.com/) account at PalmID

## Onboarding with PalmID

After singin up with the PalmID you will have OIDC credentials for configuring PalmID as identity provider:

* OIDC `client_id`
* OIDC `client_secret`
* OIDC `entrypoint`

## Configuring PalmID with Azure AD B2C

### 1. Download account linking custom policies sample:
[Account linking sample](https://github.com/Azure-Samples/active-directory-b2c-advanced-policies/tree/master/account-linking)
and follow [Tutorial](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-get-started?tabs=applications) to set it up.

### 2. Configuring custom attributes storage in TrustFrameworkPalmIDExtension.xml
Follow [Tutorial](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-custom-attributes) to setup extension application.

Replace `AAD_EXTENSION_APPLICATION_OBJECT_ID` with your extension application `ObjectID`.

Replace `AAD_EXTENSION_CLIENT_ID` with your extension `application ID`.

### 3. Replace `PALMID_OIDC_CLIENT_ID` with your PalmID `client_id` in TrustFrameworkPalmIDExtension.xml:

### 4. Replace `IDTOKENHINT_OIDC_CONFIGURATION_URI` with the IdTokenHint OpenIDConnect configuration URI in TrustFrameworkPalmIDExtension.xml:

For the test purporses you can use id_token from the B2C_1A_signup_signin_palmid as id_token_hint in SignInWithIdTokenAndPalmIdVerify policy. To make it work set `IDTOKENHINT_OIDC_CONFIGURATION_URI` to https://yourtenant5.b2clogin.com/yourtenant5.onmicrosoft.com/B2C_1A_signup_signin_palmid/v2.0/.well-known/openid-configuration

### 5. Create the PalmID key

Add your PalmID client_secret as a policy key.

1. Select Policy Keys and then select Add.
2. For Options, choose Manual.
3. For Name, enter `PalmIDSecret`. The prefix B2C_1A_ might be added automatically.
4. In Secret, enter your PalmID OIDC `client_secret`.
5. For Key usage, select Signature.
6. Select Create.


### 6. Upload files
Upload files
1. TrustedFrameworkPalmID.xml
2. TrustedFrameworkPalmIDExtensions.xml
3. SignInSignUpAndLinkPalmID.xml
4. SignInWithIdTokenAndPalmIdVerify.xml

## Usage

### SignInSignUpAndLinkPalmID Policy
SignInSignUpAndLinkPalmID custom policy provides SignIn or SingUp workflow with mandatory linking PalmID Account to AAD user.

### SignInWithIdTokenAndPalmIdVerify Policy
SignInWithIdTokenAndPalmIdVerify custom policy that uses id_token_hint to acquire user objectId and use PalmID verification flow: only one user can be logged it. You can use it when you what to use palm as one of the factors in multifactor authentication workflow.

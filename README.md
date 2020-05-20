# Tutorial for configuring PalmID OIDC login and verification for Azure Active Directory B2C

In this tutorial you will learn how to make PalmID IDP a trusted Identity Provider (IDP) and incorporate into Azure AD B2C authentication journey. With PalmID IDP service, Azure B2C users can sign into an Azure B2C website using palm biometrics instead of username and password. Additionally, PalmID can verify physical presence of a claimed user at the confirmation step of a sensitive transaction.

## Prerequisites
1. Familiarity with Azure AD B2C Custom policies described in [Azure AD B2C Get Started with Custom Policies](https://aka.ms/ief)
1. Familiarity with the id_token_hint usage described in this  [sample](https://github.com/azure-ad-b2c/samples/tree/master/policies/invite)
1. If you don't have one already, [create an Azure AD B2C tenant](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant) that is linked to your Azure subscription.
1. [Register your application](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications) in the tenant that you created so that it can communicate with Azure AD B2C.

## Onboarding with PalmID

1. Go to [PalmID](https://idp.palmid.com)
1. Download PalmID Agent for your mobile phone
1. Open PalmID Agent and scan QR Code
1. Follow the instructions and enroll new user
1. Press "OIDC Client" button after the login screen and fill the form
1. Save `client_id` and `client_secret`

## Configuring PalmID with Azure AD B2C


### 1. Set up custom policies for account linking
Download custom policies from this [sample](https://github.com/Azure-Samples/active-directory-b2c-advanced-policies/tree/master/account-linking) and follow the steps as described in this [tutorial](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-get-started?tabs=applications) to set it up.

### 2. Download PalmID custom policy files
Download XML files from this [azure-ad-b2c-policy](./azure-ad-b2c-policy) folder.

### 3. Edit TrustFrameworkPalmIDExtension.xml
Obtain the application identifiers Application ID and Application Object ID as described in this [tutorial](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-custom-attributes).

Replace `AAD_EXTENSION_APPLICATION_OBJECT_ID` with `Application Object ID`.

Replace `AAD_EXTENSION_CLIENT_ID with` `Application ID`.

Replace `PALMID_OIDC_CLIENT_ID` with PalmID OIDC `client_id`.

Replace `IDTOKENHINT_OIDC_CONFIGURATION_URI` with the id_token_jint OpenIDConnect configuration URI in TrustFrameworkPalmIDExtension.xml:

**Tip:** _You can use id_token from the SignInSignUpAndLinkPalmID policy as id_token_hint for SignInWithIdTokenAndPalmIdVerify policy and use https://yourtenant5.b2clogin.com/yourtenant5.onmicrosoft.com/B2C_1A_signup_signin_palmid/v2.0/.well-known/openid-configuration as IDTOKENHINT_OIDC_CONFIGURATION_URI. (Don't forget to replace yourtenant5 with your azure tenant domain name)._

### 4. Create the PalmID key

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
SignInSignUpAndLinkPalmID custom policy provides SignIn and SingUp workflows with mandatory linking PalmID Account to AAD user.

### SignInWithIdTokenAndPalmIdVerify Policy
SignInWithIdTokenAndPalmIdVerify custom policy uses id_token_hint to acquire user objectId and enables PalmID verification flow for a signed in user. This flow is designed for confirming sensitive transactions such as password change or money transfers. It assures that the signed-in user is physically present on the other end. If PalmID usage is limited to this flow, i.e., it is not used for sign in, it provides an additional MFA factor.

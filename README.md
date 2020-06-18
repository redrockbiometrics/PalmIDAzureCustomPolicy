# Tutorial for configuring PalmID OIDC login and verification for Azure Active Directory B2C

In this tutorial you will learn how to make PalmID IDP a trusted Identity Provider (IDP) and incorporate into Azure AD B2C authentication journey. With PalmID IDP service, Azure B2C users can sign into an Azure B2C website using palm biometrics instead of username and password. Additionally, PalmID can verify physical presence of a claimed user at the confirmation step of a sensitive transaction.

## Prerequisites
1. Familiarity with Azure AD B2C Custom policies described in [Azure AD B2C Get Started with Custom Policies](https://aka.ms/ief)
1. Familiarity with the id_token_hint usage described in this [sample](https://github.com/azure-ad-b2c/samples/tree/master/policies/invite). This token is needed for passing user_id to PalmID IDP using OpenID Connect protocol.  
1. If you don't have one already, [create an Azure AD B2C tenant](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-create-tenant) that is linked to your Azure subscription.
1. [Register your web application](https://docs.microsoft.com/en-us/azure/active-directory-b2c/tutorial-register-applications) in the tenant that you created so that it can communicate with Azure AD B2C.

## Onboarding with PalmID

1. Install PalmID Agent app on your mobile phone [(iOS)](https://apps.apple.com/us/app/id1513464087)
1. Start the PalmID Agent app, follow the instructions, and enroll yourself as a new user
1. On your PC, follow the [PalmID IDP link](https://idp.palmid.com); you will get a screen with QR code
1. Open PalmID Agent app on your phone and scan the QR Code
1. Now you own a personal OIDC Client manager account and can get OIDC Client credentials required for integration.
1. Press "OIDC Client" button below “Hello!”. fill the form, and press “Save” button.
1. Save client_id and client_secret. You will need them later.


## Configuring PalmID with Azure AD B2C

The following instructions are based on the workflows described in this tutorial.

### 1. Set up custom policies for account linking

Download custom policies from this [sample](https://github.com/Azure-Samples/active-directory-b2c-advanced-policies/tree/master/account-linking).

Follow the steps as described in this [tutorial](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-get-started?tabs=applications) to set it up.

1. Complete “Add signing and encryption keys” section.
1. Complete “Register Identity Experience Framework applications” section.
1. In “Custom policy starter pack” section, instead of the starter pack use the [account-linking sample](https://github.com/Azure-Samples/active-directory-b2c-advanced-policies/tree/master/account-linking) from [advanced policies  repository](https://github.com/Azure-Samples/active-directory-b2c-advanced-policies) downloaded earlier.
1. In the “Upload the policies” section, upload the first 3 files:
  *	TrustFrameworkBase.xml
  *	TrustFrameworkExtensions.xml
  *	SignUpOrSignin.xml
1. The test described in “Test the custom policy” section must pass.
1. Skip "Add Facebook as an identity provider" section

### 2. Download PalmID custom policy files
Download XML files from this [azure-ad-b2c-policy folder](./azure-ad-b2c-policy).

### 3. Edit TrustFrameworkPalmIDExtension.xml
Obtain the application identifiers Application ID and Application Object ID as described in this [tutorial](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-custom-attributes#get-the-application-properties).

Replace `AAD_EXTENSION_APPLICATION_OBJECT_ID` with `Application Object ID`.

Replace `AAD_EXTENSION_CLIENT_ID with` `Application ID`.

Replace `PALMID_OIDC_CLIENT_ID` with PalmID OIDC `client_id`.

Replace `IDTOKENHINT_OIDC_CONFIGURATION_URI` with the `id_token_hint` OpenIDConnect configuration URI in TrustFrameworkPalmIDExtension.xml:

**Tip:** _You can use id_token from the `signin_singup_palmid` policy as id_token_hint for SignInWithIdTokenAndPalmIdVerify policy for testing purporses. To do that use https://yourtenant5.b2clogin.com/yourtenant5.onmicrosoft.com/B2C_1A_signup_signin_palmid/v2.0/.well-known/openid-configuration as IDTOKENHINT_OIDC_CONFIGURATION_URI. (Don't forget to replace yourtenant5 with your azure tenant domain name)._

### 4. Create the PalmID key

Add your PalmID client_secret as a policy key. This task is similar to the task “Create the encryption key” in the section “Add signing and encryption keys” from the tutorial.

1. Select Policy Keys and then select Add.
2. For Options, choose Manual.
3. For Name, enter `PalmIDSecret`. The prefix B2C_1A_ might be added automatically.
4. In Secret, enter your PalmID OIDC `client_secret`.
5. For Key usage, select Signature.
6. Select Create.

### 5. Upload files

This task repeats the “Upload the policies” section from the tutorial. In addition to already uploaded files:
a.	TrustFrameworkBase.xml
b.	TrustFrameworkExtensions.xml
c.	SignUpOrSignin.xml

upload 4 additional: 

1. TrustedFrameworkPalmID.xml
2. TrustedFrameworkPalmIDExtensions.xml
3. SignInSignUpAndLinkPalmID.xml
4. SignInWithIdTokenAndPalmIdVerify.xml

There should be 7 files total.

### 6. Test policy
Use ["Test the custom policy" tutorial section](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-get-started?tabs=applications#test-the-custom-policy) to test `signup_signin_palmid` policy.

## Usage

### signup_signin_palmid Policy
`signup_signin_palmid` custom policy provides SignIn and SingUp workflows with mandatory linking PalmID Account to AAD user.

### signinwithidtoken_and_palmidverify Policy
`signinwithidtoken_and_palmidverify` custom policy uses id_token_hint to acquire user objectId and enables PalmID verification flow for a signed in user. This flow is designed for confirming sensitive transactions such as password change or money transfers. It assures that the signed-in user is physically present on the other end. If PalmID usage is limited to this flow, i.e., it is not used for sign in, it provides an additional MFA factor.


### WebApplicationADB2CPalmId

Check out a [sample project](WebApplicationADB2CPalmId/README.md) to see how the PalmID custom policies are being used in a real application.

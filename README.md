# Tutorial for configuring PalmID OIDC with Azure Active Directory B2C

In this tutorial, you will learn how to integrate Azure AD B2C authentication with PalmID. With PalmID your users can Sign In with their palm and use their palm as part of multi-factor authentication.

## Onboarding with PalmID

After singin up with the PalmID you will have OIDC credentials for configuring PalmID as identity provider:

* OIDC client_id
* OIDC client_secret
* OIDC entrypoint


## Configuring PalmID with Azure AD B2C

### 1. Download account linking custom policies sample:
https://github.com/Azure-Samples/active-directory-b2c-advanced-policies/tree/master/account-linking
and follow https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-get-started?tabs=applications to set it up.

### 2. Configuring custom attributes storage
https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-custom-attributes

### 3. Set PalmID client_id in TrustFrameworkPalmIDExtension:
```
    <ClaimsProvider>
      <DisplayName>PalmID</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="PalmID-OIDC-Base">
          <Metadata>
            <Item Key="client_id">PALMID_CLIENT_ID</Item>
          </Metadata>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
```

### 4. Set IdTokenHint configuration in TrustFrameworkPalmIDExtension:
```
    <ClaimsProvider>
      <DisplayName>ID Token Hint ClaimsProvider</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="IdTokenHint_ExtractClaims">
          <DisplayName>ID Token Hint TechnicalProfile</DisplayName>
          <Protocol Name="None" />
          <Metadata>
            <!--
				      In example we use id_token from B2C_1A_signup_signin_palmid as id_token_hint
              https://YOURTENANT.b2clogin.com/YOURTENANT.onmicrosoft.com/B2C_1A_signup_signin_palmid/v2.0/.well-known/openid-configuration
            -->
            <Item Key="METADATA">IDTOKENHINT_OPENID_CONFIGURATION_URI</Item>
          </Metadata>
          <OutputClaims></OutputClaims>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
```

### 5. Create the PalmID key

Add your PalmID application's App Secret as a policy key. You can use the App Secret of the application you created as part of this article's prerequisites.

1. Select Policy Keys and then select Add.
2. For Options, choose Manual.
3. For Name, enter PalmIDSecret. The prefix B2C_1A_ might be added automatically.
4. In Secret, enter your PalmID OIDC client_secret.
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

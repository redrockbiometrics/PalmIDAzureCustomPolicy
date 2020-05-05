# Azure custom policy
Based on https://github.com/Azure-Samples/active-directory-b2c-advanced-policies/tree/master/account-linking

1. B2C_1A_PalmIDSecret
2. Setup custom claims storage
```
    <ClaimsProvider>
      <DisplayName>Azure Active Directory</DisplayName>
      <TechnicalProfiles>
        <TechnicalProfile Id="AAD-Common">
          <Metadata>
            <Item Key="ApplicationObjectId">dcfcba49-812d-4949-b6c2-2355d8ece03d</Item>
            <Item Key="ClientId">398329f9-c3fa-420f-9405-ba798b0caf11</Item>
          </Metadata>
        </TechnicalProfile>
      </TechnicalProfiles>
    </ClaimsProvider>
```
3. SignInSignUpAndLinkPalmID
4. SignInWithIdTokenAndPalmIdVerify

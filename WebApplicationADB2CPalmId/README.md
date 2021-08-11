# WebApplication Azure AD B2C PalmID Sample 

This sample project demostrates usage of `B2C_1A_signup_signin_palmid` 
 and `B2C_1A_signinwithidtoken_and_palmidverify` custom policies for login and
user's identity verification with PalmID.

## Prerequisites
1. Setup PalmID custom policies as described in the [tutorial](../README.md). 
2. Visual Studio 2017 or later.

## Setup project

1. Add `https://localhost:44357/signin-oidc` and `https://localhost:44357/verify-oidc` as 
   Reply URLs for your Azure AD B2C application.
2. Open WebApplicationADB2CPalmId.sln.
3. Open appsettings.json.
4. Replace "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" with your `Application ID`
5. Replace YOUR_DOMAIN_NAME with the your tenant `domain name` for `Instance` and `Domain` settings.
6. Save appsettings.json
7. Run demo

## Demo

1. Click "Sign In" link and sign in with the Azure.
2. On the Homepage you will see "Transfer money" button, this an example of the action
   that requires user to be verified before he proceeds, see sources of [Transaction page](WebApplicationADB2CPalmId/Pages/Transaction.cshtml.cs).
3. After "Transfer money" click you will be redirected to Azure to verify your identity with the PalmID.

## Notes

1. To perform verification, the sample project defines a second "VerifyPolicy" OpenIDConnect
   authentication scheme, which uses id_token acquired from the Sign In as `id_token_hint` for
   `B2C_1A_signinwithidtoken_and_palmidverify` policy.
   See [Startup.cs](WebApplicationADB2CPalmId/Startup.cs).
2. The transaction page contains the code for checking whether a user is logged in and
   whether the current transaction is verified. 
   See [Transaction.cshtml.cs](WebApplicationADB2CPalmId/Pages/Transaction.cshtml.cs).

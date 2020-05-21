using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureADB2C.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace WebApplicationADB2CPalmId.Pages
{
    public class TransactionModel : PageModel
    {
        public async Task<IActionResult> OnGetAsync(string id)
        {
            // Check User Is Logged
            var scheme = AzureADB2CDefaults.AuthenticationScheme;
            var authenticated = await HttpContext.AuthenticateAsync(scheme);
            if (!authenticated.Succeeded)
            {
                return Challenge(scheme);
            }
            
            // Verify User
            var properties = new AuthenticationProperties { IsPersistent = false };
            properties.Items["id_token_hint"] = (string)HttpContext.Items["signInIdToken"];
            properties.Items["trx_id"] = id;

            var verified = await HttpContext.AuthenticateAsync("VerifyPolicy");
            // Check if transaction id is verified
            if (!verified.Succeeded || (string)HttpContext.Items["verifiedTrxId"] != id)
            {
                return Challenge(properties, "VerifyPolicy");
            }

            // Transaction is verified by the user, you can perform actual operation here

            return Page();
        }
    }
}
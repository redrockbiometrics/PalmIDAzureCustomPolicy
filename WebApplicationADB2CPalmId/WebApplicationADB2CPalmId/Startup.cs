using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureADB2C.UI;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;

namespace WebApplicationADB2CPalmId
{
    public class Startup
    {
        string signInIdToken;
        string verifiedTrxId;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services.AddAuthentication(AzureADB2CDefaults.AuthenticationScheme)
                .AddAzureADB2C(options => Configuration.Bind("AzureAdB2C", options));

            // Save SignIn IdToken for usage in B2C_1A_signinwithidtoken_and_palmidverify policy
            services.Configure<OpenIdConnectOptions>(AzureADB2CDefaults.OpenIdScheme, options =>
            {
                options.Events = new OpenIdConnectEvents
                {
                    OnTokenValidated = ctx =>
                    {
                        signInIdToken = ctx.SecurityToken.RawData;
                        return Task.CompletedTask;
                    },
                };
            });

            // Setup OIDC workflow for palm verification 
            services
                .AddAuthentication(options => options.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme)
                .AddOpenIdConnect("VerifyPolicy", options =>
                {
                    options.MetadataAddress = Configuration["AzureAdB2C:Instance"] + Configuration["AzureAdB2C:Domain"] + "/" + Configuration["AzureAdB2C:PalmIDVerifyPolicyId"] + "/v2.0/.well-known/openid-configuration";
                    options.ClientId = Configuration["AzureAdB2C:ClientId"];
                    options.ResponseType = OpenIdConnectResponseType.IdToken;
                    options.CallbackPath = Configuration["AzureAdB2C:VerifyCallbackPath"];

                    options.Events = new OpenIdConnectEvents
                    {
                        // Pass trx_id and id_token_hint to VerifyPolicy
                        OnRedirectToIdentityProvider = ctx =>
                        {
                            ctx.Properties.Items.TryGetValue("trx_id", out var trxId);
                            ctx.Properties.Items.TryGetValue("id_token_hint", out var idTokenHint);

                            ctx.Properties.Items.Remove("trx_id");
                            ctx.Properties.Items.Remove("id_token_hint");

                            ctx.ProtocolMessage.SetParameter("trx_id", trxId);
                            ctx.ProtocolMessage.SetParameter("id_token_hint", idTokenHint);

                            return Task.CompletedTask;
                        },

                        // Save verified trx_id from the IdToken
                        OnTokenValidated = ctx =>
                        {
                            verifiedTrxId = (string)ctx.SecurityToken.Payload["trx_id"];

                            return Task.CompletedTask;
                        },
                    };
                });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            app.UseAuthentication();

            app.Use(async (context, next) =>
            {
                if (signInIdToken != null)
                {
                    context.Items["signInIdToken"] = signInIdToken;
                }

                context.Items["verifiedTrxId"] = verifiedTrxId;

                await next.Invoke();
            });


            app.UseMvc();
        }
    }
}

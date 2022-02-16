(function (global, factory) {
    'use strict';

    /* Use AMD */
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return new (factory(global, global.document))();
        });
    }
    /* Use CommonJS */
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = new (factory(global, global.document))();
    }
    /* Use Browser */
    else {
        global.configEnvironment = new (factory(global, global.document))();
    }
})
    (typeof window !== 'undefined' ? window : this, function (w, d) {
        var configEnvironment = function () {
            return {
                //VCFOHO_Environment: '#{HOMEOFFICE.Environment}',
                MULE_SERVICES: '#{DataPower.Internal.DPEndpoint}:8061',
                REST_URL: '#{DataPower.Deployment.WebAPI.Internal.HTTPSDNS}:8077',
                CLIENT_ID: '#{VCFO.MuleServices.ClientId}',
                CLIENT_SECRET: '#{VCFO.MuleServices.ClientSecret}',
                JSON_SERVER: '/TACalculatorHOWeb/assets/json/',
                MOCK_ENVIRONMENT: false,
                AuthConstants: {
                    ADMIN_USER: '#{TACalculator.FR.Role.Admin}',                    
                    ANALYST_USER: '#{VCFO.ADGroup.vcfoAnalyst}',
                    DEALSPECIALIST_USER: '#{TACalculator.ADGroup.SysAdmin}',
                    SYS_ADMIN_USER: '#{TACalculator.ADGroup.SysAdmin}',
                    SUBMITTER_USER: '#{TACalculator.FR.Role.Submitter}',
                    //AuthUrl: '#{AppSettings.Alias.IntraWebNew}/HomeOfficeCoreRest/api/core/user',
                   // AuthUrl: '#{Auth.SW.Rest.Base.URI}/sw2adauthsession/ADUserInfo/GetUserInfo?AppInitial=TAC',
                    AuthUrl: '#{Auth.SW.Rest.Base.URI}/sw2adauthsession/ADUserInfo/GetUserInfo',
                    ForgerockURL: '#{TACalculator.Forgerock.URL}',
                    Cw_Img_Url: '#{AppSettings.Alias.IntraWebNew}/HomeOfficeCoreRest/api/core/images/signinpixel'
                }
            };
        };
        return configEnvironment;
    });

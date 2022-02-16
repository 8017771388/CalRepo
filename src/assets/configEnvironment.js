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
            //VCFOHO_Environment: 'DEV',
            //REST_URL : 'http://d01nsvw-adrpt01.sddev.lpl.com/TokenizationGUIAPI',
            REST_URL: 'https://devint.esb.webapi.sddev.lpl.com:8077',        
            //HO_BASE_URL: 'http://clientworksdvi.sddev.lpl.com',
            MULE_SERVICES : 'https://datapowerdevint.sddev.lpl.com:8061',
            CLIENT_ID: '83c892fd748b4a3fb71b1822688d5651',
            CLIENT_SECRET: 'C9935267Ec354795AB788f490Aac5785',
            JSON_SERVER: '/TACalculatorHOWeb/assets/json/',
            MOCK_ENVIRONMENT: false, // Set this to false to get API data from backend - for local set to true
            AuthConstants : {
               // SYS_ADMIN_USER: 'HO_TACalculator_Submitter_DEV',
                SUBMITTER_USER: 'HO_TACalculator_Submitter_DEV',
                ADMIN_USER: 'HO_TACalculator_Admin_DEV',
                AuthUrl: 'https://swboappdvi.sddev.lpl.com/sw2adauthsession/ADUserInfo/GetUserInfo',
               // AuthUrl: 'https://swboappdvi.sddev.lpl.com/sw2adauthsession/ADUserInfo/GetUserInfo?AppInitial=TAC',
                ForgerockURL: 'https://datapowerdevint.sddev.lpl.com:8066/homeoffice/user/roles/entitlements',
                //AuthUrl: 'http://clientworksdvi.sddev.lpl.com/HomeOfficeCoreRest/api/core/user',
                //AuthUrl: 'http://txintrawebdev01.sddev.lpl.com/homeofficecorerest/api/core/user',
                Cw_Img_Url: 'http://clientworksdvi.sddev.lpl.com/HomeOfficeCoreRest/api/core/images/signinpixel'
                //Cw_Img_Url: 'http://txintrawebdev01.sddev.lpl.com/HomeOfficeCoreRest/api/core/images/signinpixel'
            }
        };
    };
    return configEnvironment;
}); 

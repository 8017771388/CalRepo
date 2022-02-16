declare var configEnvironment: any;

// EASE Link
// export const VCFOHO_LINK = configEnvironment.REST_URL + '/api';

// export const ADD_TOKEN_API = VCFOHO_LINK + '/CodeAndDecode';
// export const GET_TYPE_API = VCFOHO_LINK + '/GetDistinctEntityTypes';
// export const ENTITY_DESC_API = VCFOHO_LINK +'/GetEntityDescTypeDetails';
// export const ENTITT_MAINTAIN= VCFOHO_LINK+'/MaintainEntityDescTypeDetails';
// export const ERROR_DETAIL = VCFOHO_LINK +'/GetErrorDetails';

// Authentication/ Authorization

export const AUTH_URL = configEnvironment.AuthConstants.AuthUrl;
export const Mule_Service_URL = configEnvironment.MULE_SERVICES_API;
export const Json_Server_URL = configEnvironment.JSON_SERVER;
//export const GET_TIME_FRAME = Json_Server_URL + '/time-frame.json';
export const FORGE_ROCK_URL = configEnvironment.AuthConstants.ForgerockURL;
export const CW_IMAGE_URL = configEnvironment.AuthConstants.Cw_Img_Url;
export const USER_ROLE_URL =
    "./assets/json/authentication/" + "role-access.json";
export const CURRENT_ENV = configEnvironment.VCFOHO_Environment;
export const Mock_Environment = configEnvironment.MOCK_ENVIRONMENT;
export const SYS_ADMIN_USER =
    configEnvironment.AuthConstants.SYS_ADMIN_USER;
export const ADMIN_USER =
    configEnvironment.AuthConstants.ADMIN_USER;
export const SUBMITTER_USER =
    configEnvironment.AuthConstants.SUBMITTER_USER;
export class AppSettings {
    public static APPLICATION_VERSION = "1.0.0";
    //public static SW_ENVIRONMENT = configEnvironment.sw_Environment;;
    //public static HO_CORE_BASE_URL = configEnvironment.HO_BASE_URL;
    public static Mule_Service_URL = configEnvironment.MULE_SERVICES;
    public static REST_URL = configEnvironment.REST_URL;
    public static apiKey = {
        client_id: configEnvironment.CLIENT_ID,
        client_secret: configEnvironment.CLIENT_SECRET,
    };

    public static adGroup = {
        systemAdmin: SYS_ADMIN_USER,
        admin: ADMIN_USER,
        submitter: SUBMITTER_USER,
    };

    //Core-Plan Services

   
  
   
    
    public static getTables =
        AppSettings.REST_URL + "/LookupTables";

    public static getActiveTables =
        AppSettings.REST_URL + "/LookupTables/GetActiveTables";   

    public static getLookupDataType =
        AppSettings.REST_URL + "/LookupTables/GetLookupDataType";

    public static getLookupCategories =
        AppSettings.REST_URL + "/LookupTables/GetLookupCategories";
    public static createOffer = AppSettings.REST_URL + "/TACalculatorAPI/OfferInput";
    public static createUser = AppSettings.REST_URL + "/TACalculatorAPI/User";
    public static getAllCategories = AppSettings.REST_URL + "/TACalculatorAPI/AssumptionTable/Categories";
    public static getAllTablesByCategoryID = AppSettings.REST_URL + "/TACalculatorAPI/AssumptionTable/GetByCategoryId/";
    public static getAllTables = AppSettings.REST_URL + "/TACalculatorAPI/AssumptionTable/GetAssumptionTablesById/";

    public static saveRow = AppSettings.REST_URL + "/TACalculatorAPI/AssumptionTableRow";
    public static addTable = AppSettings.REST_URL + "/TACalculatorAPI/AssumptionTable";
    public static getTerms = AppSettings.REST_URL + "/TACalculatorAPI/Term";
    public static getModels = AppSettings.REST_URL + "/TACalculatorAPI/Model";
    public static getProfitLoss = AppSettings.REST_URL + "/TACalculatorAPI/PAndLReport/GetByOffer";
    public static getOfferCriteria = AppSettings.REST_URL + "/TACalculatorAPI/TAOfferCriteria/GetReportByOfferId";
    public static getNPVData = AppSettings.REST_URL + "/TACalculatorAPI/NPV/GetReportByOfferId";
    public static getDataType = AppSettings.REST_URL + "/TACalculatorAPI/AssumptionTable/GetAssumptionTableDataType";
    public static getdynaminAssumptionData = AppSettings.REST_URL + "/TACalculatorAPI/DynamicAssumptionTable/GetByOfferId";
    public static getOfferOutput = AppSettings.REST_URL + "/TACalculatorAPI/OfferInput/GetOfferOutputSteps";
    public static getOffersHistory = AppSettings.REST_URL + "/TACalculatorAPI/api/History/GetOffersHistory";

    public static getOffersHistoryInput = AppSettings.REST_URL + "/TACalculatorAPI/OfferInput/GetByOfferId";
    public static getOffersHistoryOutput = AppSettings.REST_URL + "/TACalculatorAPI/OfferInput/GetOfferOutputByOfferId";
    public static getCreatedByList = AppSettings.REST_URL + "/TACalculatorAPI/api/History/GetCreatorDetails";

}

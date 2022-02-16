import { constants } from "os";

export const AUTH_MSG = "You are not authorized to access this application ";
export const SERVICE_ERROR_MSG ="Service Error. Please reach out to IT HelpDesk or try again after sometime";
export const ERROR_PAGE_MSG = "You do not have permission to access the TA Calculator application. To get access, please submit an <span class='hlink'><a href='https://lplfinancialprd.service-now.com/sp?id=sc_cat_item&sys_id=deb79e701385c300c8f430ded144b024'>LPL Employee Self-Service Portal</a></span> request to add your Corp username to one of the following Active Directory groups:<br><br><table class='errorTable'><tr><td>CALCULATOR_ADMIN</td><td>TA_Calculator_Admin</td></tr><tr><td>CALCULATOR_SUBMITTER</td><td>TA_Calculator_Submitters</td></tr><tr><td>CALCULATOR_SYSTEM_ADMIN</td><td>TA_Calculator_System_Admin</td></tr> </table><br>If you have questions, please contact <span class='hlink'><a href='mailto:AdvisorCapital@lplfinancial.com'>AdvisorCapital@lplfinancial.com</a></span>";
export const NOT_VALID_PAGE_MSG = `Requested page doesn't exist , Please go to the home page`;
export const NOT_AUTHORIZED_PAGE_MSG = `User not authorized to view this page`;
export const CurrentData = new Date();

export const SYSADMIN = "SystemAdmin";
export const ADMIN = "Admin";
export const SUBMITTER = "Submitter";
export const SUCCESS = "Success";
export const STORAGE_KEY = "hoPlatformCurrentUserKey";
export const CLOG_PREFIX = "hoPlatform:userService - ";
export const APP_TITLE = `TA Calculator`;

export const globalConstants = {
    APPLICATION_NAME: 'TAC',
    STORAGE_KEY: 'taPlatformCurrentUserKey',
    STORAGE_KEY_TEAM: 'taTeamKey',
    STORAGE_KEY_MANAGE_ACCESS: 'taManageAccess',
    STORAGE_KEY_FILTER: 'taFilter',
    STORAGE_KEY_ENTITY: 'observerEntityKey',
    STORAGE_KEY_TIME_PERIOD: 'observerTimeStorageKey',
    STORAGE_KEY_TIME_WEEK: 'observerPresentWeekStorageKey'
}

export const BP_PROFILE_STATUS = [
    { id: "ACT", value: "Active" },
    { id: "NST", value: "Not Started" },
    { id: "TER", value: "Terminated"}   

];

export const GOAL_STATUS = {
    critical: "",
    "On Track": "green",
    "Needs Attention": "orange",
    "In Progress": "orange",
    "Completed Goals": "darkgrey",
};
export const TASK_STATUS = {
    TotalDue: "",
    PastDue: "red-text",
    DueThisWeek: "blue",
    Next30Days: "deepgrey",
    "Past Due": "redText",
    "Due This Week": "blue",
    "Future Tasks": "deepgrey",
    Completed: "darkgrey",
};
export const STAGES = [
    { name: "Discovery",code:1 },
    { name: "Due Diligence", code: 2 },
    { name: "Closing", code: 3 },
    { name: "Integration",code:4 }
    
];

export const TASKSTATUS = [
    { name: "Not Started", code: "NS" },
    { name: "In Progress", code: "IP" },
    { name: "Complete", code: "CM" },
];

export const DEALSTATUS = [
    { name: "Not Started", code: "NTST" },
    { name: "In Progress", code: "INPR" },
    { name: "Completed", code: "COMP" },
    { name: "On Hold", code: "ONHO" },
    { name: "Terminated", code: "TERM" }
    
];

export const TASKCATEGORY = [
    { name: "Agreement", code: "AG" },
    { name: "Book Transfer", code: "BT" },
    { name: "Client Communications", code: "CC" },
    { name: "Financing", code: "FI" },
    { name: "Licensing", code: "LI" },
    { name: "Valuation", code: "VA" },
];

export const TASKACTION = [
    { name: "Assign", code: "ASG" },
    { name: "Complete", code: "COM" },
    { name: "Follow up", code: "FOL" },
    { name: "Meeting", code: "MTG" },
    { name: "Review", code: "REV" },
    { name: "Send Communication", code: "SEC" },
    { name: "Sign", code: "SIG" },
    { name: "Submit", code: "SUB" },
];

export const TASKOWNER = [
    { name: "Buyer", code: "BUY" },
    { name: "Seller", code: "SEL" },
    { name: "Deal Specialist", code: "DLS" },
];

export const BENEFICIARY = {
    2: "Secondary" ,
    3: "Tertiary" ,
    4: "Quaternary",  
    5: "Quinary" ,
    6: "Senary" ,
    7: "Septenary" ,
    8: "Octonary" 
};

export const ASSURANCECWSTATUS={
    1:"Access Off",
    2:"Access On",
    3:"Access On",
    4:"Access Off"
}

export const NUMBERTOBOOLEAN={    
    true:1,
    false:0,
    0:false,
    1:true
}

export const MONTH = {
    "Jan": "01",
    "Feb": "02",
    "Mar": "03",
    "Apr": "04",
    "May": "05",
    "Jun": "06",
    "Jul": "07",
    "Aug": "08",
    "Sep": "09",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12",
};

export const SELLERSTAGE = {
    "Accepting Offers" : "AO",
    "Sale Pending" : "SP",
    "Sold" : "SD",
    "Unknown" : "UK",
    "Withdrawn" : "WD"
}

export const PREMIUMBUERCWSTATUS={
    0:"Access Off",
    1:"Access On",
}

export const BUYERSTATUS = {
    "Active": "ACT",
    "Terminated": "TER",
    "Not Started": "NST"  
}
export const COLUMNS= [{"id":1,"name":"Corp HOS / New Branch"},{"id":2,"name":"Corp In Branch"},{"id":3,"name":"Hybrid HOS / New Branch"},{"id":4,"name":"Hybrid In Branch"},{"id":5,"name":"SWS HOS / New Branch"},{"id":6,"name":"Linsco HOS / New Branch"}]

export const MODEL =  [{
    "name": "Corp HOS",
    "affiliationId": 1,
    "taBranchId": 1,
    "termId": 3,
    "modifyById": null,
    "lastModifyDate": "2021-10-20T18:36:04.837",
    "isActive": true,
    "createDate": "2021-10-20T18:36:04.837",
    "id": 1
}, {
    "name": "Corp In Branch",
    "affiliationId": 1,
    "taBranchId": 2,
    "termId": 3,
    "modifyById": null,
    "lastModifyDate": "2021-10-20T18:36:04.847",
    "isActive": true,
    "createDate": "2021-10-20T18:36:04.847",
    "id": 2
}, {
    "name": "Hybrid In Branch",
    "affiliationId": 2,
    "taBranchId": 2,
    "termId": 3,
    "modifyById": null,
    "lastModifyDate": "2021-10-20T18:36:04.86",
    "isActive": true,
    "createDate": "2021-10-20T18:36:04.86",
    "id": 3
}];

export const TERM = [{
    "name": "7 Years",
    "value": 7,
    "modifyById": null,
    "lastModifyDate": null,
    "isActive": true,
    "createDate": "2021-10-20T18:35:33.267",
    "id": 3
}, {
    "name": "9 Years",
    "value": 9,
    "modifyById": null,
    "lastModifyDate": null,
    "isActive": true,
    "createDate": "2021-10-20T18:35:33.267",
    "id": 4
}, {
    "name": "10 Years",
    "value": 10,
    "modifyById": null,
    "lastModifyDate": null,
    "isActive": true,
    "createDate": "2021-10-20T18:35:33.267",
    "id": 5
}]

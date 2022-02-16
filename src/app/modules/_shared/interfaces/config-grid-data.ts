export interface ConfigGridData {
    "appInfo":
    {
        "appID": number,
        "appName": string,
        "appDomain": string,
        "userName": string
    },
    "stepInfo":
    {
        "stepID": number,
        "stepName": string
    },
    "orchInfo":
    {
        "orchID": number,
        "appName": string,
        "stepName": string,
        "queueName": string
    },
    "appPublishInfo":
    {
        "appID": number,
        "appName": string,
        "topicName": string,
        "publishLogic": string,
        "postPublishLogic": string,
        "userName": string
    }
}

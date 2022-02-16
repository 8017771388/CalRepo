export class User{
    shortName: string;
    name: string;
    authenticationType: string;
    isAuthenticated: boolean;
    userInfo: UserInfo;
}

export class UserInfo{
    userId: number;
    adGuid: string;
    adUserName: string;
    userPrincipal: string;
    displayName: string;
    firstName: string;
    lastName: string;
    title: string;
    mail: string;
    employeeType: string;
    employeeLevel: string;
    employeeId: string;
    adDescription: string;
    businessCategory: string;
    departmentName: string;
    departmentNumber: string;
    building: string;
    buildingFloor: string;
    roomNumber: string;
    officePhone: string;
    mobilePhone: string;
    managerAdUserPath: string;
    accountExpires: Date;
    adLastUpdated: Date;
    adCreateDate: Date;
    modifyDate: Date;
    createDate: Date;
    isActive: boolean;
    userGroups: string[];
}
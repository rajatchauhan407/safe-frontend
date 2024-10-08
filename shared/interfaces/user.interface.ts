export interface IUser{
    _id: string
    constructionSiteId?: string;
    role:string;
    userId: string;
    userName: string;
    firstName: string;
    lastName: string;
    jobPosition: string;
    emergencyPhoneNumber?: string;
    bloodType?: string;
    medicalInfo?: string;
}
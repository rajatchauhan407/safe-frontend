export interface IAlert {
    _id: string;
    role: string;
    userId: string;
    constructionSiteId: string;
    reportingFor: string;
    emergencyType?: string;
    degreeOfEmergency: number;
    alertLocation?: object;
    workersInjured: number;
    timestamp: string;
    recipients?: string[];
    emergencyText: string;
    resolved: boolean;
    assistance: boolean;
    __v: number;
  }
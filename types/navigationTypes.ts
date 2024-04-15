// navigationTypes.ts
export type RootStackParamList = {
    Main: {screen: string, params: {screen: string}};
    Login: undefined;
    AlertDetails:undefined;
    'Received Alert': {alertData: any};
    'Dashboard': {alertSent: any, alertCanceled: any, onEvacuation: any};
    'Evacuation Alert':{alertData: any};
    'SOS Details': {alertData: any, reporterName: string};
    // Add other routes here
  };

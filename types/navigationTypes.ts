// navigationTypes.ts
export type RootStackParamList = {
  Main: { screen: string; params: { screen: string } };
  Login: undefined;
  AlertDetails: undefined;
  "Received Alert": { alertData: any };
  Dashboard: { alertSent: any };
  // Add other routes here
};

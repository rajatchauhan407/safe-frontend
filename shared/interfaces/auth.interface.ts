import { IUser } from './user.interface';

export interface IAuth{
    isAuthenticated:boolean;
    token:string | null;
    error:any;
    status: 'idle' | 'loading' | 'succeed' | 'failed';
    user:IUser | null;
    dismissSupervisorAlert:boolean;
}
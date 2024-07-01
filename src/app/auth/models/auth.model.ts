export interface ILoginPayload {
  name:string;
  password:string;
}

export interface IApiRes<T> {
  success:boolean;
  message:string;
  data:T;
} 

export interface ILoginRes {
  token:string;
  name:string;
  email:string;
  id:string;
}

export type IRegisterPayload = ILoginPayload & {
  name: string;
}

export interface IRegisterRes {
  name:string;
  email:string;
  id:string;
}
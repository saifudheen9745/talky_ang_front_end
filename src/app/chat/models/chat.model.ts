export interface IUserData {
  id:string;
  name:string;
  email:string;
}

export interface IChatMessage {
  room:string;
  message:string;
  msgFrom:string;
  msgTo:string;
  date:number;
}

export type IChatMessageResponse = IChatMessage & {
  id:number;
}

export interface ICreateRoomPaylod {
  memberA:number;
  memberB:number
}
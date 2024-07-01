export interface IUserData {
  id:string;
  name:string;
  email:string;
}

export interface IChatMessage {
  room:string;
  message:string;
  from:string;
  to:string;
  date:number;
}

export interface ICreateRoomPaylod {
  memberA:number;
  memberB:number
}
export class Relationship {
  _id: string;
  _rev: string;
  userA: string;
  userB: string;
  status: string;   // received / pending / accepted
}

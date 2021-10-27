import {DatabaseModel} from "../repository/AbstractCrudRepository";

export class Soignant extends DatabaseModel {
  nom: string;
  prenom: string;
  password?: string;
  mail?: string;
  tel?: number;
  trg?: string;


  constructor(init?: Partial<Soignant>) {
    super();
    return Object.assign(this, init);
  }
}

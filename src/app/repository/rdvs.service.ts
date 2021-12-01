import {Injectable} from '@angular/core';
import {AbstractCrudRepository} from "./AbstractCrudRepository";
import {Rdv} from "../model/planning-rdv";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {RdvStatutCode} from "../model/enums/rdv-statut";

@Injectable({
  providedIn: 'root'
})
export class RdvsService extends AbstractCrudRepository<Rdv> {
  constructor(db: AngularFirestore) {
    super(db, '/rdvs');
  }

  // Récupère les rvs d'un soignant par date
  getBySoignantId(soignantId: string, date?: Date): Observable<Rdv[]> {
    date = date ?? new Date();
    return this.db.collection<Rdv[]>(this.dbPath,
      ref => ref
        .where('soignant.id', '==', soignantId)
        .where('statut', '!=', RdvStatutCode.ANNULE)
      // TODO : Ajouter les condition pour récupérer les RDV de la journée sélectionée
      // .where('date', '==', ) // Ramène les rdv pour le jour sélectionné
    ).snapshotChanges()
      .pipe(map(obj => obj.map(c => ({id: c.payload.doc.id, ...this.fromFirestore(c.payload.doc.data())}))));
  }
}

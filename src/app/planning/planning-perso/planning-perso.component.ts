import {Component, OnInit} from '@angular/core';
import {RdvsService} from "../../repository/rdvs.service";
import {Utils} from "../../shared/Utils";
import {Horaire} from "../../model/horaire";
import {Rdv} from "../../model/planning-rdv";
import {RdvStatut} from "../../model/enums/rdv-statut";

@Component({
  selector: 'app-planning-perso',
  templateUrl: './planning-perso.component.html',
  styleUrls: ['./planning-perso.component.scss']
})
export class PlanningPersoComponent implements OnInit {

  horaires: Horaire[];
  loading = false;
  rdvStatus = RdvStatut;

  constructor(private rs: RdvsService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.horaires = Utils.getHoraires(60);

    // TODO : Récupérer l'id du soignant connecté et remplacer celui-ci en dure qui correspond à FOS
    this.rs.getBySoignantId('VEHHVVzuG1sf5osTy5Fs')
      .subscribe(rdvs => this.ajouteRdvsAuxHoraires(rdvs));
  }

  /**
   * Ajoute les RDV dans les horaires correspondant
   */
  private ajouteRdvsAuxHoraires(rdvs: Rdv[]) {
    rdvs.forEach(rdv => {
      const index = this.horaires.findIndex(horaire => Utils.toHours(horaire.heure) === rdv.date.getHours());
      if (this.horaires[index].rdvs) {
        this.horaires[index].rdvs.push(rdv);
      } else {
        this.horaires[index].rdvs = [rdv];
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VysledekHledani } from './vysledek';


@Component({
  selector: 'app-hledej',
  templateUrl: './hledej.component.html',
  styleUrls: ['./hledej.component.scss']
})
export class HledejComponent implements OnInit {

  napsanyVyraz: any;
  predchoziHledanyVyraz: any;

  vysledkyHledani: VysledekHledani[] = [];

  chybaHledani = {
    chyba: true,
    hlaska : ""
  };

  requestOptions: object = {
    observe: 'response',  // vrací i hlavičku s HTTP statusem
    method: 'GET',
  };

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  hledejNaGoogle() {
    if (this.napsanyVyraz) {
      // Můj vygenerovaný API klíč z https://programmablesearchengine.google.com/create/new
      const apiKey = 'AIzaSyAe-mNJinS09cwUxqqjU2qE6FwrEPkzIG4';
      // ID vlastního search enginu - dosazen default Google
      const cx = '5a93c3183506f4fe1&cr=countryCZ&gl=cz'

      this.http.get<any>(`https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${this.napsanyVyraz}`, this.requestOptions)
      .subscribe({
        next: (data) => {
          if (data.status !== 200) {  // Vrátil se jiný HTTP header než 200
            this.chybaHledani = {
              chyba: true,
              hlaska: 'Při vyhledání došlo k chybě, zkuste to prosím znovu.'
            };
            console.warn(data);
          } else {
            console.log(data)
            if (data.body.searchInformation.totalResults === "0") {
              this.chybaHledani = {
                chyba: true,
                hlaska: 'Nebyly nalezeny žádné výsledky.'
              };
            } else {
            this.vysledkyHledani = data.body.items;
            this.chybaHledani.chyba = false;
            console.log(this.vysledkyHledani)
            }
          }
        },
        error: (err) => {
          this.chybaHledani = {
            chyba: true,
            hlaska: 'Při vyhledání došlo k chybě, zkuste to prosím znovu.'
          };
          console.warn(err);
        }
      });
      this.predchoziHledanyVyraz = this.napsanyVyraz;
      this.napsanyVyraz = '';
    } else {
      this.chybaHledani = {
        chyba: true,
        hlaska: 'Zadejte prosím hledaný výraz'
      }
    }

  }
}

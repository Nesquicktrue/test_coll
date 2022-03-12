import { Component } from '@angular/core';
import { HledejComponent } from '../hledej/hledej.component';

import { VysledekHledani } from '../hledej/vysledek';

import * as pdfMake from 'pdfmake/build/pdfmake.js';
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ulozjako',
  templateUrl: './ulozjako.component.html',
  styleUrls: ['./ulozjako.component.scss']
})
export class UlozjakoComponent {
  vysledkyHledani: VysledekHledani[] = [];

  constructor(private hledejComp: HledejComponent) { }


  vytvorPDF() {
    this.vysledkyHledani = this.hledejComp.vysledkyHledani;
    const documentDefinition = {
      content: [
        {
          text: `Výsledky vyhledávání pro výraz " ${this.hledejComp.predchoziHledanyVyraz} ":`,
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
        {
          ul: this.vytvorSeznamDoPDF(this.vysledkyHledani)
        }
      ],
        styles: {
          name: {
            fontSize: 16,
            bold: true
          }
        }
    };

    pdfMake.createPdf(documentDefinition).download();
  }

  vytvorSeznamDoPDF(seznam: VysledekHledani[]) {
    let formatovanyZaznam
    let formatovanySeznam:any = [];
    seznam.forEach((zaznam) => {
      formatovanyZaznam = [{
          text: `${zaznam.title}`,
          bold: true,
        },
        {
          text: `${zaznam.snippet}`,
        },
        {
          text: ` `,   // Vynechaný řádek mezi výsledky
        }
      ]

    formatovanySeznam.push(formatovanyZaznam)
    })
    return formatovanySeznam
  }

  // export do CSV, vychazi ze zdroje: https://github.com/marco76/export-csv
  exportAllToCSV() {
    this.vysledkyHledani = this.hledejComp.vysledkyHledani;
    return this.exportColumnsToCSV(this.vysledkyHledani, "vysledky", []);
  }

  exportColumnsToCSV(JSONListItemsToPublish: any[], fileName: string, columns: string[]) {
    const items = JSONListItemsToPublish;
    let arrayToPublish = [];
    for (let i = 0; i < items.length; i++) {
      let keys = Object.keys(items[i]);
      let csvRow : {[column: string]: any;} = {};

      for ( let keyId = 0; keyId < keys.length; keyId++) {
        if (!columns || columns.length === 0) {
            csvRow[keys[keyId]] = items[i][keys[keyId]];
        } else if (columns.indexOf(keys[keyId]) > -1) {
            csvRow[keys[keyId]] = items[i][keys[keyId]];
        }
      }
      arrayToPublish.push(csvRow);
    }
    const replace = (key: string, value: string) => value === null ? '' : value;
    const header = Object.keys(arrayToPublish[0]);
    let csv = arrayToPublish.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replace)).join(';'));
    csv.unshift(header.join(';'));
    let data = csv.join('\r\n');
    this.download(fileName, data);
  }

  downloadFile(filename: string, data: string, format: string) {
    // we add the BOF for UTF-8, Excel requires this information to show chars with accents etc.
    // zdroj: https://github.com/marco76/export-csv
    let blob = new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), data], {type: format});

      let elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(blob);
      elem.download = filename;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
  }

  download(filename: string, data: any) {
      // do TXT: text/plain;charset=utf-8
      this.downloadFile(filename, data, 'text/csv');
  }
}


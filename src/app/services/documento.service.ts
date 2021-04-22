import { Injectable } from '@angular/core';

import { Columns, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { analisis } from '../interfaces/analisis.interfaces';
import { Mineral } from '../models/mineral.model';
import { Vitamina } from '../models/Vitamina.model';
import { AcidoGraso } from '../models/AcidoGraso';
@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor() { }


  generarPdf(propiedades:any[],nombre:string,categoria:string, datosa:analisis[],datosm:Mineral[],datosG:AcidoGraso[],datosv:Vitamina[]) {
    const pdf = new PdfMakeWrapper();

    pdf.add(new Txt('Propiedades Termosificas').bold().end);
    pdf.ln(2);
    pdf.add(
      this.title('Nombre del alimeto', nombre)
    );
    pdf.ln()
    pdf.add(this.title('Categoria', categoria))
    pdf.ln(2)
    pdf.add(new Txt('Analisis Proximal').bold().end);
    
    pdf.add(pdf.ln());
    pdf.add(this.createTablaAnalisis1(datosa))
    pdf.add(pdf.ln());
    pdf.add(this.createTablaAnalisis2(datosa))
    pdf.add(pdf.ln(2));
    pdf.add(
      new Txt('Minerales').bold().end
    )
    //AGREGANDO MINERALES
    pdf.add(this.Minerales(datosm));
    pdf.add(pdf.ln(2))
  //  //AGREGANDO VITAMINAS
    pdf.add(
      new Txt('Vitaminas').bold().end
    )
    pdf.add(this.Vitaminas(datosv));
    pdf.add(pdf.ln(2))

    // //AGREGANDO ACIDOS
    pdf.add(
      new Txt('Acidos Grasos').bold().end
    )
    pdf.add(this.AcidosG(datosG));

    pdf.add(pdf.ln(2))
    pdf.add(
      new Txt('Propiedades Termicas').bold().end
    )
    pdf.add(this.difusividad(propiedades[0]));
    pdf.add(this.conductividad(propiedades[1]));
    pdf.add(this.densidad(propiedades[2]));
    pdf.add(this.calorEspecifico(propiedades[3]));

    pdf.create().open();
  }

// tabla de analisis proximal
  createTablaAnalisis1(data: analisis[]) {
    return new Table([
      ['Humedad', 'Energia(kcal)', 'Energia(kj)', 'Lipidos(G)', 'Carbohidratos disponibles(g)'],
      ...this.extraerData1(data)
    ]
    ).widths('*')
    .layout({fillColor:(rowIndex:number,node:any,columnIndex:number)=>{
      return rowIndex===0 ? '#cccccc':'';
    }}).end
  }

  createTablaAnalisis2(data:analisis[]) {
    return new Table([
      ['Proteina','Fibra dietaria(g)','Cenizas(g)','Carbohidrato totales(g)'],
      ...this.extraerData2(data)
    ]
    ).widths('*')
    .layout({fillColor:(rowIndex:number,node:any,columnIndex:number)=>{
      return rowIndex===0 ? '#cccccc':'';
    }}).end
  }
  // +++++++++++++++++++++++++++++++++++++

  //Tabla para visualizar los minerales
  Minerales(data: Mineral[]) {
    
    
    return new Table([
      ['Calcio','Hierro','Sodio','Fosforo','Yodo','Zinc','Magnecio','Potacio'],
       ...this.extraerMinerales([data])
    ]
    ).widths('*')
    .layout({fillColor:(rowIndex:number,node:any,columnIndex:number)=>{
      return rowIndex===0 ? '#cccccc':'';
    }}).end
   }
  
  // +++++++++++++++++++++++++++++++++++++

  //Tabla para visualizar los Acidos G

  AcidosG(data: AcidoGraso[]) {
    return new Table([
      ['Grasa','Grasa menos saturada','Polinsaturada','colesterol','Parte comestible'],
      ...this.extraerAcidos([data])
    ]
    ).widths('*')
    .layout({fillColor:(rowIndex:number,node:any,columnIndex:number)=>{
      return rowIndex===0 ? '#cccccc':'';
    }}).end
  }

   // +++++++++++++++++++++++++++++++++++++

  //Tabla para visualizar las Vitaminas

  Vitaminas(data:Vitamina[]) {
    return new Table([
      ['Tiamina','Riboflaxina','Niaxina','Folatos','Vitamina A', 'Vitamina C','vitamina B12'],
      ...this.extraerVitaminas([data])
    ]
    ).widths('*')
    .layout({fillColor:(rowIndex:number,node:any,columnIndex:number)=>{
      return rowIndex===0 ? '#cccccc':'';
    }}).end
  }

   // +++++++++++++++++++++++++++++++++++++

  //propiedades Termicas
  difusividad(valor) {
   return new Columns([ 'Difusividad', valor ]).columnGap(10).end
  }
  densidad(valor) {
    return new Columns([ 'Densidad', valor ]).columnGap(10).end
  }
  conductividad(valor) {
    return new Columns([ 'Conductividad', valor ]).columnGap(10).end
  }
  calorEspecifico(valor) {
    return new Columns([ 'Calor especifico', valor ]).columnGap(10).end
  }

  title(valor1:string,valor) {
    return new Columns([ valor1, valor ]).columnGap(100).end
  }

  //metodos para extraer la data de las propiedades
  extraerData1(data: analisis[]) {
    return data.map(row=>[row.humedad,row.energiaKcal,row.energiaKj,row.lipidosG,row.carbohidratos_disp])
  }
  extraerData2(data: analisis[]) {
    return data.map(row=>[row.proteinaG,row.fibra_dietaria,row.cenizas,row.carbohidratos_total])
  }

  extraerMinerales(data: any[]) {
 
    
    return data.map(row => [
      row.calcio,
      row.hierro,
      row.sodio,
      row.fosforo,
      row.yodo,
      row.zinc,
      row.magnecio,
      row.potasio
    ])
  }
  extraerVitaminas(data:any[]) {
    return data.map(row => [
      row.tiamina,
      row.riboflaxina,
      row.niaxina,
      row.folatos,
      row.vitaminaA,
      row.vitaminaC,
      row.vitamina_b12
    ])
  }
  extraerAcidos(data:any[]) {
    return data.map(row => [
      row.grasaSaturada,
      row.grasaMenosSaturada,
      row.grasaPoliinsaturada,
      row.colesterol,
      row.parteComestible
    ])
  }
}

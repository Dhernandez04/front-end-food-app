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


  generarPdf(propiedades:any[],nombre:string,categoria:string, datosa:analisis[],datosm:Mineral[],datosG:AcidoGraso[],datosv:Vitamina[], tempe: number) {
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
    pdf.add(this.temperatura(tempe));
    pdf.add(this.difusividad(propiedades[1]));
    pdf.add(this.conductividad(propiedades[0]));
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
      ['Calcio (mg)','Hierro (mg)','Sodio (mg)','Fosforo (mg)','Yodo (mg)','Zinc (mg)','Magnecio (mg)','Potacio (mg)'],
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
      ['Grasa (mg)','Grasa menos saturada (mg)','Polinsaturada (mg)','colesterol (g)','Parte comestible %'],
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
      ['Tiamina (mg)','Riboflaxina (mg)','Niacina (mg)','Folatos (mg)','Vitamina A (er)', 'Vitamina C (mg)','vitamina B12 (mg)'],
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
   return new Columns([ 'Difusividad', `${valor} m²/s` ]).columnGap(10).end
  }
  densidad(valor) {
    return new Columns([ 'Densidad', `${valor} kg/m³` ]).columnGap(10).end
  }
  conductividad(valor) {
    return new Columns([ 'Conductividad', `${valor} W/(m*k)` ]).columnGap(10).end
  }
  calorEspecifico(valor) {
    return new Columns([ 'Calor especifico', `${valor} J/(kg*K)` ]).columnGap(10).end
  }

  temperatura(valor) {
    return new Columns([ 'Temperatura', `${valor} °C` ]).columnGap(10).end
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
      `${row.calcio} %`,
      `${row.hierro}%`,
      `${row.sodio}%`,
      `${row.fosforo}%`,
      `${row.yodo}%`,
      `${row.zinc}%`,
      `${row.magnecio}%`,
      `${row.potasio}%`
    ])
  }
  extraerVitaminas(data:any[]) {
    return data.map(row => [
      `${row.riboflaxina}%`,
      `${row.tiamina}%`,
      `${row.niaxina}%`,
      `${row.folatos}%`,
      `${row.vitaminaA}%`,
      `${row.vitaminaC}%`,
      `${row.vitamina_b12}%`
    ])
  }
  extraerAcidos(data:any[]) {
    return data.map(row => [
      `${row.grasaSaturada}%`,
      `${row.grasaMenosSaturada}%`,
      `${row.grasaPoliinsaturada}%`,
      `${row.colesterol}%`,
      `${row.parteComestible}%`
    ])
  }
}

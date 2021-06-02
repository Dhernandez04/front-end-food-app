import { Injectable } from '@angular/core';

import { Columns, PdfMakeWrapper, Table, Txt } from 'pdfmake-wrapper';
import { analisis } from '../interfaces/analisis.interfaces';
import { Mineral } from '../models/mineral.model';
import { Vitamina } from '../models/Vitamina.model';
import { AcidoGraso } from '../models/AcidoGraso';

import { azucar } from '../interfaces/azucar.interface';
import { aminoacido } from '../interfaces/aminoacido.interface';
@Injectable({
  providedIn: 'root'
})
export class DocumentoService {

  constructor() { }


  generarPdf(propiedades:any[],nombre:string,categoria:string, datosa:analisis[],datosm:Mineral[],datosG:AcidoGraso[],datosv:Vitamina[],aminoacido:any,azucar:any, tempe: number) {
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
    pdf.add(pdf.ln())
    //AGREGANDO AMINOACIDOS
    if(aminoacido.length !== 0){
      pdf.add(
        new Txt('Aminoacidos').bold().end
      )
      pdf.add(this.title('Acido aspartico (g)',aminoacido.acido_aspartico))
      pdf.add(this.title('Treonina (g)',aminoacido.treonina))
      pdf.add(this.title('Serina (g)',aminoacido.serina))
      pdf.add(this.title('Acido glutaminico (g)',aminoacido.acido_glutaminico))
      pdf.add(this.title('Prolina (g)',aminoacido.prolina))
      pdf.add(this.title('glicina (g)',aminoacido.glicina))
      pdf.add(this.title('alanina (g)',aminoacido.alanina))
      pdf.add(this.title('cisteina (g)',aminoacido.cisteina))
      pdf.add(this.title('valina (g)',aminoacido.valina))
      pdf.add(this.title('metionina (g)',aminoacido.metionina))
      pdf.add(this.title('isoleucina (g)',aminoacido.isoleucina))
      pdf.add(this.title('leucina (g)',aminoacido.leucina))
      pdf.add(this.title('tirosina (g)',aminoacido.tirosina))
      pdf.add(this.title('fenilalanina (g)',aminoacido.fenilalanina))
      pdf.add(this.title('histidina (g)',aminoacido.histidina))
      pdf.add(this.title('lisina (g)',aminoacido.lisina))
      pdf.add(this.title('arginina (g)',aminoacido.arginina))
      pdf.add(this.title('triptofano (g)',aminoacido.triptofano))
    }
  if(azucar.length !== 0){
   //AGREGANDO AZUCAR
   pdf.add(pdf.ln())
   pdf.add(
     new Txt('Azucares').bold().end
   )
   pdf.add(this.title('Azucares disponibles (g)',azucar.azucares_disponibles))
   pdf.add(this.title('Azucares no_reductores (g)',azucar.azucares_no_reductores))
   pdf.add(this.title('Azucares reductores (g)',azucar.azucares_reductores))
   pdf.add(this.title('Fructosa (g)',azucar.fructosa))
   pdf.add(this.title('Galactosa (g)',azucar.galactosa))
   pdf.add(this.title('Glucosa (g)',azucar.Glucosa))
   pdf.add(this.title('Lactosa (g)',azucar.lactosa))
   pdf.add(this.title('Sacarosa (g)',azucar.Sacarosa))

  }
   
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

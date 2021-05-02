import { Component, OnInit } from '@angular/core';
import { ModalEditService } from '../../services/modal-edit.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-edit-a',
  templateUrl: './modal-edit-a.component.html',
  styleUrls: ['./modal-edit-a.component.css']
})
export class ModalEditAComponent implements OnInit {

  constructor(public modalEditService: ModalEditService, private router: Router) { }

  ngOnInit(): void {
  }
  cerrarModal() {

    this.modalEditService.cerrarModal();
  }

  alimento() {
    this.cerrarModal()
    this.router.navigateByUrl(`dashboard/alimentos/alimento/${this.modalEditService.id}`)
  }
  minerales() {
    this.cerrarModal()
    this.router.navigateByUrl(`dashboard/alimentos/mineral/${this.modalEditService.id}`)
  }
  acidos() {
    this.cerrarModal()
    this.router.navigateByUrl(`dashboard/alimentos/acidograso/${this.modalEditService.id}`)
  }
  vitamina() {
    this.cerrarModal()

    this.router.navigateByUrl(`dashboard/alimentos/vitamina/${this.modalEditService.id}`)
  }

}

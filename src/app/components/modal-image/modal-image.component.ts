import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalImageService } from '../../services/modal-image.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styleUrls: ['./modal-image.component.css']
})
export class ModalImageComponent implements OnInit {
  public imagenSubir: File;
  public imgTemp: any = null;
  constructor(public modalImageService: ModalImageService,
    public uploadService: UploadService) {

  }

  ngOnInit(): void {
  }

  cerrarModal() {
    this.imgTemp = null;
    this.modalImageService.cerrarModal();
  }


  cambiarImagen(file: File) {

    this.imagenSubir = file;

    if (!file) { return this.imgTemp = null; }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {

      this.imgTemp = reader.result;
    }
  }

  subirImagen() {
    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;


    this.uploadService.actualizarFoto(this.imagenSubir, tipo, id)
      .then(img => {

        Swal.fire('Correcto', 'Imagen actualizada.', 'success')
        this.modalImageService.nuevaImagen.emit(img)
        this.cerrarModal();
      }, (err => {
        console.log(err);
        Swal.fire('Error', 'No se pudo subir la imagen', 'error')
      }))
  }

}

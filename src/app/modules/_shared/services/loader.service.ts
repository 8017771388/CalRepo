import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor() { }

  show(title : string, body : string) {
      Swal.fire({
          title: title,
          html: body,
          allowOutsideClick: false,
          showConfirmButton: false,
          backdrop: true,
          heightAuto: false,
          onBeforeOpen: () => {
              Swal.showLoading()
          },
          onAfterClose: () => window.scrollTo(0, 0)
      
        
    });
  }

  Success() {
      Swal.fire({
          title: 'Success!', text: 'Saved Successfully!', icon: 'success', backdrop: false,
          heightAuto: false, didClose: () => window.scrollTo(0, 0)
          ,
          onAfterClose: () => window.scrollTo(0, 0) });
  }

  Error(errMessage) {
    Swal.fire({ title: 'Error Occured!', text: errMessage, icon: 'error' })
  }


  hide() {
    Swal.close();
  }
}

import { Component, ElementRef, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  petForm: FormGroup = this.formBuilder.group({

  });

  public mostrarFormulario = false;
  mascota: any = {};
  mascotas = [
    {
      //ejemplo de mascota
      active: 1, // si esta actiu
      birthday: "2023-03-03",
      code: "123456798",
      created_at: "2023-03-03",
      gender: "0", //0 es mascle 1 es femella
      id: 1,
      name: "Prova mascota",
      photo: "",
      race_id: 15,
      updated_at: "2023-03-23",
      user_id: 1,
      age: 1,
      months: 10,
      race_name: "inventory"
    },
  ];
  cantidadMascotas = this.mascotas.length;

  constructor(@Inject('API_URL') public apiUrl: string, private renderer: Renderer2, private elementRef: ElementRef, private api: ApiService, private formBuilder: FormBuilder) {
    this.reprint()    
    this.api.myPets().then((response) => {
      this.reprint();
      this.mascotas = response.data.pets;
      console.log(response.data.pets);
    }).catch((error) => {
      console.log(error);
    });
  }

  agregarMascota() {

  }

  filtrarMascotas(filtro: string) {
    // Lógica para filtrar las mascotas según el criterio de búsqueda
  }

  reprint() {
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-color', 'white');
  }
}

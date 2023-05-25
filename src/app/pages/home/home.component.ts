import { Component, ElementRef, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  petForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    specie: ['', Validators.required],
    birthday: ['', Validators.required],
    code: ['', Validators.required],
    race: ['', Validators.required],
    gender: ['', Validators.required],
    photo: ['', Validators.required]
  });

  public mostrarFormulario = false;
  public mascota: any = {};
  public species: any = {};
  public races: any = {};
  public statusRace: boolean = false;
  public fechaActual: string;
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
    let today = new Date();
    this.fechaActual = today.toISOString().split('T')[0];
    this.reprint()    
    this.api.myPets().then((response) => {
      this.reprint();
      this.mascotas = response.data.pets;
      this.species = response.data.species;
    }).catch((error) => {
      console.log(error);
    });
  }

  cargarRaza() {
    let id = this.petForm.value.specie;
    this.api.getRaceForSpecie(id).then((response) => {
      this.races = response;
    });
  }

  agregarMascota() {
    const formData = new FormData();

    formData.append('name',this.petForm.value.name);
    formData.append('specie',this.petForm.value.specie);
    formData.append('birthday',this.petForm.value.birthday);
    formData.append('code',this.petForm.value.code);
    formData.append('race',this.petForm.value.race);
    formData.append('gender',this.petForm.value.gender);
    formData.append('photo',this.petForm.value.photo);

    console.log('enviar');
  }

  cargarImagen() {

  }

  filtrarMascotas(filtro: string) {
    // Lógica para filtrar las mascotas según el criterio de búsqueda
  }

  reprint() {
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-color', 'white');
  }
}

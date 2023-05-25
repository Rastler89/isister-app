import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]});


  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router, private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnInit() {
    const randomImage = this.getRandomBackgroundImage();
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-image', randomImage);
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-size', 'cover');
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-position', 'center');
    this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-repeat', 'no-repeat');
    window.screen.orientation.lock('portrait');
  }

  async onSubmit() {
    if(this.loginForm.valid) {
      if(await this.authService.login(this.loginForm.value.email, this.loginForm.value.password)) {
        this.router.navigate(['/home']);
        this.renderer.setStyle(this.elementRef.nativeElement.ownerDocument.body, 'background-color', 'white');
      }
    }
  }

  getRandomBackgroundImage(): string {
    const images = ['dogcat.jpg','cat.jpg','dog.jpg']; // Lista de imágenes
    const randomIndex = Math.floor(Math.random() * images.length);
    return `url('assets/img/${images[randomIndex]}')`;
  }

  
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  async onSubmit() {
    if (this.loginForm.valid) {
      const correo = this.loginForm.get('correo')?.value;
      const contrasena = this.loginForm.get('contrasena')?.value;

      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo, contrasena })
        });

        if (response.ok) {
          const { success, token } = await response.json();

          if (success) {
            // Store the token in local storage or a cookie
            localStorage.setItem('token', token);
            // Navigate to the control panel
            this.router.navigate(['/control-panel']);
          } else {
            alert('Correo electrónico o contraseña incorrectos');
          }
        } else {
          alert('Correo electrónico o contraseña incorrectos');
        }
      } catch (error) {
        console.error(error);
        alert('Error en el servidor');
      }
    }
  }
}
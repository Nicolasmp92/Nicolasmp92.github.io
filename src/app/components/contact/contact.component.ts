declare const grecaptcha: any;

import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import emailjs from '@emailjs/browser';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,  // Importa esto para el uso de formularios reactivos
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  captchaResolved = new BehaviorSubject<boolean>(false);
  formSuccess = false;
  formError = false;
  loading = false;

  private fb = inject(FormBuilder);

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      company: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.contactForm.valueChanges.pipe(debounceTime(300)).subscribe(() => {
      this.changeDetectorRef.detectChanges();
    });
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.formError = true;
      return;
    }

    this.loading = true;
    try {
      grecaptcha.enterprise.ready(async () => {
        const token = await grecaptcha.enterprise.execute('6LerucEqAAAAALjQeotUhtdH9Q3W-Kd_37dCsBw1', { action: 'submit' });

        if (token) {
          console.log('Token reCAPTCHA generado:', token);
          const recaptchaValid = await this.validateRecaptcha(token);

          if (recaptchaValid) {
            await emailjs.send('service_l1edi6e', 'template_nhx7u14', {
              name: this.contactForm.get('name')?.value,
              email: this.contactForm.get('email')?.value,
              company: this.contactForm.get('company')?.value,
              subject: this.contactForm.get('subject')?.value,
              message: this.contactForm.get('message')?.value,
              'g-recaptcha-response': token
            }, 'wdBpqHWOib1FoT5FH');

            this.formSuccess = true;
            this.formError = false;
            this.contactForm.reset();
          } else {
            console.error('Error en la validación de reCAPTCHA.');
            this.formError = true;
          }
        } else {
          throw new Error('Error al obtener el token de reCAPTCHA');
        }
      });
    } catch (error) {
      console.error('Error en la ejecución de reCAPTCHA: ', error);
      this.formError = true;
    } finally {
      this.loading = false;
    }
  }

  async validateRecaptcha(token: string): Promise<boolean> {
    try {
      const response = await fetch('https://recaptchaenterprise.googleapis.com/v1/projects/portafolioniko-1737733872090/assessments?key=wdBpqHWOib1FoT5FH', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event: {
            token: token,
            expectedAction: 'submit',
            siteKey: '6LerucEqAAAAALjQeotUhtdH9Q3W-Kd_37dCsBw1'
          }
        })
      });

      const result = await response.json();
      if (result && result.riskAnalysis && result.riskAnalysis.score >= 0.5) {
        console.log('Validación reCAPTCHA exitosa:', result);
        return true;
      } else {
        console.error('Fallo en la validación de reCAPTCHA:', result);
        return false;
      }
    } catch (error) {
      console.error('Error validando reCAPTCHA:', error);
      return false;
    }
  }

  resolved(captchaResponse: string | null): void {
    this.ngZone.run(() => {
      this.captchaResolved.next(!!captchaResponse);
    });
  }

  ngOnDestroy(): void {
    this.captchaResolved.unsubscribe();
  }
}

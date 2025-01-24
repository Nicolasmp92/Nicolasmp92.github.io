import { Component, OnInit, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { RecaptchaModule } from 'ng-recaptcha';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RecaptchaModule,
    NgIf
  ],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  captchaResolved = new BehaviorSubject<boolean>(false);
  formSuccess = false;
  formError = false;

  constructor(
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.contactForm.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.changeDetectorRef.detectChanges();
      });
  }

  onSubmit(): void {
    if (this.contactForm.valid && this.captchaResolved.value) {
      console.log('Formulario enviado:', this.contactForm.value);
      this.formSuccess = true;
      this.formError = false;
      this.contactForm.reset();
      this.captchaResolved.next(false);
    } else {
      this.formError = true;
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

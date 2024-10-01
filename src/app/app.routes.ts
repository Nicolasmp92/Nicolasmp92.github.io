import { Routes } from '@angular/router';

// Paginas
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component'; // Componente para manejar errores 404 (opcional)
import { SkillsComponent } from './components/skills/skills.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';



export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta principal, carga HomeComponent directamente
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent},
  { path: 'experiencia', component: ExperienceComponent},
  { path: 'habilidades', component: SkillsComponent},
  { path: 'contacto', component: ContactComponent},


  // ... otras rutas que puedas tener en el futuro
  { path: '**', component: NotFoundComponent } // Ruta comodín para manejar errores 404 (opcional)
];

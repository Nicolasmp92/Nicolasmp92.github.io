import { Routes } from '@angular/router';

// Paginas
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component'; // Componente para manejar errores 404 (opcional)
import { SkillsComponent } from './components/skills/skills.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ExperienceComponent } from './components/experience/experience.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // Redirige la raíz a home
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'experiencia', component: ExperienceComponent },
  { path: 'habilidades', component: SkillsComponent },
  { path: 'contacto', component: ContactComponent },

  // Ruta comodín para manejar errores 404 (opcional)
  { path: '**', component: NotFoundComponent }
];

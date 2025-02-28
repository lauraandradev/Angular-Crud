import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HelloComponent } from '../../hello.component';

@Component({
  selector: 'student-crud',
  imports: [FormsModule, RouterOutlet, HelloComponent, ToastModule],
  providers: [MessageService],
  template: `
    <app-hello />

    <h2>Estudantes</h2>

    <router-outlet></router-outlet>
    <!-- Toast to show message -->
    <p-toast></p-toast>
  `,
  styleUrl: '../../app.component.scss'
})
export class StudentComponent {
}
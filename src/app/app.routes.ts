import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { AuthGuard } from '../../services/auth/auth.guard';
import { StudentComponent } from './components/students/student.component';
import { StudentListComponent } from './components/students/student.list.component';
import { StudentInsertComponent } from './components/students/student.insert.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'owners', component: StudentComponent, canActivate: [AuthGuard],
        children: [
            { path: 'list', component: StudentListComponent },
            { path: 'new', component: StudentInsertComponent },
            { path: '', redirectTo: 'list', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', redirectTo: 'login'}
];
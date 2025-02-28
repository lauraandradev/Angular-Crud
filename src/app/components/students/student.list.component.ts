import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { AutoFocusModule } from 'primeng/autofocus';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../models/Student';

@Component({
  selector: 'student-list',
  imports: [FormsModule, ButtonModule, TableModule, PanelModule, AutoFocusModule, DividerModule, TooltipModule],
  template: `
    <p-button  icon="pi pi-plus" (onClick)="startInsert()" autofocus="true" pTooltip="Start owner insert" />

    <p-divider />

    <p-panel header="List">
      <p-table 
        [value]="studentsList()"
        [rows]="3"
        [paginator]="true"
        [rowsPerPageOptions]="[3, 5, 10]"
      >
        <ng-template #header>
          <tr>
              <th pSortableColumn="name" style="width:20%">
                Name <p-sortIcon field="name" />
              </th>
              <th pSortableColumn="name" style="width:20%">
                Escola <p-sortIcon field="school" />
              </th>
              <th pSortableColumn="name" style="width:20%">
                Tempo de Aula <p-sortIcon field="time" />
              </th>
              <th pSortableColumn="name" style="width:20%">
                Horário <p-sortIcon field="schedule" />
              </th>
              <th pSortableColumn="name" style="width:20%">
                Valor <p-sortIcon field="value" />
              </th>
              <th pSortableColumn="name" style="width:20%">
                Contato <p-sortIcon field="contact" />
              </th>
              <th pSortableColumn="name" style="width:20%">
                Idade <p-sortIcon field="age" />
              </th>
              <th>Remove</th>
          </tr>
          <tr>
              <th>
                  <p-columnFilter
                      type="text"
                      field="name"
                      placeholder="Search by name"
                      ariaLabel="Filter Name"
                  ></p-columnFilter>
              </th>
          </tr>
        </ng-template>
        <ng-template #body let-item>
            <tr>
                <td>{{ item.name }}</td>
                <td>{{ item.school }}</td>
                <td>{{ item.time }}</td>
                <td>{{ item.schedule }}</td>
                <td>{{ item.value }}</td>
                <td>{{ item.contact }}</td>
                <td>{{ item.age }}</td>
                <td><p-button icon="pi pi-trash" (onClick)="remove(item)" pTooltip="Delete the owner"/></td>
            </tr>
        </ng-template>
      </p-table>
    </p-panel>
  `
})
export class StudentListComponent {
    studentsList = signal<Student[]>([]);

  constructor(private router: Router, 
      private studentService: StudentService,
      private messageService: MessageService
    ) {

    effect(() => {
      this.studentsList.set(this.studentService.students())
    })

    this.loadStudents()
  }

  async remove(item: Student) {
    const success = await this.studentService.remove(item.name)
    if (success) {
      this.loadStudents() // Load owners after deletion
      this.messageService.add({
        severity: 'success',
        summary: 'Remover Estudante',
        detail: 'Estudante Removido com sucesso!'
      })
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Remover Estudante',
        detail: 'Não foi possível remover estudante.'
      })
    }
  }

  startInsert(): void {
    this.router.navigate(["owners/new"])
  }

  async loadStudents() {
    await this.studentService.loadStudents()
  }
}
import { Component, Input, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { AutoFocusModule } from 'primeng/autofocus';
import { Student } from '../../../../models/Student';
import { Router } from '@angular/router';
import { StudentService } from '../../../../services/student.service';
import { MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'student-insert',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule, InputTextModule, PanelModule, AutoFocusModule, DividerModule, CommonModule, TooltipModule, InputNumberModule],
  template: `
    <form [formGroup]="insertForm">
      <p-panel header="Insert">
        <div>
            <label for="name">Nome:</label>
            <input id="name" pInputText [pAutoFocus]="true" placeholder="Name to be inserted" formControlName="name" />
        </div>
        <div>
            <label for="school">Escola:</label>
            <input id="school" pInputText formControlName="school" />
        </div>
        <div>
            <label for="time">Tempo de Aula:</label>
            <p-inputnumber inputId="time" formControlName="time" />
        </div>
        <div>
            <label for="schedule">Horário:</label>
            <input id="schedule" pInputText formControlName="schedule" />
        </div>
        <div>
            <label for="value">Valor:</label>
            <p-inputnumber inputId="value" formControlName="value" />
        </div>
        <div>
            <label for="age">Idade:</label>
            <p-inputnumber inputId="age" formControlName="age"/>
        </div>
        <div>
            <label for="contact">Contato:</label>
            <input id="contact" pInputText formControlName="contact" />
        </div>
        <p-divider />
        <p-button icon="pi pi-check" (onClick)="insert()" [disabled]="insertForm.invalid" pTooltip="Save the student"/>
        <p-button icon="pi pi-times" (onClick)="cancelInsert()" pTooltip="Cancel"/>
      </p-panel>
    </form>
  `
})
export class StudentInsertComponent {
  @Input() student: Student = { id: 0, name: '', school: '', schedule: '', time: 0, value: 0, contact: '', age: 0 };
  @Input() displayDialog: boolean = false;

  insertForm: FormGroup;
  isSubmitting = signal(false);

  constructor(
    private router: Router,
    private studentService: StudentService, 
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this.insertForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      school: ['', Validators.required],
      schedule: ['', Validators.required],
      time: [0, Validators.required],
      value: [0, Validators.required],
      contact: ['', Validators.required],
      age: [0, Validators.required]
    });
  }

  async insert() {
    if (this.insertForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      const newStudent: Student = {
        id: 0,
        name: this.insertForm.value.name,
        school: this.insertForm.value.school,
        schedule: this.insertForm.value.schedule,
        time: this.insertForm.value.time,
        value: this.insertForm.value.value,
        contact: this.insertForm.value.contact,
        age: this.insertForm.value.age
      };

      try {
        const result = await this.studentService.insert(newStudent);
        this.isSubmitting.set(false);

        if (result) {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Student inserted successfully.' });
        } else {
          throw new Error('Student not inserted.');
        }
        
        this.router.navigate(["owners"]);
      } catch (error) {
        this.isSubmitting.set(false);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "" });
      }
    }
  }

  cancelInsert() {
    this.router.navigate(["owners"]);
  }
}

import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { environment } from "../src/environments/environments";
import { Student } from "../models/Student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = environment.apiUrl + '/students';
  private _students = signal<Student[]>([]);

  constructor(private http: HttpClient) {
    this.loadStudents();
  }

  async insert(bean: Student): Promise<Student | null> {
    try {
      const newStudent = await lastValueFrom(this.http.post<Student>(this.apiUrl, bean))
      if (newStudent) {
        this._students.set([...this._students(), newStudent])
      }
      return newStudent ?? null
    } catch (error) {
      console.error("Error inserting Student:", error)
      return null
    }
  }


  async remove(id: string): Promise<boolean> {
    try {
      await lastValueFrom(this.http.delete(`${this.apiUrl}/${id}`))
      this._students.set(this._students().filter(student => student.name !== id))
      return true
    } catch (error) {
      console.error("Error removing Student:", error)
      return false
    }
  }


  async update(id: string, bean: Student): Promise<Student | null> {
    try {
      const updatedStudent = await lastValueFrom(this.http.put<Student>(`${this.apiUrl}/${id}`, bean))
      if (updatedStudent) {
        this._students.set(this._students().map(student => (student.name === id ? updatedStudent : student)))
      }
      return updatedStudent ?? null
    } catch (error) {
      console.error("Error updating Student:", error)
      return null
    }
  }


  public async loadStudents() {
    try {
      const students = await lastValueFrom(this.http.get<Student[]>(this.apiUrl))
      if (students) {
        this._students.set(students)
      }
    } catch (error) {
      console.error("Error loading Students:", error)
    }
  }


  get students() {
    return this._students
  }


  async findById(id: string): Promise<Student | null> {
    try {
      return await lastValueFrom(this.http.get<Student>(`${this.apiUrl}/${id}`)) ?? null
    } catch (error) {
      console.error("Error find Student:", error)
      return null
    }
  }
}
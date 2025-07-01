import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  form: FormGroup;
  editMode: boolean = false;
  selectedId: number | null = null;
  currentView: 'form' | 'list' = 'form'; // Default to showing employee list

  constructor(private fb: FormBuilder, private service: EmployeeService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      department: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      joining_date: ['', Validators.required],
      is_remote: [false],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.service.getAll().subscribe(data => this.employees = data);
  }

  submitForm() {
    // Check if form is valid
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const data = this.form.value;
    if (this.editMode && this.selectedId) {
      data.id = this.selectedId;
      this.service.update(data).subscribe(() => {
        this.resetForm();
        this.loadEmployees();
        this.showEmployeeList(); // Navigate back to list after update
      });
    } else {
      this.service.add(data).subscribe(() => {
        this.resetForm();
        this.loadEmployees();
        //this.showEmployeeList(); // Navigate back to list after add
      });
    }
  }

  // Mark all form fields as touched to show validation errors
  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });
  }

  // Helper method to check if a field has errors and is touched
  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  // Helper method to get error message for a field
  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${field.errors['minlength'].requiredLength} characters long`;
      }
    }
    return '';
  }

  edit(emp: Employee) {
    this.form.patchValue(emp);
    this.selectedId = emp.id!;
    this.editMode = true;
    this.currentView = 'form'; // Switch to form view for editing
  }

  delete(id: number) {
    this.service.delete(id).subscribe(() => this.loadEmployees());
  }

  resetForm() {
    this.form.reset({ is_remote: false });
    this.editMode = false;
    this.selectedId = null;
  }

  // Navigation methods
  showForm() {
    this.currentView = 'form';
  }

  showEmployeeList() {
    this.currentView = 'list';
  }

  addNewEmployee() {
    this.resetForm();
    this.currentView = 'form';
  }

  cancelEdit() {
    this.resetForm();
    this.currentView = 'list';
  }
}
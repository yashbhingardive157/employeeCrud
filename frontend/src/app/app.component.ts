import { Component } from '@angular/core';
import { EmployeeComponent } from './employee/employee.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management System';
}
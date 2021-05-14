import { Component } from '@angular/core';
import { Employee } from '../models/employee';
import { GeneralService } from '../services/general.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public employeeList: Array<Employee> = new Array<Employee>();
  public employee: Employee = new Employee();
  public btnName: string = 'Save';

  public positionList = [
    { 'id': 1, 'description': 'Project Manager' },
    { 'id': 2, 'description': 'Production Manager' },
    { 'id': 3, 'description': 'General Manager' },
    { 'id': 4, 'description': 'HR Director' },
    { 'id': 5, 'description': 'Senior Editor' },
    { 'id': 6, 'description': 'Editor' },
    { 'id': 7, 'description': 'Editor Boss' },
  ]

  constructor(private service: GeneralService) {
    this.loadEmployees();
  }

  loadEmployees = () => {
    this.service.get("/employee").subscribe(
      (res) => {
        console.log(res.data);
        this.employeeList = res.data;
      },
      (err) => {
        console.error(err);
      }
    )
  }

  setEmployee(e, index) {
    e.preventDefault();
    console.log('here we go')

    let card: HTMLElement = document.getElementById(index);
    console.log('card', e);

    this.toggleBtn(card, index);

    this.employee.id = this.employeeList[index].id;
    this.employee.fullName = this.employeeList[index].fullName;
    this.employee.address = this.employeeList[index].address;
    this.employee.phoneNumber = this.employeeList[index].phoneNumber;
    this.employee.position = this.employeeList[index].position;
    this.btnName = 'Update';
  }

  saveEmployee() {
    
    if (this.employee.id == null || this.employee.id == -1) {
      this.employee.id = this.getEmployeeId();
      this.employeeList.push(this.employee);
      this.employee = new Employee();
      console.log(this.employeeList);
    } else {
      let tempEmployee: Employee = this.employeeList.filter(p => p.id == this.employee.id);
      
      tempEmployee.fullName = this.employee.fullName;
      tempEmployee.address = this.employee.address;
      tempEmployee.phoneNumber = this.employee.phoneNumber;
      tempEmployee.position = this.employee.position;
      this.employeeList[this.employeeList.findIndex(p => p.id == this.employee.id)] = tempEmployee;
    }
    
  }

  getPositionDesc(index: number): string {
    let position = this.positionList.filter(p => p.id == index);
    return position[0].description;
  }

  getEmployeeId = () => {
    return this.employeeList[this.employeeList.length -1].id + 1;
  }

  addNewEmployee() {
    this.employee = new Employee();
    this.btnName = 'Save';
    this.resetButton();
  }

  deleteEmployee(id) {
    this.employeeList = this.employeeList.filter(p => p.id != id);
  }

  resetButton = () => {
    let btnMenus: Array<HTMLElement> = document.querySelectorAll('.side-menu-btn');

    btnMenus.forEach(btn => {
      btn.classList.add('card-secondary');
      btn.classList.remove('bg-selected');
    });
  }

  toggleBtn = (card: HTMLElment, index: number) => {

    this.resetButton();
        
    card.classList.remove('card-secondary');
    card.classList.add('bg-selected');
    
  }

}

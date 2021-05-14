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
  public empSelected: number = -1;

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
        if (res.message == "Ok") {
          this.employeeList = res.data;
        }
      },
      (err) => {
        console.error(err);
      }
    )
  }

  setEmployee(e, index) {
    e.preventDefault();
    this.empSelected = index;
    console.log('The employee index::: ', this.empSelected);

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
      let tempEmployee: Array<Employee> = this.employeeList.filter(p => p.id == this.employee.id);
      
      tempEmployee[0].fullName = this.employee.fullName;
      tempEmployee[0].address = this.employee.address;
      tempEmployee[0].phoneNumber = this.employee.phoneNumber;
      tempEmployee[0].position = this.employee.position;
      this.employeeList[this.employeeList.findIndex(p => p.id == this.employee.id)] = tempEmployee[0];
    }

    this.addNewEmployee();
    
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
    this.empSelected = -1;
  }

  deleteEmployee(id) {
    this.employeeList = this.employeeList.filter(p => p.id != id);
  }

  resetButton = () => {
    let btnMenus: Array<HTMLElement> = new Array <HTMLElement>();
    let items = document.querySelectorAll('.side-menu-btn');

    items.forEach((item: HTMLElement) => {
      btnMenus.push(item);
    })    

    btnMenus.forEach(btn => {
      btn.classList.add('card-secondary');
      btn.classList.remove('bg-selected');
    });
  }

  toggleBtn = (card: HTMLElement, index: number) => {

    this.resetButton();
        
    card.classList.remove('card-secondary');
    card.classList.add('bg-selected');
    
  }

  isSelectedEmployee(index) {
    //console.log(index)
    if (this.empSelected == -1) {
      return true;
    } else if (this.empSelected == index) {
      return false;
    } else {
      return true;
    }
  }

}

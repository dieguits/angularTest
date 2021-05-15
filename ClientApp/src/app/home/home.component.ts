import { Component } from '@angular/core';
import { isNullOrUndefined } from 'util';
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

  public positionList = [];

  constructor(private service: GeneralService) {
    this.loadPositions();
    this.loadEmployees();
  }

  loadPositions = () => {
    this.service.get("/position").subscribe(
      (res) => {
        if (res.message == "Ok") {
          this.positionList = res.data;
        }
      },
      (err) => {
        console.error(err);
      }
    )
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
    

    this.toggleBtn(card, index);

    this.employee.id = this.employeeList[index].id;
    this.employee.fullName = this.employeeList[index].fullName;
    this.employee.address = this.employeeList[index].address;
    this.employee.phoneNumber = this.employeeList[index].phoneNumber;
    this.employee.position = this.employeeList[index].position;
    console.log('card', this.employee);
    this.btnName = 'Update';
  }

  isEmployeeFilled(): boolean {
    if (!isNullOrUndefined(this.employee.fullName) && !isNullOrUndefined(this.employee.address) && !isNullOrUndefined(this.employee.phoneNumber) && this.employee.position != null) {
      return true;
    } else {
      return false;
    }
  }

  saveEmployee() {
    
    if (this.employee.id == null || this.employee.id == -1) {

      this.service.post('/employee/addEmployee', this.employee).subscribe(
        (res) => {
          console.log(res.data);
          if (res.message == 'Ok') {
            this.employeeList.push(res.data);
            this.addNewEmployee();
          }
        },
        (err) => {
          console.error(err);
        }
      )

    } else {
      
      this.service.post('/employee/updateEmployee', this.employee).subscribe(
        (res) => {
          if (res.message == "Ok") {
            this.employeeList[this.employeeList.findIndex(p => p.id == this.employee.id)] = res.data;
            this.addNewEmployee();
          }
        },
        (err) => {
          console.error(err);
        }
      )
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
    this.empSelected = -1;
  }

  deleteEmployee(id) {
    this.service.get('/employee/deleteEmployee/' + id).subscribe(
      (res) => {
        console.log(res);
        if (res.message == 'Ok') {
          this.employeeList = this.employeeList.filter(p => p.id != id);
        }
      },
      (err) => {
        console.error(err);
      }
    )
    
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
    if (this.empSelected == -1) {
      return true;
    } else if (this.empSelected == index) {
      return false;
    } else {
      return true;
    }
  }

}

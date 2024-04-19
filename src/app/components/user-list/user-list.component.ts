import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { Subscription, catchError } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service/customer-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public subscription = new Subscription();
  public userList: Array<any> = [];
  public dataLoad: boolean = false;
  currentPage = 1;
  perPage = 5;
  searchForm!: FormGroup;
  public customerList: Array<any> = []

  constructor(public toastr: ToastrService,
    private userService: CustomerServiceService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required]
    })
    this.getUSer()
  }

  /*** List the users ***/
  getUSer() {
    this.subscription.add(
      this.userService.getUsers().subscribe({
        next: (res: any) => {
          this.userList = res;
          this.customerList = res;
          this.dataLoad = true;
        }, error: (err: any) => {
          this.dataLoad = true;
          this.toastr.error(`${err.message}`, 'Error')
        }
      })
    )

  }

  /*** Serial Number ***/
  getSRLNumber(srl: number) {
    return this.perPage * (this.currentPage - 1) + srl;
  }

  /***  slice date base on the count for pagination ****/
  get visibleData(): any[] {
    const startIndex = (this.currentPage - 1) * this.perPage;
    const endIndex = startIndex + this.perPage;
    return this.userList.slice(startIndex, endIndex);

  }

  /*** next page action in pagination ****/
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  /*** previous page action in pagination ****/

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  /*** per page change action ****/

  onPerPageChange(perPage: number) {
    this.perPage = perPage;
    this.currentPage = 1;
  }


  /*** calculate total page ****/
  get totalPages(): number {
    return Math.ceil(this.userList.length / this.perPage);
  }

  /*** destroy subscriptions ****/

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  /*** route to user add page ****/

  addUser() {
    this.router.navigate(['customer/add'])
  }

  /*****route to customer edit page ******/
  editAction(id: any) {
    let userid = window.btoa(id)
    this.router.navigate(['customer/details-edit/' + userid])
  }

  /*****Delete customer *****/
  customerDelete(user: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete this customer ${user?.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes,Delete it',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subscription.add(
          this.userService.deleteCustomer(user.id).subscribe({
            next: (res: any) => {
              console.log(res)
              this.toastr.success('Customer deleted successfully', 'Success')

            }, error: (err: any) => {
              this.toastr.error(`${err.message}`, 'Error')
            }
          })
        )

      }
    })
  }

  searchAction() {
    if (this.searchForm.status === 'VALID') {
      this.currentPage = 1;
      let value = this.searchForm.get('search')?.value
      let searchData = this.customerList.filter((x: any) => {
        if ((x.name.toLowerCase().includes(value.toLowerCase())) || (x.username.toLowerCase().includes(value.toLowerCase())) ||
          (x.email.toLowerCase().includes(value.toLowerCase())) || (x.address.city.toLowerCase().includes(value.toLowerCase())) ||
          (x.company.name.toLowerCase().includes(value.toLowerCase()))) {
          return true
        } else {
          return false
        }


      })
      this.userList = searchData
    } else {
      this.userList = this.customerList
    }
  }

}

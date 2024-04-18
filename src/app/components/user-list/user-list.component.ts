import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import { Subscription, catchError } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service/customer-service.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  public subscription = new Subscription();
  public userList: Array<any> = [];
  public dataLoad: boolean = false;
  currentPage = 1;
  perPage = 5;

  constructor(public toastr: ToastrService,
    private userService: CustomerServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUSer()
  }

  /*** List the users ***/
  getUSer() {
    this.subscription.add(
      this.userService.getUsers().subscribe({
        next: (res: any) => {
          this.userList = res;
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
    this.router.navigate(['customer-add'])
  }
}

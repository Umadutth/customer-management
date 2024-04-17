import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { Subscription, catchError } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUSer()
  }

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


  get visibleData(): any[] {
       const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      console.log(this.currentPage,this.perPage,startIndex,endIndex)
      return this.userList.slice(startIndex, endIndex);
 
  }

  nextPage() {
    console.log(this.totalPages, this.currentPage,this.perPage)
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  onPerPageChange(perPage: number) {
    this.perPage = perPage;
    this.currentPage = 1;
    // Adjust current page if necessary
    // const totalPages = this.totalPages;
    // if (this.currentPage > totalPages) {
    //   this.currentPage = totalPages;
    // }
  }



  get totalPages(): number {
    return Math.ceil(this.userList.length / this.perPage);
  }
  ngOnDestroy(): void {

  }
}

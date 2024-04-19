import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { CustomerServiceService } from 'src/app/services/customer-service/customer-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit, OnDestroy {

  public subscription = new Subscription();
  public userForm!: FormGroup;
  public submitted: boolean = false;

  constructor(
    public router: Router,
    public formbuilder: FormBuilder,
    public customerService: CustomerServiceService,
    public toaster: ToastrService
  ) { }

  ngOnInit(): void {

    // initialize form
    this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      address: this.formbuilder.group({
        street: ['', Validators.required],
        suite: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required]
      }),
      company: this.formbuilder.group({
        name: ['', Validators.required],

      }),
      website: ['', Validators.pattern(`/^(http?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i`)]

    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // route to customers list page
  backPage() {
    this.router.navigate(['customers/list']);
  }


  // customer create 
  formSubmit() {
    this.submitted = true
    if (this.userForm.invalid) {
      return
    } else {
      let data = this.userForm.value;
      this.subscription.add(
        this.customerService.createCustomer(data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.toaster.success('Added customer successfully', 'Success')
            this.router.navigate(['/customers/list'])
          }, error: (err: any) => {
            this.toaster.error(`${err.message}`, 'Error')
          }
        })
      )

    }
  }

}

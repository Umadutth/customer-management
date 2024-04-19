import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/services/customer-service/customer-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent {

  public subscription = new Subscription();
  public customerEditForm!: FormGroup;
  public submitted: boolean = false;
  public userId: any;
  public customerDetails: any;
  public dataLoad: boolean = false;
  public readonly: boolean = true


  constructor(
    public router: Router,
    public formbuilder: FormBuilder,
    public customerService: CustomerServiceService,
    public toaster: ToastrService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe((p) => {
        let value = p['id'];
        if (value) {
          this.userId = window.atob(value)
        }
        else {
          this.router.navigate(['customers/list']);
        }
      })
    )
    // initialize form
    this.customerEditForm = this.formbuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: this.formbuilder.group({
        street: ['', Validators.required],
        suite: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', Validators.required]
      }),
      company: this.formbuilder.group({
        name: ['', Validators.required],

      }),
      website: ['',]

    })
    this.getCustomerDetails()

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // route to customers list page
  backPage() {
    this.router.navigate(['customers/list']);
  }

  getCustomerDetails() {
    this.subscription.add(
      this.customerService.getIndividualCustomer(this.userId).subscribe({
        next: (res: any) => {
          this.customerDetails = res;
          console.log(res)
          this.dataLoad = true;
          this.customerEditForm.patchValue({
            name: res?.name,
            username: res?.username,
            email: res?.email,
            phone: res?.phone,
            website: res?.website,
            address: {
              street: res?.address?.street,
              suite: res?.address?.suite,
              city: res?.address?.city,
              zipcode: res?.address?.zipcode
            },
            company: {
              name: res?.company?.name
            }
          })
        },
        error: (error: any) => {
          console.log(error)
          this.toaster.error(`~${error.message}`, 'Error')
        }
      })
    )
  }

  // enable customer edit
  editData() {
    if (this.readonly) {
      this.toaster.info('Editing customer details is now possible.', 'Info')
    }
    this.readonly = false;
 
  }


  // customer edit form submit
  editFormSubmit() {
    this.submitted = true
    if (this.customerEditForm.invalid) {
      return
    } else {
      let data = this.customerEditForm.value;
      this.subscription.add(
        this.customerService.updateCustomer(this.userId, data).subscribe({
          next: (res: any) => {
            console.log(res);
            this.toaster.success('Updated customer successfully', 'Success')
            this.customerEditForm.patchValue({
              name: res?.name,
              username: res?.username,
              email: res?.email,
              phone: res?.phone,
              website: res?.website,
              address: {
                street: res?.address?.street,
                suite: res?.address?.suite,
                city: res?.address?.city,
                zipcode: res?.address?.zipcode
              },
              company: {
                name: res?.company?.name
              }
            })
          }, error: (err: any) => {
            this.toaster.error(`${err.message}`, 'Error')
          }
        })
      )

    }
  }
}

import { Component, inject, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_service/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  cancelRegister = output<boolean>();
  private toaster = inject(ToastrService);
  model: any ={};
  accountService = inject(AccountService);
  register(){
    console.log(this.model)
    this.accountService.register(this.model).subscribe({
      next:(response: any) =>{
        console.log(response);
        this.cancel();
      },
      error:(error: any) => this.toaster.error(error.error)
    })
  }

  cancel(){
    console.log("Canceled");
    this.cancelRegister.emit(false);
  }

}

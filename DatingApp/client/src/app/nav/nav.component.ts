import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_service/account.service';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { User } from '../_models/User';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, TitleCasePipe, CommonModule, BsDropdownModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService = inject(AccountService);
  private router = inject(Router);
  private toaster = inject(ToastrService);
  model: any={};

  login() {
    this.accountService.login(this.model).subscribe({
      next: ()=>{
        console.log(this.accountService.currentUser());
        this.router.navigateByUrl('/members');
      },
      error: (error: any)=> {this.toaster.error(error.error);}
      
    })
    }

    logout(){
      this.accountService.logout();
      this.router.navigateByUrl('/');

    }

}

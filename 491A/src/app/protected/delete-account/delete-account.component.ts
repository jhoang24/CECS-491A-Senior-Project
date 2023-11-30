import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/public/custom-validator';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { DeleteAccountDialogComponent } from '../delete-account-dialog/delete-account-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.scss']
})
export class DeleteAccountComponent implements OnInit {
    success: string | null = null;
    error: string | null = null;
    username: any;

    passwordMatch: boolean = false;

    passwordForm = new UntypedFormGroup({
      password: new UntypedFormControl(null,Validators.required),
      passwordConfirm: new UntypedFormControl(null, Validators.required)
    },
      {validators: CustomValidators.passwordsMatching}
    )

    constructor(
      private router: Router,
      private authService: AuthService,
      private matDialog: MatDialog
    ) {}

    ngOnInit(): void {
      this.username = this.authService.getLoggedInUser().username;

    }

    confirm() {
      if (!this.passwordForm.valid) {
        return;
      }

      this.authService.checkPasswordMatch(this.username, this.passwordForm.value.passwordConfirm).subscribe((res: any)=>{
        if (res === true) {
          this.passwordMatch = res;
          console.log('Password matches');
          this.matDialog.open(DeleteAccountDialogComponent,{
            width:'300px',
            data: {
              passwordMatch: true
            }
          })
        } else {
            console.log('Password does not match');
            this.matDialog.open(DeleteAccountDialogComponent,{
              width:'300px',
              data: {
                passwordMatch: false
              }
            })
            
            throw new Error(res.error);
        }
      },
      (error: any) => {
        console.error('Error:', error.message);
        if (error.status === 403 && error.error) {
          console.error('Server Error:', error.error);
        }
      });

    }


  }
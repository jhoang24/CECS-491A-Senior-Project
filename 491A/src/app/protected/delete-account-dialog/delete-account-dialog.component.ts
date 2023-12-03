import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';
import { LOCALSTORAGE_TOKEN_KEY } from 'src/app/app.module';


@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private profileService: ProfileService, private dialogRef: MatDialogRef<DeleteAccountDialogComponent>, private router:Router) { }

  passwordMatch: boolean=false;

  ngOnInit(): void {
    this.passwordMatch = this.data.passwordMatch
  
  }

  confirm() {
    this.profileService.deleteAccount(this.data.username).subscribe(res=>{
      console.log(res);
      // Removes the jwt token from the local storage, so the user gets logged out & then navigate back to the "public" routes
      localStorage.removeItem(LOCALSTORAGE_TOKEN_KEY);
      localStorage.removeItem("picture");
      this.router.navigate(['../../']);
      window.location.reload();

    });
    this.dialogRef.close();
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileService } from '../services/profile.service';


@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private profileService: ProfileService, private dialogRef: MatDialogRef<DeleteAccountDialogComponent>) { }

  passwordMatch: boolean=false;

  ngOnInit(): void {
    this.passwordMatch = this.data.passwordMatch
  
  }

  confirm() {
    // this.profileService.deleteProduct(this.data.username, this.data.uuid).subscribe(res=>{
    //   console.log(res);
    //   window.location.reload();

    // });
    this.dialogRef.close();
  }

}

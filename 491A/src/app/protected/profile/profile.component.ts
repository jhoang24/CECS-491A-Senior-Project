import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  localUsername: any;
  isSmallScreen = false;

  picture: string = "data:image/png;base64,";
  email: any;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {
    this.localUsername = this.auth.getLoggedInUser().username;
    this.username = '';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.checkScreenSize();

    this.route.params.subscribe(params => {
      this.username = params.username;

      if (this.username == null) {
        this.picture += localStorage.getItem("picture");
      } else {
        this.profileService.getProfileInfo(this.username).subscribe(
          (res) => {
            this.email = res.email;  // Store the email from the response
            this.picture += res.picture;
          }
        );
      }
    });
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 767;
  }

  navigateToReportUser() {
    // Assuming the 'report-user' route is under '/protected', adjust the path as needed
    this.router.navigate(['/protected/report-user']);
  }

}

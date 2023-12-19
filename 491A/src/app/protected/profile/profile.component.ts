import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HostListener } from '@angular/core';
import { UsernameService } from '../services/username.service'; // Import the shared service

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  localUsername: any;
  isSmallScreen = false;

  picture: string = 'data:image/png;base64,';
  email: any;
  collegeName: string | null = null; // Variable to store the college name

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private usernameService: UsernameService // Inject the shared service
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

    this.route.params.subscribe((params) => {
      this.username = params.username;

      // Set the username using username.service.ts
      this.usernameService.setUsername(this.username);

      if (this.username == null) {
        this.picture += localStorage.getItem('picture');
      } else {
        this.profileService.getProfileInfo(this.username).subscribe(
          (res) => {
            this.email = res.email; // Store the email from the response
            this.picture += res.picture;

            // Check if the email contains ".csulb"
            if (this.email && this.email.includes('.csulb')) {
              this.collegeName = 'California State University, Long Beach';
            } 
            else if (this.email && this.email.includes('.csuf')) {
              this.collegeName = 'California State University, Fullerton';
            } 
            else if (this.email && this.email.includes('.cpp')) {
              this.collegeName = 'California State Polytechnic University, Pomona';
            }else {
              this.collegeName = null;
            }
          }
        );
      }
    });
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 767;
  }

  navigateToReportUser() {
    this.router.navigate(['/protected/report-user']);
  }
}

import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/public/services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string;
  localUsername: any;
  picture: string = "data:image/png;base64,";
  user: any // User object from Dynamodb

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private http: HttpClient
  ) {
    this.localUsername = this.auth.getLoggedInUser().username;
    this.username = '';
  }

  // If local storage for the picture is empty, then get the profile image from the backend and store it
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.username = params.username;

      if (this.username == null) {
        this.picture += localStorage.getItem("picture");
      } else {
        this.profileService.getProfileInfo(this.username).subscribe(
          (res) => {
            this.picture += res.picture;
          }
        );
      }
    });

    // Send POST request to API Gateway with username
    this.http.post('https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/profile', { username: this.localUsername }).subscribe(
      (res: any) => {
        this.user = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
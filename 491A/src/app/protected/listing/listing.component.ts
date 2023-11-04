import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const invokeButton = document.getElementById('invokeButton');

if (invokeButton) {
  invokeButton.addEventListener('click', () => {
    fetch('https://gdl0m2hqx0.execute-api.us-east-1.amazonaws.com/dev/listing?param1=uuid=2', {
      method: 'POST', // or other HTTP methods like POST
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from your Lambda function here
        console.log(data);
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  });
} else {
  console.error("Element with ID 'invokeButton' not found.");
}

  }

}

import { HttpClient, HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  constructor(private http: HttpClient) { }

  public picturePhrase: string = ""; // to hold the picture name that will be displayed on the screen
  public submissionConfirmed: boolean = false; // to confirm whether the submission was recorded. 
  private response: any;

  ngOnInit(): void {
  }

  confirmSubmission(){
    this.http.post<any>('https://reqres.in/api/posts', this.picturePhrase ).subscribe(data => {
      this.response = data
  })

  if (this.response == "good")
    this.submissionConfirmed = true;

}

  onClickSubmit(data) {

  }

}

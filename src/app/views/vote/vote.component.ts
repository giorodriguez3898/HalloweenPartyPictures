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
    const uploadImageData = new FormData();
    uploadImageData.append('imageName', "test from angular name");
    uploadImageData.append('imageAddy', "test from angular addy");

    this.http.post<any>('http://localhost:8080/halloween/test2', uploadImageData ).subscribe(data => {
      this.response = data
      console.log("printing vote test data");
      console.log(data);
  })



}

  onClickSubmit(data) {

  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {


  constructor(private httpClient: HttpClient) { }

  selectedFile: File;
  pictureName: string;
  message: any;

  ngOnInit(): void {}

  onFileChange(event) 
  {
    console.log("here is event");
    console.log(event);
    this.selectedFile = event.target.files[0];
  }

  onSubmit() 
  {
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
    uploadImageData.append('picturePhrase', this.pictureName);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/halloween/upload', uploadImageData, { observe: 'response' })
       .subscribe((response) => {
         if (response.status === 200) {
           this.message = 'Image uploaded successfully';
         } else {
           this.message = 'Image not uploaded successfully';
         }
       }
       );


       console.log("logging response message");
       console.log(this.message);
  }

  //Gets called when the user clicks on retieve image button to get the image from back end
  // getImage() {
  //   //Make a call to Sprinf Boot to get the Image Bytes.
  //   this.httpClient.get('http://localhost:8080/image/get/' + this.imageName)
  //     .subscribe(
  //       res => {
  //         this.retrieveResonse = res;
  //         this.base64Data = this.retrieveResonse.picByte;
  //         this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  //       }
  //     );
  // }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagingService {

  constructor(private httpClient: HttpClient) { }

  public updateNamesList() {
    // this.httpClient.get('http://localhost:8080/halloween/allnames')
    //   .subscribe(
    //     res => {
    //       console.log("printing update names list")
    //       console.log(res)
    //       this.namesList = res;
    //     }
    //   );
    return this.httpClient.get('http://localhost:8080/halloween/allnames').toPromise();
  }

  public checkCount() {
    // this.httpClient.get('http://localhost:8080/halloween/check')
    //   .subscribe(
    //     res => {
    //       if (res > 0)
    //       {
    //         // console.log("check count is true")
    //         // this.database_populated = true;
    //         return true;
    //       }
    //       else 
    //       {
    //         return false;
    //       }
    //     }
    //   );

    //   return false;

    return this.httpClient.get('http://localhost:8080/halloween/check').toPromise();

    //return this.httpClient.get<Employee[]>(url);
  }
}

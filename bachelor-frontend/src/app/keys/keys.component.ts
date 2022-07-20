import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../service/user.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.css']
})
export class KeysComponent implements OnInit {
  user: any

  constructor(private userService: UserService, private clipboardApi: ClipboardService) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        this.user = null;
      }
    )
  }

  decryptKey(ciphertext: string){
    this.userService.decryptKey(ciphertext).subscribe(
      (data)=>{
        this.clipboardApi.copyFromContent(data)
        Swal.fire(
          {
            title: data,
            text: 'Dešifrovan ključ, nestaće za 10 sekunde, kopiran je u memoriji',
            timer: 10000,
            showConfirmButton: false,
          })
      },
      (error)=>{
        Swal.fire(
          {
            icon: 'error',
            title: error.message,
            timer: 3000,
            showConfirmButton: false,
          })
      }
    )
  }

  generateDataKey(){
    this.userService.getNewKey().subscribe(
      (data:any)=>{
        this.user.dataKeys.push({ciphertext:data.ciphertext})
        this.clipboardApi.copyFromContent(data.plaintext)
        Swal.fire(
          {
            title: data.plaintext,
            text: 'Dešifrovan ključ, nestaće za 10 sekunde, kopiran je u memoriji',
            timer: 10000,
            showConfirmButton: false,
          })
      },
      (error)=>{

      }
    )
  }

  generateDataKeyPair(){
    this.userService.getNewKeyPair().subscribe(
      (data:any)=>{
        this.user.dataKeyPairs.push({publicKey:data.publicKey, privateCiphertext:data.privateCiphertext})
        this.clipboardApi.copyFromContent(data.privatePlaintext)
        Swal.fire(
          {
            title: data.privatePlaintext,
            text: 'Dešifrovan ključ, nestaće za 10 sekunde, kopiran je u memoriji',
            timer: 10000,
            showConfirmButton: false,
          })
      },
      (error)=>{

      }
    )
  }

  copy(text:any) {
    this.clipboardApi.copyFromContent(text)
    Swal.fire(
      {
        icon: 'success',
        title: 'Successfully copied',
        timer: 500,
        showConfirmButton: false,
      })
  }

}

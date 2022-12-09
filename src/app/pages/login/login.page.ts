import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usr: string = ''
  pass: string = ''

  constructor(private service:ServiceService) { }

  ngOnInit() {
  }

  login() {
    this.service._login(this.usr, this.pass).subscribe(response => {
      if (!response.info) {
        console.log(response)
        this.service.message(response.message, 'danger')
        return
      }
      console.log(response.info.data)
      localStorage.setItem('rol_id', response.info.data.rol_id)
      localStorage.setItem('per_ci', response.info.data.per_ci)

      this.service.redirectTo('home')
    })
  }
}

import { ServiceService } from './../services/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  per_ci: string = ''
  per_names: string = ''
  // per_data: any

  constructor( private service: ServiceService ) {}

  ngOnInit() {
    this.per_ci = localStorage.getItem('per_ci')
    console.log('per_ci', this.per_ci)

    if ( localStorage.getItem('per_names') ) {
      console.log('solo setea porque ya esta guardada')
      this.per_names = localStorage.getItem('per_names')
      return
    }

    this.getPersona()
  }

  getPersona() {
    console.log('ejecuto getpersona')
    this.service._getPerson(this.per_ci).subscribe(response => {
      console.log('entra')
      this.per_names = `${response.info.data.per_nombres} ${response.info.data.per_apellidos}`
      localStorage.setItem('per_names', this.per_names)
    })
  }

  exit() {
    localStorage.clear()
    this.service.redirectTo('login')
  }

}

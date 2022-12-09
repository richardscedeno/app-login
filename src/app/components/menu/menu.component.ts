import { ServiceService } from './../../services/service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  
  listMenu: any[] = []
  rol_id: number = 0

  constructor(private service:ServiceService) { }

  ngOnInit() {
    this.rol_id = Number(localStorage.getItem('rol_id'))
    this.getMenu()
    console.log(this.listMenu)
    console.log('componente cargado')
  }

  getMenu() {
    this.service._getAcceso(this.rol_id).subscribe(response => {
      
      if (!response.info) {
        return
      }

      this.service._getMenuByAccess(response.info.data.men_id).subscribe(resp => {
        this.listMenu = Object.values(resp.info)
      })
    })
  }

}

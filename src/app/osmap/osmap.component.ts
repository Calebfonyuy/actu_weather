import { Component, OnInit, AfterViewInit } from '@angular/core'
import * as L from 'leaflet'
import { icon, Marker } from 'leaflet'
import { all } from 'q';

@Component({
  selector: 'app-osmap',
  templateUrl: './osmap.component.html',
  styleUrls: ['./osmap.component.css']
})


export class OsmapComponent implements OnInit, AfterViewInit {
  private map;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.initMap()
  }

  private initMap() {
    this.map = L.map('map', {
      center:[3.8, 11.5],
      zoom: 3
    })

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    var position = [3.8, 11.5]
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    })
  
    tiles.addTo(this.map)
    var marker = L.marker(position, {
      icon: myIcon,
      alt: 'here👇',
      draggable: true
    })
    marker.addTo(this.map)

    this.map.on('click', (e) => {
      position = e.latlng
      console.log(position)
      marker.setLatLng(position)
    })
  }
}

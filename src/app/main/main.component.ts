import {Component, OnInit} from '@angular/core';
import {circle, icon, latLng, Layer, marker, tileLayer} from 'leaflet';
import {ConnecterService} from '../connecter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading = true;
  lat: number;
  lon: number;
  layers: Layer[];
  screen = 1;
  people: any[];

  constructor(private connecterService: ConnecterService) {
  }

  options: {};

  setPosition(position: Position) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
    this.options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 20, attribution: '...'})
      ],
      zoom: 15,
      center: latLng(this.lat, this.lon)
    };
    this.layers = [circle([this.lat, this.lon], 500, {color: '#713096'}), marker([this.lat, this.lon], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png',
      })
    })];
    this.loading = false;
  }

  ngOnInit() {
    this.refreshMap();
    this.getPeople();
  }

  refreshMap() {
    this.screen = 1;
    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
  }

  getPeople() {
    this.connecterService.getPeople().then((value => {
      this.people = value;
    }));
  }

  onClick(event) {
    this.layers[2] = marker([event.latlng.lat, event.latlng.lng], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/images/marker-icon.png',
        shadowUrl: 'assets/images/marker-shadow.png',
      })
    });
  }


}

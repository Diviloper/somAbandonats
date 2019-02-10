import {Component, Inject, OnInit} from '@angular/core';
import {circle, icon, latLng, Layer, marker, tileLayer} from 'leaflet';
import {ConnecterService} from '../connecter.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loading = true;
  lat: number;
  lon: number;
  latEnd: number;
  lonEnd: number;
  layers: Layer[];
  screen = 1;
  people: Array<{}>;

  constructor(private connecterService: ConnecterService,
              private dialog: MatDialog) {
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
    this.layers[2] = undefined;
    this.loading = false;
  }

  ngOnInit() {
    this.refreshMap();
    this.getPeople();
    this.getIncidencies();
  }

  refreshMap() {
    this.screen = 1;
    navigator.geolocation.getCurrentPosition(this.setPosition.bind(this));
  }

  getPeople() {
    this.connecterService.getPeople().then((value => {
      this.people = Array.of(value);
    }));
    this.people = Array.of([1, 2, 3, 4, 5]);
  }

  getIncidencies() {
    this.connecterService.getIncidencies().then(value => {
      for (const incidencia of value) {
        this.layers.push(marker([incidencia.latitude, incidencia.longitude], {
          icon: icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'assets/images/map-marker-icon.png',
            shadowUrl: 'assets/images/marker-shadow.png',
          })
        }));
      }
    });
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

    this.latEnd = event.latlng.lat;
    this.lonEnd = event.latlng.lng;

    const dialofRef = this.dialog.open(RouteDialogComponent, {
      width: '250px',
    });

    dialofRef.afterClosed().subscribe(result => {
      this.connecterService.afegirRute({
        email: 'test',
        latitudeIni: this.lat,
        longitudeIni: this.lon,
        latitudeEnd: this.latEnd,
        longitudeEnd: this.lonEnd
      });
    });
  }

  afegirIncidencia() {
    const dialogRef = this.dialog.open(IncidenciesDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.connecterService.afegirIncidencia({
        comment: result,
        lat: this.lat,
        lng: this.lon
      });
    });
  }


}


@Component({
  selector: 'app-incidencies-dialog',
  templateUrl: 'dialog-incidencies.component.html',
})
export class IncidenciesDialogComponent {

  incidencia: string;

  constructor(
    public dialogRef: MatDialogRef<IncidenciesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-route-dialog',
  templateUrl: 'dialog-route.component.html',
})
export class RouteDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<RouteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

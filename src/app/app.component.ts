import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import "ol/ol.css";
import OSM from "ol/source/OSM"
import VectorSource from 'ol/source/Vector';
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import VectorLayer from 'ol/layer/Vector';
import {Style,Icon} from 'ol/style';
import Stroke from 'ol/style/Stroke';
import { Project1SService } from './project1-s.service';
import Control from 'ol/control/Control';
import Overlay from 'ol/Overlay';
// layer switcher
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import Stamen from "ol/source/Stamen";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import LayerSwicher, { BaseLayerOptions, GroupLayerOptions } from "ol-layerswitcher";
// layer switcher
import TileWMS from 'ol/source/TileWMS';
import LayerGroup from 'ol/layer/Group';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  SourceMAR: any;
  MAR2: any;
  a1 : any;
  b1 : any;
  ress : any;
  title = 'projet1';
  data: any;
  somme_Attendu: any;
  x: any;
  y: any;
  x1: any;
  y2: any;
  route:any;
  popup: Overlay | undefined;
  coordinate: any;
  selectedRouteT: any;
  pkd: any;
  pkf: any;
  routes: any
 

i: number = 0; // compteur pour les deux points
verificationClick_section: boolean=false;
coordinates: any[] = [];
sectionStyle = new Style({     // style pour les sections entre 2 points
  stroke: new Stroke({
    color: 'blue',
    width: 3,
  })
});


  wmss = new TileLayer({
    source: new TileWMS({
      url: 'http://localhost:8085/geoserver/cner22_I2S/wms',
      params: {'LAYERS': 'cner22_I2S:GRAPHE_ARC_LRS', 'TILED': true},
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0,
    }),
  });
 

// declaration des variables pour layer switcher
osm = new LayerTile({
  title: "fond",
  type: "base",
  visible: true,
  source: new XYZ({
    url:  'https://a.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}@2x.png'})
} as BaseLayerOptions);

terrain = new LayerTile({
  title: "terrain",
  type: "base",
  visible: true,
  source: new XYZ({
    url:  'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}'})
} as BaseLayerOptions);

// osm = new LayerTile({
//   title: "OSM",
//   type: "base",
//   visible: true,
//   source: new OSM(),
// } as BaseLayerOptions);

google = new TileLayer({
  title: "Google",
  type: "base",
  source: new XYZ({
    url: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
  })
}as BaseLayerOptions);


thunderforest = new TileLayer({
  title: "sans labelles",
  type: "base",
  source: new XYZ({
    //url: 'https://tile.thunderforest.com/transport/{z}/{x}/{y}.png'
    url: 'https://a.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}@2x.png'
  })
} as BaseLayerOptions);


watercolor = new LayerTile({
  title: "Water color",
  type: "base",
  visible: false,
  source: new Stamen({
    layer: "watercolor",
  }),
} as BaseLayerOptions);

fond_carte = new LayerGroup({
  title: "Base maps",
  layers: [this.osm,this.google, this.terrain,this.watercolor,this.thunderforest],
} as GroupLayerOptions);

// fin declaration var layer switcher
  verificationClick: boolean =false;
  verificationClick_sect: any;
  format = new GeoJSON();
  source_orcl_json: any;
  source_orcl_json_layer: any;
   Animal = new Style({
    image: new Icon({
      color: 'rgba(255, 0, 0, .5)',
      crossOrigin: 'anonymous',
      src: './assets/icone1.png',
      scale: 0.06,
       anchor: [ 0.5, 1],
    }),
  })
  container: HTMLElement | undefined;
  source_orcl_line_json: any;
  source_orcl_line_json_layer:any;
  content: HTMLElement | undefined;
  overlay: any;
  pk:any;
  zoomTosegment: boolean= false;

  constructor(private project1SService:Project1SService){
    this.getRoutesName()
  }

  ngOnInit(): void {
    var map =  new Map({
      target: 'map',
      layers: [
        
      ],
      view: new View({
        // VOIR bbox ()
        projection: "EPSG:4326",
        center: [0, 0],    
        zoom: 2
      })
    });
    map.getView().fit([-33,22.32,3,34.963]);

    this.SourceMAR = new VectorSource({
      format: new GeoJSON(),
      
      url:  (extent) => {
        return ("http://localhost:8085/geoserver/cner22_I2S/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=cner22_I2S:GRAPHE_ARC_LRS&outputFormat=application/json");
      },
      strategy: bboxStrategy,
      
    });

// ajout source
    this.source_orcl_json = new VectorSource();
    this.source_orcl_json_layer = new VectorLayer({
          source: this.source_orcl_json,
          style: this.Animal ,
        });

    this.MAR2 = new VectorLayer({
      source: this.SourceMAR,
      style: (feature, resolution) => {
        return new Style({
          stroke: new Stroke({
            color: "#4d4d4d",
            width: 2,
          })
        });
      },
    });
    
// pour layer switcher
var layerSwitcher = new LayerSwicher({
  activationMode: "click",
  reverse: true,
  startActive: false,
  groupSelectStyle: 'group',
});

map.addControl(layerSwitcher);
// map.addLayer(this.google)
// map.addLayer(this.thunderforest)
// map.addLayer(this.osm)
// map.addLayer(this.watercolor)

 map.addLayer(this.fond_carte)
 map.addLayer(this.wmss)

// fin -- pour layer switcher


   // map.addLayer(this.MAR2);    // couche vecteur
    map.addLayer(this.source_orcl_json_layer);

    this.source_orcl_json.on('addfeature', () =>{
      if(!this.verificationClick_section  || this.verificationClick_sect != undefined ){
        console.log(" bug")
        console.log(this.verificationClick_section,this.verificationClick_sect )
        map.getView().fit(
          this.source_orcl_json.getExtent(),
          { duration: 1000, size: map.getSize(), maxZoom: 13 }
      );
      }
  
  });

  this.source_orcl_line_json = new VectorSource();
  this.source_orcl_line_json_layer = new VectorLayer({
        source: this.source_orcl_line_json,
        style: this.sectionStyle
      });

  this.source_orcl_line_json.on('addfeature', () =>{
    map.getView().fit(
      this.source_orcl_line_json.getExtent(),
      { duration: 1000, size:map.getSize(), maxZoom: map.getView().getZoom() }
  );
});

 // add 

     // add control
     //button  projection
     var localisation = document.createElement('button');
     localisation.innerHTML = '<i class="bi bi-geo-alt"></i>';
     localisation.className = 'myButton';
     localisation.id = 'localisation';

     var localisationElement = document.createElement('div');
     localisationElement.className = 'localisationDiv';
     localisationElement.appendChild(localisation);

     var control1 = new Control({
         element: localisationElement
     })

// controle 3
  var sect = document.createElement('button');
  sect.innerHTML = '<i class="bi bi-sign-stop-lights"></i>';
  sect.className = 'myButton_section';
  sect.id = 'myButton_section';

  var localisationElement_section = document.createElement('div');
  localisationElement_section.className = 'localisationDiv_section';
  localisationElement_section.appendChild(sect);

     var control3 = new Control({
   element: localisationElement_section
})

// controle effacer
var effacer = document.createElement('button');
effacer.innerHTML = '<i class="bi bi-trash"></i>';
effacer.className = 'myButton_effacer';
effacer.id = 'myButton_effacer';

var localisationElement_effacer = document.createElement('div');
localisationElement_effacer.className = 'localisationDiv_effacer';
localisationElement_effacer.appendChild(effacer);

   var control4 = new Control({
 element: localisationElement_effacer
})

     map.addControl(control1);
     map.addControl(control3);
     map.addControl(control4);
      localisation.addEventListener("click",()=>{
      localisation.classList.toggle('clicked');
      this.verificationClick = this.verificationClick?false:true;
     })


// pour controle effacer
  localisationElement_effacer.addEventListener("click",()=>{
  //this.verificationClick = this.verificationClick?false:true;
  // console.log("bouton effecer");
  this.source_orcl_json.clear();
  this.source_orcl_line_json.clear()
  this.overlay.setPosition(undefined);
  if(closer) closer.blur();
  return false;

 })
// fin controle effacer

      sect.addEventListener("click",()=>{
      sect.classList.toggle('clicked');
      this.verificationClick_section = this.verificationClick_section?false:true;
     })

     //add control

 map.on("click",(event:any)=>{
 console.warn(event); 
 this.i++;
 this.coordinates.push(event.coordinate[0]);
 this.coordinates.push(event.coordinate[1]);
 //pour récuper les coordonnées des deux points
 if(this.verificationClick_section){
  if(this.coordinates.length>=4){
    var object ={
      x1:this.coordinates[this.coordinates.length - 4],
      y1:this.coordinates[this.coordinates.length - 3],
      x2:this.coordinates[this.coordinates.length - 2],
      y2:this.coordinates[this.coordinates.length - 1]
    }
   if(this.i%2 == 0){
    this.project1SService.projectLineByCoordEvent(object).subscribe(
      (res)=>{
        console.warn(res)
        this.source_orcl_line_json.clear();
        this.source_orcl_json.clear();

      this.source_orcl_json.addFeatures(
        this.format.readFeatures(res[0].GEOM1)
        );
      this.source_orcl_json.addFeatures(
        this.format.readFeatures(res[0].GEOM2)
        );

        this.source_orcl_line_json.addFeatures(
          this.format.readFeatures(res[0].ROUTE_GEOMETRY)
          );

      //todo
      this.display_line_properties(res[0].ROUTE_NAME,res[0].PKD,res[0].PKF)
      this.overlay.setPosition(this.getCenterOfExtent(this.source_orcl_line_json.getExtent()));
      },
      (err)=>{}
    )
   }
    

  }
 }



 this.coordinate = event.coordinate;
 this.x= event.coordinate[0];
 this.y= event.coordinate[1];
 var object_xy = {
  x:null,
  y:null,
  id_layer:null,
  geom_format: null
 };
 object_xy['x'] = this.x;
 object_xy['y'] = this.y;
 object_xy['id_layer'] = <any>1;
 object_xy['geom_format'] = <any>1;
 //call the getpk_route method
 if(this.verificationClick){
  // this.project1SService.getpk_route(object_xy).subscribe(
  //   (res)=>{
  //     console.log(res);
  //   },
  //   (err)=>{
  //     console.log(err);
  //   }
  // );
  //todo1
    console.log('object_xy = ',object_xy);
    this.project1SService.project_point(object_xy).subscribe(
    (res)=>{
      console.log(res);
      this.source_orcl_json.clear();
      this.source_orcl_line_json.clear()
      this.source_orcl_json.addFeatures(
      this.format.readFeatures(res[0].ROUTE_GEOMETRY)
      );

      var coord = JSON.parse(<string>res[0].ROUTE_GEOMETRY).coordinates;
      console.warn(coord)
      this.display_point_properties(res[0].ROUTE_NAME,res[0].PKD,coord)
    },
    (err)=>{
      console.log(err);
    }
  );

 }
//call the getpk_route method
if(this.verificationClick_sect){
  var object_pkd_pkf_route = {
    pkd:0,
    pkf:0,
    route: "0"
   };
   this.x1 = 1;
   this.y2 = 1;
   this.route = "route"
   object_pkd_pkf_route['pkd'] = this.x1;
   object_pkd_pkf_route['pkf'] = this.y2;
   object_pkd_pkf_route['route'] = this.route;
   console.log("ici ",object_pkd_pkf_route);
  this.project1SService.getsection_pkd_pkf_route(object_pkd_pkf_route).subscribe(
    (res)=>{
      //todo

       
       this.source_orcl_json.clear();
       this.source_orcl_line_json.clear()
       this.source_orcl_json.addFeatures(
         this.format.readFeatures(res[0].ROUTE_GEOMETRY)
       );
       // overlay
       this.display_line_properties(res[0].ROUTE_NAME,res[0].PKD,res[0].PKF)

       this.getCenterOfExtent(this.source_orcl_json.getExtent())
    },
    (err)=>{
      console.log(err);
    }
  );


 }
})

// popup
this.container =<HTMLElement| undefined> document.getElementById("popup");
 this.content =<HTMLElement| undefined> document.getElementById("popup-content");
var closer = document.getElementById("popup-closer");

if(closer)
      closer.onclick = ()=> {
       
        this.overlay.setPosition(undefined);
        if(closer) closer.blur();
        return false;
      };

   this.overlay = new Overlay({
  element: this.container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});

map.addOverlay(this.overlay);
// pour les sections entre 2 points


        map.addLayer(this.source_orcl_line_json_layer);


    
}
   
  valueOfA(val:any){
    console.log(val.target.value)
    //affectation des valeurs de a  
    this.a1 = val.target.value;
  }
  valueOfB(val:any){
    console.log(val.target.value)
     //affectation des valeurs de b
     this.b1 = val.target.value;
  }

  ajouter(){
    this.data = { a:this.a1,b:this.b1};
    //ES6
      /*
      function fs1(a){
        return a*10;
      }
      */
      /*
      (a)=>{
        return a*10;
      }
      */

    this.project1SService.somme(this.data).subscribe(
      (res)=>{
        this.somme_Attendu = res;
      },
      (err)=>{
        console.log(err);
      }
    );
  }

  onchangeRouteTable(vv:any){
    this.selectedRouteT = vv;

  }
  pkdEvent(event:any){
    this.pkd = event.target.value ;
   }
  pkfEvent(event:any){
    this.pkf = event.target.value ;
   }

   getRoutesName(){
    setTimeout(()=>{
      this.project1SService.getRouteNames().subscribe(
        res=>{
        this.routes = res;
        // console.log(res)
        
        }
        ,err=>{console.log(err)})
    },1500)
    
  }


  async print() {
    var object = {
      pkd: this.pkd,
      pkf: this.pkf,
      route_name: this.selectedRouteT
    }

    console.log(object)

    await fetch('http://www.cner.ma:9763/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic RUEyZlE4Z1ZYTlcxUlBiaGZnYVZ4Z1ZJV0JnYTo4dVZxWFBQNGFVRHQ5TGtXZ2pBbUIya1hpQllh'
      },
      body: new URLSearchParams({
        'grant_type': 'client_credentials'
      })
    }).then(
      async (response2) => {

        if (response2.ok) {
          //console.log(response2.body)
          response2.json().then(async body => {console.log(body.access_token);
          // console.log('Bearer ' + body.access_token) 

          // fetch
          await fetch("http://www.cner.ma/resourcecner/generate/N3/0/78", {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+body.access_token
              },
          })
            .then(
              (response2) => {
                if (response2.ok) {
                  return response2.json();
                  }
                  throw new Error("request failed");
              },
              (networkError) => console.log(networkError)
            )
            .then((responseJson2) => {
              console.log(responseJson2);
              window.open(responseJson2.message);
             // console.log("succesfully done");
      
            });

          });
        }}
    );
  
  }

  display_point_properties(route_name:any,pk:any,coord:any){
    var contentTable = '<table id="customers"> <tr> <th>ROUTE_NAME</th> <th>PKD</th> </th> </tr> <tr>';
    contentTable = contentTable + `<td>${route_name}</td>`;
    contentTable = contentTable + `<td>${(pk/1000).toFixed(3)}</td>`;
   
    contentTable = contentTable + "<tr> </table>";
    if(this.content) this.content.innerHTML = contentTable;

    coord[1] = coord[1] + 0.005
    this.overlay.setPosition(coord);
  }

  display_line_properties(route_name:any,pkd:any,pkf:any){
    var contentTable = '<table id="customers"> <tr> <th>ROUTE NAME</th> <th>PKD</th> <th>PKF</th> </tr> <tr>';
          contentTable = contentTable + `<td>${route_name}</td>`;
          contentTable = contentTable + `<td>${(pkd/1000).toFixed(3)}</td>`;
          contentTable = contentTable + `<td>${(pkf/1000).toFixed(3)}</td>`;
          contentTable = contentTable + "<tr> </table>";
          if(this.content) this.content.innerHTML = contentTable;

          
         
  }


  getCenterOfExtent(Extent: number[]){
    var X = Extent[0] + (Extent[2]-Extent[0])/2;
    var Y = Extent[1] + (Extent[3]-Extent[1]) + 0.005;
    return [X, Y];
    }


    pkEvent(evt:any){
      this.pk = evt.target.value ;   
    }



    cc(){
   
      var object = {
        route:this.selectedRouteT,
        pkd:this.pk * 1000
      }
    
    
      
      this.project1SService.Localiser_un_point(object).subscribe(
      (res)=>{

        this.source_orcl_json.clear();
        this.source_orcl_line_json.clear();
        this.source_orcl_json.addFeatures(
        this.format.readFeatures(res)
        );
  
      
        
      },
      (err)=>{
        console.log(err);
      }
    );
     }



     cc1(){
      this.zoomTosegment = true;
      console.log(this.pkd);
      console.log(this.pkf);
      console.log(this.selectedRouteT);
     
      var object = {
        route:this.selectedRouteT,
        pkd:this.pkd * 1000,
        pkf:this.pkf * 1000
  
      }
    
    
      console.log('object = ',object);
      this.project1SService.getSegments(object).subscribe(
      (res)=>{
        console.log(res);
        this.source_orcl_line_json.clear();
        this.source_orcl_json.clear();
  
  
        
  
        this.source_orcl_json.addFeatures(
          this.format.readFeatures(res[0].GEOM1)
          );
        this.source_orcl_json.addFeatures(
          this.format.readFeatures(res[0].GEOM2)
          );
  
          this.source_orcl_line_json.addFeatures(
            this.format.readFeatures(res[0].ROUTE_GEOMETRY)
            );

      },
      (err)=>{
        console.log(err);
      }
    );
     }

}

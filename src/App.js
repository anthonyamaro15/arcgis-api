import React, { useRef, useEffect } from "react";
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import ArcGISMap from "@arcgis/core/Map";
import DictionaryRenderer from "@arcgis/core/renderers/DictionaryRenderer";
import MapView from "@arcgis/core/views/MapView";
import esriConfig from '@arcgis/core/config.js';

import Map from "@arcgis/core/Map";

import "./App.css";
function App() {

  esriConfig.assetsPath = './assets'; 
  esriConfig.apiKey = process.env.REACT_APP_API_KEY;
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      /**
       * Initialize application
       */
      const map = new Map({
        basemap: "arcgis-topographic",
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        center: [-118.805, 34.027],
        zoom: 13,
      });



      const popupTrailheads = {
         'title': "Trailhead",
         'content': "<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft"
      }

      const popupTrials = {
         title: "Trail Information",
         content: [{
            type: 'media',
            mediaInfos: [{
               type: 'column-chart',
               caption: '',
               value: {
                  fields: ["ELEV_MIN", 'ELEV_MAX'],
                  normalizeField: null,
                  tooltipField: 'Min and Max elevation values'
               }
            }]
         }]
      }

      const trails = new FeatureLayer({
         url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0',
         outFields: ["TRL_NAME","ELEV_GAIN"],
         popupTemplate: popupTrials
      });


      map.add(trails);

      const trailheadsLayer = new FeatureLayer({
         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
         outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT"],
         popupTemplate: popupTrailheads
      });
      map.add(trailheadsLayer, 0);


      const popupOpenspaces = {
        "title": "{PARK_NAME}",
        "content": [{
          "type": "fields",
          "fieldInfos": [
            {
              "fieldName": "AGNCY_NAME",
              "label": "Agency",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "TYPE",
              "label": "Type",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },
            {
              "fieldName": "ACCESS_TYP",
              "label": "Access",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": null,
              "stringFieldOption": "text-box"
            },

            {
              "fieldName": "GIS_ACRES",
              "label": "Acres",
              "isEditable": true,
              "tooltip": "",
              "visible": true,
              "format": {
                "places": 2,
                "digitSeparator": true
              },

              "stringFieldOption": "text-box"
            }
          ]
        }]
      };


      const openspaces = new FeatureLayer({
         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
         outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
         popupTemplate: popupOpenspaces
      });

      map.add(openspaces);

      const parksLayer = new FeatureLayer({
         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0"
      });
      map.add(parksLayer, 0);

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      const point = {
         type: 'point',
         longitude: -118.80500,
         latitude: 34.027
      }

      const simpleMakerSymbol = {
         // type: 'simple-maker',
         color: [226, 119, 40],
         outline: {
            color: [255, 255, 255],
            width: 1
         }
      }

      const pointGraphic = new Graphic({
         geometry: point,
         // symbol: simpleMakerSymbol
      });
      graphicsLayer.add(pointGraphic);

      const simpleFillSymbol = {
         type: "simple-fill",
         color: [227, 139, 79, 0.8],
         outline: {
            color: [255, 255, 255],
            width: 1
         }
      };

      const popupTemplate = {
         title: "{Name}",
         content: "{Description}"
      }
      const attributes = {
         Name: 'Graphic',
         Description: "I am a polygon"
      }

      const polygonGraphic = new Graphic({
         symbol: simpleFillSymbol,
         attributes,
         popupTemplate
      });
      graphicsLayer.add(polygonGraphic);

      // map.addMany([  layer2 ]);
    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
import React, { useRef, useEffect } from "react";
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapView from "@arcgis/core/views/MapView";
import BaseMapGallery from '@arcgis/core/widgets/BasemapGallery';
import esriConfig from '@arcgis/core/config.js';
import Map from "@arcgis/core/Map";
import { 
   popupTrials, 
   popupTrailheads, 
   popupOpenspaces, 
   treeTemplate, 
   popupTemplate, 
   attributes,
   simpleFillSymbol,
   point
} from './components/PopUpTemplates';
import { apieKey } from "./envVariables";

function App() {
  esriConfig.assetsPath = './assets'; 
  esriConfig.apiKey = apieKey;
  const mapDiv = useRef(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
         basemap: 'hybrid'
      });

      const view = new MapView({
         map,
         container: mapDiv.current,
         extent: {
            xmin: -9177811,
            ymin: 4247000,
            xmax: -9176791,
            ymax: 4247784,
            spatialReference: 102100
         }
         //    center: [-118.805, 34.027],
         //    zoom: 13,
      })        

      const trails = new FeatureLayer({
         url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails_Styled/FeatureServer/0',
         // outFiles are just arguments we use in the popupTemplate
         // check url in browser to see what's available to use
         outFields: ["TRL_NAME","ELEV_GAIN"],
         popupTemplate: popupTrials
      });

      const trailheadsLayer = new FeatureLayer({
         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0",
         outFields: ["TRL_NAME", "CITY_JUR", "X_STREET", "PARKING", "ELEV_FT", "TARGET_FID", 'ZIP_CODE'],
         popupTemplate: popupTrailheads
      });

      const openspaces = new FeatureLayer({
         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0",
         outFields: ["TYPE","PARK_NAME", "AGNCY_NAME","ACCESS_TYP","GIS_ACRES","TRLS_MI","TOTAL_GOOD","TOTAL_FAIR", "TOTAL_POOR"],
         popupTemplate: popupOpenspaces
      });

      const parksLayer = new FeatureLayer({
         url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space_Styled/FeatureServer/0"
      });

      const treesLayer = new FeatureLayer({
         url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Landscape_Trees/FeatureServer/0",
         outFields: ['Status', 'Land_Use', 'Condition', 'Tree_Age'],
         popupTemplate: treeTemplate
      });

      const graphicsLayer = new GraphicsLayer();
      const baseMapGallery = new BaseMapGallery({
         view
      });

      view.ui.add(baseMapGallery, { position: 'top-right' });


      const pointGraphic = new Graphic({
         geometry: point,
         // symbol: simpleMakerSymbol
      });

      const polygonGraphic = new Graphic({
         symbol: simpleFillSymbol,
         attributes,
         popupTemplate
      });

      // you can add multiple instead of adding by one by one
      graphicsLayer.addMany([pointGraphic, polygonGraphic]);
      map.addMany([trails, trailheadsLayer, openspaces, parksLayer, treesLayer, graphicsLayer],0);

    }
  }, []);

  return <div className="mapDiv" ref={mapDiv}></div>;
}

export default App;
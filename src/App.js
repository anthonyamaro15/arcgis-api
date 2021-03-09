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
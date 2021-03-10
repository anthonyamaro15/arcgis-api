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


const popupTrailheads = {
   // things inside {} are just parameters to the variables we pass on the "outFields" FeatureLayer
   // those variables come from the service url 
   'title': "Trailhead",
   'content': `<b>Trail:</b> {TRL_NAME}<br><b>City:</b> {CITY_JUR}<br><b>Cross Street:</b> 
               {X_STREET}<br><b>Parking:</b> {PARKING}<br><b>Elevation:</b> {ELEV_FT} ft<br>
               <b>Target ID :</b> {TARGET_FID}<br><b>Zip Code:</b> {ZIP_CODE}<br>`
}

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

const treeTemplate = {
   'title': "DO THIS WORK??",
   "content": 
      `
         <b>Status:</b> {Status}<br>
         <b>Land Use:</b> {Land_Use}<br>
         <b>Condition:<b> {Condition}<br>
         <b>Tree Age:<b> {Tree_Age}<br>
      `
}

const popupTemplate = {
   title: "{Name}",
   content: "{Description}"
}

const attributes = {
   Name: 'Graphic',
   Description: "I am a polygon"
}

const simpleFillSymbol = {
   type: "simple-fill",
   color: [227, 139, 79, 0.8],
   outline: {
      color: [255, 255, 255],
      width: 1
   }
};

const simpleMakerSymbol = {
   // type: 'simple-maker',
   color: [226, 119, 40],
   outline: {
      color: [255, 255, 255],
      width: 1
   }
}

const point = {
   type: 'point',
   longitude: -118.80500,
   // longitude: -115.2088594,

   latitude: 34.027
   // latitude: 36.0974872

}



export {
   popupTrials,
   popupTrailheads,
   popupOpenspaces,
   treeTemplate,
   popupTemplate,
   attributes,
   simpleFillSymbol,
   simpleMakerSymbol,
   point
}

//Devin Stern Cohort 3 Leafleft HW

// Creating map object
var myMap = L.map("map", {
  center: [38.89, -101.75],
  zoom: 4.9
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
}).addTo(myMap);

// Store API query variables
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Grab the data with d3
d3.json(url, function(data) {
  console.log(data);
  // L.geoJson(data).addTo(myMap);
console.log("Checkpoint 1, after console.log data");
  
    var earthquakeData = data.features;

    quakeLocation = [];
    magnitudeArray = [];
    

console.log("checkpoint 2, after earthquake array is defined");

  // Loop through data
    for (var i = 0; i < earthquakeData.length; i++) {

      // Set the data location property to a variable
      var location = earthquakeData[i].geometry.coordinates;
      var size = earthquakeData[i].properties.mag;

      quakeLocation.push([location[1], location [0]]);
      magnitudeArray.push([size]);
    };

  console.log(magnitudeArray);

      // Loop through arrays and create one marker for each quake
      for (var i = 0; i < earthquakeData.length; i++) {

          // Conditionals for earthquake points
          var color = "";
          if (magnitudeArray[i] > 6.9) {
          color = "red";
          }
          else if (magnitudeArray[i] > 6) {
          color = "yellow";
          }
          else if (magnitudeArray[i] > 5.4) {
          color = "orange";
          }
          else if (magnitudeArray[i] > 2.4) {
          color = "coral";
          }
          else {
          color = "teal";
          }
          console.log("checkpoint 2")
          
          // Add circles to map
          L.circle(quakeLocation[i], {
              fillOpacity: 0.75,
              color: color,
              fillColor: color,
              // Adjust radius
              radius: magnitudeArray[i] * 15000
          }).bindPopup("<h1>" + earthquakeData[i].properties.place + "</h1> <hr> <h3> Magnitude of " + magnitudeArray[i] + "</h3>").addTo(myMap);
      }
});



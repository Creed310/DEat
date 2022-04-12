
let x = document.getElementById("prodgeo");
let y = document.getElementById("prodgeo2");

//Using Geolocation.
let getLocation = async () => {
  if (navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else 
  { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
let mapLat,mapLong;
let showPosition = async (position) =>
{
    latitude = await position.coords.latitude
    longitude = await position.coords.longitude
    
    App.account.location.latitude = latitude;
    App.account.location.longitude = longitude;
    //x.innerHTML = "Latitude: " + latitude + "<br>Longitude: " + longitude;
    x.innerHTML = "Zoom out to view your Selling Radius."
}

//to automatically run this function
window.onload = getLocation()

//Using leaflet.js to map

// initialize a map and set the coordinates + zoom level
let map = L.map('map').setView([28.3949, 84.1240], 2);

//OpenStreetMap
let osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
{
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

osm.addTo(map);


// to display the selling radius and circle
// this is stored as [xcenter, ycenter, radius] and compared

navigator.geolocation.getCurrentPosition((position) => 
{
    //console.log(position);
    //console.log(position.coords.latitude)
    //console.log(position.coords.longitude)
    const circle = L.circle([position.coords.latitude, position.coords.longitude], 
    {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 3000            //3km 
    }
    ).addTo(map);
})

L.control.locate().addTo(map).start();

//each address should have an object that is [lat, long, radius(in m)]
// need to get the geolocation latiutde and longitude as const variables.

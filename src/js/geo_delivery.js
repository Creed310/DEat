
navigator.geolocation.getCurrentPosition((position) => 
{
    //console.log(position);
    //console.log(position.coords.latitude)
    //console.log(position.coords.longitude)
    const circle = L.circle([position.coords.latitude, position.coords.longitude], 
    {
        color: 'green',
        fillColor: '#bcd84d',
        fillOpacity: 0.2,
        radius: 3000            //3km 
    }
    ).addTo(map);
})

L.control.locate().addTo(map).start();

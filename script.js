$(function(){
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            currentLocat(latitude, longitude);
        });
    }

    function currentLocat(lat, lng) {
        $('button').click(function() {
            let radius = 1000;

            $.ajax({
                url: 'http://overpass-api.de/api/interpreter',
                type: 'get',
                dataType: 'json',
                data: {
                    'data': '[out:json];node["amenity"="restaurant"](around:'+radius+','+lat+','+ lng+');out;'
                },
    
                success: function(result) {
                    let display = result.elements
    
                    $.each(display, function(i, data) {
                        let name = data.tags["name"];
                        let city = data.tags["addr:city"];

                        if (typeof name === 'undefined') {
                            name = 'No record';
                        }

                        if (typeof city === 'undefined') {
                            city = 'No record';
                        }

                        $('table').append(`
                            <tr>
                            <th>Restaurant Name</th>
                            <th>City</th>
                        </tr>
                        <tr>
                            <td id='name'>`+ name +`</td>
                            <td id='city'>`+ city +`</td>
                        </tr>
                        `)
                    })
                }
            })
        })
    }
})
$(document).ready(function () {
  const amenities = [];
  $('input:checkbox').change(function () {
    if ($(this).is(':checked')) {
      amenities.push(this.attr('data-id'));
    } else {
      amenities.pop(this.attr('data-id'));
    }
  });

  let amenitiesTxt = '';
  for (let i = 0; amenities.length() - 1; i++) {
    if (i === amenities.length() - 1) {
      amenitiesTxt += amenities[i];
    }
    amenitiesTxt += amenities[i] + ', ';
  }
  $('div.amenities h4').text(amenitiesTxt);

  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
	contentType: "application/json",
	data: "{}",
	success: function (placesResponse) {
		for (let placeItem of placesResponse) {
			$( ´�<article>
				<div class="title_box">
					<h2>$(placeItem.name)</h2>
					<div class="price_by_night">$$(placeItem.price_by_night)</div>
				</div>
				<div class="information">
					<div class="max_guests">$(placeItem.max_guest) $((placeItem.max_guest == 1 ) ? "Guest" : "Guests";) </div>
					<div class="number_rooms">$(placeItem.number_rooms) $((placeItem.number_rooms == 1 ) ? "Bedroom" : "Bedrooms";)</div>
					<div class"number_bathrooms">$(placeItem.number_bathrooms) $((placeItem.number_bathrooms == 1 ) ? "Bathroom" : "Bathrooms";)</div>
				</div>
				<div class="user">
					<b>Owner:</b>&(placeItem.user.first_name) $(placeItem.user.last_name)
				</div>
				<div> class="description">
				$(placeItem.description)
				</div>
				</article>´ ).appendTo( $("section.places") );
  });
});

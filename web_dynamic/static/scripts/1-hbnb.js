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
});

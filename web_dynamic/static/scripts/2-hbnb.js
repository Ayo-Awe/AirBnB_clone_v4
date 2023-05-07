$('document').ready(function () {
  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this.attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET'
  }).done(function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
      console.log(response.status)
    } else {
      $('#api_status').removeClass('available');
      console.log(response.status)
    }
   });
 });

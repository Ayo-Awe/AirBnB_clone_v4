$("document").ready(function () {
  const amenities = {};
  fetchPlaces();

  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenities[$(this).attr("data-id")];
    }
    const amenitiesList = Object.values(amenities).join(", ");
    $(".amenities H4").text(shortenString(amenitiesList));
  });

  $("section.filters button").click(() => {
    const data = { amenities: Object.keys(amenities) };
    fetchPlaces(data);
  });

  $.ajax({
    url: "http://0.0.0.0:5001/api/v1/status/",
    type: "GET",
  }).done(function (response) {
    if (response.status === "OK") {
      $("#api_status").addClass("available");
      console.log(response.status);
    } else {
      $("#api_status").removeClass("available");
      console.log(response.status);
    }
  });
});

const shortenString = (string, length = 30) => {
  if (string.length <= length) return string;

  return string.substring(0, length - 3) + "...";
};

function fetchPlaces(filter = {}) {
  const options = {
    url: "http://0.0.0.0:5001/api/v1/places_search/",
    contentType: "application/json",
    data: JSON.stringify(filter),
    type: "POST",
  };

  $.ajax(options).done(function (response) {
    $("section.places").empty();
    response.forEach((place) => {
      const placeMarkup = $(`
  <article>
    <div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">$${place.price_by_night}</div>
    </div>
    <div class="information">
      <div class="max_guest">
        ${place.max_guest} ${place.max_guest > 1 ? "Guests" : "Guest"}
      </div>
      <div class="number_rooms">
        ${place.number_rooms} ${place.max_guest > 1 ? "Bedrooms" : "Bedroom"}
      </div>
      <div class="number_bathrooms">
      ${place.number_bathrooms} ${
        place.number_bathrooms > 1 ? "Bathrooms" : "Bathroom"
      }
      </div>
    </div>
    <div class="description">${place.description}</div>
  </article>
    `);

      $("section.places").append(placeMarkup);
    });
  });
}

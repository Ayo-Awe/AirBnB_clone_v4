$("document").ready(function () {
  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(":checked")) {
      amenities[$(this).attr("data-id")] = $(this).attr("data-name");
    } else {
      delete amenities[$(this).attr("data-id")];
    }
    const amenitiesList = Object.values(amenities).join(", ");
    $(".amenities H4").text(shortenString(amenitiesList));
  });
});

const shortenString = (string, length = 30) => {
  if (string.length <= length) return string;

  return string.substring(0, length - 3) + "...";
};

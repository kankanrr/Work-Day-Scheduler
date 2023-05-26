// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

    var saveButtonEl = $('.saveBtn');

    saveButtonEl.on('click', function (e) {
      localStorage.setItem('hour' + (e.target.closest('div').id), (e.target.closest('div').id));

      var trueEventText = ($($(this).prev()[0]).val());
      localStorage.setItem('event' + (e.target.closest('div').id), trueEventText);
    });
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //

  var hourEl = $('[id^="hour-"]');
  var currentHour = dayjs().hour();

  hourEl.each(function () {
    var nextCurrentHour = (dayjs((parseInt((this.id.replace('hour-', ''))))).diff(currentHour));

    if (nextCurrentHour === 0) {
      $(this).addClass('present');
    } else if (nextCurrentHour > 0) {
      $(this).addClass('future');
    } else {
      $(this).addClass('past');
    }
  })
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  function getLocalStorage() {
    hourEl.each(function () {

      var hourID = localStorage.getItem('hour' + ($(this).attr('id')));
      let hourElId = ($(this).attr('id'));

      if (hourElId === hourID) {
        $(this).find('.description').text(localStorage.getItem('event' + ($(this).attr('id'))));
      }
    })
  }
  // TODO: Add code to display the current date in the header of the page.

  function getDate() {
    var currentDate = (dayjs().format('dddd MMMM DD YYYY'));
    var currentDayEl = $('#currentDay');

    currentDayEl.text(currentDate);
  }

  getDate();
  getLocalStorage();

});

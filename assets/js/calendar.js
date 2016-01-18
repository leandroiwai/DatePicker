Datepicker = function(element){

	//some variables
	var date = new Date();
	var month = date.getMonth();
	var locale = "pt-br";
	
	var year = date.getFullYear();
	// var number_of_days_month = new Date(year, month + 1, 0).getDate();
	

	var displayInfo = function() {
		console.log("Date  			 : " + date);									// Date  			 : Thu Jan 14 2016 14:26:22 GMT+0000 (GMT)
		console.log("Month 			 : " + month);									// Month 			 : 0
		// console.log("Month 			 : " + month_name);								// Month 			 : January	
		console.log("Year  			 : " + year);									// Year  			 : 2016
		// console.log(month + " has " + number_of_days_month + " days");				// 0 has 31 days
		// console.log("Last day of the month : " + number_of_days_month);				// Last day of the month : 31
		// 01/0/2016 falls on a 5
	}

	


	var printEmptyDays = function(element, index, array) {
		console.log(element);
		$('.wn_week_line').prepend(element);
	}

	var getFirstDay = function(year, month){
		return new Date(year, month, 1).getDay();
	}

	// end of Get week names using locale settings

	var drawMonth = function(year, month){	
		var day = new Date();
		day.setMonth(month);
		day.setYear(year);
		day.setDate(1);
		var month_name = day.toLocaleString(locale, { month: "short" });

		console.log('date picker initialized');
		var $wn_cal_wrap = $('<div class="wn_datepicker month' + month + '">');
		var $wn_cal_header = $('<div class="wn_datepicker_header">' + month_name + ' ' + year + '</div>');


		var first_day_month = getFirstDay(year, month);
		console.log(month);
		var number_of_days_month = new Date(year, month + 1, 0).getDate();
		console.log("01/" + month + "/" + year + " falls on a " + first_day_month);
		console.log(month + " has " + number_of_days_month + " days");				// 0 has 31 days
		//Print Days

		var selectedDay 	= date.getDate();
		var selectedMonth 	= date.getMonth();
		var selectedYear 	= date.getFullYear();
		console.log("day : " + selectedDay);
		console.log("month : " + selectedMonth);
		console.log("year : " + selectedYear);

		// Get week names using locale settings

		var findWeekDays = function(){

			var newDate = new Date();
			var weekDays = [];
			while(newDate.getDay() > 0) {
				newDate.setDate(newDate.getDate() + 1);
			}

			while(weekDays.length < 7) {
			    weekDays.push(newDate.toLocaleString(locale, {weekday: 'short'}));
			    newDate.setDate(newDate.getDate() + 1);
			}

			// CONVERTED TO JQUERY
			$('.wn_datepicker').append('<ul class="wn_weekDays month' + month +'">').attr("data-month", month).attr("data-year", year);

			for(var i = 0; i < 7; i++) {
				
				$('.wn_weekDays.month' + month).append('<li>' + weekDays[i] + '</li>');
				console.log("PASS HERE " + i)

			}


		}

		var drawDays = function() {
			var day = 1;
			var $wn_day_box = [];
			for(var i = 0; i < 42; i++) {
				// if ((i % 7) === 0) {
				// 	document.write('</ul><ul>');
				// 	var $wn_cal_days = $('');
				// }
					if (i < first_day_month) {
						
						$wn_day_box.push('<li class="empty">&nbsp;</li>');

					} else if (day <= number_of_days_month) { 
						if (year === selectedYear && month === selectedMonth && day === selectedDay) {

							$(".wn_week_line").append('<li class="today">' + day + '</li>');
							day++

						} else {
							$(".wn_week_line").append('<li>' + day + '</li>');
							day++
						}
					} else {
						$(".wn_week_line").append('<li class="empty">&nbsp;</li>');
					}
			}
			$wn_day_box.forEach(printEmptyDays);
		}

		displayInfo();
		$(".calendar").append($wn_cal_wrap);
		$(".wn_datepicker").append($wn_cal_header);
		findWeekDays();
		$(".wn_datepicker").append('<ul class="wn_week_line">');
		drawDays();

	}

	
	var attach = function(){
		//...
	}
	var destroy = function(){
		//...
	}
	//some public methods
	this.show = function(){
		//...
	}
	this.hideeeee = function(){
		//...
	}

	var __construct = function(){
		//do some stuff
		drawMonth(2016, 0);
		drawMonth(2016, 1);
	}();
}
//initiate object
var datepicker1 = new Datepicker('element-selector');

$(document).ready(function(){
	$('.wn_datepicker .wn_week_line li').click(function(){
		$(this).addClass('select');
		$('.wn_datepicker .wn_week_line li').not( $(this) ).removeClass('select');
		var selectedDate = $(this).text();
		console.log(selectedDate);
	})
});

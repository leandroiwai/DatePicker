Datepicker = function(element){

	//some variables
	var date = new Date();
	var month = date.getMonth();
	var locale = "pt-br";
	var year = date.getFullYear();
	var $picker;
	var $element = $(element);
	// var number_of_days_month = new Date(year, month + 1, 0).getDate();
	
	this.getDate = function(){
		return month + '-' + year;
	}

	var displayInfo = function() {
		// console.log("Date  			 : " + date);									// Date  			 : Thu Jan 14 2016 14:26:22 GMT+0000 (GMT)
		// console.log("Month 			 : " + month);									// Month 			 : 0
		// console.log("Month 			 : " + month_name);								// Month 			 : January	
		// console.log("Year  			 : " + year);									// Year  			 : 2016
		// console.log(month + " has " + number_of_days_month + " days");				// 0 has 31 days
		// console.log("Last day of the month : " + number_of_days_month);				// Last day of the month : 31
		// 01/0/2016 falls on a 5
	}

	var bindClicks = function() {
		$('li', $picker).click(function(){
			$element.val(year + '/' + parseInt(month + 1) + '/'+ $(this).text());
			// draw next month.text()
		});
		$('.wn_prev_month', $picker).click(function(){
			drawMonth(2015, 11);
		});
		$('.wn_next_month', $picker).click(function(){
			drawMonth(2016, 1);
		});
	}


	var printEmptyDays = function(element, index, value, year, month) {
		$('.wn_week_line.time_stamp_' + year + '_' + month, $picker).prepend(element);
	}

	var getFirstDay = function(year, month){
		return new Date(year, month, 1).getDay();
	}

	// end of Get week names using locale settings

	var drawMonth = function(year, month){	


		displayInfo();
		$picker = $('<div class="wn_datepicker"/>');
		$picker.append(addHeader(year, month));
		$picker.append(findWeekDays(year, month));
		$picker.append(drawDays(year, month));
		bindClicks($picker);
		$element.after($picker);

	}

	var addHeader = function(year, month){
		var day = new Date();
		day.setMonth(month);
		day.setYear(year);
		day.setDate(1);	
		var month_name = day.toLocaleString(locale, { month: "short" });
		return $('<div class="wn_datepicker_header time_stamp_' + year + '_' + month + '"><span class="wn_prev_month">&laquo;</span>' + month_name + ' ' + year + '<span class="wn_next_month">&raquo;</span></div>');
	}


	var findWeekDays = function(year, month){

		var $weeks = $('<ul class="wn_weekDays_line time_stamp_' + year + '_' + month +'"/>');
		var newDate = new Date();
		var weekDays = [];

		while(newDate.getDay() > 0) {
			newDate.setDate(newDate.getDate() + 1);
		}

		while(weekDays.length < 7) {
		    weekDays.push(newDate.toLocaleString(locale, {weekday: 'short'}));
		    newDate.setDate(newDate.getDate() + 1);
		}

		for(var i = 0; i < 7; i++) {		
			$weeks.append('<li>' + weekDays[i] + '</li>');
		}

		return $weeks;

	}

	var drawDays = function(year, month) {

		var $days = $('<ul class="wn_week_line time_stamp_' + year + '_' + month +'"/>');
		var selectedDay 	= date.getDate();
		var selectedMonth 	= date.getMonth();
		var selectedYear 	= date.getFullYear();
		var first_day_month = getFirstDay(year, month);


		if (selectedMonth === 0) {
			var previousMonth = selectedMonth + 11;
			var previousYear  = date.getFullYear();
			console.log('Previous month is : ' + previousMonth);
		}


		var number_of_days_month = new Date(year, month + 1, 0).getDate();
		var day = 1;
		var $wn_day_box = [];

		for(var i = 0; i < 42; i++) {
			if (i < first_day_month) {
				$days.append('<li class="empty">' +'</li>');

			} else if (day <= number_of_days_month) { 
				if (year === selectedYear && month === selectedMonth && day === selectedDay) {
					$days.append('<li class="today">' + day + '</li>');
					day++

				} else {
					$days.append('<li>' + day + '</li>');
					day++
				}
			} else {
				if(typeof y == 'undefined') var y = 0;
				$days.append('<li class="empty">' + ++y + '</li>');
			}
		}

		return $days;
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
	this.hide = function(){
		//...
	}

	var __construct = function(){
		drawMonth(2016, 0);
	}();
}
//initiate object


$(document).ready(function(){

$('.wn_calendar').each(function(ix, val){
	window['datepicker' + ix] = new Datepicker(this);
})

});

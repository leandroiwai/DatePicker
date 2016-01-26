'use strict'

var Datepicker = function(element, config){

	this.format = 'fullCalendar';
	this.startDate = '01-01-2016';
	this.endDate = '31-12-2016';

	//some variables
	var date = new Date();
	var month = date.getMonth();
	var locale;
	var year = date.getFullYear();
	var $picker;
	var $element = $(element);

	var mydatepicker = this;
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

	var getMonthFromString = function(month_shortname){
	   return new Date(Date.parse(month_shortname +" 1, 2012")).getMonth();
	}

	var bindClicks = function(el, year, month) {
		var previous_month;
		var previous_year = year;
		var next_month;
		var next_year = year;


		$('.wn_week_line li:not(.empty)', $picker).click(function(){
			var set_date = new Date(year, parseInt(month), $(this).text());
			var set_date_locale = set_date.toLocaleDateString(locale)
			$element.val(set_date_locale);

			$(this).addClass('select');
			$('li:not(.empty)').not(this).removeClass('select');
			// draw next month.text()
		});

		$('.wn_month_line li', $picker).click(function(){
			var date = new Date();
			var set_month = $(this).attr('data-month');
			var set_year = $(this).attr('data-year');
			$element.val(parseInt(set_month) + 1 + '/' + set_year);
			$(this).addClass('select');
			$('li:not(.empty)').not(this).removeClass('select');


			// change value on select element
			$('.select_month option[value="'+ set_month +'"]').attr('selected', 'selected');
		});


		$('.wn_prev_month', $picker).click(function(){

			if (month === 0) {
				previous_month = 11;
				previous_year = previous_year - 1;			
			} else {
				previous_month = month - 1;
			}
			drawMonth(previous_year, previous_month)
		
		});
		$('.wn_next_month', $picker).click(function(){
			if (month === 11) {
				next_month = 0;
				next_year = next_year + 1;
			} else {
				next_month = month + 1;
			}
			drawMonth(next_year, next_month);
		});

		if (mydatepicker.format != 'fullCalendar') {
			$('.select_month', $picker).on('change', function(){
				var month_select = this.value;
				$('.wn_month_line li').removeClass('select');
				$('.wn_month_line li[data-month="'+ this.value +'"]').addClass('select');
			});
		} else {
			$('.select_month', $picker).on('change', function(){
				var month_select = this.value;
				drawMonth(year, getMonthFromString(month_select));
			});
		}

		$('.select_year', $picker).on('change', function(){
			var year_select = this.value;
			drawMonth(year_select, month);
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
		$element.next('.wn_datepicker').remove();
		displayInfo();
		$picker = $('<div class="wn_datepicker"/>');
		$picker.append(addHeader(year, month));
		$picker.append(addSelect(year, month));
		if (mydatepicker.format != 'fullCalendar') {
			$picker.append(drawMonthGrid(year, month));
		} else {
			$picker.append(findWeekDays(year, month));
			$picker.append(drawDays(year, month));
		}

		bindClicks($picker, year, month);
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

	var addSelect = function(year, month){
		var $select_div = $('<div class="wn_datepicker_select" />');
		var $select_month = $('<select class="select_month"/>');
		var $select_year = $('<select class="select_year"/>');

		// add month selector 
		var newDate = new Date();
		var monthsNames = [];
		$select_div.append($select_month);

		while(newDate.getMonth() > 0) {
			newDate.setMonth(newDate.getMonth() + 1);
		}

		while(monthsNames.length < 12) {
		    monthsNames.push(newDate.toLocaleString(locale, {month: 'short'}));
		    newDate.setMonth(newDate.getMonth() + 1);
		}

		for(var i = 0; i < 12; i++) {
			if (i == month) {
				$select_month.append('<option value="' + i +'" selected="selected">' + monthsNames[i] + '</option>');
			} else {
				$select_month.append('<option value="' + i +'">' + monthsNames[i] + '</option>');
			}
		}

		// add year selector 
		var day_year = new Date();
		var year_set = day_year.getFullYear();
		var year_future = year_set + 10;
		$select_div.append($select_year);

		for(var i = year_set; i <= year_future; i++) {
			if (i == year) {
				$select_year.append('<option value="' + i + '" selected="selected">' + i + '</option>');	
			} else {
				$select_year.append('<option value="' + i + '">' + i + '</option>');	
			}
			
		}

		return $select_div;
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

		var previousMonth;
		var previousYear;
		var previousDate;

		if (selectedMonth === 0) {
			previousMonth = 11;
			previousYear  = selectedYear - 1;
			previousDate = previousYear + '/' + previousMonth;
		} else {
			previousMonth = selectedMonth - 1;
			previousYear  = selectedYear;
		}

		var number_of_days_previous_month = new Date(previousYear, previousMonth + 1, 0).getDate();

		var number_of_days_month = new Date(year, month + 1, 0).getDate();

		var day = 1;
		var $wn_day_box = [];
		var last_month_days;
		last_month_days = number_of_days_previous_month - (first_day_month - 1);
		for(var i = 0; i < 42; i++) {
			if (i < first_day_month) {
				
				$days.append('<li class="empty">' + last_month_days + '</li>');
				last_month_days++;

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

	var drawMonthGrid = function(year, month) {

		var $months = $('<ul class="wn_month_line"/>');


		for(var i = 0; i < 12; i++) {
			var $reset_year = new Date(1, (i + 1), 1);
			$months.append('<li class="monthsGrid" data-month="' + i + '" data-year="' + year + '">' + $reset_year.toLocaleString(locale, {month: 'short'}) + '</li>');

		}

		return $months;
	}


	var __construct = function(that){
		if(typeof config != 'undefined'){
			for(var x in config){
				that[x] = config[x];
			}
		}

		// IE
		if (navigator.browserLanguage) {
		    locale = navigator.browserLanguage;
		}
		// All other vendors
		else if (navigator.language) {
			locale = navigator.language;
		}
		// Test Only
		locale = "pl-pl"

		drawMonth(year, month);
	}(this);
}
//initiate object


$(document).ready(function(){
	window['testpicker'] = new Datepicker('.wn_calendar', {
		format: 'fullCalendar',
		startDate: '20-12-2016',
		endDate : '10-10-2010'
	});
	window['testpicker'] = new Datepicker('.wn_calendar2', {
		format: 'month-year-calendar',
		startDate: 'today',
		endDate : '10-10-2010'
	});

});
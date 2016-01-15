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

		document.write('<ul>');
		for(var i = 0; i < 7; i++) {
			
			document.write('<li>' + weekDays[i] + '</li>');

		}
		document.write('</ul>');
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
		document.write('<div class="wn_datepicker">');
		document.write('<div class="wn_datepicker_header">' + month_name + ' ' + year + '</div>');
		findWeekDays();
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

		var day = 1;

		for(var i = 0; i < 42; i++) {
			if ((i % 7) === 0) {
				document.write('</ul><ul>');
			}
			if (i < first_day_month) {
				document.write('<li class="empty">&nbsp;</li>');
			} else if (day <= number_of_days_month) { 
				if (year === selectedYear && month === selectedMonth && day === selectedDay) {
					document.write('<li class="select">' + day + '</li>');
					day++
				} else {
					document.write('<li>' + day + '</li>');
					day++
				}
			} else {
				document.write('<li class="empty">&nbsp;</li>');
			}
		}
		document.write('</ul></div>');
		displayInfo();
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
		drawMonth(2016, 0)
		drawMonth(2016, 1)
		drawMonth(2016, 2)
	}();
}
//initiate object
var datepicker1 = new Datepicker('element-selector');

$(document).ready(function(){
	$('.wn_datepicker li').click(function(){
		$(this).addClass('select');
		$('.wn_datepicker li').not( $(this) ).removeClass('select');
		var selectedDate = $(this).text();
		console.log(selectedDate);
	})
});



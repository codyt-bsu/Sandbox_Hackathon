class Event {
    constructor(name, description, timeDate){
        this.name = name;
        this.description = description;
        this.timeAndDate = timeDate;
    }
}

class TimeAndDate {
    constructor(hours, minutes, day, month, year){
        this.hours = hours;
        this.minutes = minutes;
        this.day = day;
        this.month = month;
        this.year = year;
    }
}

class CalendarFeed {
    constructor(){
        this.events = [];
    }

}

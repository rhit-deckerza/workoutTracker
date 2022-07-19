function weekDay(id, weekDay, date){
        return (
            <span id={id}>
                <span>
                    {weekDay}
                </span>
                <span>
                    {date}
                </span>
                <span class="myLine">
                    
                </span>
            </span>
        );
        }

function header(username){
    return (
        <header>
            <div>Title</div>
            <div id="usernameHeader">{username}</div>
        </header>
    );
}

function buttons(){
    return (
        <div id="but">
            <button id="viewStats">View Full Stats</button>
            <button id="viewArchive">Workout Archive</button>
            <button id="logWorkout">Log/Create New Workout</button>
        </div>
    );
}

function info (days, hours){
    return (
        <div id="info">
            <p id="infoWelcome">Welcome Username</p>
            <p id="infoCompleted">you have completed <h1>{days}</h1> workouts in the past <h1>7</h1> days</p>
            <p id="infoSpent">and have spent <h1>{hours}</h1> hours in the gym in the last <h1>30</h1> days.</p>
        </div>
    );
}

class Cal extends React.Component{
    constructor(props){
        super(props);
        this.weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.d = new Date();
    }

    calDay(index){
        let day = this.d.getDay();
        day = day - index;
        if (day < 0){
            day = day + 7
        }
        return day
    }

    calDate(index){
        let date = this.d.getDate();
        date = date - index;
        if (date < 1){
            if (this.d.getMonth() == 0 || this.d.getMonth() == 1 || this.d.getMonth() == 3 || this.d.getMonth() == 5 || this.d.getMonth() == 7 || this.d.getMonth() == 8 || this.d.getMonth() == 10){
                date = date + 31;
            }else{
                date = date + 30;
            }
        }
        let dateString = date.toString();
        if (date.toString().slice(-1) < 4 && date != 11 && date != 12 && date != 13){
            switch(date.toString().slice(-1)){
                case "1":
                    dateString = dateString + "st";
                case "2":
                    dateString = dateString + "nd";
                case "3":
                    dateString = dateString + "rd";
            }
            return dateString;
        }else{
            return dateString + "th"
        }
    }

    render(){
        console.log(this.calDay(6));
        return(<div id="cal">
            {weekDay("oneCal", this.weekDays[this.calDay(6)], this.calDate(6))}
            {weekDay("twoCal", this.weekDays[this.calDay(5)],this.calDate(5))}
            {weekDay("threeCal", this.weekDays[this.calDay(4)], this.calDate(4))}
            {weekDay("fourCal", this.weekDays[this.calDay(3)], this.calDate(3))}
            {weekDay("fiveCal", this.weekDays[this.calDay(2)], this.calDate(2))}
            {weekDay("sixCal", this.weekDays[this.calDay(1)], this.calDate(1))}
            {weekDay("sevenCal", this.weekDays[this.calDay(0)], this.calDate(0))}
        </div>)
    }

}

class HomePage extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                {header("Username")}
                {info("100", "130")}
                {buttons()}
                <Cal></Cal> 
            </div>
        )
    }
}

const root = ReactDOM.createRoot(
    document.querySelector("root"));
root.render(<HomePage></HomePage>);
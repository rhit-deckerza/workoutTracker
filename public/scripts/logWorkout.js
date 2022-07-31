const FB_WORKOUTS_COLLECTION_KEY = "Workouts"
function workoutHeader(title, date, time, updateTitleFunction, updateDateMonthFunction, updateDateDayFunction, updateDateYearFunction, updateTimeFunction){
    return(
        <div id="workoutHeader">
            <input value={title} id="workoutHeaderTitle" onChange={e => {updateTitleFunction(e.target.value)}}></input>
            <span>
                <input value={date.month} onChange={e => {updateDateMonthFunction(e.target.value)}}>
                </input>
                <span>
                    {"/"}
                </span>
                <input value={date.day} onChange={e => {updateDateDayFunction(e.target.value)}}>
                    
                </input>
                <span>
                    {"/"}
                </span>
                <input id="yearboy" value={date.year} onChange={e => {updateDateYearFunction(e.target.value)}}>
                    
                </input>
            </span>
            <span>
                <input value={time.hour1} onChange={e => {updateTimeFunction(e.target.value, 0)}}>
                </input>
                <span>
                    {":"}
                </span>
                <input value={time.min1} onChange={e => {updateTimeFunction(e.target.value, 1)}}>
                </input>
                <input value={time.meridiem1} onChange={e => {updateTimeFunction(e.target.value, 2)}}>
                    
                </input>
                <span>
                    {"-"}
                </span>
                <input value={time.hour2} onChange={e => {updateTimeFunction(e.target.value, 3)}}>
                    
                </input>
                <span>
                    {":"}
                </span>
                <input value={time.min2} onChange={e => {updateTimeFunction(e.target.value, 4)}}>
                    
                </input>
                <input value={time.meridiem2} onChange={e => {updateTimeFunction(e.target.value, 5)}}>
                    
                </input>
            </span>
        </div>
    )
}

function workoutButtons(){
    return(
        <div id="workoutButtons">
            <button id="saveTemplateButton">
                Save as template
            </button>
            <button id="logWorkoutWorkout">
                Log workout
            </button>
        </div>
    )
}

function selectExercise(){
    return(
        <div id="selectExerciseContainer">

        </div>
    )
}




class WorkoutContainer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: "",
            date: {
                month: "",
                day: "",
                year: ""
            },
            time: {
                hour1: "",
                min1: "",
                meridiem1: "",
                hour2: "",
                min2: "",
                meridiem2: "",
            }
        }
        this._pullFromFirestore();
    }

    _pullFromFirestore(){
        firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_WORKOUTS_COLLECTION_KEY).doc("logging").get().then((doc) => {
            if (doc.exists){
                this.setState({
                    title: doc.data().title,
                    date: doc.data().date,
                    time: doc.data().time
                })
            }else{
                this.setState({
                    title: "My Workout",
                    date: this._getDate(),
                    time: this._getTime()
                }, this._createInFirestore)
            }
        });
    }

    _createInFirestore(){
        console.log(this.state);
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_WORKOUTS_COLLECTION_KEY).doc("logging").set({
            title: this.state.title,
            date: this.state.date,
            time: this.state.time
        })
    }

    _getDate(){
        let date = new Date
        date = date.toLocaleDateString()
        let dates = date.split("/")
        let output = {
            month: dates[0],
            day: dates[1],
            year: dates[2]
        }
        return output
    }

    _getTime(){ //I am aware how redarded this method is feel free to make it less retarded
        let time = new Date
        time = time.toLocaleTimeString();
        let secondTime = parseInt(time.slice(0,-9)) + 1
        let amOrPm = time.slice(8,10)
        let fulltime = ""
        console.log(time);
        console.log(amOrPm);
        if (amOrPm == "PM"){
            if (secondTime > 11){
                secondTime = 12
                secondTime = secondTime.toString() + ":00AM"
            }else{
                secondTime = secondTime.toString() + ":00PM"
            }
            fulltime = time.slice(0, -8)  + "00PM-" + secondTime;
        }else{
            if (secondTime > 11){
                secondTime = 12
                secondTime = secondTime.toString() + ":00PM"
            }else{
                secondTime = secondTime.toString() + ":00AM"
            }
            fulltime = time.slice(0, -8)  + "00AM-" + secondTime;
        }
        let times = fulltime.split(":")
        let output = {
            hour1: times[0],
            min1: "00",
            meridiem1: times[1].substring(2, 4),
            hour2: times[1][5],
            min2: "00",
            meridiem2: times[2].substring(2),
        }
        return output
    }

    _updateTitle(newValue){ 
        if (newValue.length < 14){
            let newDate = this.state.date
            let newTime = this.state.time
            this.setState({
                title: newValue,
                date: newDate,
                time: newTime
            }, this._createInFirestore)
        }
    }

    _updateDateMonth(newValue){ 
        if (newValue.length < 3){
            let newtitle = this.state.title
            let newDate = this.state.date
            newDate.month = newValue;
            let newTime = this.state.time
            this.setState({
                title: newtitle,
                date: newDate,
                time: newTime
            }, this._createInFirestore)
        }
    }

    _updateDateDay(newValue){ 
        if (newValue.length < 3){
            let newtitle = this.state.title
            let newDate = this.state.date
            newDate.day = newValue;
            let newTime = this.state.time
            this.setState({
                title: newtitle,
                date: newDate,
                time: newTime
            }, this._createInFirestore)
        }
    }

    _updateDateYear(newValue){
        if (newValue.length < 5){
            let newtitle = this.state.title
            let newDate = this.state.date
            newDate.year = newValue;
            let newTime = this.state.time
            this.setState({
                title: newtitle,
                date: newDate,
                time: newTime
            }, this._createInFirestore)
        }
    }

    _updateTime(newValue, position){
        if (newValue.length < 3){
            let newtitle = this.state.title
            let newDate = this.state.date
            let newTime = this.state.time
            switch(position){
                case 0:
                    newTime.hour1 = newValue;
                    break;
                case 1:
                    newTime.min1 = newValue;
                    break;
                case 2:
                    newTime.meridiem1 = newValue;
                    break;
                case 3:
                    newTime.hour2 = newValue;
                    break;
                case 4:
                    newTime.min2 = newValue;
                    break;
                case 5:
                    newTime.meridiem2 = newValue;
                    break;
            }
            
            this.setState({
                title: newtitle,
                date: newDate,
                time: newTime
            }, this._createInFirestore)
        }
    }
    

    render(){
        return(
            <div className="WorkoutContainer">
                {workoutHeader(this.state.title, this.state.date, this.state.time, this._updateTitle.bind(this), this._updateDateMonth.bind(this), this._updateDateDay.bind(this), this._updateDateYear.bind(this), this._updateTime.bind(this))}
                {workoutButtons()}
            </div>
        )
    }
}


class LogWorkoutPage extends React.Component{
    render(){
        return(
            <div className="LogWorkoutPage">
                {header(currUser.getUsername(), currUser.logout, currUser.getImgRef())}
                <WorkoutContainer></WorkoutContainer>
                {selectExercise()}
            </div>
        )
    }
}
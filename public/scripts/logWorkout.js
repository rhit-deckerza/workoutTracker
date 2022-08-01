const FB_WORKOUTS_COLLECTION_KEY = "Workouts"

function workoutHeader(title, date, time, updateTitleFunction, updateDateMonthFunction, updateDateDayFunction, updateDateYearFunction, updateTimeFunction){
    return(
        <div id="workoutHeader">
            <input value={title} id="workoutHeaderTitle" onChange={e => {updateTitleFunction(e.target)}}></input>
            <span>
                <input id="workoutHeaderDateMonth" value={date.month} onChange={e => {updateDateMonthFunction(e.target)}}>
                </input>
                <span>
                    {"/"}
                </span>
                <input id="workoutHeaderDateDay" value={date.day} onChange={e => {updateDateDayFunction(e.target)}}>
                </input>
                <span>
                    {"/"}
                </span>
                <input id="workoutHeaderDateYear" value={date.year} onChange={e => {updateDateYearFunction(e.target)}}>
                </input>
            </span>
            <span>
                <input id="workoutHeaderTimeHr1" value={time.hour1} onChange={e => {updateTimeFunction(e.target, 0)}}>
                </input>
                <span>
                    {":"}
                </span>
                <input id="workoutHeaderTimeMin1" value={time.min1} onChange={e => {updateTimeFunction(e.target, 1)}}>
                </input>
                <input id="workoutHeaderTimeMer1" value={time.meridiem1} onChange={e => {updateTimeFunction(e.target, 2)}}>
                    
                </input>
                <span>
                    {"-"}
                </span>
                <input id="workoutHeaderTimeHr2" value={time.hour2} onChange={e => {updateTimeFunction(e.target, 3)}}>
                    
                </input>
                <span>
                    {":"}
                </span>
                <input id="workoutHeaderTimeMin2" value={time.min2} onChange={e => {updateTimeFunction(e.target, 4)}}>
                    
                </input>
                <input id="workoutHeaderTimeMer2" value={time.meridiem2} onChange={e => {updateTimeFunction(e.target, 5)}}>
                    
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
                }, this._initElements)
            }else{
                this.setState({
                    title: "My Workout",
                    date: this._getDate(),
                    time: this._getTime()
                }, () =>{
                    this._createInFirestore();
                    this._initElements();
                })
            }
        })
    }

    _createInFirestore(){
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

    _updateTitle(target){ 
        let newValue = target.value.trim()
        if (newValue.length < 20){
            target.style.width =  ((target.value.length + 1) * 18) + 'px'
            let newDate = this.state.date
            let newTime = this.state.time
            this.setState({
                title: newValue,
                date: newDate,
                time: newTime
            }, this._createInFirestore)
        }
    }

    _updateDateMonth(target){ 
        let newValue = target.value.trim()
        if (newValue.length < 3){
            target.style.width =  ((target.value.length + 1) * 14) + 'px'
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

    _updateDateDay(target){ 
        let newValue = target.value.trim()
        if (newValue.length < 3){
            target.style.width =  ((target.value.length + 1) * 14) + 'px'
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

    _updateDateYear(target){
        let newValue = target.value.trim()
        if (newValue.length < 5){
            target.style.width =  ((target.value.length + 1) * 17) + 'px'
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

    _updateTime(target, position){
        let newValue = target.value.trim()
        if (newValue.length < 3){
            let newtitle = this.state.title
            let newDate = this.state.date
            let newTime = this.state.time
            switch(position){
                case 0:
                    newTime.hour1 = newValue;
                    target.style.width =  ((target.value.length + 1) * 14) + 'px'
                    break;
                case 1:
                    newTime.min1 = newValue;
                    target.style.width =  ((target.value.length + 1) * 14) + 'px'
                    break;
                case 2:
                    newTime.meridiem1 = newValue;
                    target.style.width =  ((target.value.length + 1) * 18) + 'px'
                    break;
                case 3:
                    newTime.hour2 = newValue;
                    target.style.width =  ((target.value.length + 1) * 14) + 'px'
                    break;
                case 4:
                    newTime.min2 = newValue;
                    target.style.width =  ((target.value.length + 1) * 14) + 'px'
                    break;
                case 5:
                    newTime.meridiem2 = newValue;
                    target.style.width =  ((target.value.length + 1) * 18) + 'px'
                    break;
            }
            this.setState({
                title: newtitle,
                date: newDate,
                time: newTime
            }, this._createInFirestore)
        }
    }

    _initElements(){
        document.getElementById("workoutHeaderTitle").style.width =  ((this.state.title.length + 1) * 18) + 'px'
        document.getElementById("workoutHeaderDateDay").style.width =  ((this.state.date.day.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderDateMonth").style.width =  ((this.state.date.month.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderDateYear").style.width =  ((this.state.date.year.length + 1) * 17) + 'px'
        document.getElementById("workoutHeaderTimeHr1").style.width =  ((this.state.time.hour1.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMin1").style.width =  ((this.state.time.min1.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMer1").style.width =  ((this.state.time.meridiem1.length + 1) * 18) + 'px'
        document.getElementById("workoutHeaderTimeHr2").style.width =  ((this.state.time.hour2.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMin2").style.width =  ((this.state.time.min2.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMer2").style.width =  ((this.state.time.meridiem2.length + 1) * 18) + 'px'

        document.getElementById("workoutHeaderDateDay").addEventListener('blur', (event) => {
            if (isNaN(parseInt(event.target.value)) || (parseInt(event.target.value) > 31 || parseInt(event.target.value) < 1)){
                event.target.value = "1";
                this._updateDateDay(event.target)
            }
        }, true);

        document.getElementById("workoutHeaderDateMonth").addEventListener('blur', (event) => {
            if (isNaN(parseInt(event.target.value)) || (parseInt(event.target.value) > 12 || parseInt(event.target.value) < 1)){
                event.target.value = "1";
                this._updateDateMonth(event.target)
            }
        }, true);

        document.getElementById("workoutHeaderDateYear").addEventListener('blur', (event) => {
            if (isNaN(parseInt(event.target.value)) || (parseInt(event.target.value) > 2100 || parseInt(event.target.value) < 2000)){
                event.target.value = "2022";
                this._updateDateYear(event.target)
            }
        }, true);

        document.getElementById("workoutHeaderTimeHr1").addEventListener('blur', (event) => {
            if (isNaN(parseInt(event.target.value)) || (parseInt(event.target.value) > 12 || parseInt(event.target.value) < 1)){
                event.target.value = "12";
                this._updateTime(event.target, 0)
            }
        }, true);

        document.getElementById("workoutHeaderTimeMin1").addEventListener('blur', (event) => {
            if (isNaN(parseInt(event.target.value)) || (parseInt(event.target.value) > 60 || parseInt(event.target.value) < 0 || event.target.value.length < 2)){
                event.target.value = "00";
                this._updateTime(event.target, 1)
            }
        }, true);

        document.getElementById("workoutHeaderTimeMer1").addEventListener('blur', (event) => {
            if (event.target.value != "AM" && event.target.value != "PM"){
                event.target.value = "AM";
                this._updateTime(event.target, 2)
            }
        }, true);

        document.getElementById("workoutHeaderTimeHr2").addEventListener('blur', (event) => {
            if (isNaN(parseInt(event.target.value)) || (parseInt(event.target.value) > 12 || parseInt(event.target.value) < 1)){
                event.target.value = "12";
                this._updateTime(event.target, 3)
            }
        }, true);

        document.getElementById("workoutHeaderTimeMin2").addEventListener('blur', (event) => {
            if (isNaN(parseInt(event.target.value)) || (parseInt(event.target.value) > 60 || parseInt(event.target.value) < 0 || event.target.value.length < 2)){
                event.target.value = "00";
                this._updateTime(event.target, 4)
            }
        }, true);
        
        document.getElementById("workoutHeaderTimeMer2").addEventListener('blur', (event) => {
            if (event.target.value != "AM" && event.target.value != "PM"){
                event.target.value = "AM";
                this._updateTime(event.target, 5)
            }
        }, true);
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
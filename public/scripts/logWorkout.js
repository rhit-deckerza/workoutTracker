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

function set(set, amountUnit, loadUnit, number, last, exerciseIndex, removeSetFunction, changeAmountFunction, changeLoadFunction){
    if (last){
        return(
            <div class="logExpansionLast">
                        <span class="exerExpandSetLast">
                            {"Set " + number + ":"}
                        </span>
                        <span class="exerExpandRepsLast">
                        <input class="autosize" value={set.amount} onChange={(e) => {changeAmountFunction(e.target, exerciseIndex, (number - 1))}}></input>
                        {amountUnit}
                        &nbsp;@&nbsp;
                        <input class="autosize" value={set.load} onChange={(e) => {changeLoadFunction(e.target, exerciseIndex, (number - 1))}}></input>
                        {loadUnit}
                        </span>
                        <img id="logDownArrow" src="images/redMinus.png" onClick={() => {removeSetFunction()}}></img>
                    </div>
        )
    }else{
        return (<div class="logExpansion">
                    <span class="exerExpandSet">
                        {"Set " + number + ":"}
                    </span>
                    <span class="exerExpandReps">
                        <input class="autosize" value={set.amount} onChange={(e) => {changeAmountFunction(e.target, exerciseIndex, (number - 1))}}></input>
                        {amountUnit}
                        &nbsp;@&nbsp;
                        <input  class="autosize" value={set.load} onChange={(e) => {changeLoadFunction(e.target, exerciseIndex, (number - 1))}}></input>
                        {loadUnit}
                    </span>
                </div>)
    }
}

class Exercise extends React.Component{
    render(){
    let exercise = this.props.exercise
    let expanded = this.props.exercise.expanded
    let amountMin = exercise.sets[0].amount;
    let amountMax = exercise.sets[0].amount;
    let loadMin = exercise.sets[0].load;
    let loadMax = exercise.sets[0].load;
    let setElements = []
    for (let i = 0; i < exercise.sets.length; i++){
        if (parseInt(exercise.sets[i].amount) > parseInt(amountMax)){
            amountMax = exercise.sets[i].amount
        }
        if (parseInt(exercise.sets[i].amount) < parseInt(amountMin)){
            amountMin = exercise.sets[i].amount
        }
        if (parseInt(exercise.sets[i].load) > parseInt(loadMax)){
            loadMax = exercise.sets[i].load
        }
        if (parseInt(exercise.sets[i].load) < parseInt(loadMin)){
            loadMin = exercise.sets[i].load
        }
        setElements[i] = set(exercise.sets[i], exercise.amountUnit, exercise.loadUnit, (i + 1), (i == (exercise.sets.length - 1)), this.props.index, this.props.removeSetFunction, this.props.editAmountFunction, this.props.editLoadFunction);
    }
    const setElementsConst = setElements
    let loadRange = ""
    let amountRange = ""
    if (loadMin == loadMax){
        loadRange = loadMin.toString()
    }else{
        loadRange = loadMin.toString() + "-" + loadMax.toString()
    }
    if (amountMin == amountMax){
        amountRange = amountMax.toString()
    }else{
        amountRange = amountMin.toString() + "-" + amountMax.toString()
    }
    if (expanded){
        return(<div class="logExercise">
                    <div>
                        <span class="logExerciseName">
                            {exercise.name}
                        </span>
                        <span class="logExerciseSets">
                            {exercise.sets.length + " Sets"}
                        </span>
                        <span class="logExerciseReps">
                            {amountRange + " " + exercise.amountUnit + " @ " + loadRange + " " + exercise.loadUnit}
                        </span>
                        <img id="logDownArrow" src="images/upArrow.png" onClick={() => {this.props.expandExerciseFunction()}}></img>
                    </div>
                    {setElementsConst}
                    <div class="logExpansionAdd">
                        <span class="exerExpandSetAdd">
                            {"Set " + (exercise.sets.length + 1).toString() + ":"}
                        </span>
                        <span class="exerExpandRepsAdd">
                            {exercise.sets[(exercise.sets.length - 1)].amount + " " + exercise.amountUnit + " @ " + exercise.sets[(exercise.sets.length - 1)].load + " " + exercise.loadUnit}
                        </span>
                        <img id="logDownArrow" src="images/plus.png" onClick={() => {this.props.addSetFunction()}}></img>
                    </div>
                </div>)
    }else{
        return(
            <div class="logExercise">
                <div>
                    <span class="logExerciseName">
                        {exercise.name}
                    </span>
                    <span class="logExerciseSets">
                        {exercise.sets.length + " Sets"}
                    </span>
                    <span class="logExerciseReps">
                        {amountRange + " " + exercise.amountUnit + " @ " + loadRange + " " + exercise.loadUnit}
                    </span>
                    <img id="logDownArrow" src="images/downArrow.png" onClick={() => {this.props.expandExerciseFunction()}}></img>
                </div>
            </div>
        )
    }
    }
}

class ExerciseContainer extends React.Component{
    constructor(props){
        super(props)
    }
    
    render(){
        let exercises = []
        for (let i = 0; i < this.props.exercises.length; i++){
            exercises[i] = <Exercise 
                exercise={this.props.exercises[i]} 
                addSetFunction={() => {this.props.addSetFunction(i)}} 
                removeSetFunction={() => {this.props.removeSetFunction(i)}} 
                expandExerciseFunction={() => {this.props.expandExerciseFunction(i)}} 
                editAmountFunction={this.props.editAmountFunction}
                editLoadFunction={this.props.editLoadFunction}
                index={i}></Exercise>
        }
        const exercisesFinal = exercises
        return(
            <div className="ExerciseContainer">
                {exercisesFinal}
            </div>
        )
    }
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
            },
            exercises: []
        }
        this._pullFromFirestore();
    }

    _pullFromFirestore(){
        firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_WORKOUTS_COLLECTION_KEY).doc("logging").get().then((doc) => {
            if (doc.exists){
                this.setState({
                    title: doc.data().title,
                    date: doc.data().date,
                    time: doc.data().time,
                    exercises: doc.data().exercises
                }, this._initElements)
            }else{
                this.setState({
                    title: "My Workout",
                    date: this._getDate(),
                    time: this._getTime(),
                    exercises: []
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
            time: this.state.time,
            exercises: this.state.exercises
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
        let newValue = target.value;
        if (newValue.length < 20){
            target.style.width =  ((target.value.length + 1) * 19) + 'px'
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

    _addSet(exerciseIndex){
        let previousSet = this.state.exercises[exerciseIndex].sets[this.state.exercises[exerciseIndex].sets.length - 1]
        let newExercises = this.state.exercises
        newExercises[exerciseIndex].sets.push(previousSet)
        this.setState({
            exercises: newExercises
        }, () => {
            this._createInFirestore()
            this._initExpansion()
        })
    }

    _removeSet(exerciseIndex){
        let newExercises = this.state.exercises
        if (newExercises[exerciseIndex].sets.length != 1){
            newExercises[exerciseIndex].sets.pop()
            this.setState({
                exercises: newExercises
            }, this._createInFirestore)
        }
    }

    _changeAmount(target, exerciseIndex, setIndex){
        let newValue = target.value.trim()
        if (newValue.length < 5){
            target.style.width = ((target.value.length + 1) * 13) + 'px';
            let newExercises = this.state.exercises
            newExercises[exerciseIndex].sets[setIndex].amount = newValue;
            this.setState({
                exercises: newExercises
            },() =>{
                this._createInFirestore()
            })
        }
    }

    _changeLoad(target, exerciseIndex, setIndex){
        let newValue = target.value.trim()
        if (newValue.length < 5){
            target.style.width = ((target.value.length + 1) * 13) + 'px';
            let newExercises = this.state.exercises
            newExercises[exerciseIndex].sets[setIndex].load = newValue;
            this.setState({
                exercises: newExercises
            },() =>{
                this._createInFirestore()
            })
        }
    }

    _expandExercise(exerciseIndex){
        let newExercises = this.state.exercises
        newExercises[exerciseIndex].expanded = !newExercises[exerciseIndex].expanded
        this.setState({
            exercises: newExercises
        }, () => {
            this._createInFirestore()
            this._initExpansion()
        })
    }

    _initExpansion(){
        let collection = document.getElementsByClassName("autosize");
        for (let i = 0; i < collection.length; i++){
            collection[i].style.width = ((collection[i].value.length + 1) * 13) + 'px'
        }
    }

    _initElements(){
        this._initExpansion();
        document.getElementById("workoutHeaderTitle").style.width =  ((this.state.title.length + 1) * 19) + 'px'
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
                <ExerciseContainer 
                exercises={this.state.exercises} 
                addSetFunction={this._addSet.bind(this)} 
                removeSetFunction={this._removeSet.bind(this)} 
                expandExerciseFunction={this._expandExercise.bind(this)} 
                editAmountFunction={this._changeAmount.bind(this)}
                editLoadFunction={this._changeLoad.bind(this)}></ExerciseContainer>
                {workoutButtons()}
            </div>
        )
    }
}

class WorkoutSelector extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            currentExercise: '',
            exercises: []
        }
        this._pullFromFirestore();
    }

    exerciseButton(name, type){
        return(
            <button class={type}>
                {name}
            </button>
        )
    }

    _pullFromFirestore(){
        let exercises = []
        let arm = []
        let back = []
        let shoulder = []
        let chest = []
        let leg = []
        let core = []
            let ref = firebase.firestore().collection(FB_EXERCISES_COLLECTION_KEY)
                ref.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        switch(doc.data().type){
                            case "arm":
                                arm.push(this.exerciseButton(doc.id, doc.data().type))
                                break;
                            case "back":
                                back.push(this.exerciseButton(doc.id, doc.data().type))
                                break;
                            case "shoulder":
                                shoulder.push(this.exerciseButton(doc.id, doc.data().type))
                                break;
                            case "chest":
                                chest.push(this.exerciseButton(doc.id, doc.data().type))
                                break;
                            case "leg":
                                leg.push(this.exerciseButton(doc.id, doc.data().type))
                                break;
                            case "core":
                                core.push(this.exerciseButton(doc.id, doc.data().type))
                                break;
                        }
                    })
                    const exercisesFinal = exercises
                    this.setState({
                        exercises: exercisesFinal
                    })
                })
    }


    exerciseSelected() {
        this.setState({
            currentExercise: 'exercies'
        }, () => {
            console.log('exercise selected:', this.state.currentExercise)
        })
    }


    addExercise() {
        if (this.state.currentExercise != '') {
            this.setState({
                currentExercise: ''
            })
        }
    }

    render() {
                return (
                    <div id="selectExerciseContainer">
                        <div id="pickAnExercise">
                            <span>Pick an Exercise</span>
                            <br></br>
                            <div>
                            <label>Search: </label>
                            <input type="text"name="userInput"></input>
                            </div>
                        </div>
                        <div id="exercisesToPick">
                            {this.state.exercises}
                        </div>
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
                <WorkoutSelector></WorkoutSelector>
            </div>
        )
    }
}
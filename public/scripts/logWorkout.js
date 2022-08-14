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
                        <span class={"logExerciseName" + exercise.type}>
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
                    <div id="removeButtonContainer"><button id="removeExerciseButton" onClick={() => {this.props.removeExerciseFunction(this.props.index)}}>REMOVE</button></div>
                </div>)
    }else{
        return(
            <div class="logExercise">
                <div>
                    <span class={"logExerciseName" + exercise.type}>
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
                removeExerciseFunction={this.props.removeExerciseFunction}
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
    }
    
    render(){
        return(
            <div className="WorkoutContainer">
                {workoutHeader(
                    this.props.data.title,
                     this.props.data.date,
                      this.props.data.time,
                       this.props.updateTitleFunction,
                       this.props.updateDateMonthFunction,
                       this.props.updateDateDayFunction,
                       this.props.updateDateYearFunction,
                       this.props.updateTimeFunction)}
                <ExerciseContainer 
                exercises={this.props.data.exercises} 
                addSetFunction={this.props.addSetFunction} 
                removeSetFunction={this.props.removeSetFunction} 
                expandExerciseFunction={this.props.expandExerciseFunction} 
                editAmountFunction={this.props.editAmountFunction}
                editLoadFunction={this.props.editLoadFunction}
                removeExerciseFunction={this.props.removeExerciseFunction}></ExerciseContainer>
                {workoutButtons()}
            </div>
        )
    }
}

class WorkoutSelector extends React.Component{
    constructor(props){
        super(props)
    }
    render() {
        let search = this.props.data.search.trim().toLocaleLowerCase()
        let exercies = []
        for (let i = 0; i < this.props.data.exercises.length; i++){
            if (this.props.data.exercises[i].name.toLocaleLowerCase().includes(search)){
                exercies.push(this.props.data.exercises[i].element)
            }
        }
        const exerciesFinal = exercies
                return (
                    <div id="selectExerciseContainer">
                        <div id="pickAnExercise">
                            <span>Pick an Exercise</span>
                            <br></br>
                            <div>
                            <label>Search: </label>
                            <input type="text"name="userInput"  onChange={(e) => {this.props.searchFunction(e.target)}}></input>
                            </div>
                        </div>
                        <div id="exercisesToPick">
                            {exerciesFinal}
                        </div>
                        <button onClick={() => {this.props.addExerciseFunction()}} id="addExercise">Add To Workout</button>
                    </div>
                )
    }
}


class LogWorkoutPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            workoutContainer: {
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
            },
            workoutSelector: {
                currentExercise: '',
                currentExerciseType: '',
                exercises: [],
                search: ''
            }
        }
        this._pullFromFirestore();
    }

    _pullFromFirestore(){
        //Workout Container
        firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_WORKOUTS_COLLECTION_KEY).doc("logging").get().then((doc) => {
            if (doc.exists){
                let newWorkoutContainer = this.state.workoutContainer
                newWorkoutContainer.title = doc.data().title
                newWorkoutContainer.date = doc.data().date
                newWorkoutContainer.time = doc.data().time
                newWorkoutContainer.exercises = doc.data().exercises
                this.setState({
                    workoutContainer: newWorkoutContainer
                }, this._initElements)
            }else{
                let newWorkoutContainer = this.state.workoutContainer
                newWorkoutContainer.title = "My Workout"
                newWorkoutContainer.date = this._getDate()
                newWorkoutContainer.time = this._getTime()
                newWorkoutContainer.exercises = []
                this.setState({
                    workoutContainer: newWorkoutContainer
                }, () =>{
                    this._createInFirestore();
                    this._initElements();
                })
            }
        })


        //Workout Selector
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
                                arm.push({
                                    element: this.exerciseButton(doc.id, doc.data().type),
                                name: doc.id})
                                break;
                            case "back":
                                back.push({element: this.exerciseButton(doc.id, doc.data().type),
                                name: doc.id})
                                break;
                            case "shoulder":
                                shoulder.push({element: this.exerciseButton(doc.id, doc.data().type),
                                name: doc.id})
                                break;
                            case "chest":
                                chest.push({element: this.exerciseButton(doc.id, doc.data().type),
                                name: doc.id})
                                break;
                            case "leg":
                                leg.push({element: this.exerciseButton(doc.id, doc.data().type),
                                name: doc.id})
                                break;
                            case "core":
                                core.push({element: this.exerciseButton(doc.id, doc.data().type),
                                name: doc.id})
                                break;
                        }
                    })
                    exercises.push.apply(exercises, arm)
                    exercises.push.apply(exercises, back)
                    exercises.push.apply(exercises, shoulder)
                    exercises.push.apply(exercises, chest)
                    exercises.push.apply(exercises, leg)
                    exercises.push.apply(exercises, core)
                    const exercisesFinal = exercises
                    let newWorkoutSelector = this.state.workoutSelector
                    newWorkoutSelector.exercises = exercisesFinal
                    this.setState({
                        workoutSelector: newWorkoutSelector
                    })
                })
    }

    _createInFirestore(){
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_WORKOUTS_COLLECTION_KEY).doc("logging").set({
            title: this.state.workoutContainer.title,
            date: this.state.workoutContainer.date,
            time: this.state.workoutContainer.time,
            exercises: this.state.workoutContainer.exercises
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
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.title = newValue
            this.setState({
                workoutContainer: newWorkoutContainer
            }, this._createInFirestore)
        }
    }

    _updateDateMonth(target){ 
        let newValue = target.value.trim()
        if (newValue.length < 3){
            target.style.width =  ((target.value.length + 1) * 14) + 'px'
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.date.month = newValue
            this.setState({
                workoutContainer: newWorkoutContainer
            }, this._createInFirestore)
        }
    }

    _updateDateDay(target){ 
        let newValue = target.value.trim()
        if (newValue.length < 3){
            target.style.width =  ((target.value.length + 1) * 14) + 'px'
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.date.day = newValue
            this.setState({
                workoutContainer: newWorkoutContainer
            }, this._createInFirestore)
        }
    }

    _updateDateYear(target){
        let newValue = target.value.trim()
        if (newValue.length < 5){
            target.style.width =  ((target.value.length + 1) * 17) + 'px'
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.date.year = newValue
            this.setState({
                workoutContainer: newWorkoutContainer
            }, this._createInFirestore)
        }
    }

    _updateTime(target, position){
        let newValue = target.value.trim()
        if (newValue.length < 3){
            let newTime = this.state.workoutContainer.time
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
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.time = newTime
            this.setState({
                workoutContainer: newWorkoutContainer
            }, this._createInFirestore)
        }
    }

    _addSet(exerciseIndex){
        let previousSet = this.state.workoutContainer.exercises[exerciseIndex].sets[this.state.workoutContainer.exercises[exerciseIndex].sets.length - 1]
        let newExercises = this.state.workoutContainer.exercises
        newExercises[exerciseIndex].sets.push(previousSet)
        let newWorkoutContainer = this.state.workoutContainer
        newWorkoutContainer.exercises = newExercises
        this.setState({
            workoutContainer: newWorkoutContainer
        }, () => {
            this._createInFirestore()
            this._initExpansion()
        })
    }

    _removeSet(exerciseIndex){
        let newExercises = this.state.workoutContainer.exercises
        if (newExercises[exerciseIndex].sets.length != 1){
            newExercises[exerciseIndex].sets.pop()
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.exercises = newExercises
            this.setState({
                workoutContainer: newWorkoutContainer
            }, this._createInFirestore)
        }
    }

    _changeAmount(target, exerciseIndex, setIndex){
        let newValue = target.value.trim()
        if (newValue.length == 0 || parseInt(newValue) == 0){
            newValue = "0"
        }
        newValue = parseInt(newValue).toString()
        if (newValue.length < 5 && !isNaN(newValue)){
            target.style.width = ((newValue.length + 1) * 13) + 'px';
            let newExercises = this.state.workoutContainer.exercises
            newExercises[exerciseIndex].sets[setIndex].amount = newValue;
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.exercises = newExercises
            this.setState({
                workoutContainer: newWorkoutContainer
            },() =>{
                this._createInFirestore()
            })
        }
    }

    _changeLoad(target, exerciseIndex, setIndex){
        let newValue = target.value.trim()
        if (newValue.length == 0 || parseInt(newValue) == 0){
            newValue = "0"
        }
        newValue = parseInt(newValue).toString()
        if (newValue.length < 5 && !isNaN(newValue)){
            target.style.width = ((newValue.length + 1) * 13) + 'px';
            let newExercises = this.state.workoutContainer.exercises
            newExercises[exerciseIndex].sets[setIndex].load = newValue;
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.exercises = newExercises
            this.setState({
                workoutContainer: newWorkoutContainer
            },() =>{
                this._createInFirestore()
            })
        }
    }

    _exerciseSelected(e) {
        if (document.getElementById("selectedExercise")){
            document.getElementById("selectedExercise").style.outline = "none"
            document.getElementById("selectedExercise").id = ""
        }
        console.log(this.state.workoutSelector.exercises);
        let value = e.target.innerHTML
        e.target.style.outline = "thick solid #1B8EF2"
        e.target.id = "selectedExercise"
        let newWorkoutSelector = this.state.workoutSelector
        newWorkoutSelector.currentExercise = value
        newWorkoutSelector.currentExerciseType = e.target.className
        this.setState({
            workoutSelector: newWorkoutSelector
        }, () => {
            document.getElementById("addExercise").style.color = "black"
            document.getElementById("addExercise").style.backgroundColor = "#1B8EF2"
        })
    }

    _expandExercise(exerciseIndex){
        let newExercises = this.state.workoutContainer.exercises
        newExercises[exerciseIndex].expanded = !newExercises[exerciseIndex].expanded
        let newWorkoutContainer = this.state.workoutContainer
        newWorkoutContainer.exercises = newExercises
        this.setState({
            workoutContainer: newWorkoutContainer
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
        document.getElementById("workoutHeaderTitle").style.width =  ((this.state.workoutContainer.title.length + 1) * 19) + 'px'
        document.getElementById("workoutHeaderDateDay").style.width =  ((this.state.workoutContainer.date.day.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderDateMonth").style.width =  ((this.state.workoutContainer.date.month.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderDateYear").style.width =  ((this.state.workoutContainer.date.year.length + 1) * 17) + 'px'
        document.getElementById("workoutHeaderTimeHr1").style.width =  ((this.state.workoutContainer.time.hour1.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMin1").style.width =  ((this.state.workoutContainer.time.min1.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMer1").style.width =  ((this.state.workoutContainer.time.meridiem1.length + 1) * 18) + 'px'
        document.getElementById("workoutHeaderTimeHr2").style.width =  ((this.state.workoutContainer.time.hour2.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMin2").style.width =  ((this.state.workoutContainer.time.min2.length + 1) * 14) + 'px'
        document.getElementById("workoutHeaderTimeMer2").style.width =  ((this.state.workoutContainer.time.meridiem2.length + 1) * 18) + 'px'

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

    exerciseButton(name, type){
        return(
            <button class={type} onClick={(e) => {this._exerciseSelected(e)}}>
                {name}
            </button>
        )
    }
    //Hasent been used yet
    _addExercise() {
        if (this.state.currentExercise != '') {
            let newWorkoutSelector = this.state.workoutSelector
            let exerciseToAdd = newWorkoutSelector.currentExercise
            let newWorkoutContainer = this.state.workoutContainer
            newWorkoutContainer.exercises.push({
                amountUnit: "reps",
                expanded: false,
                loadUnit: "lbs",
                name: exerciseToAdd,
                sets: [{
                    amount: "0",
                    load: "0"
                    }
                ],
                type: newWorkoutSelector.currentExerciseType
            })
            newWorkoutSelector.currentExercise = ''
            newWorkoutSelector.currentExerciseType = ''
            this.setState({
                workoutSelector: newWorkoutSelector,
                workoutContainer: newWorkoutContainer
            }, this._createInFirestore())
            if (document.getElementById("selectedExercise")){
                document.getElementById("selectedExercise").style.border = "none"
                document.getElementById("selectedExercise").id = ""
            }
            document.getElementById("addExercise").style.color = "lightgrey"
            document.getElementById("addExercise").style.backgroundColor = "white"
        }
    }

    _removeExercise(exerciseIndex){
        let newWorkoutContainer = this.state.workoutContainer
        newWorkoutContainer.exercises.splice(exerciseIndex, 1)
        this.setState({
            workoutContainer: newWorkoutContainer
        }, this._createInFirestore)
    }

    _search(target){
        let newValue = target.value;
        let newWorkoutSelector = this.state.workoutSelector
        newWorkoutSelector.search = newValue
        this.setState({
            workoutSelector: newWorkoutSelector
        })
    }
    
    
    render(){
        return(
            <div className="LogWorkoutPage">
                {header(currUser.getUsername(), currUser.logout, currUser.getImgRef())}
                <WorkoutContainer
                data={this.state.workoutContainer}
                updateTitleFunction={this._updateTitle.bind(this)}
                updateDateMonthFunction={this._updateDateMonth.bind(this)}
                updateDateDayFunction={this._updateDateDay.bind(this)}
                updateDateYearFunction={this._updateDateYear.bind(this)}
                updateTimeFunction={this._updateTime.bind(this)}
                addSetFunction={this._addSet.bind(this)}
                removeSetFunction={this._removeSet.bind(this)}
                expandExerciseFunction={this._expandExercise.bind(this)}
                editAmountFunction={this._changeAmount.bind(this)}
                editLoadFunction={this._changeLoad.bind(this)}
                removeExerciseFunction={this._removeExercise.bind(this)}></WorkoutContainer>
                <WorkoutSelector 
                data={this.state.workoutSelector} 
                searchFunction={this._search.bind(this)}
                addExerciseFunction={this._addExercise.bind(this)}></WorkoutSelector>
            </div>
        )
    }
}
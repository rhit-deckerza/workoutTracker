const FB_USERS_COLLECTION_KEY = "Users"
const FB_EXERCISES_COLLECTION_KEY = "Exercises"
const FB_NOTES_COLLECTION_KEY = "Notes"
const FB_WORKOUTS_COLLECTION_KEY = "Workouts"

function weekDay(id, weekDay, date, i){
    let calString = "calDiv" + i.toString()
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
                <div class="hourDay"></div>
                <div class="minDay"></div>
                <div id={calString}></div>
                <div id={id + "0"} class="weekdayTime"><span class="armBlock"></span> Arms</div>
                <div id={id + "1"} class="weekdayTime"><span class="coreBlock"></span> Core</div>
                <div id={id + "2"} class="weekdayTime"><span class="legBlock"></span> Legs</div>
                <div id={id + "3"} class="weekdayTime"><span class="shoulderBlock"></span> Shoulders</div>
                <div id={id + "4"} class="weekdayTime"><span class="chestBlock"></span> Chest</div>
                <div id={id + "5"} class="weekdayTime"><span class="backBlock"></span> Back</div>
            </span>
        );
}


function header(username, logOutFunction, imgRef, returnToHomepageFunction){
    if (username == null || username.length == 0){
        username = "Username"
    }
    return (
        <header>
            <div id="title" onClick={() => {returnToHomepageFunction()}}>Workout Tracker</div>
            <div id="usernameImgContainer">{username}<img id="userImg" src={imgRef}></img><img id="logoutImg" src="images/logout.jpg" onClick={() => {logOutFunction()}} title="LOGOUT"></img></div>
        </header>
    );
}

function returnToHomepage(){
    localStorage.setItem("page", "1")
    redirect();
}

function buttons(switchFunction, switchWords, logWorkoutFunction){
    return (
        <div id="but">
            <button id="viewStats">View Full Stats</button>
            <button id="viewArchive" onClick={() => {localStorage.setItem("page", "3"); redirect();}}>Workout Archive</button>
            <button id="logWorkout" onClick={() => {logWorkoutFunction()}}>Log/Create New Workout</button>
            <button id="switch" onClick={() => {switchFunction()}}>{switchWords}</button>
        </div>
    );
}

function info (username, days, hours){
    let workoutsLine = 'workouts'
    let hoursLine = 'hours'
    if (days == 1) {
        workoutsLine = 'workout'
    }
    if (hours == 1) {
        hoursLine = 'hour'
    }
    if (username == null || username.length == 0){
        username = "Username"
    }
    return (
            <div id="info">
                <p id="infoWelcome">Welcome {username}</p>
                <p id="infoCompleted">you have completed <h1>{days}</h1> {workoutsLine} in the past <h1>7</h1> days</p>
                <p id="infoSpent">and have spent <h1>{hours}</h1> {hoursLine} in the gym in the last <h1>30</h1> days.</p>
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

    checkLeapYear(year) {

        //three conditions to find out the leap year
        if ((0 == year % 4) && (0 != year % 100) || (0 == year % 400)) {
            return true
        } else {
            return false
        }
    }

    calDate(index){
        let date = this.d.getDate();
        date = date - index;
        if (date < 1){
            if (this.d.getMonth() == 0 || this.d.getMonth() == 1 || this.d.getMonth() == 3 || this.d.getMonth() == 5 || this.d.getMonth() == 7 || this.d.getMonth() == 8 || this.d.getMonth() == 10){
                date = date + 31;
            }else if(this.d.getMonth() == 2 && this.checkLeapYear(this.d.getFullYear)){
                date = date + 29
            }else if(this.d.getMonth() == 2){
                date = date + 28
            }else{
                date = date + 30;
            }
        }
        let dateString = date.toString();
        if (dateString.slice(-1) < 4 && date != 11 && date != 12 && date != 13){
            switch(date.toString().slice(-1)){
                case '0':
                    dateString = dateString + 'th';
                    break;
                case '1':
                    dateString = dateString + 'st';
                    break;
                case '2':
                    dateString = dateString + 'nd';
                    break;
                case '3':
                    dateString = dateString + 'rd';
                    break;
            }
            return dateString;
        }else{
            return dateString + 'th'
        }
    }


    componentDidMount(){
        
        // Load the Visualization API and the corechart package.
        google.charts.load('current', {'packages':['corechart']});
  
        // Set a callback to run when the Google Visualization API is loaded.
        google.charts.setOnLoadCallback(this.drawChart.bind(this));
  
        // Callback that creates and populates a data table,
        // instantiates the pie chart, passes in the data and
        // draws it.
    }
          
          
      drawChart(){
        let days = []
        for (let i = 0; i < 7; i++){
            days[i] = new google.visualization.DataTable();
            days[i].addColumn('string', 'Type');
            days[i].addColumn('number', 'Count');
        }
        let dates = []
        let j = 0
        for (let i = 6; i >= 0; i--){
            let date = this.d.getDate() - i
            if (date <= 0){
                if (this.d.getMonth() == 0 || this.d.getMonth() == 1 || this.d.getMonth() == 3 || this.d.getMonth() == 5 || this.d.getMonth() == 7 || this.d.getMonth() == 8 || this.d.getMonth() == 10){
                    date = date + 31;
                }else if(this.d.getMonth() == 2 && this.checkLeapYear(this.d.getFullYear().toString())){
                    date = date + 29
                }else if(this.d.getMonth() == 2){
                    date = date + 28
                }else{
                    date = date + 30;
                }
            }
            dates[j] = date.toString()
            j++;
        }
        let hours = [0, 0, 0, 0, 0, 0, 0]
        let min = [0, 0, 0, 0, 0, 0, 0]
        firebase.firestore()
        .collection(FB_USERS_COLLECTION_KEY)
        .doc(currUser.getUID())
        .collection(FB_WORKOUTS_COLLECTION_KEY)
        .where("date.day", "in", dates)
        .get().then((querySnapshot) => {
            let counts = []
                for (let i = 0; i < 7; i++){
                    counts[i] = {
                        core: 0,
                        leg: 0,
                        chest: 0,
                        shoulder: 0,
                        back: 0,
                        arm: 0
                    }
                }
            let month1 = (this.d.getMonth() + 1).toString()
            let month2 = (this.d.getMonth()).toString()
            if (month2 == "0"){
                month2 = "12"
            }
            let year1 = (this.d.getFullYear()).toString()
            let year2 = (this.d.getFullYear() - 1).toString()
            console.log(year1);
            console.log(year2);
            querySnapshot.forEach((doc) => {
                let hour1 = 0
                let hour2 = 0
                if (doc.id != "logging"){
                    if (doc.data().date.month == month1 || doc.data().date.month == month2){
                        if (doc.data().date.year == year1 || doc.data().date.year == year2){
                            switch(doc.data().date.day){
                                case dates[0]:
                                    for (let i = 0; i < doc.data().exercises.length; i++){
                                        counts[0][doc.data().exercises[i].type]++;
                                    }
                                    hour1 = parseInt(doc.data().time.hour1)
                                    hour2 = parseInt(doc.data().time.hour2)
                                    if (doc.data().time.meridiem1 == "PM"){
                                        hour1 += 12;
                                    }
                                    if (doc.data().time.meridiem2 == "PM"){
                                        hour2 += 12;
                                    }
                                    hours[0] += hour2 - hour1
                                    min[0] += parseInt(doc.data().time.min2) - parseInt(doc.data().time.min1)
                                    break
                                case dates[1]:
                                    for (let i = 0; i < doc.data().exercises.length; i++){
                                        counts[1][doc.data().exercises[i].type]++;
                                    }
                                    hour1 = parseInt(doc.data().time.hour1)
                                    hour2 = parseInt(doc.data().time.hour2)
                                    if (doc.data().time.meridiem1 == "PM"){
                                        hour1 += 12;
                                    }
                                    if (doc.data().time.meridiem2 == "PM"){
                                        hour2 += 12;
                                    }
                                    hours[1] += hour2 - hour1
                                    min[1] += parseInt(doc.data().time.min2) - parseInt(doc.data().time.min1)
                                    break
                                case dates[2]:
                                    for (let i = 0; i < doc.data().exercises.length; i++){
                                        counts[2][doc.data().exercises[i].type]++;
                                    }
                                    hour1 = parseInt(doc.data().time.hour1)
                                    hour2 = parseInt(doc.data().time.hour2)
                                    if (doc.data().time.meridiem1 == "PM"){
                                        hour1 += 12;
                                    }
                                    if (doc.data().time.meridiem2 == "PM"){
                                        hour2 += 12;
                                    }
                                    hours[2] += hour2 - hour1
                                    min[2] += parseInt(doc.data().time.min2) - parseInt(doc.data().time.min1)
                                    break
                                case dates[3]:
                                    for (let i = 0; i < doc.data().exercises.length; i++){
                                        counts[3][doc.data().exercises[i].type]++;
                                    }
                                    hour1 = parseInt(doc.data().time.hour1)
                                    hour2 = parseInt(doc.data().time.hour2)
                                    if (doc.data().time.meridiem1 == "PM"){
                                        hour1 += 12;
                                    }
                                    if (doc.data().time.meridiem2 == "PM"){
                                        hour2 += 12;
                                    }
                                    hours[3] += hour2 - hour1
                                    min[3] += parseInt(doc.data().time.min2) - parseInt(doc.data().time.min1)
                                    break
                                case dates[4]:
                                    for (let i = 0; i < doc.data().exercises.length; i++){
                                        counts[4][doc.data().exercises[i].type]++;
                                    }
                                    hour1 = parseInt(doc.data().time.hour1)
                                    hour2 = parseInt(doc.data().time.hour2)
                                    if (doc.data().time.meridiem1 == "PM"){
                                        hour1 += 12;
                                    }
                                    if (doc.data().time.meridiem2 == "PM"){
                                        hour2 += 12;
                                    }
                                    hours[4] += hour2 - hour1
                                    min[4] += parseInt(doc.data().time.min2) - parseInt(doc.data().time.min1)
                                    break
                                case dates[5]:
                                    for (let i = 0; i < doc.data().exercises.length; i++){
                                        counts[5][doc.data().exercises[i].type]++;
                                    }
                                    hour1 = parseInt(doc.data().time.hour1)
                                    hour2 = parseInt(doc.data().time.hour2)
                                    if (doc.data().time.meridiem1 == "PM"){
                                        hour1 += 12;
                                    }
                                    if (doc.data().time.meridiem2 == "PM"){
                                        hour2 += 12;
                                    }
                                    hours[5] += hour2 - hour1
                                    min[5] += parseInt(doc.data().time.min2) - parseInt(doc.data().time.min1)
                                    break
                                case dates[6]:
                                    for (let i = 0; i < doc.data().exercises.length; i++){
                                        counts[6][doc.data().exercises[i].type]++;
                                    }
                                    hour1 = parseInt(doc.data().time.hour1)
                                    hour2 = parseInt(doc.data().time.hour2)
                                    if (doc.data().time.meridiem1 == "PM"){
                                        hour1 += 12;
                                    }
                                    if (doc.data().time.meridiem2 == "PM"){
                                        hour2 += 12;
                                    }
                                    hours[6] += hour2 - hour1
                                    min[6] += parseInt(doc.data().time.min2) - parseInt(doc.data().time.min1)
                                    break
                            }
                        }
                    }
                    
                }
            })
            for (let i = 0; i < 7; i++){
                days[i].addRows([
                    ['core', counts[i].core],
                    ['leg', counts[i].leg],
                    ['chest', counts[i].chest],
                    ['shoulder', counts[i].shoulder],
                    ['back', counts[i].back],
                    ['arm', counts[i].arm]
                  ]);

                if (min[i] > 60){
                    let amount = Math.floor(min[i] / 60)
                    hours[i] += amount;
                    min[i] -= amount*60
                }
                if (min[i] != 0){
                    if (min[i] == 1){
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .minDay").innerHTML = min[i] + " minute"
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .minDay").display = "block"
                    }else{
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .minDay").innerHTML = min[i] + " minutes"
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .minDay").display = "block"
                    }
                }
                if (hours[i] != 0){
                    if (hours[i] == 1){
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .hourDay").innerHTML = hours[i] + " hour"
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .hourDay").display = "block"
                    }else{
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .hourDay").innerHTML = hours[i] + " hours"
                        document.querySelector("span#" + this.intToWord(i + 1) + "Cal > .hourDay").display = "block"
                    }
                }
            }
            var options = {
                legend: {position:"none"},
                enableInteractivity: false,
                chartArea: {left: "1px", width:125,
                height:125, top:10, bottom:10},
                pieSliceText: 'none',
                slices: {
                    0: { color: '#7795FF' },
                    1: { color: '#5FE46C' },
                    2: { color: '#B37DDC' },
                    3: { color: '#f77777' },
                    4: { color: '#FFF177' },
                    5: { color: '#FF9912' }
                  },
                backgroundColor: "#B1E1FF",
                height: 145};
        
                let groups = ["arm", "core", "leg", "shoulder", "chest", "back"]
                // Instantiate and draw our chart, passing in some options.
                for (let i = 0; i < 7; i++){
                    let idString = "calDiv" + i.toString()
                    var chart = new google.visualization.PieChart(document.getElementById(idString));
                    chart.draw(days[i], options);
                    for (let j = 0; j < 6; j++){
                        if (parseInt(counts[i][groups[j]]) > 0){
                            let id = this.intToWord(i + 1) + "Cal" + j
                            console.log(id);
                            document.getElementById(id).style.display = "block"
                        }
                    }
                }
        })
          
      }
    
    intToWord(int){
        switch(int){
            case 0:
                return "zero"
                break
            case 1:
                return "one"
                break
            case 2:
                return "two"
                break
            case 3:
                return "three"
                break
            case 4:
                return "four"
                break
            case 5:
                return "five"
                break
            case 6:
                return "six"
                break
            case 7:
                return "seven"
                break
            case 8:
                return "eight"
                break
            case 9:
                return "nine"
                break
        }
    }

    render(){
        return(<div id="cal">
            {weekDay("oneCal", this.weekDays[this.calDay(6)], this.calDate(6), 0)}
            {weekDay("twoCal", this.weekDays[this.calDay(5)],this.calDate(5), 1)}
            {weekDay("threeCal", this.weekDays[this.calDay(4)], this.calDate(4), 2)}
            {weekDay("fourCal", this.weekDays[this.calDay(3)], this.calDate(3), 3)}
            {weekDay("fiveCal", this.weekDays[this.calDay(2)], this.calDate(2), 4)}
            {weekDay("sixCal", this.weekDays[this.calDay(1)], this.calDate(1), 5)}
            {weekDay("sevenCal", this.weekDays[this.calDay(0)], this.calDate(0), 6)}
        </div>)
    }

}


function notesHeader(){
    return (
        <div id="notesHeader" >Notes</div>
    )
}

function notesTitle(value, onChange){
    return(
        <input id="notesTitle" value={value} placeholder="Title" onChange={e => onChange(e.target.value)}>
        </input>
    )
}

function notesText(value, onChange){
    return(
        <textarea id="notesText" value={value} placeholder="Enter notes here" onChange={e => onChange(e.target.value)}>
        </textarea>
    )
}

function noteSelection(title, timestamp, key, switchToNote, deleteNote, active){
    if (title == ""){
        title = "Title"
    }
    let className = "NoteSelectionTitle"
    if (active){
        className = "NoteSelectionTitleActive"
    }
    return(
        <div className="NoteSelection" key={key} onClick={() => {switchToNote(key)}}>
            <div class={className}>
                <span class="noteSelectionTitlePog">{title}</span>
                <span id={"deleteSelection"} onClick={(e) => {e.stopPropagation(); deleteNote(key)}}>X</span>
            </div>
            <div class="NoteSelectionTimestamp">{timestamp}</div>
            <hr></hr>
        </div>
    )
}

function addNotesSelectionButton(addSelection){
    return(
        <div id="addNotesSelection" onClick={() => {addSelection()}}>+</div>
    )
}

class NoteSelector extends React.Component{
    render(){
        let myNotes = this.props.notes;
        let noteSelections = [];
        for (let i = 0; i < myNotes.length; i++){
            if (this.props.currentNote == i){
                noteSelections[i] = noteSelection(myNotes[i].title, myNotes[i].timestamp, i, this.props.switchToNoteFunction, this.props.deleteNoteFunction, true)
            }else{
                noteSelections[i] = noteSelection(myNotes[i].title, myNotes[i].timestamp, i, this.props.switchToNoteFunction, this.props.deleteNoteFunction, false)
            }
        }
        const noteSelectionsReal = noteSelections
        return(
            <div id="NoteSelector">
                {noteSelectionsReal}
                {addNotesSelectionButton(this.props.addNoteFunction)}
            </div>
        )
    }
}


class Notes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            notes: [
                {
                    title: "",
                    body: "",
                    timestamp: "",
                    id: ""
                }
            ],
            currentNote: 0
        }
        this._pullNotes();
    }

    _switchToNote(note){
        console.log(note);
        this.setState({
            currentNote: note
        })
    }

    _updateTimestamp(){
        // let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY)
        // ref.doc(this.state.notes[this.state.currentNote].id).get().then((doc) => {
            
        // })
        let newNote = this.state.notes[this.state.currentNote]
            newNote.timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString().substring(0, 24)
            let newNotes = this.state.notes
            newNotes[this.state.currentNote] = newNote
            this.setState({
                notes: newNotes,
                currentNote: this.state.currentNote
            })
    }

    _updateTitle(newValue){
        let newNote = this.state.notes[this.state.currentNote]
        newNote.title = newValue
        let newNotes = this.state.notes
        newNotes[this.state.currentNote] = newNote
        this.setState({
            notes: newNotes,
            currentNote: this.state.currentNote
        })
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY)
        ref.doc(this.state.notes[this.state.currentNote].id).set({
            body: this.state.notes[this.state.currentNote].body,
            title: this.state.notes[this.state.currentNote].title,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        }).then(
            this._updateTimestamp()
        )
    }

    _updateBody(newValue){
        let newNote = this.state.notes[this.state.currentNote]
        newNote.body = newValue
        let newNotes = this.state.notes
        newNotes[this.state.currentNote] = newNote
        this.setState({
            notes: newNotes,
            currentNote: this.state.currentNote
        })
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY)
        ref.doc(this.state.notes[this.state.currentNote].id).set({
            body: this.state.notes[this.state.currentNote].body,
            title: this.state.notes[this.state.currentNote].title,
            timestamp: firebase.firestore.Timestamp.fromDate(new Date())
        }).then(
            this._updateTimestamp()
        )
    }

    _addNote(){
        let id = ""
        let title = ""
        let body = ""
        let timestamp = ""
        firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).add({
            title: "",
            body: "",
            timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
        }).then(() => {
            firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).orderBy("timestamp", "desc").limit(1).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    id = doc.id
                    title = doc.data().title
                    body = doc.data().body
                    timestamp = doc.data().timestamp
                })
            }).then(() => {
                    firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).doc(id).update({
                        title: title,
                        body: body,
                        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        id: id
                    })
                    let newNotes = this.state.notes;
                    let newCurrentNote = this.state.notes.length;
                    newNotes.push({
                        title: title,
                        body: body,
                        timestamp: timestamp.toDate().toString().substring(0, 24),
                        id: id
                    })
                    this.setState({
                        notes: newNotes,
                        currentNote: newCurrentNote
                    })
                    this._updateTimestamp();
                }   
            )
        })
        
    }

    _deleteNote(key){
        if (this.state.notes.length > 1){
            firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).doc(this.state.notes[key].id).delete();
            let newNotes = this.state.notes;
            newNotes.splice(key, 1);
            let newCurrentNote = key - 1;
            if (newCurrentNote < 0){
                newCurrentNote = 0
            }
                this.setState({
                    notes: newNotes,
                    currentNote: newCurrentNote
                })
        }
    }

    _pullNotes(){
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY)
        let newNotes = []
        let id = ""
        ref.get().then((querySnapshot) => {
            if (querySnapshot.empty){
                firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).add({
                    title: "",
                    body: "",
                    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                }).then(() => {
                    firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            id = doc.id
                        })
                    }).then(() => {
                            firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).doc(id).update({
                                title: "",
                                body: "",
                                timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                id: id
                            })
                            this._pullNotes()
                        }   
                    )
                }
                )
            }else{
                let i = 0;
                querySnapshot.forEach((doc) => {
                    newNotes[i] = {
                        body: doc.data().body,
                        title: doc.data().title,
                        timestamp: doc.data().timestamp.toDate().toString().substring(0, 24),
                        id: doc.id
                    }
                    i = i + 1;
                });
                this.setState({
                    notes: newNotes
                })
            }
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
    }

    render(){
        return(<div id="notes">
            {notesHeader()}
            {notesTitle(this.state.notes[this.state.currentNote].title, this._updateTitle.bind(this))}
            <NoteSelector activeNote={this.state.currentNote} notes={this.state.notes} currentNote={this.state.currentNote} addNoteFunction={() => {this._addNote()}} switchToNoteFunction={(key) => {this._switchToNote(key)}} deleteNoteFunction={(key) => {this._deleteNote(key)}}></NoteSelector>
            {notesText(this.state.notes[this.state.currentNote].body, this._updateBody.bind(this))}
        </div>)
    }
}


class HomePage extends React.Component{
    constructor(props){
        super(props)  
        this.state = {
            notesOrCal: <Cal></Cal>,
            notes: 0,
            workoutsInLastSeven : 0,
            hoursInLast30 : 0
        }
        this.getNumOfWorkouts();
    }

    getNumOfWorkouts() {
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_WORKOUTS_COLLECTION_KEY)
        ref.get().then((querySnapshot) => {
        let workouts = 0;
        let hours = 0;
        if (querySnapshot.empty) {
            return '0';
        }
        else {
                querySnapshot.forEach((doc) => {
                    if (doc.id != "logging"){
                        let now = new Date()
                        let rawDay = doc.data().date.day
                        let rawMonth = doc.data().date.month
                        let rawYear = doc.data().date.year
                        let rawHour1 = doc.data().time.hour1
                        let rawMeridiem1 = doc.data().time.meridiem1
                        let rawMin1 = doc.data().time.min1
                        let rawHour2 = doc.data().time.hour2
                        let rawMeridiem2 = doc.data().time.meridiem2
                        let rawMin2 = doc.data().time.min2
                        if (rawDay < 10) {
                            rawDay = '0' + rawDay
                        }
                        if (rawMonth < 10) {
                            rawMonth = '0' + rawMonth
                        }
                        //convert start and end times of workout to army time
                        if (rawHour1 == '12' && rawMeridiem1 == 'AM') {
                            rawHour1 = '00';
                        }
                        if (rawHour2 == '12' && rawMeridiem2 == 'AM') {
                            rawHour2 = '00';
                        }
                        if (rawMeridiem1 == 'PM' && rawHour1 != '12') {
                            rawHour1 = +rawHour1 + 12;
                        }
                        if (rawMeridiem2 == 'PM' && rawHour2 != '12') {
                            rawHour2 = +rawHour2 + 12;
                        }
                        let date = new Date(rawYear + '-' + rawMonth + '-'+rawDay +'T' + rawHour1 + ':' + rawMin1 + ':00')
                        let date2 = new Date(rawYear + '-' + rawMonth + '-'+rawDay +'T' + rawHour2 + ':' + rawMin2 + ':00')
                        let elapsed = now.getTime() - date.getTime();
                        elapsed = elapsed / (1000*60*60*24)
                        if (elapsed <= 7) {
                            workouts++;
                        }
                        if (elapsed <= 30) {
                            hours += ((date2.getTime() - date.getTime()) / ((1000*60*60)))
                        }
                    }
                })
                
               hours = Math.round(hours)
               this.setState(
                    {
                        workoutsInLastSeven : workouts.toString(),
                        hoursInLast30 : hours.toString()
                    }
               )
            }
        })
    }

    switch(){
        if (this.state.notes == 0){
            this.setState(
                {
                    notesOrCal: <Notes></Notes>,
                    notes: 1
                }
            )
        }else{
            this.setState(
                {
                    notesOrCal: <Cal></Cal>,
                    notes: 0
                }
            )
        }
    }

    switchToLogWorkout(){
        localStorage.setItem("page", "2")
        redirect();
    }

    renderButtons(){
        if (this.state.notes == 0){
            return (buttons(this.switch.bind(this), "Switch to Notes", this.switchToLogWorkout))
        }else{
            return (buttons(this.switch.bind(this), "Switch to Calendar", this.switchToLogWorkout))
        }
    }

    componentDidMount(){
        document.getElementById("userImg").addEventListener('error', () =>{
            var image = document.getElementById("userImg");
            var isLoaded = image.complete && image.naturalHeight !== 0;
            if (!isLoaded) {
                image.src = "images/defaultProfile.jpg";
            }
        })
    }

    render(){
        return(
            <div className="HomePage">
                {header(currUser.getUsername(), currUser.logout, currUser.getImgRef(), returnToHomepage)}
                {info(currUser.getUsername(), this.state.workoutsInLastSeven, this.state.hoursInLast30)}
                {this.renderButtons()}
                {this.state.notesOrCal}
            </div>
        )
    }
}






const FB_USERS_COLLECTION_KEY = "Users"
const FB_EXERCISES_COLLECTION_KEY = "Exercises"
const FB_NOTES_COLLECTION_KEY = "Notes"
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

function header(username, logOutFunction, imgRef){
    return (
        <header>
            <div id="title">Title</div>
            <div id="usernameImgContainer">{username}<img id="userImg" src={imgRef} ></img><img id="logoutImg" src="images/logout.jpg" onClick={() => {logOutFunction()}} title="LOGOUT"></img></div>
        </header>
    );
}

function buttons(switchFunction, switchWords){
    return (
        <div id="but">
            <button id="viewStats">View Full Stats</button>
            <button id="viewArchive">Workout Archive</button>
            <button id="logWorkout">Log/Create New Workout</button>
            <button id="switch" onClick={() => {switchFunction()}}>{switchWords}</button>
        </div>
    );
}

function info (username, days, hours){
    return (
        <div id="info">
            <p id="infoWelcome">Welcome {username}</p>
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

    render(){
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
                <span>{title}</span>
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
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY)
        ref.doc(this.state.notes[this.state.currentNote].id).get().then((doc) => {
            let newNote = this.state.notes[this.state.currentNote]
            newNote.timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString().substring(0, 24)
            let newNotes = this.state.notes
            newNotes[this.state.currentNote] = newNote
            this.setState({
                notes: newNotes,
                currentNote: this.state.currentNote
            })
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
                        timestamp: timestamp.toString().substring(0, 24),
                        id: id
                    })
                    this.setState({
                        notes: newNotes,
                        currentNote: newCurrentNote
                    })
                    console.log(this.state.notes);
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
            notes: 0
        }
    }

    logout(){
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Sign Out Successful");
        }).catch(function(error){
            // An error happened.
            console.log("Sign Out Error");
        });
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

    renderButtons(){
        if (this.state.notes == 0){
            return (buttons(this.switch.bind(this), "Switch to Notes"))
        }else{
            return (buttons(this.switch.bind(this), "Switch to Calendar"))
        }
    }

    render(){
        console.log("rerendering");
        return(
            <div>
                {header(currUser.getUsername(), this.logout, currUser.getImgRef())}
                {info(currUser.getUsername(), "100", "130")}
                {this.renderButtons()}
                {this.state.notesOrCal}
            </div>
        )
    }
}






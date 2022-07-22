
const FB_USERS_COLLECTION_KEY = "Users"
const FB_EXERCISES_COLLECTION_KEY = "Exercises"
const FB_NOTES_COLLECTION_KEY = "Notes"

let currUser = null;
let User = class{
    constructor(user){
        this.fbUser = user;
        this._registerInFirestore(this.fbUser.uid)
    }

    _registerInFirestore(UID){
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(UID)
        ref.onSnapshot((doc) => {
            if (!doc.exists) {
				firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(UID).set({
                    id: UID
                });
            }
        });
    }

    getUsername(){
        return this.fbUser.displayName;
    }

    getImgRef(){
        return this.fbUser.photoURL;
    }

    getUID(){
        return this.fbUser.uid;
    }

}

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
            <div id="usernameImgContainer">{username}<img id="userImg" src={imgRef} onClick={logOutFunction}></img></div>
        </header>
    );
}

function buttons(switchFunction, switchWords){
    return (
        <div id="but">
            <button id="viewStats">View Full Stats</button>
            <button id="viewArchive">Workout Archive</button>
            <button id="logWorkout">Log/Create New Workout</button>
            <button id="switch" onClick={switchFunction}>{switchWords}</button>
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
        <div id="notesHeader">Notes</div>
    )
}

function notesTitle(value, onChange){
    return(
        <input id="notesTitle" value={value} placeholder="Title" onChange={e => onChange(e.target.value)}>
        </input>
    )
}

function notesText(){
    return(
        <textarea id="notesText" placeholder="Enter notes here">
        </textarea>
    )
}

function noteSelection(title, timestamp){
    return(
        <div className="NoteSelection"><div class="NoteSelectionTitle">{title}</div><div class="NoteSelectionTimestamp">{timestamp}</div><hr></hr></div>
    )
}

class NoteSelector extends React.Component{
    render(){
        let notes = this.props.notes;
        const noteSelections = notes.map((note) => 
            noteSelection(note.title, note.timestamp)
        );
        return(
            <div id="NoteSelector">
                {noteSelections}
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

    _pullNotes(){
        let ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY)
        let newNotes = []
        ref.get().then((querySnapshot) => {
            let i = 0;
            querySnapshot.forEach((doc) => {
                console.log(doc);
                newNotes[i] = {
                    body: doc.data().body,
                    title: doc.data().title,
                    timestamp:doc.data().timestamp.toDate().toString().substring(0, 24),
                    id: doc.id
                }
                i = i + 1;
            });
            this.setState({
                notes: newNotes
            })
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
        console.log(newNotes)
    }

    render(){
        return(<div id="notes">
            {notesHeader()}
            {notesTitle(this.state.notes[this.state.currentNote].title, this._updateTitle.bind(this))}
            <NoteSelector notes={this.state.notes} currentNote={this.state.currentNote}></NoteSelector>
            {notesText()}
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

function startFirebaseUI() {
	const uiConfig = {
        signInSuccessUrl: '/',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.PhoneAuthProvider.PROVIDER_ID
		],
	};
    const ui = new firebaseui.auth.AuthUI(firebase.auth())
    ui.start('#firebaseui-auth-container', uiConfig)
}

function redirect(){
    switch(localStorage.getItem("page")){
        case "0":
            root.render();
            startFirebaseUI();
            break;
        case "1":
            root.render(<HomePage></HomePage>);
            break;
    }
}

function main(){
    localStorage.setItem("page", "0");
    firebase.auth().onAuthStateChanged( (user) => {
		if (user) {
            currUser = new User(user);
            localStorage.setItem("page", 1);
            redirect();
		}else{
            localStorage.setItem("page", 0);
            redirect();
        }
	});
}

const root = ReactDOM.createRoot(
    document.querySelector("root"));
main();


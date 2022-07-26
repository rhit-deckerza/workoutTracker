var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FB_USERS_COLLECTION_KEY = "Users";
var FB_EXERCISES_COLLECTION_KEY = "Exercises";
var FB_NOTES_COLLECTION_KEY = "Notes";
var currUser = null;
var User = function () {
    function User(user) {
        _classCallCheck(this, User);

        this.fbUser = user;
        this._registerInFirestore(this.fbUser.uid);
    }

    _createClass(User, [{
        key: "_registerInFirestore",
        value: function _registerInFirestore(UID) {
            var ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(UID);
            ref.onSnapshot(function (doc) {
                if (!doc.exists) {
                    firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(UID).set({
                        id: UID
                    });
                }
            });
        }
    }, {
        key: "getUsername",
        value: function getUsername() {
            return this.fbUser.displayName;
        }
    }, {
        key: "getImgRef",
        value: function getImgRef() {
            return this.fbUser.photoURL;
        }
    }, {
        key: "getUID",
        value: function getUID() {
            return this.fbUser.uid;
        }
    }]);

    return User;
}();

function weekDay(id, weekDay, date) {
    return React.createElement(
        "span",
        { id: id },
        React.createElement(
            "span",
            null,
            weekDay
        ),
        React.createElement(
            "span",
            null,
            date
        ),
        React.createElement("span", { "class": "myLine" })
    );
}

function header(username, logOutFunction, imgRef) {
    return React.createElement(
        "header",
        null,
        React.createElement(
            "div",
            { id: "title" },
            "Title"
        ),
        React.createElement(
            "div",
            { id: "usernameImgContainer" },
            username,
            React.createElement("img", { id: "userImg", src: imgRef }),
            React.createElement("img", { id: "logoutImg", src: "images/logout.jpg", onClick: function onClick() {
                    logOutFunction();
                }, title: "LOGOUT" })
        )
    );
}

function buttons(switchFunction, switchWords) {
    return React.createElement(
        "div",
        { id: "but" },
        React.createElement(
            "button",
            { id: "viewStats" },
            "View Full Stats"
        ),
        React.createElement(
            "button",
            { id: "viewArchive" },
            "Workout Archive"
        ),
        React.createElement(
            "button",
            { id: "logWorkout" },
            "Log/Create New Workout"
        ),
        React.createElement(
            "button",
            { id: "switch", onClick: function onClick() {
                    switchFunction();
                } },
            switchWords
        )
    );
}

function info(username, days, hours) {
    return React.createElement(
        "div",
        { id: "info" },
        React.createElement(
            "p",
            { id: "infoWelcome" },
            "Welcome ",
            username
        ),
        React.createElement(
            "p",
            { id: "infoCompleted" },
            "you have completed ",
            React.createElement(
                "h1",
                null,
                days
            ),
            " workouts in the past ",
            React.createElement(
                "h1",
                null,
                "7"
            ),
            " days"
        ),
        React.createElement(
            "p",
            { id: "infoSpent" },
            "and have spent ",
            React.createElement(
                "h1",
                null,
                hours
            ),
            " hours in the gym in the last ",
            React.createElement(
                "h1",
                null,
                "30"
            ),
            " days."
        )
    );
}

var Cal = function (_React$Component) {
    _inherits(Cal, _React$Component);

    function Cal(props) {
        _classCallCheck(this, Cal);

        var _this = _possibleConstructorReturn(this, (Cal.__proto__ || Object.getPrototypeOf(Cal)).call(this, props));

        _this.weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        _this.d = new Date();
        return _this;
    }

    _createClass(Cal, [{
        key: "calDay",
        value: function calDay(index) {
            var day = this.d.getDay();
            day = day - index;
            if (day < 0) {
                day = day + 7;
            }
            return day;
        }
    }, {
        key: "calDate",
        value: function calDate(index) {
            var date = this.d.getDate();
            date = date - index;
            if (date < 1) {
                if (this.d.getMonth() == 0 || this.d.getMonth() == 1 || this.d.getMonth() == 3 || this.d.getMonth() == 5 || this.d.getMonth() == 7 || this.d.getMonth() == 8 || this.d.getMonth() == 10) {
                    date = date + 31;
                } else {
                    date = date + 30;
                }
            }
            var dateString = date.toString();
            if (dateString.slice(-1) < 4 && date != 11 && date != 12 && date != 13) {
                switch (date.toString().slice(-1)) {
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
            } else {
                return dateString + 'th';
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { id: "cal" },
                weekDay("oneCal", this.weekDays[this.calDay(6)], this.calDate(6)),
                weekDay("twoCal", this.weekDays[this.calDay(5)], this.calDate(5)),
                weekDay("threeCal", this.weekDays[this.calDay(4)], this.calDate(4)),
                weekDay("fourCal", this.weekDays[this.calDay(3)], this.calDate(3)),
                weekDay("fiveCal", this.weekDays[this.calDay(2)], this.calDate(2)),
                weekDay("sixCal", this.weekDays[this.calDay(1)], this.calDate(1)),
                weekDay("sevenCal", this.weekDays[this.calDay(0)], this.calDate(0))
            );
        }
    }]);

    return Cal;
}(React.Component);

function notesHeader() {
    return React.createElement(
        "div",
        { id: "notesHeader" },
        "Notes"
    );
}

function notesTitle(value, _onChange) {
    return React.createElement("input", { id: "notesTitle", value: value, placeholder: "Title", onChange: function onChange(e) {
            return _onChange(e.target.value);
        } });
}

function notesText(value, _onChange2) {
    return React.createElement("textarea", { id: "notesText", value: value, placeholder: "Enter notes here", onChange: function onChange(e) {
            return _onChange2(e.target.value);
        } });
}

function noteSelection(title, timestamp, key, switchToNote, deleteNote, active) {
    if (title == "") {
        title = "Title";
    }
    var className = "NoteSelectionTitle";
    if (active) {
        className = "NoteSelectionTitleActive";
    }
    return React.createElement(
        "div",
        { className: "NoteSelection", key: key, onClick: function onClick() {
                switchToNote(key);
            } },
        React.createElement(
            "div",
            { "class": className },
            React.createElement(
                "span",
                null,
                title
            ),
            React.createElement(
                "span",
                { id: "deleteSelection", onClick: function onClick(e) {
                        e.stopPropagation();deleteNote(key);
                    } },
                "X"
            )
        ),
        React.createElement(
            "div",
            { "class": "NoteSelectionTimestamp" },
            timestamp
        ),
        React.createElement("hr", null)
    );
}

function addNotesSelectionButton(addSelection) {
    return React.createElement(
        "div",
        { id: "addNotesSelection", onClick: function onClick() {
                addSelection();
            } },
        "+"
    );
}

var NoteSelector = function (_React$Component2) {
    _inherits(NoteSelector, _React$Component2);

    function NoteSelector() {
        _classCallCheck(this, NoteSelector);

        return _possibleConstructorReturn(this, (NoteSelector.__proto__ || Object.getPrototypeOf(NoteSelector)).apply(this, arguments));
    }

    _createClass(NoteSelector, [{
        key: "render",
        value: function render() {
            var myNotes = this.props.notes;
            var noteSelections = [];
            for (var i = 0; i < myNotes.length; i++) {
                if (this.props.currentNote == i) {
                    noteSelections[i] = noteSelection(myNotes[i].title, myNotes[i].timestamp, i, this.props.switchToNoteFunction, this.props.deleteNoteFunction, true);
                } else {
                    noteSelections[i] = noteSelection(myNotes[i].title, myNotes[i].timestamp, i, this.props.switchToNoteFunction, this.props.deleteNoteFunction, false);
                }
            }
            var noteSelectionsReal = noteSelections;
            return React.createElement(
                "div",
                { id: "NoteSelector" },
                noteSelectionsReal,
                addNotesSelectionButton(this.props.addNoteFunction)
            );
        }
    }]);

    return NoteSelector;
}(React.Component);

var Notes = function (_React$Component3) {
    _inherits(Notes, _React$Component3);

    function Notes(props) {
        _classCallCheck(this, Notes);

        var _this3 = _possibleConstructorReturn(this, (Notes.__proto__ || Object.getPrototypeOf(Notes)).call(this, props));

        _this3.state = {
            notes: [{
                title: "",
                body: "",
                timestamp: "",
                id: ""
            }],
            currentNote: 0
        };
        _this3._pullNotes();
        return _this3;
    }

    _createClass(Notes, [{
        key: "_switchToNote",
        value: function _switchToNote(note) {
            console.log(note);
            this.setState({
                currentNote: note
            });
        }
    }, {
        key: "_updateTimestamp",
        value: function _updateTimestamp() {
            var _this4 = this;

            var ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY);
            ref.doc(this.state.notes[this.state.currentNote].id).get().then(function (doc) {
                var newNote = _this4.state.notes[_this4.state.currentNote];
                newNote.timestamp = firebase.firestore.Timestamp.fromDate(new Date()).toDate().toString().substring(0, 24);
                var newNotes = _this4.state.notes;
                newNotes[_this4.state.currentNote] = newNote;
                _this4.setState({
                    notes: newNotes,
                    currentNote: _this4.state.currentNote
                });
            });
        }
    }, {
        key: "_updateTitle",
        value: function _updateTitle(newValue) {
            var newNote = this.state.notes[this.state.currentNote];
            newNote.title = newValue;
            var newNotes = this.state.notes;
            newNotes[this.state.currentNote] = newNote;
            this.setState({
                notes: newNotes,
                currentNote: this.state.currentNote
            });
            var ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY);
            ref.doc(this.state.notes[this.state.currentNote].id).set({
                body: this.state.notes[this.state.currentNote].body,
                title: this.state.notes[this.state.currentNote].title,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
            }).then(this._updateTimestamp());
        }
    }, {
        key: "_updateBody",
        value: function _updateBody(newValue) {
            var newNote = this.state.notes[this.state.currentNote];
            newNote.body = newValue;
            var newNotes = this.state.notes;
            newNotes[this.state.currentNote] = newNote;
            this.setState({
                notes: newNotes,
                currentNote: this.state.currentNote
            });
            var ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY);
            ref.doc(this.state.notes[this.state.currentNote].id).set({
                body: this.state.notes[this.state.currentNote].body,
                title: this.state.notes[this.state.currentNote].title,
                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
            }).then(this._updateTimestamp());
        }
    }, {
        key: "_addNote",
        value: function _addNote() {
            var _this5 = this;

            var id = "";
            var title = "";
            var body = "";
            var timestamp = "";
            firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).add({
                title: "",
                body: "",
                timestamp: firebase.firestore.Timestamp.fromDate(new Date())
            }).then(function () {
                firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).orderBy("timestamp", "desc").limit(1).get().then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                        id = doc.id;
                        title = doc.data().title;
                        body = doc.data().body;
                        timestamp = doc.data().timestamp;
                    });
                }).then(function () {
                    firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).doc(id).update({
                        title: title,
                        body: body,
                        timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                        id: id
                    });
                    var newNotes = _this5.state.notes;
                    var newCurrentNote = _this5.state.notes.length;
                    newNotes.push({
                        title: title,
                        body: body,
                        timestamp: timestamp.toString().substring(0, 24),
                        id: id
                    });
                    _this5.setState({
                        notes: newNotes,
                        currentNote: newCurrentNote
                    });
                    console.log(_this5.state.notes);
                    _this5._updateTimestamp();
                });
            });
        }
    }, {
        key: "_deleteNote",
        value: function _deleteNote(key) {
            if (this.state.notes.length > 1) {
                firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).doc(this.state.notes[key].id).delete();
                var newNotes = this.state.notes;
                newNotes.splice(key, 1);
                var newCurrentNote = key - 1;
                if (newCurrentNote < 0) {
                    newCurrentNote = 0;
                }
                this.setState({
                    notes: newNotes,
                    currentNote: newCurrentNote
                });
            }
        }
    }, {
        key: "_pullNotes",
        value: function _pullNotes() {
            var _this6 = this;

            var ref = firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY);
            var newNotes = [];
            var id = "";
            ref.get().then(function (querySnapshot) {
                if (querySnapshot.empty) {
                    firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).add({
                        title: "",
                        body: "",
                        timestamp: firebase.firestore.Timestamp.fromDate(new Date())
                    }).then(function () {
                        firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).get().then(function (querySnapshot) {
                            querySnapshot.forEach(function (doc) {
                                id = doc.id;
                            });
                        }).then(function () {
                            firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_NOTES_COLLECTION_KEY).doc(id).update({
                                title: "",
                                body: "",
                                timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
                                id: id
                            });
                            _this6._pullNotes();
                        });
                    });
                } else {
                    var i = 0;
                    querySnapshot.forEach(function (doc) {
                        newNotes[i] = {
                            body: doc.data().body,
                            title: doc.data().title,
                            timestamp: doc.data().timestamp.toDate().toString().substring(0, 24),
                            id: doc.id
                        };
                        i = i + 1;
                    });
                    _this6.setState({
                        notes: newNotes
                    });
                }
            }).catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this7 = this;

            return React.createElement(
                "div",
                { id: "notes" },
                notesHeader(),
                notesTitle(this.state.notes[this.state.currentNote].title, this._updateTitle.bind(this)),
                React.createElement(NoteSelector, { activeNote: this.state.currentNote, notes: this.state.notes, currentNote: this.state.currentNote, addNoteFunction: function addNoteFunction() {
                        _this7._addNote();
                    }, switchToNoteFunction: function switchToNoteFunction(key) {
                        _this7._switchToNote(key);
                    }, deleteNoteFunction: function deleteNoteFunction(key) {
                        _this7._deleteNote(key);
                    } }),
                notesText(this.state.notes[this.state.currentNote].body, this._updateBody.bind(this))
            );
        }
    }]);

    return Notes;
}(React.Component);

var HomePage = function (_React$Component4) {
    _inherits(HomePage, _React$Component4);

    function HomePage(props) {
        _classCallCheck(this, HomePage);

        var _this8 = _possibleConstructorReturn(this, (HomePage.__proto__ || Object.getPrototypeOf(HomePage)).call(this, props));

        _this8.state = {
            notesOrCal: React.createElement(Cal, null),
            notes: 0
        };
        return _this8;
    }

    _createClass(HomePage, [{
        key: "logout",
        value: function logout() {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                console.log("Sign Out Successful");
            }).catch(function (error) {
                // An error happened.
                console.log("Sign Out Error");
            });
        }
    }, {
        key: "switch",
        value: function _switch() {
            if (this.state.notes == 0) {
                this.setState({
                    notesOrCal: React.createElement(Notes, null),
                    notes: 1
                });
            } else {
                this.setState({
                    notesOrCal: React.createElement(Cal, null),
                    notes: 0
                });
            }
        }
    }, {
        key: "renderButtons",
        value: function renderButtons() {
            if (this.state.notes == 0) {
                return buttons(this.switch.bind(this), "Switch to Notes");
            } else {
                return buttons(this.switch.bind(this), "Switch to Calendar");
            }
        }
    }, {
        key: "render",
        value: function render() {
            console.log("rerendering");
            return React.createElement(
                "div",
                null,
                header(currUser.getUsername(), this.logout, currUser.getImgRef()),
                info(currUser.getUsername(), "100", "130"),
                this.renderButtons(),
                this.state.notesOrCal
            );
        }
    }]);

    return HomePage;
}(React.Component);

function startFirebaseUI() {
    var uiConfig = {
        signInSuccessUrl: '/',
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.PhoneAuthProvider.PROVIDER_ID]
    };
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
}

function redirect() {
    switch (localStorage.getItem("page")) {
        case "0":
            root.render();
            startFirebaseUI();
            break;
        case "1":
            root.render(React.createElement(HomePage, null));
            break;
    }
}

function main() {
    localStorage.setItem("page", "0");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            currUser = new User(user);
            localStorage.setItem("page", 1);
            redirect();
        } else {
            localStorage.setItem("page", 0);
            redirect();
        }
    });
}

var root = ReactDOM.createRoot(document.querySelector("root"));
main();


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

function header(username, logOutFunction){
    return (
        <header>
            <div id="title">Title</div>
            <div id="usernameImgContainer">{username}<img id="userImg" src="\images\AustinLiao.jpg" onClick={logOutFunction}></img></div>
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


class HomePage extends React.Component{
    constructor(props){
        super(props)
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

    render(){
        return(
            <div>
                {header("AustinLiao", this.logout)}
                {info("AustinLiao", "100", "130")}
                {buttons()}
                <Cal></Cal> 
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
			// User is signed in.
			const displayName = user.displayName;
			const email = user.email;
			const photoURL = user.photoURL;
			const isAnonymous = user.isAnonymous;
			const uid = user.uid;
			const phoneNumber = user.phoneNumber;
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


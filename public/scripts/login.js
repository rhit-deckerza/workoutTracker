
let currUser = null; //Always availible and is a "User"
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

    logout(){
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            console.log("Sign Out Successful");
        }).catch(function(error){
            // An error happened.
            console.log("Sign Out Error");
        });
    }

}

class LoginPage extends React.Component{
    componentDidMount(){
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
    render(){
        return(
        <div className="LoginPage">
            <div id="loginTitle">Workout Tracker</div>
            <div id="firebaseui-auth-container"></div>
        </div>
        )
    }
}


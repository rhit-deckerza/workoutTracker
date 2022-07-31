function redirect(){
    switch(localStorage.getItem("page")){
        case "0":
            root.render(<LoginPage></LoginPage>);
            break;
        case "1":
            root.render(<HomePage></HomePage>);
            break;
        case "2":
            root.render(<LogWorkoutPage></LogWorkoutPage>);
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

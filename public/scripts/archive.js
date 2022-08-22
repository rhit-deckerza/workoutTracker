

class ExerciseArchiveSelector extends React.Component{
    constructor(props){
        super(props)
    }

    render() {
        let exercies = []
        //let search = this.props.search
        for (let i = 0; i < this.props.listOfExercises.length; i++){
            if (this.props.listOfExercises[i].name.toLocaleLowerCase()){
                exercies.push(this.props.listOfExercises[i].element)
            }
           
        }
        
        const exerciesFinal = exercies

            return (
                <div id="ExerciseArchiveSelector">
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

class ExerciseArchive extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.exerciseArchiveData.length != 0 ){
            console.log(this.props.exerciseArchiveData)
        return(
        <div id="ExerciseArchive">
            <div id="exerciseName"> Exercise: {this.props.exerciseArchiveData[0].data[0].amount} </div>
            <div id="specificExerciseArchive"></div>
        </div>
            )
        }
        console.log(this.props.exerciseArchiveData)
        return(
        <div id="ExerciseArchive">
            <div id="exerciseName"> Exercise:</div>
            <div id="specificExerciseArchive"></div>
        </div>
            )
    }   

}


class DateArchive extends React.Component{
    render(){
        return(<div className="DateArchive"></div>)
    }
}


class ArchivePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            exercisesList: [],
            search: '',
            currentExercise: 'Cable Hammer Curl', 
            currentExerciseType: '',
            exerciseData: []
            
        } 
        this._pullExercises();
    }
    


    _pullExercises(){
        firebase.firestore().collection(FB_USERS_COLLECTION_KEY).doc(currUser.getUID()).collection(FB_WORKOUTS_COLLECTION_KEY).get().then((querySnapshot) => {
                let exerciseDataList = []
                querySnapshot.forEach((doc) => {
                    
                    for (let i = 0; i < doc.data().exercises.length; i++){
                        console.log(doc.data())
                        console.log(doc.data().exercises[i])
                        console.log(doc.data().exercises[i].name)
                        if (doc.data().exercises[i].name == this.state.currentExercise) {
                            let exName = doc.data().exercises[i].name
                            let day = doc.data().date.day
                            let month = doc.data().date.month
                            let year = doc.data().date.year
                            let sets = doc.data().exercises[i].sets.length
                            let reps = []
                            for (let s = 0; s < sets; s++) {
                                let weight = doc.data().exercises[i].sets[s].load
                                let amount = doc.data().exercises[i].sets[s].amount
                                reps.push({weight,amount})
                                
                            }
                            exerciseDataList.push({
                                name: exName, 
                                date: [day, month, year],
                                data: reps
                            }
                            )


                                
                        }

                    }
                    this.setState({
                        exerciseData: exerciseDataList
                    })

                }
                
                
                
                
                )
        })
        firebase.firestore().collection(FB_EXERCISES_COLLECTION_KEY).get().then((querySnapshot) => {
                let pulledExercises= []
                let arm = []
                let back = []
                let shoulder = []
                let chest = []
                let leg = []
                let core = []
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
                pulledExercises.push.apply(pulledExercises, arm)
                pulledExercises.push.apply(pulledExercises, back)
                pulledExercises.push.apply(pulledExercises, shoulder)
                pulledExercises.push.apply(pulledExercises, chest)
                pulledExercises.push.apply(pulledExercises, leg)
                pulledExercises.push.apply(pulledExercises, core)
                const exercisesFinal = pulledExercises
                this.setState({
                    exercisesList: exercisesFinal
                })

            })
    }

    _exerciseSelected(e) {
        if (document.getElementById("selectedExercise")){
            document.getElementById("selectedExercise").style.outline = "none"
            document.getElementById("selectedExercise").id = ""
        }
        console.log(this.state.exercisesList);
        let value = e.target.innerHTML
        e.target.style.outline = "thick solid #1B8EF2"
        e.target.id = "selectedExercise"
        this.state.currentExercise = value
        this.state.currentExerciseType = e.target.className
        
        this.setState({
            currentExercise: value,
            currentExerciseType: e.target.className
        }, () => {
            document.getElementById("addExercise").style.color = "black"
            document.getElementById("addExercise").style.backgroundColor = "#1B8EF2"
        })
    }
    
    exerciseButton(name, type){
        return(
            <button class={type} onClick={(e) => {this._exerciseSelected(e)}}>
                {name}
            </button>
        )
    }

    _search(target){
        let newValue = target.value;
        let newSearch = this.state.search
        newSearch = newValue
        this.setState({
            search: newSearch
        })
    }

    render(){
        return(
        <div className="ArchivePage">
            {header(currUser.getUsername(), currUser.logout, currUser.getImgRef(), returnToHomepage)}
            {/* <ExerciseArchiveSelector 
            listOfExercises = {this.state.exercisesList}
            </div>    searchFunction={this._search.bind(this)}>
           </ExerciseArchiveSelector>
           */}
           <ExerciseArchive
            currExercise = {this.state.currentExercise}
            exerciseArchiveData = {this.state.exerciseData}>
           </ExerciseArchive>
            <DateArchive></DateArchive>
        </div>)
    }
}
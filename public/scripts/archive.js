

class ExerciseArchive extends React.Component{
    render(){
        return(<div className="ExerciseArchive"></div>)
    }
}


class DateArchive extends React.Component{
    render(){
        return(<div className="DateArchive"></div>)
    }
}


class ArchivePage extends React.Component{
    render(){
        return(
        <div className="ArchivePage">
            {header(currUser.getUsername(), currUser.logout, currUser.getImgRef(), returnToHomepage)}
            <ExerciseArchive></ExerciseArchive>
            <DateArchive></DateArchive>
        </div>)
    }
}
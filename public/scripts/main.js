const { element } = require('prop-types');
const React = require('react')
const ReactDOM = require('react-dom')

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

class cal extends React.Component{
    constructor(props){
        super(props);
        this.weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        this.date = getDate();
        this.weekDay = this.weekDays[getDay()];
    }

    render(){
        <div id="cal">
            {weekDay("oneCal", this.weekDay, this.date)};
        </div>
    }

}

const root = ReactDOM.createRoot(
    document.getElementById("root"));
element = (<div>HIHIHIHIHIHIHIH</div>);
root.render(element);
root.appendChild(element);
print("HI");
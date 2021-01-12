import React from 'react'
import CourseCard from './components/CourseCard'

const courseColors = ["red", "orange", "yellow", "green", "blue", "purple"]

class App extends React.Component {
    state = {
        courseList: <h3>Loading your class data...</h3>
    }

    componentDidMount() {
        this.callAPI();
        this.forceUpdate();
    }

    callAPI = async() => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const targetUrl = 'https://canvas.calpoly.edu/api/v1/courses.json?access_token=15279~bUAbbgLyyiQapBK61lP8Lhz8RpoSgRLx2QajYKb8xtt44BsvONMsXxRmljb8Ds6Q'
        try {
            let response = await fetch(proxyUrl + targetUrl)
            if (response.ok) {
                var n = []
                var colorIterator = 0
                var currentTerm = 0
                var col = ""
                var json = await response.json()
                console.log(json)
                for (var i = 0; i < json.length; i++) {
                    if (json[i].enrollment_term_id > currentTerm) {
                        currentTerm = json[i].enrollment_term_id
                    }
                    n = json[i].name.split("-")
                    json[i].courseName = n[n.length - 1]
                    n = json[i].name.split(/[\s-]/)
                    json[i].courseTitle = n.slice(0, 2).join(" ")

                }
                const res = json.map((c) => {
                    if (c.enrollment_term_id == currentTerm) {
                        col = courseColors[colorIterator % courseColors.length]
                        colorIterator++
                        return <CourseCard 
                        courseCode={c.courseName} 
                        courseTitle={c.courseTitle}
                        courseColor={col}
                        />
                    }
                });
                this.setState({courseList: res});
            }
            else {
                console.log("ERROR IN RETRIEVING API DATA");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    render () {
        return (
            <>
            <div className="App">
            {this.state.courseList}
            </div>
            </>
        )
    };
}

export default App;

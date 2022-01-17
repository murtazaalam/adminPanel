import React from 'react';

class Instructors extends React.Component {
    constructor(props) {
        super(props);
    }
    renderRow = ({instructors}) => {
        if(instructors){
            var i = 0;
            return instructors.map((item) => {
                i = i+1;
                return(
                    <tr key={item._id}>
                        <td>{i}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.courses[0].course_name}</td>
                    </tr>
                )
            })
        }
    }
    render() {
        return (
            <>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Course</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRow(this.props)}
                    </tbody>
                </table>
            </>
        )
    }
}
export default Instructors;
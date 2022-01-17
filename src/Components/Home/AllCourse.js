import React from 'react';

class AllCourse extends React.Component {
    constructor(props) {
        super(props);
    }
    renderCourseOption = ({allCourseData}) => {
        if(allCourseData){
            return allCourseData.map((item) =>{
                return(
                    <option key={item._id} value={item._id} >{item.sub_category_name}</option>
                )
            })
        }
    }
    render() {
        return(
            <>
                {this.renderCourseOption(this.props)}
            </>
        )
    }
}
export default AllCourse;
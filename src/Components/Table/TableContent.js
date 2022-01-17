import React from 'react';
import axios from 'axios';

const url = "http://techvanto.herokuapp.com/allcourses";
const statusUpdateUrl = "http://techvanto.herokuapp.com/edit/status";

class TableContent extends React.Component {
    constructor(props) {
        super(props);
    }
    showSingleCourse = (id,action) => {
        var category_id = document.getElementById("category_id");
        var sub_category_name = document.getElementById("sub_category_name");
        var price = document.getElementById("price");
        var duration = document.getElementById("duration");
        var image_url = document.getElementById("image_url");
        var trainer_name = document.getElementById("trainer_name");
        var level_badge = document.getElementById("level_badge");
        var btn_submit = document.getElementById("btn-show");
        var btn_text = document.getElementById("btn-text");
        var formModalTitle = document.getElementById("course-modal-label");
        var btn_loader = document.getElementById("btn-loader");
        var message = document.getElementById("message");
        var course_id = document.getElementById("course_id");
        message.innerHTML = "";

        axios.get(`${url}/${id}`).then((res) => {
            category_id.value = res.data[0].category_id;
            sub_category_name.value = res.data[0].sub_category_name;
            price.value = res.data[0].price;
            duration.value = res.data[0].duration;
            image_url.value = res.data[0].image;
            trainer_name.value = res.data[0].trainer_name;
            level_badge.value = res.data[0].level;
            if(action == "show"){
                btn_submit.disabled = true;
                formModalTitle.innerHTML = `Detail About ${res.data[0].sub_category_name}`;
                btn_loader.style.display = "none";
            }
            else{
                btn_submit.disabled = false;
                formModalTitle.innerHTML = `Edit ${res.data[0].sub_category_name}`;
                btn_text.innerHTML = "Update";
                btn_loader.style.display = "none";
                course_id.value = id;
                localStorage.setItem("rating",res.data[0].rating);
                localStorage.setItem("status",res.data[0].status);
            }

        }).catch((err) => {
            console.log(err)
        })
    }

    deleteId = (id, name) => {
        document.getElementById("alert-title").style.display = "block";
        document.getElementById("item-name").style.display = "block";
        document.getElementById("loader").style.display = "none";
        document.getElementById("success-text").style.color = "red";
        document.getElementById("success-text").style.display = "none";
        document.getElementById("item-name").innerHTML = `"${name}" will be deleted permanently.`;
        document.getElementById("success-text").innerHTML = `"${name}" has been deleted.`;
        document.getElementById("delete_id").value = id;
    }
    hideshowCourse = (id) => {
        axios.get(`${url}/${id}`).then((res) => {
            var body;
            var btnText;
            if(res.data[0].status == 'active'){
                body = {
                    status: 'inactive'
                }
                btnText = "Active";
            }
            else{
                var body = {
                    status: 'active'
                }
                btnText = "Inactive";
            }
            axios.put(`${statusUpdateUrl}/${id}`,body).then((res) => {
                document.getElementById(id).innerHTML = btnText;
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }
    renderTable = ({courseData}) => {
        if(courseData){
            var i = 0;
            return courseData.map((item) => {
                i = i+1;
                return (
                    <tr key={item._id}>
                        <td>{i}</td>
                        <td>
                            <a className="course-name" data-bs-toggle="modal" data-bs-target="#course-modal" 
                                onClick={() => this.showSingleCourse(`${item._id}`, 'show')}>
                                {item.sub_category_name}
                            </a>
                        </td>
                        <td>{item.trainer_name}</td>
                        <td>{item.level}</td>
                        <td>
                            <button type="button" className="btn btn-outline-warning btn-sm btn-custom" data-bs-toggle="modal" 
                            data-bs-target="#course-modal" onClick={() => this.showSingleCourse(`${item._id}`, 'edit')}>Edit</button>
                            <button type="button" className="btn btn-outline-secondary btn-sm btn-custom" 
                                onClick={() => this.hideshowCourse(`${item._id}`)} id={item._id}>
                                {item.status == 'active' && 'Inactive'}
                                {item.status == 'inactive' && 'Active'}
                            </button>
                            <button type="button" className="btn btn-outline-danger btn-sm btn-custom" data-bs-toggle="modal" 
                                data-bs-target="#alert-dialog" onClick={() => this.deleteId(`${item._id}`, `${item.sub_category_name}`)}>
                                Delete</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    render() {
        return (
            <>
                {this.renderTable(this.props)}
            </>
        )
    }
}
export default TableContent;
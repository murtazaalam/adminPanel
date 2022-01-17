import React from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import TableContent from '../Table/TableContent';
import Category from '../Category/Category';
import AllCourse from './AllCourse';
import Orders from './Orders';
import Instructors from './Instructors';
import Users from './Users';
import './home.css';

const url = "http://techvanto.herokuapp.com/allcourses";
const cat = "http://techvanto.herokuapp.com/category";
const postUrl = "http://techvanto.herokuapp.com/newcourse";
const editUrl = "http://techvanto.herokuapp.com/edit";
const deleteUrl = "http://techvanto.herokuapp.com/delete-course";
const couponUrl = "http://techvanto.herokuapp.com/create-coupon";
const instUrl = "http://techvanto.herokuapp.com/add-instructor";
const ordersUrl = "http://techvanto.herokuapp.com/orders";
const getInstUrl = "http://techvanto.herokuapp.com/instructors";
const allUsersUrl = "https://signinup.herokuapp.com/api/auth/users";

class Home extends React.Component {
    constructor (props) {
        super(props);
        this.state={
            allCourse:'',
            category:'',
            orders:'',
            instructors:'',
            users:'',
            status:'courses'
        }
    }

    newFormModal = () => {
        var formModalTitle = document.getElementById("course-modal-label");
        var category_id = document.getElementById("category_id");
        var sub_category_name = document.getElementById("sub_category_name");
        var price = document.getElementById("price");
        var duration = document.getElementById("duration");
        var image_url = document.getElementById("image_url");
        var trainer_name = document.getElementById("trainer_name");
        var level_badge = document.getElementById("level_badge");
        var btn_show = document.getElementById("btn-show");
        var btn_text = document.getElementById("btn-text");
        var btn_loader = document.getElementById("btn-loader");
        var message = document.getElementById("message");
        
        formModalTitle.innerHTML = "Add New Course";
        sub_category_name.value = "";
        price.value = "";
        duration.value = "";
        image_url.value = "";
        trainer_name.value = "";
        category_id.options[0].selected = true;
        level_badge.options[0].selected = true;
        btn_show.disabled = false;
        btn_text.innerHTML = "Add Course";
        btn_loader.style.display = "none";
        btn_text.style.display = "block";
        message.innerHTML = "";
    }
    postCourse = () => {
        var category_id = document.getElementById("category_id").value;
        var sub_category_name = document.getElementById("sub_category_name").value;
        var price = document.getElementById("price").value;
        var duration = document.getElementById("duration").value;
        var image_url = document.getElementById("image_url").value;
        var trainer_name = document.getElementById("trainer_name").value;
        var level_badge = document.getElementById("level_badge").value;
        var btn_loader = document.getElementById("btn-loader");
        var btn_text = document.getElementById("btn-text");
        var message = document.getElementById("message");
        var action = document.getElementById("course-modal-label").innerHTML;
        console.log(action.split(' ')[0]);

        // btn_loader.style.display = "block";
        // btn_text.style.display = "none";
        // message.innerHTML = "";
        document.getElementById("add_msg").innerHTML = "";
        if(category_id == 0 || !sub_category_name || !price || !duration || !image_url || !trainer_name || level_badge == 0){
            document.getElementById("add_msg").innerHTML = "Star(*) fields are required";
            document.getElementById("add_msg").style.color = "red";
        }
        else{
            if(action.split(' ')[0] == "Add"){
                var courseData = {
                    category_id: category_id, 
                    sub_category_name: sub_category_name,
                    price: price,
                    duration: duration,
                    image: image_url, 
                    trainer_name: trainer_name,
                    level:level_badge,
                    rating:0,
                    status:'active'
                }
                axios.post(postUrl,courseData).then((res) => {
                    btn_text.style.display = "block";
                    message.innerHTML = "Course added successfully."
                })
            }
            else if(action.split(' ')[0] == "Edit"){
                var courseData = {
                    category_id: category_id, 
                    sub_category_name: sub_category_name,
                    price: price,
                    duration: duration,
                    image: image_url, 
                    trainer_name: trainer_name,
                    level:level_badge,
                    rating:localStorage.getItem("rating"),
                    status:localStorage.getItem("status")
                }
                var course_id = document.getElementById("course_id").value;
                axios.put(`${editUrl}/${course_id}`, courseData).then((res) => {
                    btn_loader.style.display = "none";
                    btn_text.style.display = "block";
                    message.innerHTML = "Course updated successfully."
                }).catch((err) => {
                    console.log(err);
                })
                
            }
        }
    }
    deletionConfirm = () => {
        var id = document.getElementById("delete_id").value;
        document.getElementById("alert-title").style.display = "none";
        document.getElementById("loader").style.display = "block";
        document.getElementById("item-name").style.display = "none";
        axios.delete(`${deleteUrl}/${id}`).then((res) => {
            document.getElementById("loader").style.display = "none";
            document.getElementById("success-text").style.display = "block";
        })
    }
    createCoupon = () => {
        var couponCode = document.getElementById("coupon_code").value;
        var discount = document.getElementById("discount").value;
        var expiry = document.getElementById("expiry").value;
        document.getElementById("msg").innerHTML = "";
        var couponData = {
            code: couponCode,
            discount: discount,
            expiry: expiry
        }
        if(!couponCode || !discount || !expiry){
            document.getElementById("msg").innerHTML = "Star(*) fields are required";
            document.getElementById("msg").style.color = "red";
            

        }
        else{
            if(couponCode.includes(" ")){
                document.getElementById("msg").innerHTML = "Space not allowed in Coupon Code";
                document.getElementById("msg").style.color = "red";
            }
            else if(Number(discount) < 0 || Number(discount) > 100){
                document.getElementById("msg").innerHTML = "Discount must be in (0-100)";
                document.getElementById("msg").style.color = "red";
            }
            else if(!expiry.includes('/') || expiry.split('/').length != 3 || 
                Number(expiry.split('/')[0]) < 0 || Number(expiry.split('/')[0]) > 12 ||
                Number(expiry.split('/')[1]) < 0 || Number(expiry.split('/')[1]) > 31 ||
                Number(expiry.split('/')[2]) < 2021 || Number(expiry.split('/')[0]) > 3000 ||
                !Number(expiry.split('/')[0]) || !Number(expiry.split('/')[1]) || !Number(expiry.split('/')[2])){

                document.getElementById("msg").innerHTML = "Invalid Date";
                document.getElementById("msg").style.color = "red";
            }
            else{
                axios.post(couponUrl,couponData).then((res) => {
                    document.getElementById("msg").innerHTML = "Coupon Created Successfully";
                    document.getElementById("msg").style.color = "green";
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    }
    addInstructor = () => {
        var name = document.getElementById("inst_name").value;
        var image = document.getElementById("inst_image").value;
        var desc = document.getElementById("inst_desc").value;
        var courseId = document.getElementById("inst_course").value;
        var sel = document.getElementById("inst_course");
        var course = sel.options[sel.selectedIndex].text;

        document.getElementById("inst_msg").innerHTML = "";

        var instData = {
            name:name,
            image:image,
            rating:'null',
            description:desc,
            number_of_courses:1,
            reviews:'null',
            number_of_students:'null',
            courses:[{
                course_id:courseId,
                course_name:course
            }]
        }
        if(!name || !image || !desc || courseId == 0){
            document.getElementById("inst_msg").innerHTML = "Star(*) fields are required";
            document.getElementById("inst_msg").style.color = "red";
        }
        else{
            axios.post(instUrl, instData).then((res) => {
                document.getElementById("inst_msg").innerHTML = "Instructor Added Successfully";
                document.getElementById("inst_msg").style.color = "green";
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    logout = () => {
        localStorage.removeItem("admin");
        document.getElementsByTagName("body")[0].classList.add("bg-image");
    }
    tableItem = (id) => {
        for(var i = 0; i < 4; i++){
            if(id == `l-${i}`){
                document.getElementById(id).classList.add('active');
                if(id == 'l-0'){
                    this.setState({status:'orders'});
                }
                else if(id == 'l-1'){
                    this.setState({status:'courses'});
                }
                else if(id == 'l-2'){
                    this.setState({status:'instructors'});
                }
                else if(id == 'l-3'){
                    this.setState({status:'users'});
                }
            }
            else{
                document.getElementById(`l-${i}`).classList.remove('active');
            }
            
        }
    }
    render() {
        if(localStorage.getItem("admin")){
            document.getElementsByTagName("body")[0].style.backgroundImage = "none";
            document.getElementsByTagName("body")[0].classList.remove("bg-image");
            return (
                <>
                    {/* <input type="hidden" value={this.state.status} /> */}
                    <header>
                        <nav class="navbar navbar-expand-lg navbar-light">
                            <div class="container-fluid">
                                <div class="d-flex align-items-center h-left">
                                    <a href="#offcanvasExample" class="navbar-brand" data-bs-toggle="offcanvas" role="button" aria-controls="offcanvasExample">
                                        <i class="fas fa-bars"></i>
                                    </a>
                                    <div>
                                        Welcome Admin
                                    </div>
                                </div>
                                <div>
                                    <Link to="/" class="logout" onClick={() => this.logout()}><i class="fas fa-sign-out-alt"></i></Link>
                                </div>
                            </div>
                        </nav>
                    </header>
                    <section class="all-courses">
                        <div class="container">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="search">
                                        <div>
                                            <button type="button" class="btn btn-primary btn-custom" data-bs-toggle="modal" 
                                                data-bs-target="#course-modal" onClick={() => this.newFormModal('new')}>
                                                Add New Course
                                            </button>
                                            <button type="button" class="btn btn-info btn-custom" data-bs-toggle="modal" 
                                                data-bs-target="#instructor-modal">
                                                Add New Instructor
                                            </button>
                                            <button type="button" class="btn btn-success btn-custom" data-bs-toggle="modal" 
                                                data-bs-target="#coupon-modal">
                                                Create Coupon
                                            </button>
                                        </div>
                                        <div class="search-box">
                                            <input type="text" class="form-control" placeholder="Search course" />
                                        </div>
                                    </div>
                                    <div>
                                        {this.state.status == 'courses' &&
                                        <table class="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>Sl No.</th>
                                                    <th>Title</th>
                                                    <th>Trainer Name</th>
                                                    <th>Course Level</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="all-courses">
                                                <TableContent courseData={this.state.allCourse}/>
                                            </tbody>
                                        </table>
                                        }
                                        {this.state.status == 'orders' &&
                                            <Orders orders={this.state.orders} />
                                        }
                                        {this.state.status == 'instructors' &&
                                            <Instructors instructors={this.state.instructors} />
                                        }
                                        {this.state.status == 'users' &&
                                            <Users users={this.state.users} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                        <div class="offcanvas-header">
                            <h5 class="offcanvas-title" id="offcanvasExampleLabel">edureka</h5>
                            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div class="offcanvas-body">
                            <div>
                                <ul class="menu-list">
                                    <li id="l-0" onClick={() => this.tableItem('l-0')}>Bought Courses</li>
                                    <li class="active" id="l-1" onClick={() => this.tableItem('l-1')}>All Courses</li>
                                    <li id="l-2" onClick={() => this.tableItem('l-2')}>All Instructors</li>
                                    <li id="l-3" onClick={() => this.tableItem('l-3')}>All Users</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* <!--Add New Course Modal Form--> */}
                    <div class="modal fade" id="course-modal" tabindex="-1" aria-labelledby="course-modal-label" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="course-modal-label">Add New Course</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p class="msg text-center" id="add_msg"></p>
                                    <div class="row">
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Select Catgory*</label>
                                            <select class="form-select" id="category_id" required>
                                                <option value="0" selected disabled>Select Category</option>
                                                <Category category={this.state.category} />
                                            </select>
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Course Name*</label>
                                            <input class="form-control" placeholder="Course Name" id="sub_category_name" />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Price*</label>
                                            <input class="form-control" placeholder="Price" id="price" required />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Duration*</label>
                                            <input class="form-control" placeholder="Duration" id="duration" required />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Image Url*</label>
                                            <input class="form-control" placeholder="Image Url" id="image_url" required />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Trainer Name*</label>
                                            <input class="form-control" placeholder="Trainer Name" id="trainer_name" required />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Select Level*</label>
                                            <select class="form-select" id="level_badge" required>
                                                <option value="0" selected disabled>Select Level</option>
                                                <option value="Beginner">Beginner</option>
                                                <option value="Intermediate">Intermediate</option>
                                                <option value="All Level">All Level</option>
                                            </select>
                                        </div>
                                        <input type="hidden" id="course_id"/>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <h5 id="message" class="message"></h5>
                                    <button type="button" class="btn btn-secondary btn-custom" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-success btn-post btn-custom" id="btn-show" 
                                        onClick={() => this.postCourse()}>
                                        <span id="btn-text">Add Course</span>
                                        <span id="btn-loader">
                                            <img src="../images/loader.gif" class="img-fluid" width="30"/>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!--Alert Dialog--> */}
                    <div class="modal fade" tabindex="-1" id="alert-dialog" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="alert-title">
                                        <span class="alert-content alert-danger" id="alert-icon">
                                            <i class="fas fa-exclamation-triangle"></i>
                                        </span>
                                        <span class="alert-content alert-danger" id="course-name">Are you sure ?</span>
                                    </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="alert-body">
                                    <p id="item-name" class="item-name"></p>
                                    <div id="loader" class="text-center">
                                        <img src="../images/loader.gif" class="loader img-fluid" width="60" />
                                    </div>
                                    <h5 class="text-center success-text" id="success-text"></h5>
                                    <input type="hidden" id="delete_id" />
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                    <button type="button" class="btn btn-danger" onClick={() => this.deletionConfirm()}>Yes</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!--Coupon Dialog--> */}
                    <div class="modal fade" tabindex="-1" id="coupon-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="alert-title">
                                        Create New Coupon
                                    </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="alert-body">
                                    <p class="msg text-center" id="msg"></p>
                                    <div class="row">
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Coupon Code*</label>
                                            <input class="form-control coupon-code" type="text" placeholder="Coupon Code" id="coupon_code" />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Discount Percent*</label>
                                            <input class="form-control" type="number" placeholder="Discount Percent" id="discount" required />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Expiry Date*</label>
                                            <input class="form-control" type="text" placeholder="mm/dd/yyyy" id="expiry" required />
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Back</button>
                                    <button type="button" class="btn btn-success" onClick={() => this.createCoupon()}>Create</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Instructor Dialog */}
                    <div class="modal fade" tabindex="-1" id="instructor-modal" tabindex="-1" aria-labelledby="exampleModalLabel" a
                        ria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="alert-title">
                                        Add New Instructor
                                    </h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body" id="alert-body">
                                    <p class="msg text-center" id="inst_msg"></p>
                                    <div class="row">
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Name*</label>
                                            <input class="form-control" type="text" placeholder="Name" id="inst_name" />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Image*</label>
                                            <input class="form-control" type="text" placeholder="Image Url" id="inst_image" required />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Description*</label>
                                            <input class="form-control" type="text" placeholder="Description" id="inst_desc" required />
                                        </div>
                                        <div class="col-md-6 input-box">
                                            <label class="form-label">Select Alloted Course*</label>
                                            <select class="form-select" id="inst_course" required>
                                                <option value="0" selected disabled>Select Course</option>
                                                <AllCourse allCourseData={this.state.allCourse} />
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" class="btn btn-success" onClick={() => this.addInstructor()}>Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
        else{
            this.props.history.push('/')
            return (
                <>
                </>
            )
        }
    }
    componentDidMount(){
        axios.get(url).then((res) => {
            this.setState({allCourse:res.data})
        }).catch((err) => {
            console.log(err)
        })

        axios.get(cat).then((res) => {
            this.setState({category:res.data})
        }).catch((err) => {
            console.log(err);
        })
        axios.get(ordersUrl).then((res) => {
            this.setState({orders:res.data})
        })
        axios.get(getInstUrl).then((res) => {
            this.setState({instructors:res.data})
        })
        axios.get(allUsersUrl).then((res) => {
            this.setState({users:res.data})
        })
    }
}
export default Home;
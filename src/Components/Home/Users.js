import React from 'react';

class Users extends React.Component {
    renderRow = ({users}) => {
        if(users){
            var i = 0;
            return users.map((item) => {
                i = i+1;
                return(
                    <tr key={item._id}>
                        <td>{i}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.phone}</td>
                        <td>{item.role}</td>
                    </tr>
                )
            })
        }
    }
    render() {
        return (
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone No.</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow(this.props)}
                </tbody>
            </table>
        )
    }
}
export default Users;
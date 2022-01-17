import React from 'react';

class Orders extends React.Component {
    renderRow = ({orders}) => {
        if(orders){
            var i = 0;
            return orders.map((item) => {
                i = i+1;
                return(
                    <tr key={item._id}>
                        <td>{i}</td>
                        <td>{item.courseName}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td><i className="fas fa-rupee-sign"></i> <b>{item.cost}</b></td>
                        <td>{item.bank}</td>
                        <td>{item.bank_status}</td>
                        <td>{item.date}</td>
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
                        <th>Course Name</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Amount</th>
                        <th>Bank</th>
                        <th>TXN_STATUS</th>
                        <th>Date/Time</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRow(this.props)}
                </tbody>
            </table>
        )
    }
}
export default Orders;
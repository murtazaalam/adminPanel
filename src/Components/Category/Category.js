import React from "react";

const Category = (props) => {
    const renderOptions = ({category}) => {
        if(category){
            return category.map((item) => {
                return (
                    <option key={item._id} value={item._id}>{item.category_name}</option>
                )
            })
        }
    }
    return (
        <>
            {renderOptions(props)}
        </>
    )
}
export default Category;
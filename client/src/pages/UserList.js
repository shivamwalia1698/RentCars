import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DefaultLayout from "../components/DefaultLayout";
import { getAllUsers, admin } from "../redux/actions/userActions";
import Spinner from "../components/Spinner";

function UserList({ match }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllUsers());
    }, []);

    const userList  = JSON.parse(localStorage.getItem("users"));
    console.log(userList);
    const { loading } = useSelector((state) => state.alertsReducer);

      return (
        <DefaultLayout>

            {/* <Row className='mt-3' justify='center'>
               <Col lg={20} sm={24} className='d-flex justify-content-left'>
                    <RangePicker showTime={{format : 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
                </Col>
            </Row>  */}

            {loading == true && (<Spinner/>)}
            <h3 className="text-center mt-2">User List</h3>

            <table className="table">
                <tr>
                <th>sno</th>
                <th>Email</th>
                <th>Action</th>
                </tr>
                {userList.map((val, key) => {
                return (
                    <tr key={key}>
                         <td>{key + 1}</td>
                    <td>{val.username}</td>
                    <td><a onClick={() => {
              dispatch(admin({'username' : val.username}));;
            }} className="btn1">Make it admin</a></td>
                    </tr>
                )
                })}
            </table>

        </DefaultLayout>
    )
}

export default UserList

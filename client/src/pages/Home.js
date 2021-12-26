import React , {useState,useEffect} from 'react'
import { useSelector , useDispatch} from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllCars } from '../redux/actions/carsActions'
import { Col, Row , Divider ,DatePicker ,Checkbox} from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom'


function Home(){
    const {cars } = useSelector(state=>state.carsReducer)
    const {loading} = useSelector(state=>state.alertsReducer)
    const [totalCars , setTotalcars] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllCars())
       
    }, [])

    useEffect(() => {
        setTotalcars(cars)
       
    }, [cars])


    return (
        <DefaultLayout>

            {/* <Row className='mt-3' justify='center'>
               <Col lg={20} sm={24} className='d-flex justify-content-left'>
                    <RangePicker showTime={{format : 'HH:mm'}} format='MMM DD yyyy HH:mm' onChange={setFilter}/>
                </Col>
            </Row>  */}

            {loading == true && (<Spinner/>)}
            
            <Row justify='center' gutter={16} >
                {totalCars.map(car=>{
                    return <Col lg={5} sm={24} xs={24}>
                        <div className='car p-2 bs1 mt-3'>
                            <img src={car.image} className="carimg"/>

                            <div className='car-content d-flex align-items-center justify-content-between'>
                                <div className='text-left pl-2'>
                                    <p>{car.name}</p>
                                    <p> Rent Per Hour {car.rentPerHour} /-</p>
                                </div>
                                <div>
                                    <button className='btn1 mr-2'><Link to={`/booking/${car._id}`}>Book Now</Link></button>
                                </div>
                            </div>
                        </div>
                    </Col> 
                })}
            </Row>

        </DefaultLayout>
    )
}

export default Home

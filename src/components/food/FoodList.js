import {useParams} from "react-router";
import {useState,useEffect,Fragment} from "react";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";

import {FETCH_CATE_INFO,FETCH_CATE_LIST} from "../../actions/types";
import {fetchCategoryFoodList,fetchCategoryInfo} from "../../actions/foodActions";

function FoodList(){
    const {cno}=useParams()
    const dispatch = useDispatch()
    useEffect(() => {
       dispatch(fetchCategoryInfo(cno))
        dispatch(fetchCategoryFoodList(cno))
    }, []);
    const foodList=useSelector((state)=>state.foods.cate_food)
    const cateInfo=useSelector((state)=>state.foods.cate_info)
    const html=foodList.map((food,key)=>
        <table className={"table"} key={food.fno}>
            <tbody>
                <tr>
                    <td width={"30%"} className={"text-center"} rowSpan={"4"}>
                        <NavLink to={"/food/food_detail/"+food.fno}>
                        <img src={food.poster} style={{"width":"250px","height":"180px"}}/>
                        </NavLink>
                    </td>
                    <td width={"70%"}>
                        <h3><NavLink to={"/food/food_detail/"+food.fno}>{food.name}&nbsp;<span style={{"color":"orange"}}>{food.score}</span></NavLink></h3>
                    </td>
                </tr>
                <tr>
                    <td width={"70%"}>{food.address}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{food.phone}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{food.type}</td>
                </tr>
            </tbody>
        </table>
    )
    return (
       <Fragment>
           <div className={"jumbotron"}>
               <h3 className={"text-center"}>{cateInfo.title}</h3>
               <h4 className={"text-center"}>{cateInfo.subject}</h4>
           </div>
           <div className={"row"}>
               <table className={"table"}>
                   <tbody>
                    <tr>
                        <td>
                            {html}
                        </td>
                    </tr>
                   </tbody>
               </table>
           </div>
       </Fragment>
    )
}
export default FoodList
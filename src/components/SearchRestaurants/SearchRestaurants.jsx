import React, { useEffect, useState } from 'react'
import { RESTAURANT_SEARCH_RESULT } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import {Dish, Restaurant} from './index';
import RestaurantError from './Restaurant/RestaurantError';
import Shimmer from '../Shimmer/Shimmer';

function SearchRestaurants(){
    // const navigate = useNavigate();
    const {restSearchId} = useParams();
    const [changeUrl , setChangeUrl] = useState(null);
    const [searchInfo, setSearchInfo] = useState(null)
    const [searchFetchedData, setSearchFetchedData] = useState(null);

    // call everytime when params update
    useEffect(()=>{
        if(restSearchId){
            //Original
            const searchQuery = restSearchId.replaceAll("%", " ").replaceAll("|", " ").replaceAll("/", " ").replaceAll("&", "and").replaceAll(" ", "%20");
            const url = `${RESTAURANT_SEARCH_RESULT}${searchQuery}&trackingId=e9ca664a-c8db-5f6c-ecba-af9fbdf648c4&submitAction=ENTER&queryUniqueId=undefined`;
            
            // corsProxy
            // const searchQuery = restSearchId.replaceAll("%", " ").replaceAll("|", " ").replaceAll("/", " ").replaceAll("&", "and").replaceAll(" ", "%2520");
            // const url = `${RESTAURANT_SEARCH_RESULT}${searchQuery}%26trackingId%3Dundefined%26submitAction%3DENTER%26queryUniqueId%3Dundefined`;
            setChangeUrl(url);
        }
    }, [restSearchId])

    // fetch search api 
    useEffect(()=>{
        const fetchRestaurantSearchData = async()=>{
            try{
              const res = await fetch(changeUrl);
              if(!res.ok){
                throw new Error("Error Serving Search Data");
              }else{
                const data = await res.json();
                setSearchInfo(data?.data?.cards[0]?.card?.card?.tab[0]?.analytics?.context);
                setSearchFetchedData(data?.data?.cards[1]?.groupedCard?.cardGroupMap)
                // console.log("root", data?.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards)
                console.log("root", data)
              }
            }catch (error){
              console.log("Error fetching data:", error)
            }
          };
        if(changeUrl){
            fetchRestaurantSearchData();
        }
    }, [changeUrl])

  return (
    <>
    {!searchFetchedData? (<><Shimmer/></>) : (
        <>
        {searchFetchedData.DISH? (<>
        <Dish searchFoodResult={searchFetchedData?.DISH?.cards} searchName={JSON.parse(searchInfo).query}/>
        </>) : (<>
        {Object.keys(searchFetchedData.RESTAURANT).length === 0? (<>
        <div className='w-full h-[400px] flex items-center justify-center'><h1 className='text-xl font-bold'>No match found for "{JSON.parse(searchInfo).query}"</h1></div>
</>):(
          <>
          {searchFetchedData?.RESTAURANT?.cards?.length === 2? (<>
            <Restaurant 
                searchRestaurantResult={searchFetchedData?.RESTAURANT?.cards[0].card.card.info}
                searchMoreResult={searchFetchedData?.RESTAURANT?.cards[1].card.card.restaurants.slice(0,30)}
                searchName={JSON.parse(searchInfo).query}/>
          </>): (<>
            <RestaurantError 
            searchMoreResult={searchFetchedData?.RESTAURANT?.cards.slice(0,30)}
            searchName={JSON.parse(searchInfo).query}/>
          </>)}
          </>
        )}
        </>)}
        </>
    )}
    </>
  )
}

export default SearchRestaurants
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData:[],
    imageURL:""
}

export const AOSmoviesSlice=createSlice({
    name:'AOSmovies',
    initialState,
    reducers:{
        setBannerData:(state,action)=>{
            state.bannerData= action.payload
        },
        setImageURL :(state,action)=>{
            state.imageURL= action.payload
        }
    }

})

export const {setBannerData,setImageURL} =AOSmoviesSlice.actions;

export default AOSmoviesSlice.reducer
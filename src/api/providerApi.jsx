import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

  const providerApi = createApi({
    reducerPath: 'providerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/service-providers',
        credentials: "include", // Important: Ensures cookies are sent
        prepareHeaders: (headers) => {
            const token = Cookies.get("authToken");
            console.log("token",token)
            if (token) {
              

                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
 endpoints: (builder) => ({
    createProvider: builder.mutation({
            query: (providerData) => ({
                url: '/register',
                method: 'POST',
                body: providerData,
            }),
           
        }),
  
    
    getProviderDetails: builder.query({
        query: (userId) => ({
            url: `/user/${userId}`, 
            method: 'GET',
        }),

       
    }),

    updateProviderDetails:builder.mutation({
        query: (providerData) => ({
            url: "/update",
            method: 'PUT',
            body: providerData,
            }),

    }),

    deleteProviderDetails:builder.mutation({
        query:(providerData)=>({
            url: "/delete",
            method: 'DELETE',
            body: providerData,
        }),
    }),

}),
})



export const { useCreateProviderMutation,useGetProviderDetailsQuery ,useUpdateProviderDetailsMutation ,useDeleteProviderDetailsMutation} = providerApi;
export default providerApi;
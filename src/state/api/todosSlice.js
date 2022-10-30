import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseFetch';

export const todosSlice = createApi({
  reducerPath: 'todos',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAllTodos: builder.query({
      query: (search) => {
        const baseUrl = 'todos';
        let finalUrl = baseUrl;

        if (search && search?.trim() !== '') {
          finalUrl += `?title=${search.trim()}`;
        }

        return finalUrl;
      }
    })
  })
});

// Action creators are generated for each case reducer function
//export const { increment, decrement, incrementByAmount } = todosSlice.actions;

export const { useGetAllTodosQuery } = todosSlice;

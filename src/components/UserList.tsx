import React from "react";
import { fetchUser } from "../hooks/request";
import { useQuery } from "@tanstack/react-query";


function UserList() {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUser,
    });

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }


    return (
        <ul>
            {data.map((user) => (
                <li key={user.id}>{user.name}</li>
            ))}
        </ul>
    );
}

export default UserList;
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/User";


export default function Useuser() {

    const { data, isLoading, error } = useQuery({
        queryKey: ['User'],
        queryFn: async () => {
            const res = await getUser();
            return res?.data || null;
        }
    })



    return {
        User: data,
        loading: isLoading,
        error
    };

}
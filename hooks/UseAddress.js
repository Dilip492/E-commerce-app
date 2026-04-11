import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addtoAddress, deleteAddress, getAddresses, updateAddress } from '../api/address';

//   Get Address 
export const useAddress = () => {
    return useQuery({
        queryKey: ['addresses'],
        queryFn: getAddresses
    });
}

//  Add Address
export const useAddAddress = () => {
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: addtoAddress,
        onSuccess: () => {
            queryclient.invalidateQueries(['addresses']);
        }
    })
}

export const useEditAddress = () => {
    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: ({id , data}) => updateAddress(id , data),
        onSuccess: () => {
            queryclient.invalidateQueries(['addresses']);
        }
    })

}


export const useRemoveAddress = () => {

    const queryclient = useQueryClient();

    return useMutation({
        mutationFn: (id) => deleteAddress(id),
        onSuccess: () => {
            queryclient.invalidateQueries(['addresses'])
        }
    })

}
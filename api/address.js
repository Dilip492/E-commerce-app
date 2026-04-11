import api from './client';


export const addtoAddress = (data) => {
    return api.post('api/user/address', data)
}

// GET all addresses
export const getAddresses = async() => {
    const res = await api.get('/api/user/address');
    return res.data.addresses;
};

// UPDATE address
export const updateAddress = (id, data) => {
    return api.put(`/api/user/address/${id}`, data);
};

// DELETE address
export const deleteAddress = (id) => {
    return api.delete(`/api/user/address/${id}`);
};
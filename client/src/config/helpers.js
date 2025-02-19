import axios from 'axios'


// export const store.getState()
export const helpers = (store) => ({
    get: async (url) => {
        try {
            const response = await axios.get(url)
            return response.data
        } catch (error) {
            return error
        }
    }

});


import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE = 'GET_RECIPE';
export const DEL_RECIPE ='DEL_RECIPE';
export const POST_RECIPE ='POST_RECIPE';
export const PUT_RECIPE = 'PUT_RECIPE';

const API_URL = 'https://recipator.herokuapp.com/api/recipes';

export function getRecipes() {
	const request = axios.get(API_URL);
	return {
		type:GET_RECIPES,
		payload:request
	}
}

export function getRecipe(id){
	const request = axios.get(`${API_URL}/${id}`)
    return {
    	type:GET_RECIPE,
    	payload:request
    }
}

export function deleteRecipe(id){
	const request = axios.delete(`${API_URL}/${id}`)
    return {
    	type:DEL_RECIPE,
    	payload:request
    }
}

export function createRecipe(props){
    const request = axios.post(API_URL, props);
    console.log(request)
    return {
        type: POST_RECIPE,
        payload: request
    }

}

export function updateRecipe(id,props) {
    const request = axios.put(`${API_URL}/${id}`,props)
    return {
        type:PUT_RECIPE,
        payload:request
    }
}
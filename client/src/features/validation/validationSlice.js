import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

const loginFormErrorsAdapter = createEntityAdapter({
    selectId: (error) => error.id,
})

const initialState = {
    loginForm: { errors: {
        // errorType: [{ type, prop, message }]
    }, formData: {} },
    registerForm: { errors: {}, formData: {} },
    reviewForm: { errors: {}, formData: {} },
}

export const validationSlice = createSlice({
    name: "validation",
    initialState,
    reducers: {
        addFormError: (state, action) => {
            var { form, prop, message, type } = action.payload;
            const newError = { prop, message, type }
            var temp = state[form];
            if (Object.keys(temp.errors).includes(prop)) {
                if (temp.errors[prop].map(e => e.type).includes(type)) {
                    return state;
                }
                temp.errors[prop].push(newError);
            } else {
                temp.errors[prop] = [];
                temp.errors[prop].push(newError);
            } 
            var tempState = {...state};   
            state = tempState;
        },
        removeFormError: (state, action) => {
            var { form, prop, type } = action.payload;
            var temp = state[form];
            if (Object.keys(temp.errors).includes(prop) 
                && temp.errors[prop].map(e => e.type).includes(type)) {
                temp.errors[prop].splice(temp.errors[prop].map(e => e.type).indexOf(type), 1);
                if (temp.errors[prop].length === 0) {
                    delete temp.errors[prop];
                }  
            }
            var tempState = {...state};
            tempState[form] = temp;
            state = tempState;
        },
        updateFormData: (state, action) => {
            var { form, name, value } = action.payload;
            var temp = state[form].formData;
            temp[name] = value;
            var tempState = {...state};
            tempState[form].formData = temp;
            state = tempState;
        },
    }
});

export const { addFormError, removeFormError, updateFormData } = validationSlice.actions;

export default validationSlice.reducer;

// export default function validationReducer(state = initialState, action) {
//     switch (action.type) {
//         case "validation/addError":
//             var { form, prop, message, type } = action.payload;
//             const newError = { prop, message, type }
//             var temp = state[form];
//             if (Object.keys(temp.errors).includes(prop)) {
//                 if (temp.errors[prop].map(e => e.type).includes(type)) {
//                     return state;
//                 }
//                 temp.errors[prop].push(newError);
//             } else {
//                 temp.errors[prop] = [];
//                 temp.errors[prop].push(newError);
//             } 
//             var tempState = {...state};   
//             return {...tempState};
        
//         case "validation/removeError":
//             var { form, prop, type } = action.payload;
//             var temp = state[form];
//             if (Object.keys(temp.errors).includes(prop) 
//                 && temp.errors[prop].map(e => e.type).includes(type)) {
//                 temp.errors[prop].splice(temp.errors[prop].map(e => e.type).indexOf(type), 1);
//                 if (temp.errors[prop].length === 0) {
//                     delete temp.errors[prop];
//                 }  
//             }
//             var tempState = {...state};
//             tempState[form] = temp;
//             return {...tempState};
        
//         case "validation/updateForm":
//             var { form, prop, value } = action.payload;
//             var temp = state[form].formData;
//             temp[prop] = value;
//             var tempState = {...state};
//             tempState[form].formData = temp;
//             return {...tempState};
//         default:
//             return state;
            
//     }
//   }
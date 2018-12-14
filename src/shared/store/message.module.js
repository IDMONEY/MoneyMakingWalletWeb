const ADD_TOAST_MESSAGE = "@@toast/ADD_TOAST_MESSAGE";

const actions = {
    showError({dispatch},message) { 
        console.log(message);        
        let displayedMesssage = "There was an error saving changes!!";
        if(!(message === undefined || message === null || message === '')){
            displayedMesssage = message;
        }        
        dispatch(ADD_TOAST_MESSAGE, { text:displayedMesssage, type:'danger', dismissAfter: 5000 }, { root: true });        
    },
    showSuccess({dispatch}) {
        dispatch(ADD_TOAST_MESSAGE, { text:'Changes Saved Successfully !!!', type:'success', dismissAfter: 3000 }, { root: true });        
    },
    handleError({dispatch},{error},message){
        if (error.response) {                        
            if(error.response.status !== undefined){                            
                if(error.response.status === 401){
                    dispatch('showError',"Session Expired!"); 
                    router.push('/login');                                                                                         
                }else if(error.response.status === 500){
                    dispatch('showError', message);                              
                }else if(error.response.status !== 404){                    
                    dispatch('showError',"There was an error");                    
                }
            }
        }else if (error.request) {                                  
            dispatch('showError',"There was an error connecting to the server");
        } else {                        
            if(error.message !== undefined){   
                console.log('Error:', error.message);
            }
            dispatch('showError',"There was an error connecting to the server");
        }       
    },
    errorCatch({dispatch},error){     
        if(error === undefined){               
            dispatch('showError',"There was an error connecting to the server");
        }else{            
            console.log('ErrorCatch:', error);
            dispatch('showError',"There was an error");
        }
    }
};

export const message = {
    namespaced: true,    
    actions    
};
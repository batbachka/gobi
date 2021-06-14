import fetch from 'fetch-everywhere';
import querystring from 'querystring';
import config from '../config';
// import Cookies from "js-cookie";

export function requestGet(requestActions,url, requestParams = null,header={}) {
    return dispatch => {
        dispatch(requestStart(requestParams,requestActions));
        // if(Cookies.get('token') != null){
        //     header = {
        //         ...header,
        //         token: Cookies.get('token')
        //     }
        // }
        header = {
            ...header,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        let currentUrl = `${url}`;
        if(requestParams){
            currentUrl +='?'+querystring.stringify(requestParams)
        }
        return fetch(currentUrl, {
            method: 'get',
            headers: header,
            credentials: 'include'
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else {
                    if(response.status == 404) {
                        if(config.get('emitter'))
                            config.get('emitter').emit('not-found');
                    }
                    if(response.status == 401){
                        if(config.get('emitter'))
                            config.get('emitter').emit('auth-error');
                    }
                    return {
                        success:false,
                        status:response.status,
                        sucmod:false,
                        alemod:false,
                        redirect:false,
                    }
                }
            })
            .then(json => {
                if(!json.success){
                    config.get('emitter').emit('error',json.msg);
                }
                if(json.sucmod) {
                    config.get('emitter').emit('success',json.msg);
                }
                if(json.alemod) {
                    config.get('emitter').emit('warning',json.msg);
                }
                if(json.redirect){
                    window.location.assign('/'+json.redirect);
                }
                dispatch(requestEnd(json,requestActions))
            })
            .catch(error => {
                dispatch(requestEnd({success:false,error:error,data:requestParams},requestActions))
            });

    }

}
export function requestPost(requestActions,url,data,requestParams = null,header={}) {
    return dispatch => {
        dispatch(requestStart(data,requestActions));
        // if(Cookies.get('token') != null){
        //     header = {
        //         ...header,
        //         token: Cookies.get('token')
        //     }
        // }
        header = {
            ...header,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        let option = {
            method: 'post',
            headers: header,
            credentials: 'include'
        };
        if(typeof data == 'object'){
            option = {
                ...option,
                body: JSON.stringify(data)
            }
        }
        let currentUrl = `${url}`;
        if(requestParams){
            currentUrl +='?'+querystring.stringify(requestParams)
        }
        return fetch(currentUrl, option)
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else {
                    if(response.status == 404) {
                        if(config.get('emitter'))
                            config.get('emitter').emit('not-found');
                    }
                    if(response.status == 401){
                        if(config.get('emitter'))
                            config.get('emitter').emit('auth-error');
                    }
                    return {
                        success:false,
                        status:response.status,
                        sucmod:false,
                        alemod:false,
                        redirect:false,
                    }
                }
            })
            .then(json => {
                if(!json.success){
                    config.get('emitter').emit('error',json.msg);
                }
                if(json.sucmod) {
                    config.get('emitter').emit('success',json.msg);
                }
                if(json.alemod) {
                    config.get('emitter').emit('warning',json.msg);
                }
                if(json.redirect){
                    window.location.assign('/'+json.redirect);
                }
                dispatch(requestEnd(json,requestActions));
            })
            .catch(error => {
                dispatch(requestEnd({success:false,error:error,data:data},requestActions));

            });

    }

}
function requestStart(json,requestActions) {
    return {
        type: requestActions.REQUEST,
        json
    }
}
function requestEnd(json,requestActions) {
    return {
        type: requestActions.RESPONSE,
        json
    }
}

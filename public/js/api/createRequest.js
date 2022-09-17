/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    let xhr = new XMLHttpRequest();
    let url = new URL(options.url, window.location.origin);
    let data = options.data;

    if(options.method == 'GET'){
        url = urlWithParam(url, data);
        data = null;
    } else {
        data = data ? createFormData(data) : null;
    } 

    try{
        xhr.open(options.method, url);
        xhr.responseType = 'json'; 
        xhr.send(data);        
    } catch(e){
        options.callback(e)
    }

    xhr.onload = () => {  
        if(xhr.response){
            if(xhr.response.success){
                options.callback(null, xhr.response)
            } else {
                options.callback(xhr.response.error)
            }            
        } else {
            throw new Error('Ошибка запроса')
        }
    }
    xhr.onerror = () => {
        console.log('Ошибка запроса')
    }
};

function urlWithParam(url, reqObj){
    if(reqObj){
        const queries = Object.entries(reqObj);
        if(queries.length){
            queries.forEach(req => url.searchParams.set(req[0], req[1]) )
        }
    }

    return url
}

function createFormData(data){
    let formData = new FormData;
    let queries = Object.entries(data);
    if(queries.length){
        queries.forEach(req => {
            formData.append(req[0], req[1])

        } )
    }

    return formData
}
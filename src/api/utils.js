import axios from 'axios'

// 添加请求头
export function uploading(e) {
    let params = new FormData()
    params.append('file', e, "file_" + Date.parse(new Date()) + ".png")
    let config = {
        headers: {'Content-Type': 'multipart/form-data'}
    }
    var data = new Promise(function (resolve, reject) {
        axios.post('http://edu.cqzuxia.com/uploading', params, config).then(response => {
            resolve(response.data);
        })
    })
    return data;
    //return { "msg": "1", "name": "166bf47fdd056baa8c048b11c64bbee181cdf327_0.3740_.png", "count": 1 };
}
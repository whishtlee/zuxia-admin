import request from '@/utils/request'
// var redis = require("redis")
//
//console.log(redis)
//
//var client = redis.createClient({
//    port: 6379,
//    host: 'cache_redis_master',
//    retry_strategy: function (options) {
//        if (options.error && options.error.code === 'ECONNREFUSED') {
//            return new Error('The server refused the connection');
//        }
//        if (options.total_retry_time > 1000 * 60 * 60) {
//            return new Error('Retry time exhausted');
//        }
//        if (options.attempt > 10) {
//            return undefined;
//        }
//        return Math.min(options.attempt * 100, 3000);
//    }
//});
//
//// 链接超时
//client.on("error", function (error) {
//    // console.log('redis 连接失败');
//});

export function login(username, password) {
    return request({
        url: '/LoginRel/web',
        method: 'post',
        params: {
            username,
            password
        },
        withCredentials:false
    })
}

export function getInfo(userid) {
    return request({
        url: '/UserItp/getInfo',
        method: 'get',
        params: {userid}
    })
}

export function getSchoolMenu() {
    let school = [], grade = [], cls = []
    let promise = request({
        url: '/UserItp/collegeAndClass',
        method: 'post',
        params
    })
    promise.then((d) => {
        for (const sc of d.college) {
            if (sc.pid == 0) {
                school.push(sc)
            }
        }
        for (const gc of d.college) {
            for (const sc of school) {
                if (gc.pid == sc.id) {
                    gc.school = sc.title
                    grade.push(gc)
                }
            }
        }
        for (const cc of d.college) {
            for (const gc of grade) {
                if (cc.pid == gc.id) {
                    cc.schoolId = gc.pid
                    cc.school = gc.school
                    cc.grade = gc.title
                    cls.push(cc)
                }
            }
        }
        d.school = school;
        d.grade = grade;
        d.cls = cls
    })
    return promise
}

export function logout() {
    return request({
        url: '/LoginItp/logout',
        method: 'post'
    })
}

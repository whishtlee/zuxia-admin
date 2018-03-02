import request from '@/utils/request'

//  查询大学班级
// export function college(params) {
//     let school = [], grade = [], cls = []
//     let promise = request({
//         url: '/UserItp/collegeAndClass',
//         method: 'post',
//         params
//     })
//     promise.then((d) => {

//         for (const sc of d.college) {
//             if (sc.pid == 0) {
//                 school.push(sc)
//             }
//         }

//         for (const gc of d.college) {
//             for (const sc of school) {
//                 if (gc.pid == sc.id) {
//                     gc.school = sc.title
//                     grade.push(gc)
//                 }
//             }
//         }

//         for (const cc of d.college) {
//             for (const gc of grade) {
//                 if (cc.pid == gc.id) {
//                     cc.schoolId = gc.pid
//                     cc.school = gc.school
//                     cc.grade = gc.title
//                     cls.push(cc)
//                 }
//             }
//         }

//         d.school = school;
//         d.grade = grade;
//         d.cls = cls
//     })
//     return promise
// }

export function college(params) {
    return request({
        url: '/UserItp/collegeAndClass',
        method: 'post',
        params
    })
}

export function collegeAdmin(params) {
    return request({
        url: '/UserItp/collegeAdmin',
        method: 'post',
        params
    })
}

export function agreeJoin(cid,uid) {
     return request({
        url: '/UserItp/agreeStudent',
        method: 'post',
        params : {
            userid: uid,
            classid: cid
        }
    })
}
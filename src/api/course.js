import request from '@/utils/request'
import { parseTime } from '@/utils/index'

//  获取我的专辑列表
export function getAlbumList(params) {
    return request({
        url: '/Group/getGroup?status=4&isAbs=1',
        method: 'get',
        params
    })
}

//  创建专辑进入审核
export function createAlbum(params) {
    return request({
        url: '/Process/albumApply',
        method: 'post',
        params
    })
}

//  更新专辑信息
export function updateAlbum(params) {
    return request({
        url: '/Group/albumSetApply255',
        method: 'post',
        params
    })
}

//  删除专辑信息
export function deleteAlbum(params) {
    return request({
        url: '/AlbumSafe/del336',
        method: 'post',
        params
    })
}

// 获取定价与套餐
export function getPackageList(params) {
    return request({
        url: '/MessageSafeOut/myFee',
        method: 'get',
        params
    })
}

//  删除定价与套餐
export function deletePage(params) {
    return request({
        url: '/MessageSafeInShare/delFee338',
        method: 'post',
        params
    })
}

//  创建定价与套餐
export function createPage(params) {
    return request({
        url: '/MessageSafeInShare/createFee',
        method: 'post',
        params
    })
}

//  更新定价与套餐
export function updatePage(params) {
    return request({
        url: '/MessageSafeInShare/updateFee',
        method: 'post',
        params
    })
}

//  获取专辑列表
export function getPageAlbumList(params) {
    return request({
        url: '/AlbumSafe/myAlbum380',
        method: 'post',
        params
    })
}

//  根据专辑ID 获取专辑内视频
export function getPageAlbumVideo(params) {
    return request({
        url: '/MessageOut/getAblumCourse380',
        method: 'post',
        params
    })
}

//  把视频加入或者移除套餐 type = ture 加入
export function joinOrRemovePack(params, type) {
    if (type) {
        return request({
            url: '/MessageSafeInShare/courseInPage',
            method: 'post',
            params
        })
    } else {
        return request({
            url: '/MessageSafeInShare/courseOutPage',
            method: 'post',
            params
        })
    }
}

//  卡券中心
export function cardCenter(params) {
    let promise = request({
        url: '/Card/couponReceiveCenter',
        method: 'post',
        params
    })
    promise.then((d) => {
        for (var i in d.list) {
            d.list[i].endtime = parseTime(d.now + d.list[i].activetime, '{y}-{m}-{d}');
            d.list[i].starttime = parseTime(d.list[i].starttime, '{y}-{m}-{d}');
        }
    })
    return promise
}

//  未使用，已使用，未支付，已过期
export function cardOtherList(params) {
    return request({
        url: '/Card/userCouponList',
        method: 'post',
        params
    })
}

//  销售历史账单列表
export function getSalesList(params) {
    return request({
        url: '/MessageSafeOut/billCourse',
        method: 'post',
        params
    })
}

//  销售历史报表
export function getReport(params) {
    let promise = request({
        url: '/MessageSafeOut/courseReportForm',
        method: 'post',
        params
    })
    let x = [], y = []
    promise.then((d) => {
        for (const re of d.list) {
            x.push(re.key);
            y.push(re.value);
        }
        d.x = x
        d.y = y
    })
    return promise
}

//  赠送好友查询
export function getMyFriends(params) {
    return request({
        url: '/MessageSafeOut/myFriend',
        method: 'post',
        params
    })
}

//  赠送好友卡券
export function giveCard(params) {
    return request({
        url: '/Card/giveCard',
        method: 'post',
        params
    })
}

//  我发布的卡券列表
export function getMyCardList(params) {
    return request({
        url: '/Card/couponList',
        method: 'post',
        params
    })
}

//  赠送好友查询
export function getMyFriendsOrFans(params) {
    return request({
        url: '/MessageSafeOut/myFanceAndFollowAblumUser',
        method: 'post',
        params
    })
}


//  停止发行我发布的卡券
export function getStopCard(id) {
    return request({
        url: '/Card/closeCoupon',
        method: 'post',
        params: {
            couponid: id
        }
    })
}

//  赠送好友我发布的卡券
export function giveMyCard(id, uid) {
    return request({
        url: '/Card/giveCouponUserin',
        method: 'post',
        params: {
            couponid: id,
            userid: uid
        }
    })
}

//  获取适合类型
export function commodity(params) {
    return request({
        url: '/Card/myCommodity',
        method: 'post',
        params
    })
}

//  发行赠送卡券
export function issueGiveCard(params) {
    params.activetime = params.activetime * 60 * 60
    return request({
        url: '/Card/addGiveCoupon',
        method: 'post',
        params
    })
}

//  发行普通
export function issueOrdinaryCard(params) {
    params.activetime = params.activetime * 60 * 60
    return request({
        url: '/Card/addCoupon',
        method: 'post',
        params
    })
}

//  学习记录
export function getRecordList(params) {
    return request({
        url: '/MessageSafeOut/coursePlaybackRecord',
        method: 'post',
        params
    })
}
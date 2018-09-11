var postsData = require('../../data/posts-data.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 页面初始化 option为页面跳转所带来的参数
        this.setData({
            posts_key: postsData.postList
        })
    },

    onPostTap: function(event) {
        var postId = event.currentTarget.dataset.postid;
        // console.log("on post id is " + postId);
        wx.navigateTo({
            url: "post-detail/post-detail?id=" + postId
        })
    },


    // onSwiperItemTap: function(event) {
    //     var postId = event.currentTarget.dataset.postid;
    //     // console.log("on post id is " + postId);
    //     wx.navigateTo({
    //         url: "post-detail/post-detail?id=" + postId
    //     })
    // },

    onSwiperTap: function(event) {
        // target 和current
        // target 指的是当前点击的组件 currentTarget指的是时间捕获的组件
        // target 这里指的是image，而currentTarget指的是swiper
        var postId = event.target.dataset.postid;
        wx.navigateTo({
            url: "post-detail/post-detail?id=" + postId
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
var postsData = require('../../../data/posts-data.js')
var app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // var globalData = app.globalData
        var postId = options.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        })

        // wx.setStorageSync('key', {
        //     game: '风暴英雄',
        //     developer: '暴雪'
        //     })
        // wx.setStorageSync('key1', {
        //     game: 'LOL',
        //     developer: '拳头'
        // })

        var postsCollected = wx.getStorageSync('posts_collected')
        if (postsCollected) {
            var postCollected = postsCollected[postId]
            if (postCollected) {
                this.setData({
                    collected: postCollected
                })
            }
        } else {
            var postsCollected = {}
            postsCollected[postId] = false
            wx.setStorageSync("posts_collected", postsCollected)
        }
        if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
            this.setData({
                isPlayingMusic: true
            })
        }
        this.setMusicMonitor()
    },

    setMusicMonitor: function() {
        var that = this
        wx.onBackgroundAudioPlay(function() {
            that.setData({
                isPlayingMusic: true
            })
            app.globalData.g_isPlayingMusic = true
            app.globalData.g_currentMusicPostId = that.data.currentPostId
        })
        wx.onBackgroundAudioPause(function() {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false
            app.globalData.g_currentMusicPostId = null
        })
        wx.onBackgroundAudioStop(function () {
            that.setData({
                isPlayingMusic: false
            })
            app.globalData.g_isPlayingMusic = false
            app.globalData.g_currentMusicPostId = null
        })
    },

    onCollectionTap: function(event) {
        this.getPostsCollectedSyc()
        // this.getPostsCollectedAsy()
    },

    getPostsCollectedAsy: function() {
        var that = this
        wx.getStorage({
            key: "posts_collected",
            success: function(res) {
                var postsCollected = res.data
                var postCollected = postsCollected[that.data.currentPostId]
                postCollected = !postCollected
                postsCollected[that.data.currentPostId] = postCollected
                that.showModal(postsCollected, postCollected)
            }
        })
    },

    getPostsCollectedSyc: function() {
        var postsCollected = wx.getStorageSync("posts_collected")
        var postCollected = postsCollected[this.data.currentPostId]
        postCollected = !postCollected
        postsCollected[this.data.currentPostId] = postCollected
        this.showModal(postsCollected, postCollected)
    },

    showModal: function(postsCollected, postCollected) {
        var that = this
        wx.showModal({
            title: '收藏',
            content: postCollected ? '收藏该文章？' : '取消收藏该文章？',
            showCancel: 'ture',
            cancelText: "取消",
            cancelColor: "#333",
            confirmText: "确认",
            confirmColor: "#405f80",
            success: function(res) {
                if (res.confirm) {
                    wx.setStorageSync("posts_collected", postsCollected)
                    that.setData({
                        collected: postCollected
                    })
                }
            }
        })
    },

    // showToast: function (postsCollected, postCollected){
    //     wx.getStorageSync('posts_collected', postsCollected)
    //     this.setData({
    //         collected: postCollected
    //     })
    //     wx.showToast({
    //         title: postCollected?'收藏成功':'取消成功',
    //         duration: 1000,
    //         icon: 'success'
    //     })
    // },

    onShareTap: function(event) {
        var itemList = ["分享給微信好友",
            "分享到朋友圈",
            "分享到QQ",
            "分享到微博"
        ]
        // wx.removeStorageSync('key')
        // wx.clearStorageSync()
        wx.showActionSheet({
            itemList: itemList,
            itemColor: "#405f80",
            success: function(res) {
                wx.showModal({
                    title: '用戶分享到了' + itemList[res.tapIndex],
                    content: '用戶是否取消' + res.cancel + '現在還不能分享',
                })
            }
        })
    },

    onMusicTap: function(event) {
        var currentPostId = this.data.currentPostId
        var postData = postsData.postList[currentPostId]
        var isPlayingMusic = this.data.isPlayingMusic;
        if (isPlayingMusic) {
            wx.pauseBackgroundAudio();
            this.setData({
                isPlayingMusic: false
            })
        } else {
            wx.playBackgroundAudio({
                dataUrl: postData.music.url,
                title: postData.music.title,
                coverImgUrl: postData.music.coverImg
            })
            this.setData({
                isPlayingMusic: true
            })
        }



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
const Post = require('../models/post')
const config = require('../config/config')

module.exports = {
    async addpost (req, res) {      
        try {
            Post.count({}, function(err, count) {
                if(err) {
                    res.status(400).send({error: 'count 단위에서 오류'})
                }
                else {
                    if(!count) {
                        var postCount = 1
                    }
                    else {
                        var postCount = count + 1
                    }
                    var urlTitle = req.body.title.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\(\=]/gi, "").replace(/ /gi, "-")
                    req.body.postId = postCount
                    req.body.postUrl = postCount + "-" + urlTitle

                    Post.create(req.body, function(err, post) {
                        if(err) {
                            res.status(400).send({error: '포스트 등록에 실패하였습니다.'})
                        }
                        else {
                            res.send({
                                message: '성공적으로 포스트가 등록되었습니다.'
                            })
                        }
                    })
                }
            })
        } catch (err) {
            res.status(500).send({
                error: '포스트 등록 서버에 문제가 발생했습니다. 다시 시도해 주세요.'
            })
        }
    },
    async editpost (req, res) {      
        try {
            var update = req.body

            var urlTitle = update.title.replace(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\(\=]/gi, "").replace(/ /gi, "-")
            update.postUrl = update.editId + "-" + urlTitle

            console.log(update)

            Post.update(
                {
                    postId: update.editId,
                }, 
                { $set:
                    {
                        title: update.title,
                        content: update.content,
                        editeddate: update.editeddate,
                        category: update.category,
                        postUrl: update.postUrl
                    }
                }, function(err, update) {
                    if(err) {
                        res.status(400).send({error: '포스트 수정에 실패하였습니다.'})
                    }
                    else {
                        res.send({
                            message: '성공적으로 포스트가 수정되었습니다.'
                        })
                    }
            })
        } catch (err) {
            res.status(500).send({
                error: '포스트 수정 중 서버에 문제가 발생했습니다. 다시 시도해 주세요.'
            })
        }
    },
    async viewpost (req, res) {
        try {
            const postId = req.body.postId
            const post = await Post.findOne({ postId: postId })
            if(!post) {
                return res.status(403).send({
                    error: '요청하신 포스트는 존재하지 않습니다.'
                })
            }
            const postJson = post.toJSON()
            res.send({
                post: postJson
            })
        } catch (err) {
            res.status(500).send({
                error: '포스트 호출 중 오류가 발생했습니다.'
            })
        }
    },
    async listpost (req, res) {
        try {
            const post = await Post.find({})
            if(!post) {
                return res.status(403).send({
                    error: '요청하신 포스트는 존재하지 않습니다.'
                })
            }
            res.send(post)
        } catch (err) {
            res.status(500).send({
                error: '포스트 호출 중 오류가 발생했습니다.'
            })
        }
    }
}

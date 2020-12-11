const Post = require('../models/Post');
const User = require('../models/User');


//All Posts
exports.allPosts = async (req, res) => {
    const posts = await Post.find()
    res.status(200).json(posts)
}

// All Users Posts
exports.getAllUserPosts = async (req, res) => {
    const userId = req.user._id
    const { posts } = await User.findById(userId).populate('posts')
    res.status(200).json(posts)
}

// View Post Details
exports.getPostDetail = async (req, res) => {
    const { postId } = req.params
    const post = await Post.findById(postId).populate('userId')

    res.status(200).json(post)
}

// Create Post
exports.createPost = async (req, res) => {
    const { title,
        summary,
        comment,
        image
    } = req.body
    const userId = req.user._id
    console.log(req.body)

    if (!title || !comment) {
        return res
            .status(403)
            .json({ message: "You need to put a title and some content to your post" })
    }

    const newPost = await Post.create({
        userId,
        title,
        summary,
        comment,
        image
    })
    await User.findByIdAndUpdate(userId, { $push: { posts: newPost._id } })
    res.status(201).json(newPost)
}

// Update a post
exports.updatePost = async (req, res) => {
    const { postId } = req.params
    const { title,
        summary,
        comment,
        image
    } = req.body

    if (!title || !comment) {
        return res
            .status(401)
            .json({ message: "You need to put a title and some content to your post" })
    }

    const updatePost = await Post
    .findByIdAndUpdate(postId, {
        title,
        summary,
        comment,
        image
    }, { new: true })

    res.status(200).json(updatePost)
}



// Delete post
exports.deletePost = async (req, res) => {
    const { postId } = req.params
    await Post.findByIdAndDelete(postId)
    res.status(200).json({ message: 'post deleted' })
}






const Recomendation = require('../models/Recomendations');
const User = require('../models/User');


//Get Recommendations by crypto for showing... missing filtering by crypt, might just filter on the frontend 
//   exports.getcryptoRecomendations = async (req, res) => {
//       const recomsFiltered={
//           'BTC':[],
//           'XRP':[],
//           'ETH':[]
//       }
//       const { crypt } = req.params
//       const { recomendations } = await Recomendation.find()
//       recomendations.forEach(recomendation=>{
//           recomendationsFiltered
//       })
//       res.status(200).json(recomendations)
//   }

// Get all recommendations
exports.allRecommendations = async (req, res) => {
    const recomendations = await  Recomendation.find().populate('userId')

    res.status(200).json(recomendations)
}

exports.getAllUserRecoms= async (req, res) =>{
    const userId=req.user._id
    const {recomendations}=await User.findById(userId)
    res.status(200).json(recomendations)
}

// create
exports.creatRecomendation = async (req, res) => {
    const userId=req.user._id
    const { 
        title,
        estimate,
        actual,
        crypto,
        surprise,
        recomendation} = req.body
    const newRecomendation = await Recomendation.create({
        userId,
        title,
        estimate,
        actual,
        crypto,
        surprise,
        recomendation
    })
res.status(201).json(newRecomendation)
}

//Recommendation Detail
exports.getRecomDetail = async (req, res) => {
    const { recomendationId } = req.params
    const recom = await  Recomendation.findById(recomendationId).populate('userId')

    res.status(200).json(recom)
}

// update
exports.updateRecomendations = async (req, res) => {
    console.log(req.params)
    const { recomendationId } = req.params
    const {
        title,
        estimate,
        actual,
        surprise,
        recomendation } = req.body

    const updatedRecomendation = await Recomendation.findByIdAndUpdate(recomendationId, {
        title,
        estimate,
        actual,
        surprise,
        recomendation
    }, { new: true })

    res.status(200).json(updatedRecomendation)
}

 exports.deleteRecomendation = async (req, res) => {
     const { recomendationId } = req.params
     await Recomendation.findByIdAndDelete(recomendationId)
     res.status(200).json({ message: 'recomendation deleted' })
 }





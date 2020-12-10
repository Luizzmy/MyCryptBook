const Router=require('express')
const {
    allRecommendations,
    creatRecomendation,
    getAllUserRecoms,
    updateRecomendations,
    getRecomDetail,
    deleteRecomendation
}=require('../controllers/recomendations')

const {
    catchErrs,
    isAuth
}=require('../middlewares/auth')

const router=Router()

//Create Recomendation
router.post('/create', isAuth, catchErrs(creatRecomendation))

//Update Recomendation
router.put('/edit/:recomendationId', isAuth, catchErrs(updateRecomendations))

//List All Recomendations
router.get('/allRecomendations', isAuth, catchErrs(allRecommendations))

//List All Users posts
router.get('/allUserRecoms', isAuth, catchErrs(getAllUserRecoms))

//Recom Details
router.get('/detail/:recomendationId', isAuth, catchErrs(getRecomDetail))

//List All Crypto Recomendations
// router.get('/:crypt/recommendations', isAuth, catchErrs())

//Delete Recomendation
router.get('/delete/:recomendationId', isAuth, catchErrs(deleteRecomendation))

module.exports=router
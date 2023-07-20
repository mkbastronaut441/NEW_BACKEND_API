import Joi from "joi";
import CustomErrorHandler from "../../services/CustomErrorHandler";
import{User} from '../../models';

const registerController={
   async register(req,res,next){

        const registerSchema=Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}')).required(),
            repeat_password:Joi.ref('password')
        });

        const {error}=registerSchema.validate(req.body);


        if(error){
            return next(error);
            
        }

        try{
            const exist= await User.exists({email: req.body.email});
            if(exist){
                return next(CustomErrorHandler.alreadyExist('This email is already in use'));
            }



        }catch(err){
            return next(err);
        }


            res.json({msg:"hello"})
    }
}

export default registerController;
const BaseJoi = require('joi')
const sanitizeHtml = require('sanitize-html')

//protect from xss 
const extension = (joi) => ({
    type:'string',
    base:joi.string(),
    messages:{
        'string.escapeHTML':'{{#label}} must not include HTML',
    },
    rules:{
        escapeHTML:{
            validate(value,helpers){
                const clean = sanitizeHtml(value,{
                    allowedTags:[],
                    allowedAttributes:{},
                })
                if(clean !== value)
                    return helpers.error('string.escapeHTML',{value})
                return clean;
            }
        }
    }
})


const Joi = BaseJoi.extend(extension);


module.exports.postSchema = Joi.object({
    title:Joi.string().required().escapeHTML(),
    author:Joi.string().required().escapeHTML(),
    content:Joi.string().required().escapeHTML()
})




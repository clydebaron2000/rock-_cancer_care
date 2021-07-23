const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const crypto = require('crypto')


const storage = new GridFsStorage({
    url: require('../../config/uri')(),
    options: {
        useNewURLParser:true,
        userUnifiedTopology:true
    },
    file:(req,file)=>{
        const match=['image/png','image/jpg','image/jpeg']
        if (match.indexOf(file.mimetype) === -1){
            const filename = `${Date.now()}`
            return filename 
        }
        return {
            bucketName:'photos',
            fileName: `${Date.now()}`
        }
    }
})
module.exports = multer({storage})

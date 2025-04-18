

export default  () => {
    return {
        app : {
            port: process.env.PORT
        },

        jwt: {
            secret: process.env.JWT_SECRET,
            expiry: process.env.JWT_EXPIRY
        },

        cloudinary: {
            name: process.env.CLOUDINARY_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
            apiSecret: process.env.CLOUDINARY_API_SECRET
        }
    }
}
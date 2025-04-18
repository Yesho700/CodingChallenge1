

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
        },

        admin: {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        },

        db: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            name: process.env.DB_NAME,
            sync: process.env.DB_SYNC
        }
    }
}
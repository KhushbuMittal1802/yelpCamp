const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64a8fbfd27777e88220f2bb3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur veniam recusandae ex quasi repudiandae consequuntur magni optio voluptas non itaque nemo eos deserunt officia, delectus cupiditate assumenda veritatis soluta fugiat.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/de0ozz7os/image/upload/v1688886282/YelpCamp/eoe8telqio6d65tvllc8.jpg',
                  filename: 'YelpCamp/eoe8telqio6d65tvllc8'
                },
                {
                  url: 'https://res.cloudinary.com/de0ozz7os/image/upload/w_200/v1688886403/YelpCamp/kc9mf7x8kmjwabbckhxq.jpg',
                  filename: 'YelpCamp/kc9mf7x8kmjwabbckhxq'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
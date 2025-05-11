import mongoose, {Schema} from "mongoose";
import config from "./config";
import User from "./models/User";
import TrackHistory from "./models/TrackHistory";
import Track from "./models/Track";
import Album from "./models/Album";
import Artist from "./models/Artist";



const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try{
        await db.dropCollection("users");
        await db.dropCollection("trackHistories");
        await db.dropCollection("artists");
        await db.dropCollection("albums");
        await db.dropCollection("tracks");
    }catch(err){
        console.log('Collections are not present');
    }

    const [firstUser, secondUser] = await User.create(
        {
            username: "John",
            password: '123456',
            token: crypto.randomUUID(),
            role: "user"
        },
        {
            username: "Selena",
            password: '123456',
            token: crypto.randomUUID(),
            role: "admin"
        }
    )

    await Album.create(
        {
            artist: "Ed Sheeran",
            title: "1231231",
            date: Date,
            image: 'fixtures/test.jpeg'

        },
        {
            artist: "Ed Sheeran",
            title: "1231231",
            date: Date,
            image: 'fixtures/test.jpeg'

        },
        {
            artist: "Ed Sheeran",
            title: "1231231",
            date: Date,
            image: 'fixtures/test.jpeg'

        },
        {
            artist: "Ed Sheeran",
            title: "1231231",
            date: Date,
            image: 'fixtures/test.jpeg'

        }
    )

    await Track.create(
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 1
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 2
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 3
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 4
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 5
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 6
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 7
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 8
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 9
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 10
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 11
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 12
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 13
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 14
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 15
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 16
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 17
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 18
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 19
        },
        {
            album: "John",
            title: '123456',
            duration: crypto.randomUUID(),
            number: 20
        },
    )

    await TrackHistory.create(
        {
            user: firstUser._id,
            track: '12312',
            dateTime: Date,
            token: crypto.randomUUID()
        },
        {
            user: secondUser._id,
            track: '123123',
            dateTime: Date,
            token: crypto.randomUUID()
        }
    )

    await Artist.create([
        {
            name: "Ed Sheeran",
            image: 'fixtures/test.jpeg',
            description: "British singer-songwriter"
        },
        {
            name: "Taylor Swift",
            image: 'fixtures/test.jpeg',
            description: "American pop star"
        }
    ]);


    await db.close();
};

run().catch(console.error);
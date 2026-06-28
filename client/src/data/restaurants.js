import mangoTree from "../assets/images/undermango tree.avif";
import rajDarbar from "../assets/images/Rajdarabr.webp";
import countrySide from "../assets/images/country side coulture.webp";
import pizzaPalace from "../assets/images/pizza palace.PNG";
import burgerHub from "../assets/images/burger hub.JPG";
import spiceKitchen from "../assets/images/spice kitchen.avif";

export const restaurants = [
    {
        id: 1,
        name: "Under The Mango Tree",
        image: mangoTree,
        rating: 3.6,
        description:
            "Enjoy the thrill of grill Under The Mango Tree restaurant at Jehan Numa Palace.",
        tags: ["Indian", "Chinese", "Italian"],
    },

    {
        id: 2,
        name: "Raj Darbar",
        image: rajDarbar,
        rating: 4.8,
        description:
            "Raj Darbar offers a dining experience for families and friends with a dhaba-style theme.",
        tags: ["Indian", "Chinese", "Italian"],
    },

    {
        id: 3,
        name: "Countryside Culture",
        image: countrySide,
        rating: 4.1,
        description:
            "A hidden gem away from the city with lush green meadows and peaceful walking paths.",
        tags: ["Indian", "Chinese"],
    },

    {
        id: 4,
        name: "Pizza Palace",
        image: pizzaPalace,
        rating: 4.5,
        description:
            "Wood-fired pizzas, cheesy delights and authentic Italian classics.",
        tags: ["Italian", "Fast Food"],
    },

    {
        id: 5,
        name: "Burger Hub",
        image: burgerHub,
        rating: 4.3,
        description:
            "Juicy burgers, crispy fries and refreshing beverages served fresh.",
        tags: ["Fast Food", "American"],
    },

    {
        id: 6,
        name: "Spice Kitchen",
        image: spiceKitchen,
        rating: 4.7,
        description:
            "Experience rich Indian flavors with aromatic spices and traditional recipes.",
        tags: ["Indian", "North Indian"],
    },
];
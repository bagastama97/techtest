class Database {
  constructor() {
    this.locations = [
      {
        id: 1,
        name: "Indonesia",
        latitude: -0.789275,
        longitude: 113.921327,
        radius: 2000,
      },
      {
        id: 2,
        name: "Japan",
        latitude: 36.204823,
        longitude: 138.25293,
        radius: 2000,
      },
      {
        id: 3,
        name: "USA",
        latitude: 37.09024,
        longitude: -95.712891,
        radius: 2000,
      },
    ];

    this.experiences = [
      {
        id: 1,
        name: "Candi Borobudur",
        desc: "The hotel offers newspapers, conference rooms, and a restaurant on-site. It also has elegant, spacious bedrooms, each with comfortable seating areas, a television, air conditioning, a room safe, and a large desk, all designed for you to enjoy a perfect rest.",
        price: 1000,
        mainImage: 1,
        subImage: 2,
        locationId: 1,
        maxAdults: 5,
        maxChildren: 5,
        maxInfants: 5,
        rate: 4.2,
        hosted: "Bagas",
        type: "history",
        latitude: -3.45161,
        longitude: 114.814537,
      },
      {
        id: 2,
        name: "Eating Ramen",
        desc: "The hotel offers newspapers, conference rooms, and a restaurant on-site. It also has elegant, spacious bedrooms, each with comfortable seating areas, a television, air conditioning, a room safe, and a large desk, all designed for you to enjoy a perfect rest",
        price: 1000,
        mainImage: 3,
        subImage: 4,
        locationId: 2,
        maxAdults: 5,
        maxChildren: 5,
        maxInfants: 5,
        rate: 4.8,
        hosted: "peter",
        type: "food",
        latitude: 35.6840574,
        longitude: 139.7744912,
      },
      {
        id: 3,
        name: "Liberty Statue",
        desc: "The hotel offers newspapers, conference rooms, and a restaurant on-site. It also has elegant, spacious bedrooms, each with comfortable seating areas, a television, air conditioning, a room safe, and a large desk, all designed for you to enjoy a perfect rest",
        price: 1000,
        mainImage: 5,
        subImage: 6,
        locationId: 3,
        maxAdults: 5,
        maxChildren: 5,
        maxInfants: 5,
        rate: 4.5,
        hosted: "george",
        type: "history",
        latitude: 47.4867446,
        longitude: 19.0480283,
      },
      {
        id: 4,
        name: "Gunung Kerinci",
        desc: "The hotel offers newspapers, conference rooms, and a restaurant on-site. It also has elegant, spacious bedrooms, each with comfortable seating areas, a television, air conditioning, a room safe, and a large desk, all designed for you to enjoy a perfect rest",
        price: 3000,
        mainImage: 7,
        subImage: 8,
        locationId: 1,
        maxAdults: 5,
        maxChildren: 5,
        maxInfants: 5,
        rate: 4.9,
        hosted: "yazid",
        type: "nature",
        latitude: -1.6971814,
        longitude: 101.2646538,
      },
    ];

    this.orders = [
      {
        id: 1,
        date: "15/07/2023",
        experienceId: 1,
        adults: 2,
        children: 2,
        infants: 2,
      },
      {
        id: 2,
        date: "15/07/2023",
        experienceId: 2,
        adults: 2,
        children: 2,
        infants: 2,
      },
      {
        id: 3,
        date: "15/07/2023",
        experienceId: 3,
        adults: 2,
        children: 2,
        infants: 2,
      },
    ];

    this.images = [
      {
        id: 1,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
      {
        id: 2,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
      {
        id: 3,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
      {
        id: 4,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
      {
        id: 5,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
      {
        id: 6,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
      {
        id: 7,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
      {
        id: 8,
        imagePath:
          "https://o-cdf.sirclocdn.com/unsafe/o-cdn-cas.sirclocdn.com/parenting/images/hotel-murah-bekasi-100-ribu.width-800.format-webp.webp",
      },
    ];
  }
  searchLocations(input) {
    return this.locations.filter((location) =>
      location.name.toLowerCase().includes(input.toLowerCase())
    );
  }
  async searchExperiences(locationId, date, adults, children, infants) {
    const availableExperiences = [];
    const referenceLatitude = this.searchLocationsId(locationId).latitude;
    const referenceLongitude = this.searchLocationsId(locationId).longitude;
    const radius = this.searchLocationsId(locationId).radius;

    await Promise.all(
      this.experiences.map(async (experience) => {
        const isInsideRadius = this.isWithinRadius(
          experience.latitude,
          experience.longitude,
          referenceLatitude,
          referenceLongitude,
          radius
        );
        if (isInsideRadius) {
          const existingOrders = this.orders.filter(
            (order) =>
              order.experienceId === experience.id && order.date === date
          );
          const remainingAdults =
            experience.maxAdults -
            existingOrders.reduce((total, order) => total + order.adults, 0);
          const remainingChildren =
            experience.maxChildren -
            existingOrders.reduce((total, order) => total + order.children, 0);
          const remainingInfants =
            experience.maxInfants -
            existingOrders.reduce((total, order) => total + order.infants, 0);
          if (
            remainingAdults >= adults &&
            remainingChildren >= children &&
            remainingInfants >= infants
          ) {
            experience.mainImage = await this.searchImages(
              experience.mainImage
            );
            experience.subImage = await this.searchImages(experience.subImage);

            experience.orders = this.countExperienceOrders(experience.id);
            availableExperiences.push(experience);
          }
        }
      })
    );

    return availableExperiences;
  }
  countExperienceOrders(id) {
    const allOrders = this.orders.filter((order) => order.experienceId === id);
    return allOrders.length;
  }
  searchOrders(experienceId, date) {
    return this.orders.filter(
      (order) => order.experienceId === experienceId && order.date === date
    );
  }
  async searchImages(id) {
    const image = this.images.find((image) => image.id === id);
    return image ? image.imagePath : null;
  }
  searchLocationsId(id) {
    const location = this.locations.find((location) => location.id === id);
    return location;
  }
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  }
  deg2rad(deg) {
    const result = deg * (Math.PI / 180);
    return result;
  }
  isWithinRadius(
    latitude,
    longitude,
    referenceLatitude,
    referenceLongitude,
    radius
  ) {
    const distance = this.calculateDistance(
      latitude,
      longitude,
      referenceLatitude,
      referenceLongitude
    );
    return distance <= radius;
  }
}

export default Database;
const db = new Database();
const selectedLocationId = 1;
const selectedDate = "15/07/2023";
const adults = 1;
const children = 1;
const infants = 1;
const inputLocation = "Indo";
const selectedExperienceId = 1;
const maxPrice = 19500;
const matchedLocations = db.searchLocations(inputLocation);
console.log("Data Locations:", matchedLocations);
const availableExperiences = db.searchExperiences(
  selectedLocationId,
  selectedDate,
  adults,
  children,
  infants,
  maxPrice
);
console.log("Data Experiences:", availableExperiences);
const ordersForSelectedExperience = db.searchOrders(
  selectedExperienceId,
  selectedDate
);
console.log(
  "Data Orders for Selected Experience:",
  ordersForSelectedExperience
);

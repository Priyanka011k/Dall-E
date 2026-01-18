// // import mongoose from 'mongoose';

// // const connectDB = async () => {
// //     mongoose.set('strictQuery', true);

// //     await mongoose.connect(url, { 
// //         useNewUrlParser: true,
// //          useUnifiedTopology: true,
        
// //     })
// //     .then(() => console.log('MongoDB connected'))

// //     .catch((err) => console.log(err));
// // }

// // export default connectDB;
// import mongoose from 'mongoose';

// const connectDB = async (url) => {
//   mongoose.set('strictQuery', true);

//   try {
//     await mongoose.connect(url, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//   }
// };

// export default connectDB;


import mongoose from 'mongoose';

const connectDB = async (url) => {
  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(url); // no extra options needed in Mongoose v7+
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
  }
};

export default connectDB;

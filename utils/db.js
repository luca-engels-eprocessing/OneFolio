const mongoose  = require('mongoose');
import Account from '@/models/User'; // Add this import statement


export const connect = async () => {
  
  if (mongoose.connections[0].readyState) return;

    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}

export const disconnect = async () => {
  if (!mongoose.connections[0].readyState) return;

  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB', error);
  }
}

export const findAccount = async (email) => {
  email = email.toLowerCase()
  const user = await Account.findOne({ email: email })
  return user
}

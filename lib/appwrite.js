import {
  Client,
  Account,
  Avatars,
  TablesDB,
  Realtime,
} from "react-native-appwrite";

export const client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID) // Your Project ID
  .setPlatform("dev.syawaljasira.shelfie"); // Your package name / bundle identifier

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new TablesDB(client);
export const realtime = new Realtime(client);

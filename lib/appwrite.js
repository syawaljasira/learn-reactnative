import { Client, Account, Avatars } from "react-native-appwrite";

let client;
let account;
let avatars;

client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID) // Your Project ID
  .setPlatform("dev.syawaljasira.shelfie"); // Your package name / bundle identifier

account = new Account(client);
avatars = new Avatars(client);

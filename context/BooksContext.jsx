import { createContext, useEffect, useState } from "react";
import { client, databases, realtime } from "../lib/appwrite";
import { Channel, ID, Permission, Query, Role } from "react-native-appwrite";
import { useUser } from "../hooks/useUser";

const DATABASE_ID = "6a3fc84e001e0fb1a32a";
const TABLE_ID = "books";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const { user } = useUser();

  async function fetchBooks() {
    try {
      const response = await databases.listRows({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        queries: [Query.equal("userId", user.$id)],
      });

      setBooks(response.rows);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function fetchBookById(id) {
    try {
      const response = await databases.getRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: id,
      });

      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  async function createBook(data) {
    try {
      const newBook = await databases.createRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: ID.unique(),
        data: { ...data, userId: user.$id },
        permissions: [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ],
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteBook(id) {
    try {
      await databases.deleteRow({
        databaseId: DATABASE_ID,
        tableId: TABLE_ID,
        rowId: id,
      });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    let subscription;
    const channel = Channel.tablesdb(DATABASE_ID).table(TABLE_ID).row();
    // const channel = `tablesdb.${DATABASE_ID}.tables.${TABLE_ID}.rows`;
    // let unsubscribe;

    // if (user) {
    //   fetchBooks();

    //   unsubscribe = client.subscribe(channel, (response) => {
    //     const { payload, events } = response;
    //     console.log(events);

    //     if (events[0].includes("create")) {
    //       setBooks((prevBooks) => [...prevBooks, payload]);
    //     }

    //     if (events[0].includes("delete")) {
    //       setBooks((prevBooks) =>
    //         prevBooks.filter((book) => book.$id !== payload.$id),
    //       );
    //     }
    //   });
    // } else {
    //   setBooks([]);
    // }

    // return () => {
    //   if (unsubscribe) unsubscribe();
    // };

    const startSubscription = async () => {
      try {
        subscription = await realtime.subscribe(channel, (response) => {
          const { payload, events } = response;

          if (events[0].includes("create")) {
            setBooks((prevBooks) => [...prevBooks, payload]);
          }
          if (events[0].includes("delete")) {
            setBooks((prevBooks) =>
              prevBooks.filter((book) => book.$id !== payload.$id),
            );
          }
        });
      } catch (error) {
        console.error("Gagal melakukan subscribe:", error);
      }
    };

    if (user) {
      fetchBooks();
      startSubscription();
    } else {
      setBooks([]);
    }

    return () => {
      const stopSubscription = async () => {
        if (subscription) {
          await subscription.unsubscribe();
        }
      };
      stopSubscription();
    };
  }, [user]);

  return (
    <BooksContext.Provider
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  );
};

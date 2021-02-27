import { useState, useEffect } from "react";
import db from "../firebase";

// grab players in room
function usePlayers(roomCode) {
  const [data, setData] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .doc(roomCode)
      .collection("players")
      .onSnapshot((snapshot) =>
        setData(snapshot.docs.map((doc) => doc.data()))
      );

    return () => unsubscribe;
  }, [roomCode]);

  return data;
}

export default usePlayers;

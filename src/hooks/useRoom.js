import { useState, useEffect } from "react";
import db from "../firebase";

// grab room
function useRoom(roomCode) {
  const [data, setData] = useState({});
  useEffect(() => {
    const unsubscribe = db
      .collection("rooms")
      .doc(roomCode)
      .onSnapshot((snapshot) => setData(snapshot.data()));

    return () => unsubscribe;
  }, [roomCode]);

  return data;
}

export default useRoom;

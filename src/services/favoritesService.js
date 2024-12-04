import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  getDocs,
  query,
  collection,
  limit,
  where,
} from "firebase/firestore";
import { loggedInUserId } from "./authService";

export async function saveFavorite(recipe, user) {
  const recipeId = recipe.idMeal;
  const userId = user.uid;
  const key = `${recipeId}_${userId}`;
  await setDoc(doc(db, "favorites", key), { recipeId, userId });
}

export async function fetchFavorites(user) {
  const snapshot = await getDocs(
    query(
      collection(db, "favorites"),
      where("userId", "==", loggedInUserId()),
      limit(20)
    )
  );
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    idMeal: doc.data().recipeId,
  }));
}

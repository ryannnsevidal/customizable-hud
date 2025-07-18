import { useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, onAuthStateChanged, signOut, User } from "firebase/auth";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);
  const login = () => signInWithPopup(auth, provider);
  const logout = () => signOut(auth);
  return { user, login, logout };
}

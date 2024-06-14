// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'
import type { ICocktailBaseInfo, ICocktailFullInfo } from './Interfaces'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  type StorageReference
} from 'firebase/storage'
import { firebaseConfig } from './config/firebase.config'
// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: 'AIzaSyAuGRMw67sdhuPO-vVR4mQHYFBMK616Tvw',
//   authDomain: 'my-bar-9874b.firebaseapp.com',
//   projectId: 'my-bar-9874b',
//   storageBucket: 'my-bar-9874b.appspot.com',
//   messagingSenderId: '977958489287',
//   appId: '1:977958489287:web:160c05c732a74ed12f42e2'
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage()

export const db = getFirestore(app)
const cocktailsCollection = collection(db, 'cocktails')

/**
 * Get all cocktails
 * @returns array of all cocktails
 */
export const getCocktails = async (): Promise<ICocktailFullInfo[]> => {
  const querySnapshot = await getDocs(cocktailsCollection)

  const data = querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...(doc.data() as ICocktailBaseInfo)
    }
  })

  return data
}

/**
 * Add new cocktail
 * @param data basic cocktail infromation without image url
 * @param file image file that will be added to document
 * @returns
 */
export const addCocktail = async (data: ICocktailBaseInfo, file: File | undefined) => {
  let filePath = ''
  await addDoc(cocktailsCollection, data).then((doc) => (filePath = doc.id))

  if (!file) {
    return
  }

  const storageRef = ref(storage, filePath)
  const isFileUploaded = await uploadFile(storageRef, file)

  if (isFileUploaded) {
    const fullFilePath = await getDownloadURL(ref(storage, filePath))

    // In this case filePath is the same sa document id.
    const item = doc(cocktailsCollection, filePath)
    await updateDoc(item, {
      imageUrl: fullFilePath
    })
  }
}

/**
 * Remove element from collection
 * @param id id of element to remove
 */
export const deleteCocktail = async (id: string) => {
  await deleteDoc(doc(db, 'cocktails', id))
}

/**
 * Upload file to storage
 * @param ref storage reference
 * @param file file to upload
 * @returns true if file uploaded successfully, otherwise false
 */
export const uploadFile = async (ref: StorageReference, file: File): Promise<boolean> => {
  return await uploadBytes(ref, file)
    .then(() => {
      return true
    })
    .catch((e) => {
      console.log('Cannot upload file ->', e)
      return false
    })
}
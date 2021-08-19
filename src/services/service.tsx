import firebase from "firebase";
import {User} from "../models/User";
import {Ad} from "../models/Ad";

export const login = async (email: string, password: string) => {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
}

export const register = async (name:string, email: string, password: string) => {
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password);
    if(response.user?.email) {
        const newUser = new User();
        newUser.id = response.user.uid;
        newUser.name = name;
        newUser.email = response.user.email;
        await createUser(newUser);
    }
    return response;
}


export const logout = async () => {
    return await firebase.auth().signOut();
}

export const createUser = async (user: User) => {
    console.log('createUser', user.toJSON());
    try {
        const response = firebase.firestore().collection('users').doc(user.id);
        user.id = response.id;
        await response.set(user.toJSON());
    } catch (e) {
        console.log(e);
    }
}

export const updateUser = async (user: any) => {
    console.log('updateUser', user.toJSON());
    try {
        await firebase.firestore().collection('users').add(user.toJSON());
    } catch (e) {
        console.log(e);
    }
}

export const getUserProfile = async (userId: string) => {
    try {
        return await firebase.firestore().collection('users').doc(userId);
    } catch (e) {
        console.log(e);
    }
}

export const createAd = async (ad: Ad) => {
    const response = await firebase.firestore().collection('ads').add(ad);
    ad.id = response.id;
    return await response.set(ad, {merge: true});
}

export const updateAd = async (ad: Ad) => {
    const response = await firebase.firestore().collection('ads').doc(ad.id);
    return await response.set(ad, {merge: true});
}

export const saveAdImageToDB = async (id: string, imagePath: string) => {
    try {
        // const imageArray = {createdAt: new Date().toUTCString(), uri: imagePath};
        await firebase.firestore().collection('ads').doc(id).set({
            'image': imagePath,
        }, {merge: true});
    } catch (e) {
        console.log(e);
    }
}

export const saveImageToDB = async (userId: string, videoPath: string) => {
    try {
        const videoArray = {createdAt: new Date().toUTCString(), uri: videoPath};
        await firebase.firestore().collection('images').doc(userId).set({
            'id': userId,
            'medias': firebase.firestore.FieldValue.arrayUnion(videoArray),
        }, {merge: true});
    } catch (e) {
        console.log(e);
    }
}

export const saveProfileImageToDB = async (userId: string, filePath: string) => {
    try {
        const file = {uri: filePath};
        await firebase.firestore().collection('users').doc(userId).set({
            'profile': file,
        }, {merge: true});
    } catch (e) {
        console.log(e);
    }
}


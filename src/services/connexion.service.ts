import * as firebase from 'firebase';
import {User} from "firebase";

export class ConnexionService {
  user: User;



  constructor() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        console.error("erreur d'authentification du user")
      }
    });
  }

    signUpUser(email: string, password: string) {
      return new Promise((resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          (user) => {
            resolve(user);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(
        (user) => {
          resolve(user);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  signOut() {
    firebase.auth().signOut();
  }

  }

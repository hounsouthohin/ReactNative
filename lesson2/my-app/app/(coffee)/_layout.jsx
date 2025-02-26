import { Slot } from 'expo-router';
/*Vu que Slot est un expot nommé il faut l'importer avec de acollades*/

/*expo-router est une bibliothèque pour React Native qui simplifie la gestion de la navigation dans une application basée sur Expo*/

/* Slot est un espace réservé où le contenu des pages enfant s'affichera dynamiquement.*/
/*Il permet de charger dynamiquement les écrans enfants définis dans le dossier app/.*/
export default function Layout() {
    return <Slot />;
}
# Suivi de prédication — Android 1.1 Premium

Application Android basée sur la V21 stable. Elle fonctionne hors connexion et conserve les données localement.

## Fonctions mobiles natives
- sauvegarde exportée dans `Téléchargements/SuiviPredication` ;
- import via le sélecteur de fichiers Android ;
- partage du rapport via WhatsApp, Mail, Messages et les apps installées ;
- icône officielle ;
- fonctionnement hors connexion.

## Obtenir l’APK avec GitHub
1. Envoyer tout ce dossier dans un dépôt GitHub.
2. Ouvrir **Actions** > **Build Android APK**.
3. Lancer **Run workflow** si nécessaire.
4. Télécharger l’artefact **SuiviPredication-Android**.
5. Extraire puis installer `app-debug.apk`.

## Android Studio
Ouvrir ce dossier comme projet puis utiliser **Build > Build APK(s)**.

## iPhone
Le même cœur applicatif peut être emballé dans WKWebView. Une compilation iPhone/TestFlight exige Xcode sur macOS et la signature Apple.


Interface premium V22 intégrée.


## Version 1.2
Interface pastel, carte d’activité compacte, commandes Profil / Mois en cours / Partage alignées.

## Version 1.3.0 — V24 Pastel

- Interface pastel V24 intégrée.
- Carte d'activité plus compacte.
- Profil / partage / mois en cours alignés.
- Doublon "Mois en cours" supprimé.
- Toute la logique de profils, rapports, calendrier, sauvegarde et report des minutes est conservée.

## Version 1.8.0 — Release Ready

- Base visuelle et navigation de la 1.7 conservées.
- Projet préparé pour une signature Android permanente.
- Workflow GitHub capable de produire un APK release signé.
- Fallback debug tant que les secrets de signature ne sont pas configurés.
- Checklist de fiabilisation ajoutée.

## Version 1.8.4

- Le bouton + n'est plus flottant.
- Il apparaît en largeur complète sous Dernières activités.
- Il suit automatiquement l'ouverture/fermeture de la section Dernières activités.
- La configuration de signature permanente de la 1.8.3 est conservée.

## Version 1.8.6
- La date de l’écran **Ajouter une activité** est automatiquement réglée sur la date locale du jour à chaque ouverture avec le bouton `+`.
- Les activités comportant des heures **Béthel/LDC** apparaissent correctement dans **Dernières activités**.
- Après l’enregistrement d’une activité, l’accueil affiche immédiatement le mois correspondant à cette activité.
- Le tri des dernières activités tient compte de la date puis de l’ordre réel d’enregistrement pour les activités du même jour.

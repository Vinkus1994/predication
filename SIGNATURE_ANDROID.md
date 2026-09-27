# Signature Android permanente — Suivi de prédication

Cette version est prête pour une clé de signature permanente.

## Important avant de commencer

Une application Android ne peut être mise à jour que par un APK signé avec la même clé que la version déjà installée.

Si l'application actuellement installée a été construite avec une clé debug différente, le premier passage à la version release signée peut nécessiter :
1. créer une sauvegarde depuis l'application actuelle ;
2. désinstaller l'ancienne application ;
3. installer une fois la nouvelle version release ;
4. réimporter la sauvegarde.

Après cette transition unique, conserve la clé : les futures versions pourront être installées normalement par-dessus l'application.

## Secrets GitHub attendus

Dans GitHub : Settings > Secrets and variables > Actions > New repository secret.

Créer exactement :
- ANDROID_KEYSTORE_BASE64
- ANDROID_KEYSTORE_PASSWORD
- ANDROID_KEY_ALIAS
- ANDROID_KEY_PASSWORD

Le workflow détecte automatiquement la présence de la clé. Sans ces secrets il produit encore un APK debug. Avec eux il produit l'APK release signé.

## Ne jamais perdre la clé

Conserve le fichier .jks et ses mots de passe dans au moins deux emplacements privés et sûrs. Ne mets jamais le fichier .jks ni ses mots de passe directement dans le dépôt GitHub.

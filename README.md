# Run Club Web

Frontend di **Run Club**, una web app per organizzare allenamenti di corsa di gruppo: gli utenti creano un workout (luogo, data e ora, distanza, passo), gli altri runner si iscrivono, il creatore e gli admin lo gestiscono.

Questa è una SPA React che usa la REST API Laravel di [run-club-api](https://github.com/odon-airoldi/run-club-api).

## Stack

- **React 19** + **Vite**
- **React Router** – routing client-side
- **Axios** – chiamate HTTP verso l'API
- **Tailwind CSS 4** – stile e layout responsive
- **Heroicons** – icone
- **Oxlint** – linting

## Funzionalità

- **Workout**: lista pubblica ordinabile per data, distanza o passo; pagina di dettaglio; creazione, modifica ed eliminazione.
- **Partecipazione**: iscrizione e disiscrizione con un click; la lista dei partecipanti è visibile agli utenti autenticati.
- **Account**: registrazione (con immagine profilo opzionale), login e logout; pagina profilo con i workout creati e quelli a cui si partecipa; modifica del profilo e dell'immagine; eliminazione dell'account.
- **Area admin**: elenco di tutti gli utenti e di tutti i workout, con eliminazione.

## Scelte tecniche

**Autenticazione con cookie Sanctum.** Il frontend non salva token: si autentica con il cookie di sessione emesso dall'API.
- Prima di login e registrazione richiede `/sanctum/csrf-cookie`.
- Le richieste che dipendono dalla sessione partono con `withCredentials: true`, così il browser include il cookie di sessione.
- Le richieste in scrittura aggiungono `withXSRFToken: true`, così Axios inoltra il token CSRF nell'header `X-XSRF-TOKEN`.
- Frontend e API girano su sottodomini dello stesso dominio (`app.run-club.test` / `api.run-club.test`), quindi condividono il cookie di sessione.

**Indirizzo dell'API configurabile.** L'URL dell'API non è scritto nel codice: ogni chiamata lo legge dalla variabile d'ambiente `VITE_API_URL`, ad esempio `` axios.get(`${import.meta.env.VITE_API_URL}/api/workouts`) ``. Per cambiare ambiente basta modificare il file `.env`.

**Stato globale con Context API.** Tre provider annidati in `App.jsx` separano le responsabilità, e ognuno espone un custom hook (`useAuth()`, …):
- `AuthContext`: all'avvio verifica la sessione con `GET /api/user`, espone l'utente autenticato e gestisce il logout;
- `UserContext`: profili e workout dell'utente;
- `WorkoutContext`: dettaglio di un workout.

**Protezione delle rotte lato client.** Le pagine riservate reindirizzano con `<Navigate>`:
- creazione workout e profilo → solo utenti autenticati;
- modifica workout → proprietario o admin;
- area `/admin/*` → solo ruolo `admin`.

Questi controlli servono solo all'esperienza utente: le stesse regole sono applicate anche dall'API, che risponde `403`.

**Componenti riutilizzabili.** Gli elementi UI (`AppButton`, `AppInput`, `AppTextarea`, `AppLink`, `AppWorkoutCard`, `AppUserPicture`, …) sono in `src/components`. Le pagine li compongono dentro un layout comune (`AppLayout`, con header e footer).

## Struttura

```
src/
├── components/   # componenti UI riutilizzabili
├── contexts/     # AuthContext, UserContext, WorkoutContext
├── layouts/      # AppLayout (header + outlet + footer)
├── pages/        # una pagina per rotta
├── App.jsx       # router e provider
└── main.jsx
```

## Rotte

| Rotta | Pagina | Accesso |
| --- | --- | --- |
| `/` | Home | pubblico |
| `/workouts` | Lista workout | pubblico |
| `/workout/:id` | Dettaglio workout | pubblico |
| `/workout/create` | Crea workout | autenticato |
| `/workout/:id/edit` | Modifica workout | proprietario / admin |
| `/login`, `/register` | Login e registrazione | pubblico |
| `/user/:id` | Profilo | autenticato |
| `/user/:id/edit` | Modifica profilo | proprietario / admin |
| `/admin/users` | Elenco ed eliminazione utenti | admin |
| `/admin/workouts` | Elenco ed eliminazione workout | admin |

## Installazione locale

Requisiti:
- Node.js;
- l'API [run-club-api](https://github.com/odon-airoldi/run-club-api) in esecuzione su `http://api.run-club.test`;
- il dominio `app.run-club.test` che punta a `127.0.0.1`, ad esempio con una riga in `/etc/hosts`.

```bash
git clone https://github.com/odon-airoldi/run-club-web.git
cd run-club-web
npm install
cp .env.example .env
npm run dev
```

Nel file `.env` imposta l'indirizzo dell'API:

```env
VITE_API_URL=http://api.run-club.test
```

L'app è disponibile su `http://app.run-club.test:5173`. Host e porta sono definiti in `vite.config.js` e devono corrispondere a `FRONTEND_URL` e `SANCTUM_STATEFUL_DOMAINS` nel `.env` dell'API.

Altri script:

```bash
npm run build     # build di produzione
npm run preview   # anteprima della build
npm run lint      # oxlint
```

## Autore

Odon Airoldi – [odon-airoldi.com](https://www.odon-airoldi.com)

Progetto finale del corso Web Development di [Boolean](https://boolean.careers).

# Compass Trail — Security & Privacy Baseline

> Security is part of the product architecture, not a feature added later.

This document defines the minimum security and privacy rules for Compass Trail.

---

## 1. Core Security Principles

Compass Trail must:

- collect as little personal information as possible
- never require a diagnosis
- avoid requiring real names
- protect learner-created content
- protect uploaded learning materials
- separate learner and teacher permissions
- enforce permissions on the backend/database
- keep secrets out of the public repository
- treat every uploaded file and user input as untrusted
- use secure, maintained authentication technology
- fail safely

Security decisions must be reviewed whenever a new feature is added.

---

## 2. Public GitHub Repository

The Compass Trail repository may be public.

The following must NEVER be committed:

- API keys
- database passwords
- database connection secrets
- authentication secrets
- private keys
- service account credentials
- access tokens
- refresh tokens
- production environment variables
- `.env` files
- real learner information
- private learner notes
- real uploaded assignments
- private photos or documents
- production database exports

Use environment variables or the hosting provider's secret-management system.

---

## 3. Environment Files

The following must remain ignored by Git:

- `.env`
- `.env.local`
- `.env.production`
- `.env.*.local`

We may later create `.env.example`.

It must contain variable names only, never real secrets.

Example:

    DATABASE_URL=
    AUTH_SECRET=
    STORAGE_KEY=

---

## 4. Accidentally Exposed Secrets

If a secret is accidentally committed:

1. Treat it as compromised.
2. Revoke or rotate it immediately.
3. Replace it with a new secret.
4. Remove the exposed value from repository history where appropriate.
5. Check the relevant provider for suspicious use.

Deleting the visible file alone is NOT sufficient.

---

## 5. Data Minimisation

Do not collect information simply because it might be useful later.

Compass Trail should avoid requiring:

- legal name
- full real name
- email
- phone number
- home address
- diagnosis
- medical information
- IP-based identity

If information is not required for a feature to work, prefer not to collect it.

---

## 6. Nicknames

Learners may use nicknames.

Example guidance:

> Choose a nickname. Don't use your full real name.

Do not require the nickname to match a legal identity.

---

## 7. Account Architecture

Planned learner login:

- Learner Code
- Secret Code

Planned teacher login:

- Teacher Code
- Secret Code

Visible account codes must NOT be used as internal database IDs.

Use separate, unguessable internal IDs.

Concept:

    Learner Code
        ↓
    Authentication
        ↓
    Internal random learner ID
        ↓
    Learner data

---

## 8. Secret Codes

Secret Codes must NEVER be stored as readable plaintext.

Use a reputable password/credential hashing mechanism through a maintained authentication system.

Never:

- store plaintext Secret Codes
- log Secret Codes
- expose them through APIs
- show them to teachers
- send them to analytics

Do not invent custom cryptography.

---

## 9. Authentication

Do not build production authentication from scratch.

Before production accounts are implemented, choose a maintained authentication/backend solution compatible with Compass Trail's pseudonymous account model.

Authentication must provide appropriate:

- secure credential handling
- secure sessions
- session expiration
- logout
- brute-force resistance
- rate limiting

---

## 10. Authorisation

Authentication answers:

> Who is this?

Authorisation answers:

> What are they allowed to access?

Both are required.

Never rely on a hidden button for security.

For example, hiding a learner's private journal from the teacher interface is not enough.

The backend/database must also reject unauthorised requests for that journal.

---

## 11. Roles

Initial roles:

- learner
- teacher

Future roles should only be introduced when necessary.

Teachers must not automatically receive broad access to learner data.

---

## 12. Learner Ownership

A learner can exist without:

- a teacher
- a class
- a school

Joining a class must not transfer ownership of the learner account.

Leaving a class must not delete learner progress.

Deleting a teacher account must not delete learner accounts.

Deleting a class must not delete learner accounts.

**Progress belongs to the learner.**

---

## 13. Teacher Access

Teachers may only access data permitted by Compass Trail's data model.

Teachers must NEVER receive access to:

- learner Secret Codes
- private journal entries
- private notes
- unrelated learner account information
- materials outside their authorised relationship

Teacher/student relationships must be explicitly represented in the database.

---

## 14. Private and Shared Content

Notes and journal content may support visibility states such as:

- Private
- Shared with teacher

Personal journal content must be private by default.

Changing visibility must be an explicit learner action.

---

## 15. Nothing About Me Without Me

Whenever practical, learners should understand:

- what is being saved
- what is private
- what is shared
- who can see it

Avoid hidden sharing behaviour.

---

## 16. Input Validation

All user input is untrusted.

This includes:

- Journey titles
- Journey steps
- notes
- journal text
- character names
- nicknames
- calendar entries
- uploaded filenames
- OCR text
- teacher-created content

Validate input on the backend whenever applicable.

Frontend validation improves usability but is NOT a replacement for backend validation.

---

## 17. XSS Protection

Never insert untrusted user content into the page as raw HTML.

Prefer safe text rendering.

User-generated content must not be able to execute JavaScript.

This includes:

- Journey names
- task text
- OCR output
- notes
- journal entries
- filenames
- teacher instructions

---

## 18. Injection Protection

Never construct database queries by concatenating raw user input.

Use:

- parameterised queries
- safe database APIs
- validated input

---

## 19. CSRF Protection

If the final authentication architecture uses cookie-based sessions, implement appropriate CSRF protection for state-changing requests.

The exact approach will depend on the final architecture.

---

## 20. Secure Sessions

Production sessions must use secure configuration.

Where cookies are used, review:

- Secure
- HttpOnly
- SameSite
- expiration
- session rotation

Sensitive authentication secrets must not be stored in unsafe browser-accessible locations without a deliberate security review.

---

## 21. HTTPS

Production Compass Trail must use HTTPS.

Authentication credentials and private learner data must never be transmitted over plain HTTP.

Local development may use localhost exceptions where appropriate.

---

# File & Material Security

## 22. Uploaded Files Are Untrusted

Every uploaded file must be treated as potentially unsafe.

Supported formats should be explicitly allow-listed.

Do not accept arbitrary executable file types.

---

## 23. Initial Material Types

Potential supported learning materials:

- PDF
- JPEG
- PNG
- WebP
- DOCX
- plain text

Additional formats require review before support is added.

---

## 24. File Validation

Check more than the filename extension.

Where possible validate:

- extension
- MIME type
- detected file type
- size

Do not assume a file named `homework.jpg` is actually an image simply because its filename ends in `.jpg`.

---

## 25. File Size Limits

Define explicit upload limits.

Limits may differ for:

- images
- PDFs
- documents
- future video uploads

Do not allow unlimited uploads.

The interface should explain limits clearly.

---

## 26. Multi-File Uploads

Compass Trail supports multiple materials in one Journey.

Security limits therefore need to cover:

- maximum individual file size
- maximum files per upload
- maximum Journey storage
- maximum account storage where appropriate

Limits should protect the service without making ordinary learning materials difficult to upload.

---

## 27. Filenames

Do not use user-provided filenames directly as server filesystem paths.

Generate safe internal storage identifiers.

The original filename may be retained as display metadata.

Prevent:

- path traversal
- filename collisions
- unsafe filename behaviour

---

## 28. Private Material Storage

Learner uploads should be private by default.

Do not expose uploaded materials through predictable permanent public URLs.

Access must be authorised.

A learner's material must not become publicly accessible simply because someone guesses a URL.

---

## 29. Material Removal

When a learner removes material from a Journey, define whether that action:

- removes only the Journey association
- permanently deletes the stored file
- temporarily retains it for Undo/recovery

The interface must make this understandable.

---

## 30. OCR Safety

OCR output is untrusted user-derived content.

Treat extracted text with the same security rules as manually entered text.

Never render OCR output as trusted HTML.

---

## 31. OCR Accuracy

OCR is not guaranteed to be correct.

Before extracted content influences a Journey:

- show the extracted text
- allow editing
- flag uncertain sections where possible
- allow learner confirmation

Do not silently treat OCR output as perfect.

---

## 32. Image Preprocessing

Preprocessing may include:

- crop
- document boundary detection
- perspective correction
- deskew
- rotation correction
- lighting normalisation
- contrast normalisation

Avoid unnecessary transformations that could distort source content.

Keep the original upload available during review where appropriate.

---

## 33. PDF Extraction

If a PDF contains a usable text layer:

- prefer direct text extraction

If it is scanned/image-based:

- use the OCR pipeline

Do not introduce OCR errors into documents that already contain reliable text.

---

## 34. Document Parsing

Document parsers are part of the attack surface.

Use maintained libraries.

Keep them updated.

Do not execute:

- macros
- embedded scripts
- arbitrary document code

Extract only the content required by Compass Trail.

---

# Privacy & Content

## 35. Journal Privacy

Personal journal content must be private by default.

Teacher access requires explicit learner sharing.

Do not expose journal content through:

- public profiles
- analytics
- logs
- teacher dashboards without permission

---

## 36. Logs

Logs must not contain unnecessary private information.

Never intentionally log:

- Secret Codes
- passwords
- authentication tokens
- full private journal entries
- sensitive uploaded material contents

Prefer internal IDs over unnecessary identifying information.

---

## 37. Error Messages

User-facing errors must not expose:

- database queries
- stack traces
- filesystem paths
- authentication internals
- server secrets
- storage credentials

Detailed diagnostics belong in protected development or monitoring systems.

---

## 38. Analytics

If analytics are introduced later:

- minimise collected data
- do not record private learning content unnecessarily
- do not send journal text
- do not send uploaded documents
- do not send Secret Codes
- review privacy implications first

Analytics are not automatically trusted.

---

# API & Future AI Security

## 39. API Keys

Future external API keys must remain server-side unless a provider explicitly designs a key for safe public-client use with appropriate restrictions.

Never hard-code secret API keys into frontend JavaScript.

---

## 40. Future AI

AI is not required for V1.

If AI is introduced later, review:

- what learner content is transmitted
- whether uploaded materials are transmitted
- provider retention policies
- privacy implications
- age-related requirements
- notice/consent requirements
- cost controls
- abuse controls

Do not silently send private learner content to a third-party AI service.

---

# Calculator Security & Correctness

## 41. No Raw eval()

The calculator must never execute arbitrary JavaScript from learner input.

Do NOT implement the calculator using raw `eval()`.

Use a controlled mathematical expression parser.

---

## 42. Calculator Tests

Calculator behaviour must have automated tests.

Test at minimum:

- `2 + 2 = 4`
- `0.1 + 0.2 = 0.3`
- `-5 + 8 = 3`
- `12 / 4 = 3`
- percentages
- parentheses
- operator precedence
- division by zero
- invalid expressions
- decimal precision

Correctness is part of safety.

---

# Notifications

## 43. Notification Privacy

Notifications may appear on device lock screens.

Avoid unnecessarily private learning content in notification text.

Prefer:

> Your Compass Trail reminder is ready.

instead of displaying private notes or journal content.

---

## 44. Reminder Control

Reminders are optional.

Learners control:

- whether reminders are enabled
- when reminders appear
- whether multiple reminders are used

Avoid manipulative notification patterns.

---

# Destructive Actions

## 45. Confirmation

Require clear confirmation for significant destructive actions such as:

- Delete Profile
- Reset All Progress
- Delete Class
- permanently delete stored materials

Small reversible actions may use Undo instead.

---

## 46. Undo

Where practical, provide Undo for lightweight actions such as:

- removing a Quick Task
- removing a Journey step
- marking a task completed
- moving items

---

# Accessibility & Security

## 47. Security Must Remain Accessible

Security interfaces must also be accessible.

Examples:

- confirmation dialogs must work with keyboard navigation
- focus must move correctly
- errors must be announced to screen readers
- session messages must be understandable
- security states must not depend only on colour

Do not sacrifice accessibility for security.

---

# Dependencies

## 48. Minimise Dependencies

Do not install a package for every small feature.

Every dependency increases:

- maintenance
- bundle size
- attack surface
- supply-chain risk

Prefer browser/platform capabilities when sufficient.

---

## 49. Dependency Review

Before adding a package, ask:

1. Do we actually need it?
2. Is it actively maintained?
3. Is its purpose clear?
4. Does it have known security problems?
5. Can we reasonably build this without it?

---

## 50. Dependency Updates

Regularly review dependencies for known vulnerabilities.

Use GitHub security features where appropriate.

Do not blindly apply major upgrades without testing.

---

# Development

## 51. Development vs Production

Development configuration must remain separate from production configuration.

Avoid using production secrets for local development.

Never put production data into public examples.

---

## 52. Test Data

Use fictional test users and materials.

Example:

- Learner: River
- Character: Mino
- Journey: Volcano Presentation

Never use real student data as development fixtures.

---

## 53. Security Tests

As Compass Trail grows, test at minimum:

- unauthenticated access
- learner attempting to access another learner's data
- teacher attempting to access an unrelated learner
- teacher attempting to access a private journal
- manipulated internal IDs
- invalid uploads
- oversized uploads
- malicious filenames
- unsafe text input
- calculator invalid input
- expired sessions
- deleted sessions
- rate limiting

---

# Data Deletion

## 54. Learner Deletion

Before implementation, clearly define what happens to:

- learner profile
- Journeys
- progress
- private notes
- journal
- uploaded materials
- character
- Adventure Album
- teacher/class relationships

Deletion behaviour must be intentional and documented.

---

## 55. Teacher Deletion

Deleting a teacher must NOT delete learner accounts.

Teacher-owned and learner-owned resources must remain distinguishable.

---

## 56. Class Deletion

Deleting a class must NOT delete learner accounts.

Before implementation, define what happens to:

- assignments
- teacher records
- class photos
- learner Journey information

---

# Backups

## 57. Backup Strategy

Before production, define:

- what is backed up
- backup frequency
- retention
- restoration process
- how deletion interacts with backups

A backup strategy must include restoration testing.

---

# Browser Security

## 58. Security Headers

Before production, review appropriate browser security headers including:

- Content-Security-Policy
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy
- frame protection / frame-ancestors

Exact configuration depends on final hosting architecture.

---

# Rate Limiting

## 59. Rate Limits

Apply rate limiting where abuse could cause harm or excessive cost.

Important candidates:

- login attempts
- account creation
- account recovery/reset
- file uploads
- OCR processing
- notification creation
- future external APIs

---

# Privacy-First Feature Review

## 60. Before Adding Any Feature

Ask:

1. What information does this feature need?
2. Can it work with less information?
3. Where is that information stored?
4. Who can access it?
5. How is access enforced?
6. Does the information need to leave Compass Trail?
7. How is it deleted?
8. Could it appear in logs?
9. Could it appear in notifications?
10. What happens if someone manipulates the request?

---

# Production Security Gate

## 61. Before Production

Compass Trail must NOT be considered production-ready until we review:

- authentication
- authorisation
- database access rules
- file storage
- upload validation
- private/shared content
- secrets
- rate limiting
- sessions
- HTTPS
- security headers
- dependency vulnerabilities
- deletion
- logging
- backups
- accessibility of security flows
- privacy notices
- notification privacy

---

# 62. Golden Rules

Never trust the client.

Never trust uploaded files.

Never trust filenames.

Never store passwords or Secret Codes in plaintext.

Never commit secrets.

Never expose private content through predictable URLs.

Never treat hidden UI as authorisation.

Never collect sensitive information without a real need.

Never silently share learner content.

Never assume OCR is correct.

Never sacrifice accessibility for security.

---

**Compass Trail**

**Same Goal. Different Paths.**

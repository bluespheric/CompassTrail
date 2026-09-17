# Compass Trail — Master Product Blueprint

> **Same Goal. Different Paths.**

## 1. Product Vision

Compass Trail is an accessibility-first learning companion.

It is not primarily a curriculum, LMS, or collection of ready-made lessons.

Learners bring what they need to learn or complete. Compass Trail helps them turn that work into a manageable, flexible path and provides different ways to move through it.

Core idea:

**Bring what you need to learn. We'll help you find your way through it.**

Compass Trail should support learners without requiring them to disclose why they need support.

### Core Principles

- Same Goal. Different Paths.
- Progress belongs to the learner.
- Support is a tool, not a penalty.
- Nothing about me without me.
- Changing the plan is not failing the plan.
- A break does not erase progress.
- The system adapts to needs, not diagnostic labels.
- If there is only one way to do something, the design is not finished.
- Learners should remain in control of their paths.
- Accessibility is part of the architecture, not an add-on.

---

# 2. No Diagnosis-Based Profiles

Compass Trail must not ask learners to identify diagnoses.

Do not create modes such as:

- ADHD Mode
- Autism Mode
- Dyslexia Mode
- Dyscalculia Mode

Diagnosis names should not be required or used to determine the experience.

Instead, learners choose what helps them.

Examples:

- One thing at a time
- Reduce visual distractions
- Read with me
- Larger text
- Wider spacing
- Background tint
- More time
- Optional timers
- Movement breaks
- Clear literal instructions
- Show an example
- Break tasks into smaller pieces
- Number and maths supports

A learner can combine any supports.

The system should never assume that two people with similar needs want the same experience.

---

# 3. Guided Personalisation

Personalisation must NOT appear as one large settings form.

It should be presented as a sequence of small screens.

Example areas:

1. Visual amount
2. Motion
3. Font
4. Text size
5. Line spacing
6. Background tint
7. Contrast
8. Sound
9. Read-aloud preferences
10. Learning pace
11. Timer preferences
12. Help preferences
13. Instruction detail

Changes should preview immediately.

Example:

If a learner chooses larger text, following setup screens immediately use larger text.

### Visual Comfort

Presets:

- Calm
- Balanced
- Lively
- Make It Mine

Granular controls:

- Animations: Off / Gentle / Full
- Background detail: Low / Medium / High
- Celebrations: Quiet / Normal / Big
- Page motion: Off / Gentle / Full
- Sound effects: Off / On
- Character motion: Still / Gentle / Playful

### Quick Sensory Control

Always provide:

**Too much?**

This can immediately reduce:

- animation
- visual detail
- sounds
- visible choices

Then offer:

- Keep it this way
- Just for now

---

# 4. Reading Comfort

Provide at least five font choices.

Controls include:

- Text size
- Line spacing
- Letter spacing
- Text width
- Background tint
- Contrast

Suggested background options:

- White
- Warm cream
- Soft mint
- Soft blue
- Soft peach

Never claim that one font "solves dyslexia."

Let the learner decide what feels easiest to read.

---

# 5. Language

Full interface support:

- English
- Turkish

If English is selected, the complete interface must be English.

If Turkish is selected, the complete interface must be Turkish.

This includes:

- navigation
- instructions
- buttons
- errors
- settings
- accessibility tools
- Photo Studio
- Journey tools
- system messages

Language can be changed later.

---

# 6. Main Product Architecture

Compass Trail has four central systems:

## Journey Engine

Helps learners turn work into manageable paths.

## Journey Workspace

Shows the learner what matters right now and provides support while working.

## My Days

Optional planning/calendar/reminder system.

## Support System

Provides different ways to approach learning and tasks.

Everything else supports these systems.

---

# 7. Creating a Journey

Learners can start a Journey in several ways.

### Bring something

Options may include:

- Write it myself
- Paste text
- Upload photo
- Upload multiple photos
- Upload PDF
- Upload multiple PDFs
- Upload document
- Upload multiple documents

A Journey is NOT limited to one file.

---

# 8. Material Basket

Each Journey can contain a flexible collection of materials.

Possible materials:

- multiple photographs
- multiple PDFs
- multiple documents
- multiple pasted texts
- notes
- assignment sheets
- textbook pages
- learner-created material

Example:

Material Basket

1. Assignment sheet — photo
2. Assignment sheet — second page
3. Class notes.pdf
4. Teacher instructions.docx
5. Textbook pages
6. My pasted notes

Learners can:

- Add
- Preview
- Rename
- Reorder
- Replace
- Remove

Materials can also be added AFTER a Journey has started.

Removing a material should not be framed as failure.

---

# 9. PDF and Document Extraction

Do not OCR everything automatically.

If a PDF contains a usable text layer:

**Extract the text directly.**

If a PDF contains scanned pages:

**Use image preprocessing + OCR.**

Documents such as DOCX should use direct text extraction where possible.

---

# 10. Image Preparation Before OCR

OCR quality is important.

For photographed documents, preprocessing should focus on making the page geometrically readable rather than artificially sharpening everything.

Potential pipeline:

1. Detect document
2. Detect page boundaries
3. Crop
4. Perspective correction
5. Deskew
6. Rotation correction
7. Lighting normalization
8. Contrast normalization where appropriate
9. OCR

Special attention must be given to photographs taken at an angle.

Never promise perfect OCR.

---

# 11. OCR Review

OCR output must be reviewable.

After extraction:

**Here's what I found.**

The learner can:

- inspect text
- edit incorrect text
- correct missing sections
- confirm it

Where confidence is low, use neutral wording such as:

**This part may need a quick check.**

Do not build a Journey from unreliable OCR without giving the learner an opportunity to review it.

---

# 12. Journey Understanding

After receiving the task/material, Compass Trail asks a few simple questions when needed.

Examples:

- What are you working on?
- What kind of task is this?
- Where are you right now?
- What would feel good to accomplish?
- Is there a deadline?
- What needs to be ready?

Task families may include:

- Reading
- Writing
- Questions / worksheet
- Presentation
- Research
- Maths / numbers
- Studying / revision
- Memorisation
- Creative project
- Long-term project
- Something else
- I'm not sure

Subject is optional.

Possible subjects:

- Maths
- English
- Science
- History
- Languages
- Art
- Other
- No subject
- Custom subject

Grade/year level should NOT be required.

Instead, allow instruction preferences such as:

- Simple & short
- A little more detail
- Detailed

---

# 13. Automatic Task Breakdown

Task breakdown should NOT depend entirely on the learner.

Compass Trail should generate a suggested path using deterministic templates and rules.

AI is not required for V1.

The generated path must always remain editable.

Learners can:

- Add a step
- Remove a step
- Rename a step
- Reorder steps
- Make a step smaller
- Move a step
- Save a step for later

The system provides the structure.

The learner remains in control.

---

# 14. Creative Journey Language

Avoid robotic educational language such as:

- Understand the topic
- Identify key points
- Create outline
- Complete activity

Use creative but clear micro-step names.

Every creative name MUST include a plain-language explanation.

Example Presentation Journey:

### Go on a Clue Hunt
Find what the assignment is asking you to make.

### Fill Your Basket
Gather useful ideas, information and materials.

### Make the Pieces Fit
See which ideas belong together.

### Build the Bones
Create the basic structure.

### Bring It to Life
Add content and visuals.

### Take a Fresh Look
Step back and review what you made.

### Give It a Test Drive
Try your presentation once.

### Ready to Send It Off
Do the final checks.

---

# 15. Example Writing Journey

### Catch the Sparks
Collect ideas without worrying about organisation.

### Find What Belongs Together
Group related ideas.

### Give It a Backbone
Create the basic structure.

### Let It Be Messy
Create the first version without demanding perfection.

### Walk Away for a Moment
Take an optional break.

### See It With Fresh Eyes
Return and reread.

### Stitch the Loose Pieces
Improve missing or disconnected parts.

### Give It the Final Polish
Prepare the final version.

---

# 16. Example Reading Journey

### Take a Peek
Look at headings, images and structure before starting.

### Dip In
Read the first manageable section.

### Drop an Anchor
Choose something worth remembering.

### Keep Swimming
Continue to the next section.

### Come Up for Air
Take an optional break.

### Gather What Stayed
Collect the ideas that remained with you.

---

# 17. Example Maths Journey

### Meet the Problem
Look at the problem without needing to solve it immediately.

### Find What You Know
Notice the information already provided.

### Find What You're Looking For
Identify what needs to be found.

### Pick Something to Try
Choose a possible approach.

### One Move at a Time
Work through the calculation step by step.

### Look Back at Your Path
Review the steps.

### Ready for Another?
Choose whether to continue.

---

# 18. Journey → Step → Mini-Step

Journey structure may have three levels:

Journey
→ Step
→ Mini-Step

If a step still feels too large:

**Make this smaller**

Compass Trail can apply another deterministic template to create smaller pieces.

The learner can edit the result.

---

# 19. Journey Workspace

This is the main working environment.

Avoid displaying everything at once when the learner prefers reduced visual load.

Example:

**Right now**

Add the diagram to your first slide.

Step 4 of 7

Possible tools:

- Make It Smaller
- Read With Me
- Starting Spark
- Idea Garden
- My Pace
- Recharge Cove
- Park It
- Too Much?
- I Need a Different Way
- Calculator when relevant

---

# 20. I Can't Start

Provide dedicated task-initiation support.

Example:

**Can't find a starting point?**

Options:

- Show me the tiniest first move
- Give me a starting sentence
- Let me look at it without starting
- Give me a two-minute beginning
- I'll choose my own

Do not shame the learner for difficulty starting.

---

# 21. I Need a Different Way

Core Workspace action:

**This way isn't working for me.**

Possible alternatives:

- Make it smaller
- Show less at once
- Read it to me
- Let me write instead
- Show an example
- Take a break
- Save it for later

The principle is:

A path not working does not mean the learner failed.

Try another path.

---

# 22. Read With Me

Use browser-native text-to-speech where possible.

Languages:

- Turkish
- English

Speeds:

- 0.50×
- 0.75×
- 1.00×
- 1.25×
- 1.50×
- 1.75×
- 2.00×

Controls:

- Play
- Pause
- Resume
- Replay

Save preferred speed per account.

Using read-aloud must never reduce progress or be treated as weakness.

---

# 23. Maths Calculator

When relevant, provide a built-in calculator.

Initial capabilities:

- Addition
- Subtraction
- Multiplication
- Division
- Decimals
- Parentheses
- Percentages
- Positive/negative values
- Clear
- Backspace

Do not use unsafe eval-based expression execution.

Use a controlled expression parser.

Account for floating-point precision.

Calculator logic must have automated tests.

Examples:

- 2 + 2 = 4
- 0.1 + 0.2 = 0.3
- -5 + 8 = 3
- 12 / 4 = 3
- percentage calculations
- division-by-zero handling

---

# 24. Quick Tasks

Not everything needs to become a Journey.

Provide a lightweight task area for small things.

Working concept:

**Little Things**

Examples:

- Pack my book
- Send the file
- Review five words

Learners can:

- Add
- Rename
- Move
- Complete
- Undo completion
- Remove
- Turn into a Journey

Removing a task is NOT completing it.

Removing a task is NOT failure.

No reason is required.

---

# 25. Completion Interactions

Do not rely only on checkboxes.

Completion can have optional micro-interactions.

Possible styles:

### Leave a Trail
A trail marker receives a footprint or symbol.

### Grow Something
A small plant grows.

### Collect a Spark
A spark joins a collection.

### Make a Ripple
A gentle ripple appears.

### Keep It Simple
Use a standard calm completion mark.

These must follow animation preferences.

Screen readers receive clear state information.

Completion must always remain reversible.

---

# 26. Let It Go

Learners can remove tasks and Journey steps they no longer need.

Use gentle language.

Example:

**Let this one go?**

- Let it go
- Keep it here

After removal:

**It's been cleared away. — Undo**

Avoid dramatic deletion animations.

---

# 27. Planning Changes Are Normal

Never treat a changed plan as failure.

Avoid language such as:

- Failed
- Behind
- Incomplete
- Unfinished Work
- Overdue

Prefer language such as:

- Waiting for You
- Saved for Later
- Continue When You're Ready
- Pick It Up Again

Principle:

**Changing the plan is not failing the plan.**

---

# 28. My Days — Optional Calendar

Calendar/planning is optional.

A learner can use Compass Trail fully without using the calendar.

Allow multiple items on the same day.

Items may include:

- Journey steps
- whole Journeys
- Quick Tasks
- exams
- reminders
- personal school-related items

Calendar should integrate with Journeys rather than exist as an isolated feature.

---

# 29. Reminders

Optional reminders may include:

- No reminder
- When it's time
- 10 minutes before
- 30 minutes before
- 1 hour before
- Day before
- Custom

Allow multiple reminders for one item.

Notifications should never shame.

Avoid:

**OVERDUE!**

Prefer:

**Your Maths Journey is still here when you're ready.**

Actions:

- Start now
- Move it
- Not today

---

# 30. Today Changed

Provide a planning rescue option.

Example:

**Today isn't going how you planned?**

Possible actions:

- Make today lighter
- Move one thing
- Keep only my priority
- Make today's path smaller
- Leave everything as it is

Replanning must not erase progress.

---

# 31. Brain Dump

Provide a low-pressure capture space.

Working concept:

**Empty My Head**

Prompt:

**Drop things here. They don't need to be organised.**

Each captured item can become:

- Quick Task
- Journey
- Calendar item
- Saved note

No organisation should be required before writing.

---

# 32. Park It

During a Journey, learners may remember unrelated things.

Provide:

**Park It**

The learner can quickly save the thought without leaving the current task.

Possible saved area:

**Parking Spot**

Then return immediately to the current Journey.

---

# 33. Continue Where I Left Off

Progress saves the exact location:

Journey
→ Activity / Step
→ Mini-Step

On return:

**Here's where you were.**

Show:

- Journey
- last active step
- relevant last note where appropriate
- next small action

Then:

**Take me back in**

---

# 34. Multiple Active Journeys

Learners can have multiple Journeys.

Possible Home section:

**Your Paths**

Completed Journey history should use positive neutral language such as:

**Paths I've Travelled**

Avoid "unfinished work."

---

# 35. Check-In

Check-in is optional and skippable.

Ask one thing at a time.

Possible questions:

- How are you feeling?
- How ready do you feel?
- What would help today?
- What would feel good to accomplish?
- Anything you want to tell yourself?

Always allow:

- Skip
- Custom typed response

Check-in is not assessment.

---

# 36. Check-Out

Possible questions:

- How is your energy now?
- How did learning feel?
- What helped?
- Was anything too much?
- What are you proud of?
- What would you change next time?
- What should we remember?

Allow typed responses and Skip.

---

# 37. Support Toolkit

Learners can create a personal Toolkit.

Example:

**My Toolkit**

- Read With Me
- Recharge Cove
- Make It Smaller
- Quiet Screen
- Starting Spark
- Calculator
- Idea Garden

Do not infer a diagnosis from tool usage.

At check-out:

**Anything you'd like to keep for next time?**

The learner chooses.

---

# 38. Additional Learning Tools

Compass Trail may include non-AI learning scaffolds inspired by previous learning-tool concepts.

Possible tools:

### Piece It Together
Break information into meaningful pieces.

### Grow an Idea Tree
Create a visual idea/mind map.

### Place It Somewhere
Use a spatial/memory-palace-style scaffold.

### Make It Bite-Sized
Chunk content.

### Make It Stick
Support learner-created memory cues.

These should not pretend to semantically understand arbitrary content when AI is not being used.

Manual or rule-based scaffolding is acceptable.

---

# 39. Recharge Cove

Provide at least ten fixed break experiences.

Initial ideas:

1. Breathing Space
2. Tiny Doodle
3. Play With My Character
4. Calm Scene
5. Mini Puzzle
6. Sound Space
7. Grow a Tiny Garden
8. Cloud Watching
9. Aquarium
10. Stretch & Move

Possible future ideas:

- Pattern Maker
- Colouring Corner
- Find Something
- Mini Maze
- Quiet Story

Breaks do not reduce progress.

After break:

**Continue Where I Left Off**

---

# 40. Timer

Timer is optional.

Session-level choice:

- No Timers
- Timers On

Individual activities can override this preference.

Time running out is NEVER failure.

Options:

- Keep going without timer
- Add more time
- Finish for now
- Restart timing if wanted

Track neutrally:

- timer selected
- initial duration
- extra time
- actual active time
- timer disabled

Do not label a learner "slow."

---

# 41. Active Time

Do not treat an open browser tab as active learning.

Detect inactivity.

Possible prompt:

**Still here?**

- Yes, continue
- I'm taking a break

Track active learning time separately from break/inactive time.

---

# 42. Idea Garden

Learning notes area.

Notes may be:

- Journey-linked
- Step-linked
- Standalone

Allow:

- Text
- Images
- Video attachments where feasible

Possible sentence starters:

- The important idea is...
- An example is...
- I want to remember...
- I have a question about...

---

# 43. My Little Corner

Personal reflection/journal space.

Private by default.

Possible sharing:

- Private
- Share with teacher

Teacher must not automatically see journal content.

Sentence starters may include:

- Today I noticed...
- Something that helped me was...
- I felt proud when...
- Next time I would like to...
- I found it easier when...

Turkish versions should sound natural rather than literal.

---

# 44. Encouragement System

Provide a dedicated encouragement area.

Possible concept:

**A Little Something for Today**

Avoid fake or excessive praise.

Avoid repetitive messages.

Create a large bilingual library, potentially 150–250+ messages.

Categories may include:

- Starting
- Focus
- Breaks
- Returning
- Big tasks
- Plans changing
- Trying another way
- Rest
- Confidence
- Planning
- Progress

Track recently shown message IDs so the same messages are not constantly repeated.

Context can select a category without AI.

Examples:

**Starting small still counts as starting.**

**A break doesn't erase what you've already done.**

**You can change the plan without giving up on the goal.**

**Coming back is part of the journey.**

Avoid patronising language.

---

# 45. Inclusive Language System

Create a formal language standard for the entire product.

Avoid:

- Wrong
- Incorrect
- Failed
- Failure
- Slow
- Behind
- Overdue
- Unfinished Work
- Try again as punishment
- Red X
- buzzer-like failure sounds
- screen shake

Possible alternatives:

- Let's explore this another way.
- Would an example help?
- Show me a clue.
- See an example.
- Break it into steps.
- Read it with me.
- You found it.
- That connection works.
- You've got this step.

Feedback should be truthful, calm and directional.

---

# 46. Colour and Error Feedback

Do not use red as the default failure/error/motivation colour.

Never communicate meaning using colour alone.

Errors require:

- icon or other visual cue where appropriate
- clear text
- accessible announcement

---

# 47. Screen Reader and Keyboard Accessibility

Use semantic HTML.

Support:

- screen readers
- keyboard navigation
- visible focus
- scalable UI
- zoom
- high contrast
- non-visual alternatives

Keyboard basics:

- Tab
- Shift+Tab
- Enter
- Space
- Escape

Do not require drag-and-drop.

Any draggable interaction needs button/keyboard alternatives.

Accessible names describe function.

Example:

**Go to previous activity**

not:

**Left arrow**

---

# 48. Guide Me With Sound

Possible audio-first mode.

Provide verbal status where useful:

- Activity two of three.
- Your answer has been saved.
- Your next step is ready.

---

# 49. Navigation

Every screen should answer:

1. Where am I?
2. What am I doing?
3. What comes next?
4. How do I go back?
5. How do I get home?

Provide consistent:

- Home
- Back
- Previous
- Next
- Activity progress

Home NEVER resets progress.

---

# 50. Reset Behaviour

Separate:

- Restart activity
- Reset Journey/module
- Reset all progress

Strong destructive actions require confirmation.

Never make Home equivalent to reset.

---

# 51. Learner Accounts

No real email, phone number or real name should be required for the intended pseudonymous account model.

Possible credentials:

- Learner Code
- Secret Code

Backend maps these to an unguessable internal learner ID.

Do NOT bind accounts to IP addresses.

Encourage nicknames rather than real names.

Example guidance:

**Choose a nickname. Don't use your full real name.**

---

# 52. Teacher Accounts

Possible credentials:

- Teacher Code
- Secret Code

Teachers can:

- create multiple classes
- link individual learners
- assign Journeys
- view permitted progress
- create their own avatar
- use accessibility settings
- use Teacher Lookbook

Teachers must never see learner Secret Codes.

---

# 53. Learner Independence

A learner does NOT need a teacher.

A learner can later join a teacher/class without losing progress.

The learner account belongs to the learner.

**Progress belongs to the learner.**

Leaving a teacher/class does not delete the learner account.

Deleting a class does not delete learner accounts.

Deleting a teacher account does not delete learner accounts.

---

# 54. Teacher Visibility

Teachers can only see information permitted by product rules.

Private learner journal content must remain private.

Notes can have:

- Private
- Share with teacher

Do not implement privacy by merely hiding UI.

Permissions must be enforced in backend/database access rules.

---

# 55. Teacher Journey Assignment

Teachers can create/assign Journey structures.

Teacher supplies things such as:

- goal
- steps
- optional materials
- optional due date

Learners use their own accessibility/support preferences when opening the Journey.

Teacher should NOT control whether accessibility supports are "allowed."

Supports are not rewards or privileges.

---

# 56. Progress and Journey Cards

Generate rule-based summaries from:

- completed steps
- support tools used
- active time
- timer choices
- breaks
- check-in/out
- optional reflection

Learner-facing summary:

- encouraging
- nonjudgmental
- not overly granular

Teacher-facing summary:

- more analytical
- still neutral
- observational
- never diagnostic

Example teacher wording:

**Activity 3 was revisited three times.**

**Read With Me was used throughout Activity 3.**

**Consider offering Step-by-Step presentation next session.**

---

# 57. My Journeys

Store Journey Cards separately from the photo album.

Journey Card front:

- simple visual journey/achievement card

Journey Card back:

- Journey Summary

Journey Cards can link to related photos.

Photos can link back to Journeys.

---

# 58. Character System

Characters are optional personalisation/gamification.

The purple elephant/yellow hoodie is an example, not mandatory.

Target:

- approximately 15 animals
- approximately 10 body colours
- broad wardrobe

Character has a separate name from the learner.

Example:

**Minnoş — created by Deniz**

---

# 59. Creature Workshop

Character creation should be step-by-step.

Possible sequence:

1. Animal
2. Body colour
3. Main outfit
4. Head accessory
5. Footwear
6. Character name
7. Reveal

Avoid showing huge option grids.

Show approximately 4–6 large options at a time plus See More.

---

# 60. Layered Character Assets

Characters should be composed from layers:

- base/body
- body colour
- main outfit
- head accessory
- footwear

Do not create hundreds of fully pre-rendered combinations.

Items can contain compatibility metadata.

Example:

compatibleAnimals

Not every item needs to work with every animal.

---

# 61. Goal Look

Learner chooses a target character appearance.

Progress gradually moves the character toward that appearance.

Progress should reflect actions such as:

- completing steps
- continuing after a break
- returning to a Journey
- using supports
- moving through the learning path

Do not require correct answers as the only source of progress.

If the learner leaves before reaching the Goal Look, current appearance is saved.

They can:

- continue toward the same Goal Look
- change the Goal Look

---

# 62. Memory Studio

When a Goal Look is reached, the learner can enter a photo experience.

No AI image generation required.

Use static scene assets.

Possible location categories:

### Everyday Adventures

- Beach
- Park
- Funfair
- Camping
- Forest
- School
- Garden
- Snow day
- More later

### Around the World

- Istanbul / Galata Tower
- Paris / Eiffel Tower
- New York / Statue of Liberty
- Agra / Taj Mahal
- Rome
- Tokyo
- Cairo
- More later

Each completed look can create up to four different photos.

Allow options such as:

- location
- pose
- character position
- stickers

Dragging cannot be required.

---

# 63. Adventure Album

Photos live in a scrapbook/book-like album.

Possible features:

- paper feel
- page-turn animation
- two-page spreads

Also provide efficient navigation:

- Go to Today
- Today
- This Week
- This Month
- This Year
- All Time
- Timeline
- Calendar/search later
- On This Day

Also provide:

**Album View | Accessible List View**

Generate scene descriptions from metadata.

Example:

**Minnoş, purple elephant, yellow hoodie, blue bandana, at Galata Tower.**

No AI required.

---

# 64. Teacher Lookbook

Teacher can have:

- avatar
- Teacher Lookbook

Teacher may take milestone photos with linked learner avatars.

Possible:

- individual
- small group
- whole class

Teacher cannot modify learner avatars.

Class photos go to Teacher Lookbook by default.

Do not automatically place them in learner personal albums.

Organise by:

- class
- school year
- Today
- Week
- Month
- School Year
- All Time

---

# 65. Security Is Core

Security must be designed from the first implementation.

Do not treat it as a later feature.

Requirements include:

- managed authentication/backend where appropriate
- no plaintext Secret Codes
- strong credential hashing
- unguessable internal IDs
- server/database-level authorisation
- role separation
- rate limiting
- brute-force protection
- input validation
- output escaping
- XSS protection
- CSRF protection where relevant
- injection protection
- secure session handling
- HTTPS in production
- security headers
- Content Security Policy where practical
- safe file uploads
- file type validation
- file size limits
- private file access controls
- confirmation for destructive actions
- minimal dependencies
- dependency security updates
- safe error messages
- safe logging
- backup/recovery planning

Never rely on hidden buttons as authorisation.

---

# 66. GitHub Security

Repository may be public.

NEVER commit:

- API keys
- database passwords
- access tokens
- production secrets
- real learner data
- private uploaded documents
- .env files

Use environment variables/secrets.

Ensure `.env` is ignored.

If a secret is accidentally committed:

Deleting the file is NOT sufficient.

The secret must be revoked/rotated.

---

# 67. Upload Security

Uploaded learner materials require strict handling.

Validate:

- allowed file type
- MIME type
- size
- filename handling
- access permissions

Do not expose private uploads through predictable public URLs.

Do not execute uploaded content.

Do not trust file extensions alone.

---

# 68. Privacy

Collect as little personal data as possible.

Avoid requiring:

- real name
- email
- phone
- diagnosis
- IP-based identity

Do not put private content in logs.

Do not log:

- Secret Codes
- private journal text
- sensitive uploaded document contents unless technically essential and explicitly designed safely

Provide clear deletion behaviour.

---

# 69. Data Deletion

Learner controls may include:

- Reset Progress
- Leave Teacher/Class
- Delete Profile

Teacher controls may include:

- Remove learner from class
- Reset class assignments
- Delete class
- Delete teacher profile

Deleting a class must not delete learner accounts.

---

# 70. Home — Working Structure

Possible Home areas:

### A Little Something for Today
Contextual encouragement.

### Keep Exploring
Continue a recent Journey.

### Start Something
Create a Journey.

### Little Things
Quick Tasks.

### My Days
Optional calendar.

### Idea Garden
Learning notes.

### Recharge Cove
Break space.

### My Journey / Paths I've Travelled
Journey history and progress.

### Make It Mine
Personalisation and accessibility.

Home should adapt to the learner's visual preferences.

---

# 71. Creative Naming Rule

Avoid generic labels where a clearer creative metaphor can improve the experience.

But creative names MUST have explanatory subtitles.

Working concepts:

- Notebook → My Idea Garden
- Journal → My Little Corner
- Progress → My Journey
- Break → Recharge Cove
- Accessibility → Make It Mine
- Character Builder → Creature Workshop
- Goal Look → Dream Look
- Photo Studio → Memory Studio
- Saved Photos → Adventure Album
- Continue → Keep Exploring
- Start → Begin My Journey
- Reset → Fresh Start
- Read Aloud → Read It With Me

Names may evolve.

Clarity always takes priority over novelty.

---

# 72. Compass Trail Visual Metaphor

The product name is:

# Compass Trail

Tagline:

**Same Goal. Different Paths.**

Potential internal metaphors:

- Journeys / Paths
- Trail Steps
- Pebbles
- Trail Map
- Compass Kit
- Trails Travelled

Do not force the metaphor into every button.

Accessibility and comprehension come first.

---

# 73. V1 AI Policy

V1 should not require paid AI APIs.

Prefer:

- deterministic rules
- templates
- browser APIs
- direct text extraction
- OCR
- user-controlled scaffolds

AI may be added later as an optional enhancement.

The product must remain useful without AI.

---

# 74. Technical Direction

Initial frontend may use:

- HTML
- CSS
- JavaScript

Backend will eventually be required for:

- accounts
- cross-device progress
- teacher/student links
- file metadata
- Journeys
- settings
- calendar/reminders
- privacy permissions

Do not build authentication cryptography from scratch.

Choose managed, secure infrastructure before implementing production accounts.

---

# 75. Core Build Order

Do NOT attempt to build the entire product in one giant code generation.

Build and test incrementally.

Recommended order:

1. Repository/documentation
2. Security baseline
3. Application shell
4. Home
5. Journey creation
6. Material Basket
7. Multi-file uploads
8. PDF/document extraction
9. Image preprocessing
10. OCR + editable review
11. Journey task classification
12. Rule/template Journey Engine
13. Automatic editable breakdown
14. Journey Workspace
15. Step completion/edit/remove/reorder
16. Save exact position
17. Continue Where I Left Off
18. Quick Tasks
19. Completion interactions
20. Support Toolkit
21. Read With Me
22. Calculator
23. Make It Smaller
24. Starting support
25. I Need a Different Way
26. Brain Dump
27. Park It
28. Recharge Cove
29. Check-in
30. Check-out
31. Encouragement system
32. My Days/calendar
33. Reminders
34. Notes
35. Journal/privacy
36. Guided personalisation
37. Accessibility controls
38. Accounts
39. Cross-device persistence
40. Teacher accounts/classes
41. Assignments and permissions
42. Journey Cards
43. Character system
44. Goal Look
45. Memory Studio
46. Adventure Album
47. Teacher Lookbook
48. Full security review
49. Full accessibility review
50. Bilingual QA
51. Production deployment

---

# 76. Definition of Success

Compass Trail succeeds when a learner can arrive with something that feels difficult, large, unclear or hard to begin and leave with:

- a manageable path
- control over that path
- tools that fit them
- a clear next step
- their place safely saved
- no shame for needing support
- no requirement to explain a diagnosis
- the ability to return and continue

The system does not decide the learner's path for them.

It helps them find one that works.

---

# 77. Living Document Rule

This Blueprint is the source of truth for Compass Trail.

When a product decision changes:

1. Update this document.
2. Update relevant detailed documentation.
3. Update the feature checklist.
4. Then update the implementation.

Do not rely on conversation memory alone.

New ideas should be classified as:

- Core
- Phase 2
- Dream / Future

before implementation.

---

**Compass Trail**

**Same Goal. Different Paths.**

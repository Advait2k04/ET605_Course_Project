---
title: Design Report - Adaptive Tutoring System
author: AI Studio Developer
date: 2026-03-28
---

# Design Report: Adaptive Tutoring System for Geometry

## 1. Content Structure

The tutoring system is designed to teach foundational geometry, specifically focusing on the chapter **Lines and Angles**. The content is hierarchically structured to facilitate progressive learning and granular knowledge tracking.

### 1.1 Hierarchy
The curriculum follows a strict hierarchy to ensure prerequisite knowledge is established before advancing:
*   **Chapter:** Lines and Angles
*   **Subtopics (Knowledge Components - KCs):** The chapter is broken down into 8 distinct, atomic skills.
*   **Concepts & Assessment:** Each KC contains instructional tutorials and a stratified problem bank.

### 1.2 Knowledge Components (KCs)
The domain model is divided into the following 8 KCs, ordered by complexity:
1.  **KC1: Types of Angles** - Identifying Acute, Right, Obtuse, Straight, and Reflex angles.
2.  **KC2: Complementary and Supplementary Angles** - Understanding angle pairs that sum to 90° and 180°.
3.  **KC3: Adjacent Angles** - Recognizing angles that share a common vertex and arm.
4.  **KC4: Linear Pair** - Applying the axiom that adjacent angles on a straight line sum to 180°.
5.  **KC5: Vertically Opposite Angles** - Identifying equal opposite angles at intersections.
6.  **KC6: Transversals & Corresponding Angles** - Understanding relative positions at parallel intersections.
7.  **KC7: Alternate Interior & Co-interior Angles** - Applying "Z" and "C" shape angle properties.
8.  **KC8: Lines Parallel to the Same Line** - Utilizing the transitivity property of parallel lines.

### 1.3 Concept Delivery
For each KC, the system provides a dual-phase learning experience:
*   **Tutorials:** Multi-step instructional content using relatable analogies (e.g., "pizza slices" for angle types, "superheroes" for supplementary angles) to engage the learner and build intuition before formal definitions are introduced.
*   **Problem Bank:** Questions are categorized into three difficulty levels to support adaptive scaffolding:
    *   *Easy:* Direct application of definitions and visual identification (e.g., "Find the complement of 40°").
    *   *Medium:* Single-step algebraic applications requiring basic equation solving (e.g., "Two supplementary angles are in ratio 1:2. Find them.").
    *   *Hard:* Multi-step algebraic problem solving involving inequalities or complex geometry (e.g., "(3x−10) and (2x+15) form a linear pair. Find x.").

---

## 2. Learner Model

The system employs a dynamic Learner Model based on **Bayesian Knowledge Tracing (BKT)**. This model maintains a probabilistic estimate of the student's latent mastery for each Knowledge Component, updating in real-time as the student interacts with the system.

### 2.1 Data Collected
The system collects rich, granular interaction data during the problem-solving phase:
*   **First-Attempt Correctness:** Whether the student answered correctly on their very first try without any system assistance.
*   **Hint Usage:** The number of progressive hints requested by the student (0 to 3).
*   **Attempt Count:** How many times the student submitted an incorrect answer for the current problem before succeeding or triggering remediation.
*   **Time Spent:** The duration in milliseconds from when the problem was presented to when an answer was submitted.
*   **Self-Regulated Guessing:** Whether the student explicitly admitted to guessing via the "I'm just guessing" feature.

### 2.2 Purpose of Data Collection
The collected data serves two primary purposes: driving the BKT model and triggering behavioral interventions.
*   **BKT Evidence Generation:** First-attempt correctness without hints is the *sole* condition for positive evidence ($E=1$) in the BKT model. Any hint usage, multiple attempts, or admitted guessing results in negative evidence ($E=0$). This strict evidence criteria ensures that the system only increases the mastery probability when independent, unassisted understanding is demonstrated.
*   **Gaming Detection:** Time spent is continuously monitored. Submissions made in under 3 seconds are flagged as "fast guessing," prompting a specific behavioral intervention ("Whoa there, speedster!"). This discourages students from rapidly clicking through problems without reading them.
*   **Metacognitive Scaffolding:** Tracking admitted guesses allows the system to reward honesty with supportive, targeted feedback rather than penalizing the student harshly. This encourages students to use the hint system for learning instead of blindly guessing to progress.

---

## 3. Pedagogical Logic

The pedagogical engine uses the Learner Model to drive adaptation, ensuring that students receive content tailored to their current proficiency level, maximizing learning efficiency and minimizing frustration.

### 3.1 Bayesian Knowledge Tracing (BKT) Updates
The system calculates the probability of learning, $P(L)$, using Bayes' Theorem after every problem attempt.
*   **Parameters:**
    *   *Slip ($P(S)$):* 0.10 (The probability a student knows the skill but makes a careless mistake).
    *   *Guess ($P(G)$):* 0.25 for multiple-choice questions, 0.05 for numeric entry questions (reflecting the lower probability of guessing a free-response answer).
    *   *Transit ($P(T)$):* 0.15 (The probability of learning the skill after an opportunity to apply it, regardless of whether the attempt was correct).
*   **Update Rule:** After each problem, the posterior probability $P(L|E)$ is calculated based on the evidence $E \in \{0, 1\}$. The transit probability is then applied to yield the new mastery estimate for the next opportunity: $P(L_{next}) = P(L|E) + (1 - P(L|E)) \times P(T)$.

### 3.2 Adaptive Difficulty Progression
Instead of a linear, predetermined progression, the system dynamically selects the difficulty of the next problem based on the current BKT mastery probability:
*   **$P(L) < 50\%$:** The student remains on **Easy** problems to build foundational understanding and confidence.
*   **$50\% \le P(L) < 80\%$:** The student is promoted to **Medium** problems, introducing algebraic applications and slightly more complex scenarios.
*   **$P(L) \ge 80\%$:** The student is challenged with **Hard** problems, requiring synthesis and multi-step reasoning.
*   *Dynamic Demotion:* If a student struggles on Medium or Hard problems and their $P(L)$ drops below the respective threshold due to negative evidence, they are seamlessly transitioned back to easier problems. This prevents students from getting stuck on material that is currently too difficult.

### 3.3 Remediation and Mastery
*   **Micro-Remediation:** Triggered if a student fails a problem twice or exhausts all 3 available hints. The system pauses the assessment, displays the KC's core remediation text (a simplified mnemonic or analogy, e.g., "Think of adjacent angles as neighbours sharing a wall"), and forces the student to review the core concept before continuing to a new problem.
*   **Mastery Threshold:** A KC is considered "Mastered" when $P(L) \ge 95\%$. At this point, the system celebrates the achievement and transitions the student to the next KC in the curriculum.

---

## 4. System Flow

The learner's journey through the system is governed by a finite state machine that ensures a structured yet highly adaptive experience.

### 4.1 State Machine Overview
The application transitions between the following core states:
1.  **Intro State:** The student is introduced to a new KC via a multi-step, interactive tutorial featuring stories, analogies, and visual aids.
2.  **Problem State:** The student is presented with a question matching their current adaptive difficulty level.
3.  **Feedback State:**
    *   *Correct:* Positive reinforcement is provided, a BKT positive update occurs (if first try/no hints), and the student transitions to the next problem.
    *   *Incorrect:* A BKT negative update occurs. If attempts < 2, targeted feedback is provided (e.g., speed warning, hint suggestion).
4.  **Remediation State:** Reached via repeated failure on a single problem. Provides foundational review before returning the student to the Problem State with a new question.
5.  **Transition State:** A brief interstitial screen with encouraging messaging (e.g., "You're on a hot streak!") displayed while the system loads the next problem or adjusts difficulty.
6.  **KC Complete State:** Reached when BKT mastery hits 95%. Celebrates the milestone and prepares the next KC.
7.  **Course Complete State:** Reached when all 8 KCs are mastered. Offers a comprehensive review or the option to reset the course.

### 4.2 Developer & Debugging Flow
To facilitate testing of this complex adaptive flow, a hidden developer menu is accessible via the "Dev Navigation" button in the UI.
*   **Live Learner Model:** Displays real-time BKT probabilities for all KCs, session event logs, and current state variables (difficulty, attempts, hint level).
*   **KC Jumping:** Allows developers to bypass the mastery gates and instantly navigate to any of the 8 subtopics to test specific content, difficulty transitions, or remediation logic without having to manually master previous KCs.

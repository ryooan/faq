---
sidebar_position: 3
---

# Question Resolution

## Getting a Question Resolved

If a question is still waiting for resolution, check to make sure there hasn’t been a comment from staff explaining the reason for the delay. If there hasn’t, you can tag @admins to alert the Metaculus team. 

:::caution Abusing Tags

Please do not use the @admins tag more than once per week regarding a single question or resolution.

:::

## How Questions Resolve

Questions are eligible to be resolved when their resolution criteria specify. Binary questions can resolve yes, no or ambiguous. Range questions can resolve to a specific value, an out-of-bounds value, or ambiguous. Only Metaculus Administrators can resolve questions. An ambiguous resolution generally implies that there was some inherent ambiguity in the question, that real-world events subverted one of the assumptions of the question, or that there is not a clear consensus as to what in fact occurred.

## Questions Must Resolve

All questions are intended to be resolved. This means all questions must specify close times and resolution times and specify a set period after which the question will resolve, even if the event in question could occur after that. For example, the question "[If chess is solved before 2080, must perfect play result in a forced draw?](https://www.metaculus.com/questions/4334/if-chess-is-solved-before-2080-must-perfect-play-result-in-a-forced-draw/)" is a conditional question, and in theory the child question asking whether or not perfect play results in a draw does not depend on whether the parent question about chess being solved occurs before or after 2080. But in order for the question to be resolvable an end date must be chosen, and the author selected the year 2080. The date an open-ended question is to resolve is left to the discretion of the author and the moderators approving the question (and may be influenced by community feedback in the upcoming period). If the resolution date is reached and the question is still of interest, a new question with a later resolution date can be launched.

## Date of Resolution

Questions will be resolved when they have satisfied the criteria specified in the resolution section of the question (or conversely, when those criteria have conclusively failed to be met). Each question also has a “Resolution Date” listed in our system for purposes such as question sorting; however, this listed date is often nothing more than an approximation, and the actual date of resolution may not be known in advance.

For questions which ask when something will happen (such as "[When will the first humans land successfully on Mars?](https://www.metaculus.com/questions/3515/when-will-the-first-humans-land-successfully-on-mars/)") forecasters are asked to predict the date/time when the criteria have been satisfied (though the question may be decided and points awarded at some later time, when the evidence is conclusive). Some questions predict general time intervals, such as “In which month will unemployment pass below 4%?”; when such a question has specified the date/time which will be used, those terms will be used. If these terms are not given, the default policy will be to resolve as the midpoint of that period (for example, if the January report is the first month of unemployment under 4%, the resolution date will default to January 15).

## Early Resolution

When resolving a question, the Admin has an option to specify the effective resolution time of a question, so that if the question is unambiguously resolved prior to the closing time, the resolution time can be denoted as a time when resolution first became known.

When a question resolves early, the points awarded are only those accumulated up until the resolution time. This is necessary in order to keep scoring "proper" (i.e. maximally reward predicting the right probability) and prevent gaming of points, but it does mean that the overall points (positive or negative) may end up being less than expected.

## Retroactive Closure

In some cases when the timing of an event is unknown it may be appropriate to change the closing date to a time before the question resolved, after the resolution is known. This is known as retroactive closure. Retroactive closure is not allowed except in the case of an event where the timing of the event is unknown and the outcome of the event is independent of the timing of the event, as described in the question closing guidelines above. When the timing of the event impacts the outcome of the event retroactive closure would violate proper scoring. For scoring to be proper a question must only close retroactively when the outcome is independent of the timing of the event. Here are several examples:

* The date of a rocket launch can often vary based on launch windows and weather, and the success or failure of the launch is primarily independent of when the launch occurs. **In this case retroactive closure is appropriate**, as the timing of the launch is very unlikely to impact forecasts for the success of the launch.
* In some countries elections can be called earlier than scheduled (these are known as [snap elections](https://en.wikipedia.org/wiki/Snap_election)). The timing of snap elections is often up to the party in power, and elections are often scheduled at a time the incumbent party considers to be favorable to their prospects. **In this case retroactive closure is <ins>not</ins> appropriate**, as the timing of the election will impact forecasts for the outcome of the election, violating proper scoring.
* Previously some questions on Metaculus were approved with inappropriate retroactive closure clauses. For example, the question "[When will the number of functional artificial satellites in orbit exceed 5,000?](https://www.metaculus.com/questions/6662/date-earth-functional-satellites-exceed-5000/)" specifies retroactive closure to the date when the 5,001st satellite is launched. **In this case retroactive closure was <ins>not</ins> appropriate**, because the resolution of the question was dependent on the closure date since both relied on the number of satellites launched.

Forecasters often like retroactive closure because it prevents points from being truncated when an event occurs before the originally scheduled close date. But in order to elicit the best forecasts it’s important to follow proper scoring rules. For more on point truncation see the section ***Early Resolution - ADD LINK***.

While Metaculus will try not to approve questions which specify inappropriate retroactive closure, sometimes new or existing questions do specify it. It is the policy of Metaculus to ignore inappropriate retroactive closure when resolving questions.

## Pre-Launch Resolution

Our Moderators and question authors strive to be as clear and informed as possible on each question, but mistakes occasionally happen. In some cases it is determined after a question has launched that a qualifying event had already occurred prior to the question opening. For a hypothetical question like "Will a nuclear detonation occur in a Japanese City by 2030?" it can be understood by common sense that we are asking about the *next* detonation after the detonations in 1945. In other questions like "[Will Facebook implement a feature to explain news feed recommendations before 2026?](https://www.metaculus.com/questions/8946/facebook-uses-explainable-news-feed-by-2026/)", we are asking about the first occurence of this event. Since this event occurred before the question opened and this was not known to the question author, the question resolved ambiguously.

## Resolution Source Availability

There are times when the intent of a question is to specifically track the actions or statements of specific organizations or people (such as, "how many Electoral Votes will the Democrat win in the 2020 US Presidential Election *according to the Electoral College*"); at other times, we are interested only in the actual truth, and we accept a resolution source as being an acceptable approximation (such as, "how many COVID-19 deaths will there be in the US in 2021 according to the CDC?"). That said, in many cases it is not clear which is intended.

Ideally, every question would be written with maximally clear language, but some ambiguities are inevitable. Unless specifically indicated otherwise, if a resolution source is judged by Metaculus Admins to be defunct, obsolete, or inadequate, Admins will make a best effort to replace it with a functional equivalent. Questions can overrule this policy with language such as "If [this source] is no longer available, the question will resolve as **Ambiguous**" or "This question tracks publications by [this source], regardless of publications by other sources."
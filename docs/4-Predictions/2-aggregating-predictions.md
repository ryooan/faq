---
---

# Aggregating Predictions

## Community Prediction

The Community Prediction is the median (that is, middle value) of recent player predictions. It's designed to respond to big changes in player opinion while still being fairly insensitive to outliers.

Here's the mathematical detail:

* Each predicting player is marked with a number $n$ (starting at 1) that orders them from oldest active prediction to newest prediction.
* The individual predictions are given weights $w(n)\varpropto e^{\sqrt{n}}$ and combined to form a weighted community distribution function. The median Community Prediction is just the median of this distribution.
* The particular form of the weights means that approximately $\sqrt{n}$ new predictions need to happen in order to substantially change the Community Prediction on a question that already has $n$ players predicting.

Users can hide the Community Prediction from view from within their settings. This requires that the user be at least Level 2, or that they purchase this power using tachyons.

## Metaculus Prediction

The Metaculus Prediction is the Metaculus system's best estimate of how a question will resolve. It's based on predictions from community members, but unlike the Community Prediction, it's not a simple average or median. Instead, the Metaculus Prediction uses a sophisticated model to calibrate and weight each user, ideally resulting in a prediction that's better than the best of the community.

For questions that resolved in 2021, the Metaculus Prediction has a Brier score of 0.111 (evaluated at resolve time). Lower Brier scores indicate greater accuracy, with the MP slightly lower than the Community Prediction's Brier score of 0.110. you can see some of the fine details on our [track record page](https://www.metaculus.com/questions/track-record/).

## Visibility of the CP and MP

When a question first opens, nobody can see the Community Prediction for a while, to avoid giving inordinate weight to the very first predictions, which may "ground" or bias later ones. The Metaculus Prediction is hidden until the question closes, though it may be ***peeked at using tachyons - add link***.
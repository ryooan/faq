---
---

# Scoring Rules

## Brier Score

The [Brier score](https://en.wikipedia.org/wiki/Brier_score) is a commonly-used scoring rule (sometimes also called "quadratic scoring") that compares a set of predictions to actual outcomes. For a single forecast of probability $p$, it is computed as $S=(p-f)^2$, where $f=1$ if the event occurred, and $f=0$ if not. If you forecast 100% and an event occurred, your Brier score would be $0$. If you forecast 100% and it did not occur, your score would be $1$. If you were to guess 50% for every binary question, your mean Brier score would be $0.25$.

## Log Score

The [log score](https://en.wikipedia.org/wiki/Scoring_rule#Logarithmic_scoring_rule) is another common scoring rule. Outside tournaments, Metaculus uses a variant of the log score. For a single binary forecast of probability $p$, the log score is computed as $S=(\log_2 p)+1$ if the event occurred, and $S=(\log_2 (1-p))+1$ if not. The scaling is chosen so that higher scores are better, and a maximally-uncertain prediction ($p=0.5$) gives $S=0$. For continuous questions, the score is computed as $S=\log_2 p$, where p is the value of the predicted probability density at the resolved value (as can be read off from the plot on the question).

:::tip Fun Fact

A variant of the log score is used to calculate Metaculus points and tournament scores.

:::
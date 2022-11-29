---
---

# Metaculus Points

## Overview

The points you receive depend on your prediction, what actually happens, and what the rest of the community predicted. By moving the slider, you can see how many points you will get if the question were resolved as 'yes' or 'no' right now. There are five key things you need to know about the points:

1. **Your expected points are maximized if you provide your *honest* credence.** For example, if the question was whether a fair coin would come up heads, then you would get most points by predicting 50% each time. You should always predict the probability you believe to best reflect the true likelihood of the event.
2. Points are awarded both for being *right* and for being *more right* than the community.
3. Since your points depend on how many other forecasters participate, and what they predict, the points "on the line" will change over time.
4. Your points are *time averaged* over the time during which the question is open. You receive no points while a question is open but before you make a prediction, and the points you earn depend on your prediction's accuracy and when you predict. This means that:
    1. You should predict early, to earn points over more of the question's lifetime.
    2. You should predict often, or rather update your prediction anytime you learn new information and your best estimate of the probability changes.

**To get a detailed explanation of the reasoning behind how Metaculus scores forecasts, see [this post](https://metaculus.medium.com/a-primer-on-the-metaculus-scoring-rule-eb9a974cd204) written by one of Metaculus's founders.**

*If you crave more nitty-gritty mathematical detail, you can expand the section below.*

<details>
	<summary>Metaculus Points Details</summary>

 Your score $S(T,o)$ at any given time $T$ is the sum of an "absolute" component and a "relative" component:
 
$$
S(T,o) = a(N) \times L(p,o) + b(N) \times B(p,o)
$$
	
where
	
1. $o$ represents the outcome of the question: $1$ if the question resolves positive, $0$ if it resolves negative.
2. $N$ is the number of forecasters on the question.
3. $L(p,o)$ is the log score relative to a 50% prior, defined as

$$
L(p, o) =
\begin{cases}
  \log_2 \left ( \frac{p}{0.5} \right ) & \text{if } o = 1 \\
  \log_2 \left ( \frac{1 - p}{0.5} \right ) & \text{if } o = 0
\end{cases}
$$
	  
4. $-2 < B(p,o) < 2$ is the betting score and represents a bet placed against every other forecaster. It is described as the "constant pool betting function" on the Metaculus [scoring demo](https://www.metaculus.com/help/scoring/) (but with a modification that for computational efficiency, the full distribution of other forecaster predictions is replaced by a fitted [beta distribution](https://en.wikipedia.org/wiki/Beta_distribution).
5. $a(N)$ and $b(N)$ depend on $N$ only and define how the points scale with the number of forecasters.

$$
\begin{align*}
A(N) &= 45 + 15 \log_2(1 + N/30) \\
B(N) &= 30 \log_2(1 + N/30).
\end{align*}
$$

Note that $B$, $N$, and $p$ can all depend on $T$ and contribute to the time-dependence of $S(T, o)$. You can see its evolution over time in your score history plot on each question.

Your final score is given by the integral of $S(T, o)$ over $T$:

$$
S = \frac{1}{t_c-t_o} \int_{t_o}^{t_c} S(T, o) \, dT
$$
  
where $t_o$ and $t_c$ are the opening and closing times. (Note that $S(T) = 0$ between the opening time and your first prediction, and is also zero after question resolution but before question close, in the case when a question [resolves early](/faq/question-resolution#early-resolution). The current value of this integral is shown in the point history plot as the "total points."

:::note

Before May 2022, there was also a 50% point bonus given at the time the question closes, but it was [discontinued](https://www.metaculus.com/questions/10801/discontinuing-the-final-forecast-bonus/) and the points multiplied by 1.5 henceforth.

:::

</details>

## Predictions and Points for Range Questions

Binary questions resolve to either 'yes' or 'no', but numerical questions resolve to a number. Therefore, when you make a prediction on a numerical question, you need to specify a probability for *each* possible outcome (that is, assign a [probability density function](https://en.wikipedia.org/wiki/Probability_density_function)). There are an infinite number of such functions, but to make life a little bit easier we restrict predictions to a mixture of up to 5 logistic distributions. You can adjust the center, width and weight of each component of the mixture using the sliders on the question pages.

Here are the key things you need to know, with more details below.

1. You should put the center of your distribution at what you think is the most likely value, then adjust the width of the distribution so that you attribute better than even odds to the true number falling into your range.
2. Making your distribution wider or narrower reflects your confidence in the central value you've specified, and decides the stakes: a narrower distribution gives more points if your central value is right, but makes you lose more if it's wrong.
3. Similar to binary questions, points are awarded both for being *right* and for being *more right* than the community. The points "on the line" will change over time, and the score you are awarded is *time averaged* over the time during which the question is open.
4. Some numerical questions restrict the possible resolutions to lie within a certain range. If the resolution falls outside of that range, then the question resolves ambiguously and no one receives any points. Other questions allow open-ended ranges, and you can assign probability to an out-of-bounds resolution by moving your distribution to the edge of the range.

<details>
	<summary>Scoring Details for Numerical Questions</summary>
	
When a numerical question resolves, forecasters are scored using a logarithmic scoring rule. The more probable you thought the outcome would be, the more points you get. The more probable the community thought the outcome would be, the fewer points you get. Both predictions are compared to a uniform distribution, which treats all outcomes as equally likely. If you always predict that the resolved outcome is more likely than both the uniform prediction and the Community Prediction then you're guaranteed to win points. Just like the binary scoring rule, your final score is averaged over the lifetime of the question.

Every numerical question has a range of possible outcomes set by the question creator. The outcomes can be displayed on either a linear or logarithmic scale. If logarithmic, predictions will technically be [log-logistic distributions](https://en.wikipedia.org/wiki/Log-logistic_distribution), although the log scale on the x axis will make them appear to have the same shape as regular logistic distributions.

Let $x$ be the resolved outcome, $P_p(x)$ your probability density, $P_u$ a uniform distribution, $P_c(x)$ the logistic distribution which best fits all other players' predictions, and $N$ the number of other forecasters. Then your score at a given time $T$ is given by

$$
S(T,x) = a(N) \log\left(\frac{P_p(x)}{P_u}\right) + b(N) \log\left(\frac{P_c(x)}{P_u(x)}\right),
$$
	
where $a(N)$ and $b(N)$ only depend on $N$ and define how the points scale with the number of forecasters.
	
$$
\begin{align*}
a(N) &= 30 + 6 \log_2(1 + N/30) \\
b(N) &= 24 \log_2(1 + N/30).
\end{align*}
$$

For questions that restrict the range of possible outcomes, the distributions are truncated to the restricted range and renormalized such that $\int P(x)dx = 1$. For questions with open-ended ranges, the uniform distribution contains 100% of the probability mass minus 15% per open bound. The exact value of an out-of-bounds resolution does not matter: players are scored only on the total probability that they assigned to the out-of-bounds possibility.

Your prediction, the community prediction, and the number of other forecasters can all change with time, so the scoring function $S(x)$ is time-dependent as well. The final points awarded are the time-average of $S(x)$ over the lifetime of the question.

Note that both your distribution and the community distribution are mixed with a uniform distribution such that $\frac{P_p(x)}{P_u} > 0.02$ for all $x$. This protects confident but wrong forecasters from catastrophic point losses.
  
:::note
  
Before December 2018, continuous questions gave more points because the points scaling factors were defined as
  
$$
\begin{align*}
a(N) &= 40 + 20 \log_2(1 + N/30) \\
b(N) &= 20 \log_2(1 + N/30).
\end{align*}
$$

but it was decided that they should be more in line with binary questions.

Before May 2022, there was also a 50% point bonus given at the time the question closes, but it was [discontinued](https://www.metaculus.com/questions/10801/discontinuing-the-final-forecast-bonus/) and the points multiplied by 1.5 henceforth.
  
:::

</details>

## Point Truncation

The Metaculus points system is designed to be a [proper scoring rule](https://en.wikipedia.org/wiki/Scoring_rule#Proper_scoring_rules). This means that your best strategy is to predict your true belief about the probability, or probability distribution of an event.

One somewhat counter-intuitive aspect of the scoring rule is that points will be truncated if a question resolves before its stated close time. This truncation is necessary in order to keep the scoring rule proper. Without the truncation, predictors would be incentivised to predict very high probabilities early on in a question, even if the true probability of the question resolving were low.

An intuitive way of understanding this is to think of each day (or in fact second) as being a separate “question” which generates its own score, where your prediction is whatever it was the last time you updated. The score over all time is therefore equal to the sum of the scores over each “part” of the question, and if each part is individually proper, then so will be the sum. The reason for truncation is now obvious, those “questions” which fell after the question resolved, score zero. Not truncating would mean weighing some early “questions” higher, breaking the properness.

Click below to see a worked out example.

<details>
	<summary>Scoring Details for Numerical Questions</summary>

:::note

This example uses the log score for ease of calculation, but similar logic holds for the Brier score, and for Metaculus points.

:::

Bob wants to predict if he will be fired this year. He has a work review in one week, and there is a $10\%$ chance he will fail it and be fired right after. If he passes the work review, there is still a $5\%$ chance he will be fired at the end of the year. A proper scoring rule should mean that the best strategy on this question is to predict $p = (0.1 + 0.9 \times 0.05) = 14.5\%$ for the first week, and then $5\%$ thereafter (if he passed the review).

Without truncation (and assuming 52 weeks in a year), this strategy gives an expected log score of $\ln(0.145) \simeq -1.93$ if he fails the review, and $0.95 \left ( \frac{1}{52} \ln(0.855) + \frac{51}{52} \ln(0.95) \right ) + 0.05 \left ( \frac{1}{52} \ln(0.145) + \frac{51}{52} \ln(0.05) \right ) \simeq -0.199$ if he passes it, for a total expected score of $0.1 \times (-1.92) + 0.9 \times (-0.199) \simeq -0.373$.

But a strategy of predicting $99\%$ for the first week, then $5\%$ afterwards, scores $0.1 \ln(0.99) + 0.9 \left ( 0.95 \left ( \frac{1}{52} \ln(0.01) + \frac{51}{52} \ln(0.95) \right ) + 0.05 \left ( \frac{1}{52} \ln(0.99) + \frac{51}{52} \ln(0.05) \right ) \right ) \simeq -0.252$, which is higher. So without truncation the log score is not a proper scoring rule!

On the other hand, if we truncate the score in case of early resolution, the expected score for the $14.5\%/5\%$ strategy is now
$0.1 \frac{1}{52} \ln(0.145) + 0.9 \left ( 0.95 \left ( \frac{1}{52} \ln(0.855) + \frac{51}{52} \ln(0.95) \right ) + 0.05 \left ( \frac{1}{52} \ln(0.145) + \frac{51}{52} \ln(0.05) \right ) \right ) \simeq -0.183$, while the expected score for the $99\%/5\%$ strategy is now $0.1 \frac{1}{52} \ln(0.99) + 0.9 \left ( 0.95 \left ( \frac{1}{52} \ln(0.01) + \frac{51}{52} \ln(0.95) \right ) + 0.05 \left ( \frac{1}{52} \ln(0.99) + \frac{51}{52} \ln(0.05) \right ) \right ) \simeq -0.251$, which is lower, so our scoring is proper again!
	
</details>
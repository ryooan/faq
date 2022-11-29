---
---

# Tournaments

A forecasting tournament is a competition across one or multiple rounds of questions. Forecasters make their predictions on these questions, and once the questions are resolved, the forecasters are scored and ranked based on their accuracy. The top ranked forecasters can then receive payouts from a prize pool set aside for the tournament (in addition to other rewards like Metaculus hoodies), as well as the recognition that comes from winning the tournament. Metaculus tournaments use relative log scoring to award prizes, not Metaculus points.

## Relative Log Score

To measure the accuracy of your forecast probability $p$ relative to the median community forecast probability $p_c$, we define your relative log score for a binary question as $\ln \frac{p}{p_c}$ if the event occurred and $\ln \frac{1 - p}{1 - p_c}$ if it did not occur. If your forecast is the same as the community's, then you will always get a relative log score of $\ln 1 = 0$. If you forecast $20\%$, the community forecast is $10\%$, and the event occurred then your relative log score is $\ln \frac{0.2}{0.1} \simeq +0.693$. If, instead, you forecast $10\%$ and the community forecast is $20\%$ for an event that occurred, then your relative log score is $\ln \frac{0.1}{0.2} \simeq -0.693$.

For continuous questions, $p$ is the density of your forecast probability distribution at the resolution value and $p_c$ is the density of the community's probability distribution at the resolution value. For an example, see the GDP forecast in our [tournament scoring post](https://www.metaculus.com/questions/8506/new-metaculus-tournament-scoring-system-pt-1/).

## Tournament Question Score

Your tournament question score is a time average of your relative log score over the duration of a question. When you have no standing prediction (e.g. when you have not predicted yet), your relative log score is $0$ (in effect, you are imputed the community forecast, since $ln(1) = 0$).

## Question Coverage

Your question coverage is the percentage of the question lifetime in which you have an active forecast (see caveats regarding the [hidden period](#hidden-period) and [coverage weight](#coverage-weight) below). If you have an active forecast during the entire duration of a question, your coverage is 100%. If you don’t forecast a question at all your coverage is 0%.

## Hidden Period

For most tournament questions, the community prediction is hidden at the start of a question. This is done to prevent forecasters from simply copying the community, and accordingly rewards forecasting skill. The hidden period is defined as a proportion of the question's lifetime. If the question will be open 5 weeks and the hidden period is 20%, then the community prediction will stay hidden the first week.

## Coverage Weight

The coverage weight determines how much coverage lies in the [hidden period](#hidden-period). When the coverage weight is 100%, then your coverage is entirely determined by your participation during the hidden period. When coverage weight is 50% then half the coverage can be earned during the hidden period, and half during the rest of the question lifetime. Most tournament questions have a coverage weight equal to the share of the question’s  hidden period relative to its open period, or heavier, in which case predictions during the hidden period count more towards your coverage.

## Total Tournament Score

Your tournament score is the sum of your [tournament question scores](#tournament-question-score) over all questions in a tournament. You can see how your tournament score is calculated on your personal scoreboard (on the tournament page).

## Total Tournament Coverage

Your tournament coverage is the average of your [question coverage](#question-coverage) for all the questions in a tournament. You can see how your tournament coverage is calculated on your personal scoreboard (on the tournament page).

## Tournament Take

Your tournament take determines how much of the prize pool you win compared to other forecasters. If your take is twice as big as another forecaster’s take, then you will win twice the prize. The tournament take for a forecaster is their tournament coverage times the exponential of their tournament score, $c*e^S$, where $c$ is the forecaster’s tournament coverage and $S$ is the forecaster’s tournament score.

## Donating Tournament Winnings

If you have outstanding tournament winnings, Metaculus is happy to facilitate donations to various non-profits, regranting organizations, and funds. You can find the list of organizations we facilitate payments to [here](https://www.metaculus.com/questions/11556/donating-tournament-prizes/).
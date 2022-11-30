---
---

# Binary and Range Questions

## Binary Questions

Binary questions can resolve as either **Yes** or **No** (unless the resolution criteria were underspecified or otherwise circumvented, in which case they can resolve as **Ambiguous**). Binary questions are appropriate when an event can either occur or not occur. For example, the question "[Will the US unemployment rate stay above 5% through November 2021?](https://www.metaculus.com/questions/6296/us-unemployment-above-5-through-nov-2021/)" resolved as **No** because the unemployment rate dropped below 5% before the specified time.

## Range Questions

Range questions resolve to a certain value, and forecasters can specify a probability distribution to estimate the likelihood of each value occurring. Range questions can have open or closed bounds. If the bounds are closed, probability can only be assigned to values that fall within the bounds. If one or more of the bounds are open, forecasters may assign probability outside the boundary, and the question may resolve as outside the boundary. [See here](/predictions/making-predictions#out-of-bounds-resolution) for more details about boundaries on range questions.

The range interface allows you to input multiple probability distributions with different weights. [See here](/predictions/making-predictions) for more details on using the interface.

There are two types of range questions, numeric range questions and date range questions.

### Numeric Range

Numeric range questions can resolve as a numeric value. For example, the question "[What will be the 4-week average of initial jobless claims (in thousands) filed in July 2021?](https://www.metaculus.com/questions/7346/initial-jobless-claims-july-2021/)" resolved as **395**, because the underlying source reported 395 thousand initial jobless claims for July 2021.

Questions can also resolve outside the numeric range. For example, the question "[What will the highest level of annualised core US CPI growth be, in 2021, according to U.S. Bureau of Labor Statistics data?](https://www.metaculus.com/questions/6645/highest-us-core-cpi-growth-in-2021/)" resolved as **> 6.5** because the underlying source reported more than 6.5% annualized core CPI growth in the US, and 6.5 was the upper bound.

### Date Range

Date range questions can resolve as a certain date. For example, the question "[When will the next Public Health Emergency of International Concern be declared by the WHO?](https://www.metaculus.com/questions/8723/date-of-next-who-pheic-declaration/)" resolved as **July 23, 2022**, because a Public Health Emergency of International Concern was declared on that date.

Questions can also resolve outside the date range. For example, the question "[When will a SpaceX Super Heavy Booster fly?](https://www.metaculus.com/questions/6947/first-super-heavy-flight/)" resolved as **> March 29, 2022** because a SpaceX Super Heavy booster was not launched before March 29, 2022, which was the upper bound.
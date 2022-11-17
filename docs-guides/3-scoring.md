---
sidebar_position: 3
---

# Metaculus Scoring System

## PAGE NOT CURRENTLY FUNCTIONAL

<section className="section-box">
  <div className="section__header">
    <h2 className="section__header"><span>Metaculus Scoring System</span></h2>
  </div>
  <div className="section__content--padded">

<p>
Here at Metaculus, we want our players to make the best possible predictions. To that end, we needed to come up with a scoring system that rewards both individuals and the community as a whole for being correct over the long run. This app demonstrates a variety of scoring models, and it shows how the final result can depend upon the distribution of player predictions.
</p>

<p>
Try playing around with it to design what you think would be the best way to calculate scores, or jump down to our <a href="#explanation">explanation</a> of how the whole thing works, and the scoring system Metaculus uses.
</p>

<h3>Distribution of player predictions</h3>
<div className="scoring__dist--group">
  <h4>Distribution 1</h4>
  <div className="scoring__dist--row">
    <span>mode:</span><input className="d3-input" type="range" min="1" max="99" model="dist1Mode" scale="100"></input><span className="d3-output" model="dist1Mode" fmt=".0%">...</span>
  </div>
  <div className="scoring__dist--row">
    <span>width:</span><input className="d3-input" type="range" min="3" max="900" model="dist1Width" scale="3000"></input><span className="d3-output" model="dist1Width" fmt=".1%">...</span>
  </div>
  <div className="scoring__dist--row">
    <span># players:</span><input className="d3-input" type="range" min="0" max="1000" model="dist1Total"></input><span className="d3-output" model="dist1Total">...</span>
  </div>
</div>
<div className="scoring__dist--group">
  <h4>Distribution 2</h4>
  <div className="scoring__dist--row">
    <span>mode:</span><input className="d3-input" type="range" min="1" max="99" model="dist2Mode" scale="100"></input><span className="d3-output" model="dist2Mode" fmt=".0%">...</span>
  </div>
  <div className="scoring__dist--row">
    <span>width:</span><input className="d3-input" type="range" min="3" max="900" model="dist2Width" scale="3000"></input><span className="d3-output" model="dist2Width" fmt=".1%">...</span>
  </div>
  <div className="scoring__dist--row">
    <span># players:</span><input className="d3-input" type="range" min="0" max="1000" model="dist2Total"></input><span className="d3-output" model="dist2Total">...</span>
  </div>
</div>

<svg id="guess-graph"></svg>

<h3>Output player scores</h3>

<!---
<!---THIS SECTION CURRENTLY THROWS AN ERROR, SEEMS COMMENTING RELATED BUT CAN'T FIGURE IT OUT, I MAY NOT BE EXPORTING/RENDERING CORRECTLY.
export const test2 = (
	<div>
		<p style={{marginTop: -0.2 + 'em'}}>
		<span>Constant score function:</span>
		<select className="btn btn--small btn--highlight d3-input" model="constScoreFunc">
		<option value="logscore">log</option>
		<option value="brierscore">quadratic/Brier</option>
		<option value="spherical">spherical</option>
		</select>
		<input className="d3-input" type="range" min="0" max="1000" model="constWeight" style={{width:250, marginLeft: 0.5 + 'em', scale:1000}}></input>
		<span className="d3-output" style={{marginLeft:0.5 + 'em'}} model="constWeight" fmt=".1%">...</span>
		</p>
	</div>
);

<test2></test2>

-->

<!---

<p style="margin-top: -0.2em">
<span>Constant score function:</span>
<select className="btn btn--small btn--highlight d3-input" model="constScoreFunc">
  <option value="logscore">log</option>
  <option value="brierscore">quadratic/Brier</option>
  <option value="spherical">spherical</option>
</select>
<input className="d3-input" type="range" min="0" max="1000" model="constWeight" style="width:250px; margin-left: 0.5em" scale="1000"></input>
<span className="d3-output" style="margin-left:0.5em" model="constWeight" fmt=".1%">...</span>
</p>

<p>
<span>Relative score function:</span>
<select className="btn btn--small btn--highlight d3-input" model="relScoreFunc">
  <option value="logscore">log</option>
  <option value="brierscore">quadratic/Brier</option>
  <option value="spherical">spherical</option>
  <option value="constPool">bet: constant pool</option>
  <option value="constLoss">bet: constant loss</option>
  <option value="constGain">bet: constant gain</option>
  <option value="sqrtLoss">bet: sqrt loss</option>
  <option value="sqrtGain">bet: sqrt gain</option>
  <option value="sphericalSqrtGain">spherical and sqrt gain</option>
  <option value="logSqrtGain">log and sqrt gain</option>
</select>  
<input className="d3-input" type="range" min="0" max="1000" model="relWeight" style="width:250px; margin-left: 0.5em" scale="1000"></input>
<span className="d3-output" style="margin-left:0.5em" model="relWeight" fmt=".1%">...</span>
</p>

<svg id="score-graph"></svg>

<p>
  <span>Real-world probability:</span>
  <input className="d3-input" type="range" min="0" max="1000" model="actualProbability" style="width:250px; margin-left: 0.5em" scale="1000"></input>
  <span className="d3-output" style="margin:0 0.5em" model="actualProbability" fmt=".1%">...</span>
</p>

<ul>
  <li>If the outcome is <em style="color:#7c93d0">yes</em>, the average player will get <strong className="dark d3-output" style="font-size:120%" model="avgScoreIfYes" fmt="+.1f">...</strong> points</li>
  <li>If the outcome is <em style="color:#d05f67">no</em>, the average player will get <strong className="dark d3-output" style="font-size:120%" model="avgScoreIfNo" fmt="+.1f">...</strong> points</li>
  <li>Given the probability of the event, the <em>expected</em> average is <strong className="dark d3-output" style="font-size:120%" model="expectedAvgScore" fmt="+.1f">...</strong> points</li>
</ul>

<h3 id="explanation">Explanation</h3>

<p>If we were only asking our players to bet for or against an event happening, then our scoring would be straightforward: we'd set up something like a <a href="https://en.wikipedia.org/wiki/Prediction_market">prediction market</a> with payout proportional to the ratio of people making the opposite bet. Instead, we want our players to predict on the <em>probability</em> of an outcome, not the outcome itself. This makes the scoring a bit more complicated, but there are a few features that any good system should have:</p>

<ol>
  <li>If an event's real-world probability of happening is \(x\), then the <em>expected</em> score for an indivdual player (i.e., the average of that player's score over many similar events) should be maximized when the player guesses the probability \(x\). This is known as the <a href="https://en.wikipedia.org/wiki/Scoring_rule">proper score</a> criterion.</li>
  <li>If the community as a whole predicts that something is likely to happen, and it does happen, then the players on average should get rewarded. Conversely, the community should not get rewarded for being wrong.</li>
  <li>The scoring should be dynamic and depend upon what the community thinks. If everyone else thinks that something is sure to happen, but you think it won't, then you should get a big payout if it doesn't happen. And if there is strong consensus in the community, you should only get a limited payout for riding along by agreeing.</li>
  <li>The scoring should be relatively robust against outliers. A single person making a crazy prediction shouldn't affect everyone else's score too much.</li>
</ol>

<p>By playing around with the above sliders, you might be able to get a sense of which scoring functions satisfy which criteria.</p>

<p>The top set of sliders change the distrubtion of player guesses (displayed in the first graph), so you can, for example, see what the scores would look like if everyone guessed 99%.
The next couple of sliders and drop-downs change the precise functions used for scoring. There is a constant scoring function which does not depend upon the player distribution, and there is a relative scoring function in which players are scored against each other. The magnitude of the relative scoring function increases as more players make predictions.
You can mix and match these functions, and you can change the relative weights of the two components. The bottom graph shows the resulting score as a function of a player's prediction, both in the case that the outcome is <span style="color:#7c93d0">yes</span> and that it is <span style="color:#d05f67">no</span>.</p>

<p>Finally, there's a slider to change the actual probability of the event happening. Of course, generally no one knows ahead of time what the real probability is — that's why we're asking you to help make predictions — so we can't use that in the scoring. But we <em>can</em> use it to see what the expected score is for any given player's prediction. This is shown as the thin black line in the bottom graph.</p>

<h3>Scoring functions</h3>

<p><em className='dark'>We go into some mathematical detail here for those that would like to see it. Rest assured, you need to know precisely 0% of this information to use Metaculus and make great predictions.</em></p>

<p>
There are an infinite number of proper score functions, so the task of picking one at first seems a little daunting, but there are a few popular ones from which we can start.

$$
S_{\rm log}(p) = \begin{cases}
  \log(p) & \text{if the outcome is $yes$} \\
  \log(1-p) & \text{if the outcome is $no$}
\end{cases} \\
S_{\rm quadratic/Brier}(p) = \begin{cases}
  -(1-p)^2 & \text{if the outcome is $yes$} \\
  -p^2 & \text{if the outcome is $no$}
\end{cases} \\
S_{\rm spherical}(p) = \begin{cases}
  \frac{p}{\sqrt{p^2 + (1-p)^2}} & \text{if the outcome is $yes$} \\
  \frac{1-p}{\sqrt{p^2 + (1-p)^2}} & \text{if the outcome is $no$}
\end{cases} \\
$$

It's easy to account for the average community prediction \(p_c\) by adding a constant to each of these. For example, \(S_{\rm log}(p, p_c) = S_{\rm log}(p) - S_{\rm log}(p_c)\). This way a player would get precisely zero points if they just go along with the community average.
</p>

<p>
We also introduce a set of betting functions in which a player's score is calculated as if they made a bet with the community setting the odds.

$$
S_{\rm bet}(p, p_c) = \begin{cases}
  +(1-p_c) & \text{if the outcome is $yes$ and $p > p_c$} \\
  -p_c & \text{if the outcome is $no$ and $p > p_c$} \\
  -(1-p_c) & \text{if the outcome is $yes$ and $p < p_c$} \\
  +p_c & \text{if the outcome is $no$ and $p < p_c$} \\
  0 & \text{if $p = p_c$}
\end{cases} \\
$$

This is the <em>constant pool</em> betting function, because the total number of points risked plus the total number potentially gained is equal to a constant. Similar functions can be defined where instead the total amount risked is set to a constant, the total amount gained is set to a constant, or anywhere in between (e.g., the <em>sqrt gain</em> function has the player gaining \(\sqrt{1-p_c}\) if the outcome is yes). Even though these functions are largely flat and cannot exactly be maximized, they are still proper scoring functions in the sense that the player cannot get a better score by predicting something other than the real-world probability, no matter what the community prediction happens to be.
</p>

<p>Of course, the scoring functions can be scaled by any constant without changing their properties. We have chosen a normalization such that average scores tend to fall in the range of 10-100 points. More specifically, each scoring function will yield exactly 100 points for a positive outcome if the player predicts 99% and the rest of the community predicts 50%. The relative scoring functions are further scaled by

$$
\log\left(1 + \frac{n}{20}\right),
$$

where $n$ is the total number of predictions (only counting the most recent prediction for each player).</p>

<p>
One nice thing about proper scoring functions is that any linear combination of different proper scoring functions will result in another proper scoring function. So, for example, we can combine the score based on one value of $p_c$ with the score for another value of $p_c$. This lets us create a fully relative scoring function $R(p)$, where each player's score depends on each other player's guess,

$$
R(p) = \frac{\sum_i S(p, p_i)}{n},
$$

where the sum is over all other players' predictions. This is what is used in the above graph, and, with a combination of <em>log</em> scoring and <em>sqrt gain</em> betting (with values given by the defaults when you load this page), it's what's used to power the scoring on the Metaculus site.
</p>

--->

  </div>
</section>

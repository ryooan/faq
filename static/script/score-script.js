var modelParams = {
  dist1Mode: 0.1,
  dist1Width: 0.06,
  dist1Total: 100,
  dist2Mode: 0.6,
  dist2Width: 0.1,
  dist2Total: 50,
  constWeight: 0.25,
  relWeight: 0.5,
  constScoreFunc: 'logscore',
  relScoreFunc: 'logSqrtGain',
  relNumScale: 20,
  actualProbability: 0.5,
  scoreScale: 100,
};

//alert("onInput");

function genGuesses(mode, width, total) {
  // Have to do some slight trickery to get the numbers to be integers.
  var sum = 0.0, rescale,
    guesses = [],
    i, d, y, x;
  for (i=1; i<=99; i++) {
    x = i*0.01;
    d = x - mode;
    y = Math.exp(-0.5*d*d/(width*width));
    guesses.push({x:x,y:y});
    sum += y;
  }
  rescale = sum > 0 ? total / sum : 1;
  sum = 0;
  for (i=0; i < guesses.length; i++) {
    y = guesses[i].y * rescale;
    guesses[i].y = Math.floor(y);
    guesses[i].dy = y - Math.floor(y);
    sum += Math.floor(y);
  }
  guesses.sort(function(a,b) {
    return b.dy - a.dy;
  });
  for (i=0; i < (total-sum) && i < guesses.length; i++) {
    guesses[i].y += 1;
  }
  guesses.sort(function(a,b) {
    return a.x - b.x;
  });
  return guesses;
}

function combineGuesses(a,b) {
  var i, c=[];
  for (i=0; i < a.length; i++) {
    c.push({x: a[i].x, y: a[i].y+b[i].y});
  }
  return c;
}

var scoreFunctions = {
  // In each case the normalization is such that f_{yes}(0.99, 0.5) = +1
  constPool: function(p0, pc) {
    var norm = 0.5;
    var yesScore = (1-pc) * Math.sign(p0 - pc);
    var noScore = (0-pc) * Math.sign(p0 - pc);
    return [yesScore / norm, noScore / norm];
  },

  constLoss: function(p0, pc) {
    var yesScore, noScore, norm = 1;
    if (p0 > pc) {
      yesScore = (1-pc)/pc;
      noScore = -1;
    } else if (p0 < pc) {
      yesScore = -1;
      noScore = pc/(1-pc);
    } else {
      yesScore = noScore = 0;
    }
    return [yesScore / norm, noScore / norm];
  },

  constGain: function(p0, pc) {
    var yesScore, noScore, norm = 1;
    if (p0 > pc) {
      yesScore = +1;
      noScore = -pc/(1-pc);
    } else if (p0 < pc) {
      yesScore = -(1-pc)/pc;
      noScore = +1;
    } else {
      yesScore = noScore = 0;
    }
    return [yesScore / norm, noScore / norm];
  },

  sqrtLoss: function(p0, pc) {
    var yesScore, noScore, norm = Math.sqrt(0.5);
    if (p0 > pc) {
      yesScore = (1-pc)/Math.sqrt(pc);
      noScore = -Math.sqrt(pc);
    } else if (p0 < pc) {
      yesScore = -Math.sqrt(1-pc);
      noScore = pc/Math.sqrt(1-pc);
    } else {
      yesScore = noScore = 0;
    }
    return [yesScore / norm, noScore / norm];
  },

  sqrtGain: function(p0, pc) {
    var yesScore, noScore, norm = Math.sqrt(0.5);
    if (p0 > pc) {
      yesScore = Math.sqrt(1-pc);
      noScore = -pc/Math.sqrt(1-pc);
    } else if (p0 < pc) {
      yesScore = -(1-pc)/Math.sqrt(pc);
      noScore = Math.sqrt(pc);
    } else {
      yesScore = noScore = 0;
    }
    return [yesScore / norm, noScore / norm];
  },

  symmetric: function(p0, pc) {
    var yesScore, noScore, norm = 0.255;
    var pmid = 0.5 * (p0 + pc);
    yesScore = (1-pmid) * Math.sign(p0 - pmid);
    noScore = (0-pmid) * Math.sign(p0 - pmid);
    return [yesScore / norm, noScore / norm];
  },

  logscore: function(p0, pc) {
    var norm = Math.log(1.98);
    return [Math.log(p0/pc) / norm, Math.log((1-p0)/(1-pc)) / norm];
  },

  brierscore: function(p0, pc) {
    var norm = 0.2499;
    var yesScore = ((1-pc)*(1-pc) - (1-p0)*(1-p0));
    var noScore = (pc*pc - p0*p0);
    return [yesScore / norm, noScore / norm];
  },

  spherical: function(p0, pc) {
    var f = function(x) {
      return x / Math.sqrt(x*x + (1-x)*(1-x));
    };
    var norm = f(0.99) - f(0.5),
      yesScore = f(p0) - f(pc),
      noScore = f(1-p0) - f(1-pc);
    return [yesScore / norm, noScore / norm];
  },

  sphericalSqrtGain: function(p0, pc) {
    var a = scoreFunctions.spherical(p0, pc);
    var b = scoreFunctions.sqrtGain(p0, pc);
    return [0.3*a[0]+0.7*b[0], 0.3*a[1]+0.7*b[1]];
  },

  logSqrtGain: function(p0, pc) {
    var a = scoreFunctions.logscore(p0, pc);
    var b = scoreFunctions.sqrtGain(p0, pc);
    return [0.3*a[0]+0.7*b[0], 0.3*a[1]+0.7*b[1]];
  },
};

function genScores(guesses) {
  var yesScores = [],
    noScores = [],
    playerGuesses = modelParams.dist1Total + modelParams.dist2Total,
    relScale = Math.log(1 + playerGuesses / modelParams.relNumScale),
    relWeight = modelParams.relWeight * relScale / Math.max(playerGuesses, 1),
    avgScores = [];
  yesScores.avg = noScores.avg = avgScores.avg = 0;
  for (var i=0; i<guesses.length; i++) {
    var yesScore = {},
      noScore = {},
      avgScore = {},
      p = modelParams.actualProbability,
      p0 = guesses[i].x,
      constScore = scoreFunctions[modelParams.constScoreFunc](p0, 0.5);
    yesScore.x = noScore.x = avgScore.x = guesses[i].x;
    yesScore.y = modelParams.constWeight * constScore[0];
    noScore.y = modelParams.constWeight * constScore[1];
    for (var j=0; j<guesses.length; j++) {
      var r = scoreFunctions[modelParams.relScoreFunc](p0, guesses[j].x);
      yesScore.y += r[0] * guesses[j].y * relWeight;
      noScore.y += r[1] * guesses[j].y * relWeight;
    }
    yesScore.y *= modelParams.scoreScale;
    noScore.y *= modelParams.scoreScale;
    avgScore.y = p * yesScore.y + (1-p) * noScore.y;
    yesScores.push(yesScore);
    noScores.push(noScore);
    avgScores.push(avgScore);
    yesScores.avg += yesScore.y * guesses[i].y / playerGuesses;
    noScores.avg += noScore.y * guesses[i].y / playerGuesses;
    avgScores.avg += avgScore.y * guesses[i].y / playerGuesses;
  }
  return [yesScores, noScores, avgScores];
}

var graphObj = {
  init: function(svg, params) {
    this._params = params;
    this.svg = svg;
    this.xScale = d3.scale.linear().domain([0.01,0.99]);
    this.yScale = d3.scale.linear().domain([-1,1]);
    this.xAxis = d3.svg.axis().orient('bottom').scale(this.xScale)
      .tickValues([.01,.10,.20,.30,.40,.50,.60,.70,.80,.90,.99])
      .tickFormat(function(d) {return d*100 + '%'});
    this.yAxis = d3.svg.axis().orient('left').scale(this.yScale).ticks(5);
    this.axes = svg.append('g');
    this.drawGroup = this.axes.append('g');
    this.xAxisGroup = this.axes.append('g').attr('class', 'x axis');
    this.yAxisGroup = this.axes.append('g').attr('class', 'y axis');
    //d3.select(window).on('resize', this.display.bind(this));
    return this; 
  },

  resetYRange: function(data) {
    var ymin=0, ymax=1e-3;
    for (var i=0; i<data.length; i++) {
      var dat = data[i];
      for (var j=0; j<dat.length; j++) {
        ymin = Math.min(ymin, dat[j].y);
        ymax = Math.max(ymax, dat[j].y);
      }
    }
    ymax = Math.max(ymax, this._params.minY);
    this.yScale.domain([ymin,ymax]);
  },

  dimensions: function() {
    var width = parseInt(this.svg.style('width'), 10),
      height = parseInt(this.svg.style('height'), 10),
      dims = Object.create(this._params.margin);
    dims.width = width - dims.left - dims.right;
    dims.height = height - dims.top - dims.bottom;
    this._dims = dims;
    return dims;
  },

  displayAxes: function() {
    var dims = this.dimensions();
    this.xScale.range([0, dims.width]);
    this.yScale.range([dims.height, 0]);
    this.axes
      .attr('transform','translate(' + dims.left + ',' + dims.top + ')');
    this.xAxisGroup
      .attr('transform', 'translate(0,' + dims.height + ')');

    this.xAxisGroup.call(this.xAxis);
    this.yAxisGroup.call(this.yAxis);
  },

  displayLines: function(data) {
    var i, paths, pathgen;
    var xfunc = function(d) {
      return this.xScale(d.x);
    }.bind(this);
    var yfunc = function(d) {
      return this.yScale(d.y);
    }.bind(this);

    pathgen = d3.svg.area().x(xfunc).y1(yfunc).y0(this.yScale(0));
    if (this._params.interpFunc) {
      pathgen.interpolate(this._params.interpFunc);
    }
    paths = this.drawGroup.selectAll('.graph-area').data(data);
    paths.enter().append('path').attr('class', function(d) {
      return 'graph-area ' + (d.cls || '');
    });
    paths.attr('d', pathgen);

    pathgen = d3.svg.line().x(xfunc).y(yfunc);
    if (this._params.interpFunc) {
      pathgen.interpolate(this._params.interpFunc);
    }
    paths = this.drawGroup.selectAll('.graph-line').data(data);
    paths.enter().append('path').attr('class', function(d) {
      return 'graph-line ' + (d.cls || '');
    });
    paths.attr('d', pathgen);
  },

  setData: function(data) {
    this.data = data;
    this.resetYRange(this.data);
  },

  display: function() {
    this.displayAxes();
    this.displayLines(this.data);
  },
};

function onInput() {
  if (this.attributes.model) {
    if (this.nodeName === 'SELECT') {
      modelParams[this.attributes.model.value] = this.value;
    } else {
      var scale = this.attributes.scale && +this.attributes.scale.value || 1;
      modelParams[this.attributes.model.value] = (+this.value) / scale;      
    }
    updateInterface();
  }
}

function getModelValue() {
  var modelName = this.attributes.model && this.attributes.model.value;
  if (this.nodeName === 'SELECT') {
    return modelParams[modelName];
  } else{
    var scale = this.attributes.scale && +this.attributes.scale.value || 1;
    return (+modelParams[modelName]) * scale;
  }
}

function updateTextValue() {
  var value = getModelValue.bind(this)();
  if (this.attributes.fmt) {
    var fmt = this.attributes.fmt.value;
    return d3.format(fmt)(value).replace('-', '−');
  }
  return value + '';
}

function updateInterface() {
	//alert("onInput");
  var mp = modelParams;
  var guessData = combineGuesses(
    genGuesses(mp.dist1Mode, mp.dist1Width, mp.dist1Total),  
    genGuesses(mp.dist2Mode, mp.dist2Width, mp.dist2Total)
  );
  guessData.cls = 'guesses';
  guessGraph.setData([guessData]);
  guessGraph.display();
  var scoreData = genScores(guessData);
  scoreData[0].cls = 'yes-score';
  scoreData[1].cls = 'no-score';
  scoreData[2].cls = 'avg-score';  
  scoreGraph.setData(scoreData);
  scoreGraph.display();
  modelParams.avgScoreIfYes = scoreData[0].avg;
  modelParams.avgScoreIfNo = scoreData[1].avg;
  modelParams.expectedAvgScore = scoreData[2].avg;

  d3.selectAll('.d3-input').property('value', getModelValue);
  d3.selectAll('.d3-output').text(updateTextValue);
}

function stepBetween(points) {
  var i, newps = [], p1, p2;
  p1 = points[0] || [0,0];
  newps.push(p1);
  for (i=1; i < points.length; i++) {
    p2 = points[i];
    newps.push([0.5*(p1[0]+p2[0]), p1[1]]);
    newps.push([0.5*(p1[0]+p2[0]), p2[1]]);
    p1 = p2;
  }
  newps.push(p1);
  return newps.join("L");
}

var guessGraph = Object.create(graphObj)
  .init(d3.select('#guess-graph'), {
    minY: 10,
    numYTicks: 7,
    interpFunc: stepBetween,
    margin: {
      left: 50,
      right: 20,
      top: 12,
      bottom: 22,
    },
  });

var scoreGraph = Object.create(graphObj)
  .init(d3.select('#score-graph'), {
    minY: 10,
    numYTicks: 7,
    margin: {
      left: 50,
      right: 20,
      top: 12,
      bottom: 22,
    },
  });

d3.selectAll('input.d3-input').on('input', onInput);
d3.selectAll('select.d3-input').on('change', onInput);
d3.select(window).on('resize', function() {
  guessGraph.display();
  scoreGraph.display();
});
updateInterface();
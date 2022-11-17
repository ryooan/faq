---
---

# NewsMatch

NewsMatch displays a selection of articles relevant to the current Metaculus question. These serve as an additional resource for forecasters as they discuss and predict on the question. Each article is listed with its source and its publication date. Clicking an article title navigates to the article itself. Clicking the ‘rate’ button allows you to indicate whether the article was helpful or not. Your input improves the accuracy and the usefulness of the model that matches articles to Metaculus questions.

The article matching model is supported by [Improve the News](https://www.improvethenews.org/), a news aggregator developed by a group of researchers at MIT. Designed to give readers more control over their news consumption, Improve the News helps readers stay informed while encountering a wider variety of viewpoints.

Articles in ITN's database are matched with relevant Metaculus questions by a transformer-based machine learning model trained to map semantically similar passages to regions in "embedding space." And the embeddings themselves are generated using [MPNet](https://arxiv.org/abs/2004.09297). Once a match is made, it must still be manually approved before it can appear alongside a forecast question.

